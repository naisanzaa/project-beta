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
    """
    Collection RESTful API handler for sales objects
    GET:
    Returns a dictionary with a single key "sales"
    {
        "sales": [
		{
			"href": URL to the sale,
			"auto": {
				"import_href": URL of the automobile,
				"vin": database vin for the automobile,
			},
			"sales_staff": {
				"href": URL to the sales_staff,
				"name": name of the sales_staff,
				"employee_number": employee number for sales_staff,
				"id": database id for the sales_staff,
			},
			"customer": {
				"href": URL for the customer,
				"name": name of the customer,
				"address": address of the customer,
				"phone": phone of the customer,
				"id": database id for customer
			},
			"price": cost of the automobile,
            ...
        ]
    }
    POST:
    Create a sale resourrce and return its details:
    {
        "auto": vin number of the automobile,
        "sales_staff": database id for the sales_staff,
        "customer": database id for customer,
        "price": cost of the automobile
        }

    """
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
    """
    Single-object API for the Sale resource

    GET:
    Return the information for a Sale resource based on the value of pk

    DELETE:
    Removes the sale resource from the application
    """
        
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
    """
    Collection RESTful API handler for sales staffs objects
    GET:
    Returns a dictionary with a single key "sales_staffs"
    {
        "sales_staffs": [
		{

            "href": URL to the sales_staff,
            "name": name of the sales_staff,
            "employee_number": employee number for sales_staff,
            "id": database id for the sales_staff,
        },
        
        ...
        ]
    }
    POST:
    Create a sale staff resourrce and return its details:
    {
        "name": name of the sales_staff,
        "employee_number": employee number for sales_staff,
    }

    """
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
    """
    Single-object API for the SalesStaff resource

    GET:
    Return the information for a SalesStaff resource based on the value of pk

    DELETE:
    Removes the SalesStaff resource from the application
    """    
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
    """
    Collection RESTful API handler for customers objects
    GET:
    Returns a dictionary with a single key "customers"
    {
        "customers": [
		{
            "href": URL for the customer,
            "name": name of the customer,
            "address": address of the customer,
            "phone": phone of the customer,
            "id": database id for customer
		},
        ...
        ]
    }
    POST:
    Create a customer resourrce and return its details:
    {
        "name": name of the customer,
        "address":  address of the customer,
        "phone": phone of the customer,
    }

    """
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
    """
    Single-object API for the Customer resource

    GET:
    Return the information for a Customer resource based on the value of pk

    DELETE:
    Removes the Customer resource from the application
    """     
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