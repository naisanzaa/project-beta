from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json

from .encoders import (
    SaleEncoder,
    SalesStaffEncoder,
    CustomerEncoder,
)
from .models import  SalesStaff, Customer, Sale, AutomobileVO

@require_http_methods(["GET", "POST"])
def api_sales(request):

    if request.method == "GET":
        sales = Sale.objects.all()
        return JsonResponse(
            {"sales": sales},
            encoder= SaleEncoder,
        )
    else: 
        content= json.loads(request.body)
        print("HERE", content)
        try:
            auto= AutomobileVO.objects.get(vin=content["auto"])
            print("AUTO:", auto)
            content["auto"] = auto

            sales_staff= SalesStaff.objects.get(id=content["sales_staff"])
            print("Sales staff", sales_staff)
            content["sales_staff"] = sales_staff

            customer= Customer.objects.get(id=content["customer"])
            print("Customer", customer)
            content["customer"] = customer

        
        except AutomobileVO.DoesNotExist:
            return JsonResponse({"message": "Invalid automobile"},
            status= 400,
            )
        

        sale= Sale.objects.create(**content)
        return JsonResponse(
            sale,
            encoder=SaleEncoder,
            safe= False,
        )


@require_http_methods(["GET", "DELETE"])
def api_sale(request, pk):
        
    if request.method == "GET":
        sale=Sale.objects.get(id=pk)
        return JsonResponse(
            sale,
            encoder= SaleEncoder,
            safe= False,
        )
    
    else:
        try:
            sale=Sale.objects.get(id=pk)
            sale.delete()
            return JsonResponse(
                sale,
                encoder= SaleEncoder,
                safe= False,
            )
        except Sale.DoesNotExist:
            response= JsonResponse(
                {"message": "Sale does not exist"}
            )
            return response


@require_http_methods(["GET", "POST"])
def api_sales_staffs(request):
    if request.method == "GET":
        sales_staffs = SalesStaff.objects.all()
        return JsonResponse(
            {"sales_staffs": sales_staffs},
            encoder=SalesStaffEncoder,
        )
    else:
        try:
            content = json.loads(request.body)
            sales_staff = SalesStaff.objects.create(**content)
            return JsonResponse(
                sales_staff,
                encoder=SalesStaffEncoder,
                safe=False,
            )
        except:
            response = JsonResponse(
                {"message": "Could not create the sales staff"}
            )
            response.status_code = 400
            return response

@require_http_methods(["GET", "DELETE"])
def api_sales_staff(request, pk):    
    if request.method == "GET":
        sales_staff = SalesStaff.objects.get(id=pk)
        return JsonResponse(
            sales_staff,
            encoder= SalesStaffEncoder,
            safe= False,
        )
    
    else:
        try:
            sales_staff = SalesStaff.objects.get(id=pk)
            sales_staff.delete()
            return JsonResponse(
                sales_staff,
                encoder= SalesStaffEncoder,
                safe= False,
            )
        except SalesStaff.DoesNotExist:
            response= JsonResponse(
                {"message": "Sales staff does not exist"},
            )
            return response


@require_http_methods(["GET", "POST"])
def api_customers (request):
    if request.method == "GET":
        customers = Customer.objects.all()
        return JsonResponse(
            {"customers": customers},
            encoder=CustomerEncoder,
        )
    else:
        try:
            content = json.loads(request.body)
            customer = Customer.objects.create(**content)
            return JsonResponse(
                customer,
                encoder=CustomerEncoder,
                safe=False,
            )
        except:
            response = JsonResponse(
                {"message": "Could not create the customer"}
            )
            response.status_code = 400
            return response

@require_http_methods(["GET", "DELETE"])
def api_customer(request, pk):
        
    if request.method == "GET":
        customer=Customer.objects.get(id=pk)
        return JsonResponse(
            customer,
            encoder= CustomerEncoder,
            safe= False,
        )
    
    else:
        try:
            customer=Customer.objects.get(id=pk)
            customer.delete()
            return JsonResponse(
                customer,
                encoder= CustomerEncoder,
                safe= False,
            )
        except Customer.DoesNotExist:
                response= JsonResponse(
                    {"message": "Customer does not exist"},
                    status= 404,
                )
                return response