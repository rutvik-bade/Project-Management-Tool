import graphene
from graphene import relay
from graphene_django import DjangoObjectType
from graphene_django.filter import DjangoFilterConnectionField
from django.db.models import Count, Q
from graphql import GraphQLError
from graphql_relay import from_global_id 

from projects.models import Project, Task, TaskComment

# -------------------- Types --------------------

class ProjectType(DjangoObjectType):
    task_count = graphene.Int()
    completed_tasks = graphene.Int()

    class Meta:
        model = Project
        fields = ("id", "name", "description", "status", "due_date", "created_at")
        interfaces = (relay.Node,)

    def resolve_task_count(self, info):
        return getattr(self, "task_count", None) or self.tasks.count()

    def resolve_completed_tasks(self, info):
        return getattr(self, "completed_tasks", None) or self.tasks.filter(status="DONE").count()



class TaskType(DjangoObjectType):
    class Meta:
        model = Task
        fields = ("id", "title", "description", "status", "assignee_email", "due_date", "created_at")
        interfaces = (relay.Node,)


class TaskCommentType(DjangoObjectType):
    class Meta:
        model = TaskComment
        fields = ("id", "content", "author_email", "timestamp")
        interfaces = (relay.Node,)


class ProjectStatsType(graphene.ObjectType):
    total_tasks = graphene.Int(required=True)
    completed_tasks = graphene.Int(required=True)
    completion_rate = graphene.Float(required=True)


# -------------------- Queries --------------------
# TradeOff (N+1 query vs Compute): # ✅ Choosing one single query with counts included instead of multiple queries for task counts and status filtering
# Using Django's annotate to get task counts and completed tasks directly in the query (uses JOIN and GROUP BY)
class ProjectQuery(graphene.ObjectType):
    projects = graphene.List(
        ProjectType, 
        status=graphene.String(required=False), 
        search=graphene.String(required=False)
    )
    tasks = graphene.List(TaskType, project_id=graphene.ID(required=True))

    def resolve_projects(self, info, status=None, search=None):
        org = info.context.organization

        # ✅ One single query with counts included
        qs = (
            Project.objects.filter(organization=org)
            .annotate(
                task_count=Count("tasks", distinct=True),
                completed_tasks=Count("tasks", filter=Q(tasks__status="DONE"), distinct=True),
            )
            .order_by("-created_at")
        )

        if status:
            qs = qs.filter(status=status)
        if search:
            qs = qs.filter(Q(name__icontains=search) | Q(description__icontains=search))

        return qs

    def resolve_tasks(self, info, project_id):
        org = info.context.organization
        try:
            # from_global_id returns a tuple: ('ProjectType', '3')
            _type, local_db_id = from_global_id(project_id)
        except Exception:
            raise GraphQLError("Invalid project ID format.")

        try:
            project = Project.objects.get(id=local_db_id, organization=org)
            return Task.objects.filter(project=project).order_by("created_at")
        except Project.DoesNotExist:
            raise GraphQLError("Project not found in this organization.")

# -------------------- Mutations --------------------

# Helpers
def _assert_project_belongs_to_org(project_id, org):
    try:
        return Project.objects.get(id=project_id, organization=org)
    except Project.DoesNotExist:
        raise GraphQLError("Invalid project for this organization.")

def _assert_task_belongs_to_org(task_id, org):
    try:
        task = Task.objects.select_related("project").get(id=task_id)
        if task.project.organization_id != org.id:
            raise GraphQLError("Invalid task for this organization.")
        return task
    except Task.DoesNotExist:
        raise GraphQLError("Task not found.")

# Project Mutations
class CreateProject(graphene.Mutation):
    class Arguments:
        name = graphene.String(required=True)
        status = graphene.String(required=True)  # "ACTIVE" | "COMPLETED" | "ON_HOLD"
        description = graphene.String(required=False)
        due_date = graphene.types.datetime.Date(required=False)

    project = graphene.Field(ProjectType)

    def mutate(self, info, name, status, description="", due_date=None):
        org = info.context.organization
        project = Project.objects.create(
            organization=org, name=name, status=status, description=description, due_date=due_date
        )
        return CreateProject(project=project)


class UpdateProject(graphene.Mutation):
    class Arguments:
        id = graphene.ID(required=True)
        name = graphene.String(required=False)
        status = graphene.String(required=False)
        description = graphene.String(required=False)
        due_date = graphene.types.datetime.Date(required=False, name="dueDate")

    project = graphene.Field(ProjectType)

    def mutate(self, info, id, **kwargs):
        org = info.context.organization
        try:
            project = Project.objects.get(id=id, organization=org)
        except Project.DoesNotExist:
            raise GraphQLError("Project not found in this organization.")

        for field, value in kwargs.items():
            if value is not None:
                setattr(project, field, value)
        project.save()
        return UpdateProject(project=project)

# Task Mutations
class CreateTask(graphene.Mutation):
    class Arguments:
        project_id = graphene.ID(required=True)
        title = graphene.String(required=True)
        status = graphene.String(required=False)  # default TODO
        description = graphene.String(required=False)
        assignee_email = graphene.String(required=False)
        due_date = graphene.types.datetime.DateTime(required=False)

    task = graphene.Field(TaskType)

    def mutate(self, info, project_id, title, status="TODO", description="", assignee_email="", due_date=None):
        org = info.context.organization
        try:
            _type, local_db_id = from_global_id(project_id)
            if _type != 'ProjectType': # Optional: Add a type check for extra safety
                raise GraphQLError("Invalid ID type provided for project.")
        except Exception:
            raise GraphQLError("Invalid project ID format.")
        
        # 2. Use the decoded local_db_id in your helper function.
        project = _assert_project_belongs_to_org(local_db_id, org)
        task = Task.objects.create(
            project=project,
            title=title,
            status=status,
            description=description or "",
            assignee_email=assignee_email or "",
            due_date=due_date,
        )
        return CreateTask(task=task)


class UpdateTask(graphene.Mutation):
    class Arguments:
        id = graphene.ID(required=True)
        title = graphene.String(required=False)
        status = graphene.String(required=False)
        description = graphene.String(required=False)
        assignee_email = graphene.String(required=False)
        due_date = graphene.types.datetime.DateTime(required=False)

    task = graphene.Field(TaskType)

    def mutate(self, info, id, **kwargs):
        org = info.context.organization
        task = _assert_task_belongs_to_org(id, org)
        for field, value in kwargs.items():
            if value is not None:
                setattr(task, field, value)
        task.save()
        return UpdateTask(task=task)

# Comment Mutation
class AddTaskComment(graphene.Mutation):
    class Arguments:
        task_id = graphene.ID(required=True)
        content = graphene.String(required=True)
        author_email = graphene.String(required=True)

    comment = graphene.Field(TaskCommentType)

    def mutate(self, info, task_id, content, author_email):
        org = info.context.organization
        task = _assert_task_belongs_to_org(task_id, org)
        comment = TaskComment.objects.create(task=task, content=content, author_email=author_email)
        return AddTaskComment(comment=comment)


class ProjectMutation(graphene.ObjectType):
    create_project = CreateProject.Field()
    update_project = UpdateProject.Field()

    create_task = CreateTask.Field()
    update_task = UpdateTask.Field()

    add_task_comment = AddTaskComment.Field()
