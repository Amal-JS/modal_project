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
    
    if request.META.get('HTTP_X_REQUESTED_WITH') == 'XMLHttpRequest':
        form = Custom_User_Form(request.POST)
        if form.is_valid():
            form.save()
            print('accepted')
            return JsonResponse({'success': 'True'})
            
        else:
            
            
            

            errors = {field_name: form.errors[field_name] for field_name in form.errors}
            res=JsonResponse({'success':'False', 'errors': errors})
            print(res,"vannilla")
            return res
    else:
        form = Custom_User_Form()

        

    
    



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