from django.urls import path 
from .views import api_sales_staffs, api_sales_staff, api_customers, api_customer, api_sales,api_sale

urlpatterns = [
    path("sales/", api_sales, name="api_sales"),
    path("sales/<int:pk>/", api_sale, name="api_sale"),
    path("salesstaffs/", api_sales_staffs, name="api_sales_staffs"),
    path("salesstaffs/<int:pk>/", api_sales_staff, name="api_sales_staff"),
    path("customers/", api_customers, name="api_customers"),
    path("customers/<int:pk>/", api_customer, name="api_customer"),
]