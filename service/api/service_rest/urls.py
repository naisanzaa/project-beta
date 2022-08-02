from django.urls import path
from .views import api_technician, api_delete_technician, api_service_appointment, api_delete_service_appointment

urlpatterns = [
    path('technicians/', api_technician, name='api_technician'),
    path('technicians/<int:pk>/', api_delete_technician, name='api_delete_technician'),
    path('service-appointments/', api_service_appointment, name='api_service_appointment'),
    path('service-appointments/<int:pk>/', api_delete_service_appointment, name='api_delete_service_appointment'),
]