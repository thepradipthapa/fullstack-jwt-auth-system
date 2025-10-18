from rest_framework import renderers
import json

class UserRenderer(renderers.JSONRenderer):
    """
    Custom JSON renderer for user-related responses.
    Overrides the default render method to format error messages consistently.
    """
    charset = 'utf-8'      

    def render(self, data, accepted_media_type=None, renderer_context=None):
        response = ''

        if 'ErrorDetail' in str(data):
            response = json.dumps({"error": data})
        else:
            response = json.dumps(data)

        return response
