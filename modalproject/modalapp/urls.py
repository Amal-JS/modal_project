from django.urls import path
from . import views

urlpatterns =[

path('',views.index,name="index"),
path('page1/',views.page1,name='page1'),
path('create_account_js/',views.create_account_js,name='create_account_js'),
path('create_account/',views.create_account,name='create_account')
]