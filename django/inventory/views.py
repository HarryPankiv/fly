from django.views.generic import View
from django.http import HttpResponse, JsonResponse
from django.conf import settings

import os

class ReactAppView(View):
    def get(self, request):
        return JsonResponse({"fuck": "fuck you"})

