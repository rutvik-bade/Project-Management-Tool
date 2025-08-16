from graphql import GraphQLError
from organizations.models import Organization

HEADER_NAME = "HTTP_X_ORGANIZATION" 

class OrganizationGraphQLMiddleware:
    """
    Resolves Organization once per request and attaches it to info.context.organization.
    Enforces that every GraphQL op runs inside an org context.
    """

    def resolve(self, next, root, info, **args):
        request = info.context 
        slug = request.META.get(HEADER_NAME)
        if not slug:
            raise GraphQLError("Missing organization context. Provide X-Organization header.")

        try:
            org = Organization.objects.get(slug=slug)
        except Organization.DoesNotExist:
            raise GraphQLError("Invalid organization slug.")

        # Stash it on the request for resolvers/mutations to use
        request.organization = org
        return next(root, info, **args)
