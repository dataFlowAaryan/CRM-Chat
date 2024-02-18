from typing import Any
from django.db import models
from django.contrib.auth.models import AbstractBaseUser,BaseUserManager,PermissionsMixin


# Create your models here.

class UserManager(BaseUserManager):
    def create_user(self,email,password=None,**extra_fields):
        if not email:
            raise ValueError("Users must have and email address")
        email = self.normalize_email(email)
        user =  self.model(email=email,**extra_fields)
        user.set_password(password)
        user.save(using=self.db)
        return user
    def create_super(self,email,password=None,**extra_fields):
        extra_fields.setdefault("is_staff,True")
        extra_fields.setdefault("is_superuser",True)
        return self.creae_user(email,password,**extra_fields)
class User(AbstractBaseUser,PermissionsMixin):
    
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=255 ,null=True)
    last_name  = models.CharField(max_length=255 ,null=True, blank=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    date_joined = models.DateTimeField(auto_now_add=True)

    object = UserManager()
    USERNAME_FIELD = 'email'

    def get_full_name(self):
        return f"{self.first_name} {self.last_name}"
    def __str__(self) -> str:
        return self.email
    
   
    
    

    
    

class Agent(AbstractBaseUser):

    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=200 ,null=True)
    last_name  = models.CharField(max_length=200 ,null=True, blank=True)
    
   
    
    

    
    USERNAME_FIELD = 'email'


    def str(self):
        return self.email

class ChatRoom(models.Model): 
    user=models.ForeignKey(
        User,on_delete=models.DO_NOTHING
        
    )
    agent=models.ForeignKey(
        Agent,on_delete=models.CASCADE
    )

    name=models.CharField(max_length=100)
    def str(self):
        return self.name

class Message(models.Model):
    room=models.ForeignKey(
        ChatRoom,on_delete=models.CASCADE
    )
    text=models.CharField(max_length=1024)

