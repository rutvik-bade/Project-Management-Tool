from django.db import models

class Project(models.Model):
    STATUS_CHOICES = [
        ("ACTIVE", "ACTIVE"),
        ("COMPLETED", "COMPLETED"),
        ("ON_HOLD", "ON_HOLD"),
    ]

    organization = models.ForeignKey("organizations.Organization",
                                     on_delete=models.CASCADE,
                                     related_name="projects")
    name = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES)
    due_date = models.DateField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=["organization", "name"], name="uq_project_org_name")
        ]

    def __str__(self):
        return f"{self.organization.slug}:{self.name}"

# TODO: Role based permissions for tasks
class Task(models.Model):
    TASK_STATUS_CHOICES = [
        ("TODO", "TODO"),
        ("IN_PROGRESS", "IN_PROGRESS"),
        ("DONE", "DONE"),
    ]

    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name="tasks")
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    status = models.CharField(max_length=20, choices=TASK_STATUS_CHOICES, default="TODO")
    assignee_email = models.EmailField(blank=True)
    due_date = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        indexes = [
            models.Index(fields=["status"]),
            models.Index(fields=["assignee_email"]),
        ]

    def __str__(self):
        return f"{self.project_id}:{self.title}"


class TaskComment(models.Model):
    task = models.ForeignKey(Task, on_delete=models.CASCADE, related_name="comments")
    content = models.TextField()
    author_email = models.EmailField()
    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-timestamp"]

    def __str__(self):
        return f"Comment:{self.task_id}"
