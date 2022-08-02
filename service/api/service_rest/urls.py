from django.urls import path
from .views import api_automobileVO, api_technician, api_delete_technician, api_service_appointment, api_change_service_appointment, api_service_history

urlpatterns = [
    path('technicians/', api_technician, name='api_technician'),
    path('technicians/<int:pk>/', api_delete_technician, name='api_delete_technician'),
    path('service-appointments/', api_service_appointment, name='api_service_appointment'),
    path('service-history/', api_service_history, name='api_service_history'),
    path('service-appointments/<int:pk>/', api_change_service_appointment, name='api_change_service_appointment'),
    path('automobilevo/', api_automobileVO, name='api_get_auto'),
]