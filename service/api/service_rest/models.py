from django.db import models
from django.urls import reverse

# Create your models here.
class AutomobileVO(models.Model):
    VIN = models.CharField(max_length=30)

class Technician(models.Model):
    name = models.CharField(max_length=30)
    employee_number = models.PositiveBigIntegerField()
    
    def get_api_url(self):
        return reverse("api_technician", kwargs={"pk": self.pk})


class ServiceAppointment(models.Model):
    VIN = models.CharField(max_length=30)
    owner = models.CharField(max_length=30)
    date_time = models.DateTimeField()
    technician = models.ForeignKey(
        Technician,
        related_name='technician',
        on_delete=models.PROTECT
    )
    reason = models.TextField()
    finished = models.BooleanField(default=False)

    def get_api_url(self):
        return reverse("api_service_appointment", kwargs={"pk": self.pk})
