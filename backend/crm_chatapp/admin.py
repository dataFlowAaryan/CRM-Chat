from django.contrib import admin
from .models import User,Agent,ChatRoom

# Register your models here.

admin.site.register(Agent)
admin.site.register(User)
admin.site.register(ChatRoom)

