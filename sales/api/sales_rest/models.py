from django.db import models
from django.urls import reverse


class AutomobileVO(models.Model):
    vin = models.CharField(max_length=17)
    import_href = models.CharField(max_length=300, default="")

class SalesStaff(models.Model):
    name = models.CharField(max_length=100)
    employee_number = models.PositiveSmallIntegerField()

    def get_api_url(self):
        return reverse("api_sales_staff", kwargs={"pk": self.pk})

class Customer(models.Model):
    name = models.CharField(max_length=100)
    address = models.CharField(max_length=200)
    phone = models.CharField(max_length=50)

    def get_api_url(self):
        return reverse("api_customer", kwargs={"pk": self.pk})

class Sale(models.Model):
    price = models.PositiveSmallIntegerField()
    sales_staff = models.ForeignKey(
        SalesStaff,
        related_name = "sales_staffs",
        on_delete = models.PROTECT
    )
    customer = models.ForeignKey (
        Customer,
        related_name = "customers",
        on_delete = models.PROTECT
    )
    auto = models.ForeignKey(
        AutomobileVO,
        related_name = "autos",
        on_delete = models.PROTECT
    )

    def get_api_url(self):
        return reverse("api_sale", kwargs={"pk": self.pk})
