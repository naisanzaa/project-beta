from common.json import ModelEncoder

from .models import AutomobileVO, SalesStaff, Customer, Sale


class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = [
        "import_href",
        "vin",
    ]




class SalesStaffEncoder(ModelEncoder):
    model = SalesStaff
    properties= [
        "name",
        "employee_number",
        "id",
    ]

class CustomerEncoder(ModelEncoder):
    model = Customer
    properties= [
        "name",
        "address",
        "phone",
        "id",
    ]

class SaleEncoder(ModelEncoder): 
    model = Sale
    properties= [
        "auto",
        "sales_staff",
        "customer",
        "price",
    ]
    encoders ={
        "auto": AutomobileVOEncoder(), 
        "sales_staff": SalesStaffEncoder(), 
        "customer": CustomerEncoder()
    }
    