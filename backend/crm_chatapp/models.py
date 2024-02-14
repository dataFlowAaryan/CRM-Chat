from django.db import models
from django.contrib.auth.models import AbstractBaseUser

# Create your models here.
class User(AbstractBaseUser):

    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=200 ,null=True)
    last_name  = models.CharField(max_length=200 ,null=True, blank=True)
    
   
    
    

    
    USERNAME_FIELD = 'email'


    def str(self):
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

