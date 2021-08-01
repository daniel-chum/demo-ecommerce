from rest_framework import pagination
from rest_framework.response import Response
from collections import OrderedDict

class ProductPagination(pagination.PageNumberPagination):
    page_size = 12
	
    def get_paginated_response(self, data):

        links_display_html = self.get_html_context()['page_links']

        return Response(OrderedDict([
            ('count', self.page.paginator.count),
            ('next', self.get_next_link()),
            ('previous', self.get_previous_link()),
            ('page_size', self.page_size),
            ('results', data),
            ('display', links_display_html)
        ]))