from . models import User
from django.contrib.auth.forms import UserCreationForm


class Custom_User_Form(UserCreationForm):
    class Meta:
        model = User
        fields= ['username','password1','password2','email','first_name','last_name']