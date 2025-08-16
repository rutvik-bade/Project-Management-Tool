import graphene
from organizations.schema import OrgQuery
from projects.schema import ProjectQuery, ProjectMutation

class Query(OrgQuery, ProjectQuery, graphene.ObjectType):
    pass

class Mutation(ProjectMutation, graphene.ObjectType):
    pass

schema = graphene.Schema(query=Query, mutation=Mutation)
