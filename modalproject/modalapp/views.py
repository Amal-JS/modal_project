from django.forms import model_to_dict
from django.http import HttpResponse, JsonResponse
from django.shortcuts import redirect, render
from .forms import Custom_User_Form
from django.utils.safestring import mark_safe

def index(request):
    
    return render(request,'index.html')


def page1(request):
    return render(request,'simple.html')

def create_account_js(request):

    if request.META.get('HTTP_X_REQUESTED_WITH') == 'XMLHttpRequest':  #checking if request is of type XMLHttpRequest  we are using fetch api but setting XMLHttpRequest in header
        form = Custom_User_Form(request.POST)
        if form.is_valid():
            form.save()
            print('accepted')
            return JsonResponse({'success': 'True'})  #sending response as json with object in success key value 'True'
            
        else:
            errors = {field_name: form.errors[field_name] for field_name in form.errors} #if any error we are creating a dictionary with field name and errors in each field field_name : [error1,erro2,...]
            res=JsonResponse({'success':'False', 'errors': errors}) #sending  that error along with success set to 'False' and errors value set to errors dictionary
            
            return res
   

        

    
    

#django way

def create_account(request):
    
    if request.method == 'POST':
        form = Custom_User_Form(request.POST)
        if form.is_valid():
            form.save()
            
            return redirect('page1')
        else:
            print(form.errors)
            
            return render(request,'django_form.html',{'form':form})
    
    form = Custom_User_Form()

    return render(request,'django_form.html',{'form':form})