import graphene
from graphene_django import DjangoObjectType
from organizations.models import Organization

class OrganizationType(DjangoObjectType):
    class Meta:
        model = Organization
        fields = ("id", "name", "slug", "contact_email", "created_at")

class OrgQuery(graphene.ObjectType):
    # Optional helper to check which org you’re in
    me_organization = graphene.Field(OrganizationType)

    def resolve_me_organization(self, info):
        return getattr(info.context, "organization", None)
