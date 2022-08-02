from json import encoder
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json

from common.json import ModelEncoder
from .encoders import (AutomovileVOEncoder, TechnicianListEncoder, TechnicianDetailEncoder,
 ServiceAppointmentListEncoder, ServiceAppointmentDetailEncoder)
from .models import Technician, AutomobileVO, ServiceAppointment

# Need a list, create, and delete view for techs, and appts
# Should be fine to use same encoder for all views since when listing, I want all
#   all properties shown on front-end

@require_http_methods(['GET', 'POST'])
def api_technician(request):
    """
    RESTful API for Technician Object.

    Get request returns a dict with key technicians that contains a
    list of technicians and their properties.

    Post request creates a technician resource and returns its details

    Technician object looks like (tech_obj)
    {
        'name': name of technician,
        'employee_number': employee's number
    }

    List looks like
    {
        'technicians': [
            tech_obj1,
            tech_obj2,
            ...
        ]
    }
    with each tech_obj being in the format of the object described earlier
    """

    if request.method == 'GET':
        technicians = Technician.objects.all()
        return JsonResponse(
            {"technicians": technicians},
            encoder=TechnicianListEncoder
        )
    else:
        content = json.loads(request.body)
        technician = Technician.objects.create(**content)
        return JsonResponse(
            technician,
            encoder=TechnicianDetailEncoder,
            safe=False,
        )


@require_http_methods('DELETE')
def api_delete_technician(request, pk):
    """
    Single object API for the purpose of 
    deleting a technician with its id
    """
    try:
        technician = Technician.objects.get(id=pk)
        technician.delete()
        return JsonResponse(
            technician,
            encoder=TechnicianDetailEncoder,
            safe=False,
        )
    except technician.DoesNotExist:
        return JsonResponse(
                {"message": "Technician does not exist"},
                status=404,
            )

@require_http_methods(['GET', 'POST'])
def api_service_appointment(request):
    """
    RESTful API for ServiceAppointment Object.

    Get request returns a dict with key service_appointments that contains a
    list of service appointments and their properties.

    Post request creates a ServiceAppointment resource and returns its details

    ServiceAppointment object looks like (serv_app)
    {
        'VIN': vehicle identification number,
        'owner': name of owner,
        'date_time': date and time of appointment,
        'technician': technician assigned to the appointment; this will be a technician object for the value,
        'reason': reason for the appointment
    }

    List looks like
    {
        'service_appointments': [
            serv_app1,
            serv_app2,
            ...
        ]
    }
    with each serv_app being in the format of the object described earlier
    """
    if request.method == 'GET':
        service_appointments = ServiceAppointment.objects.all()
        return JsonResponse(
            {'service_appointments': service_appointments},
            encoder=ServiceAppointmentListEncoder
        )
    else:
        content = json.loads(request.body)
        try:
            tech_id = content['technician']
            technician = Technician.objects.get(id=tech_id)
            content['technician'] = technician
        except Technician.DoesNotExist:
            return JsonResponse(
                {"message": "Technician not found"},
                status=404,
            )
        service_appointment = ServiceAppointment.objects.create(**content)
        return JsonResponse(
            service_appointment,
            encoder=ServiceAppointmentDetailEncoder,
            safe=False,
        )

@require_http_methods('DELETE')
def api_delete_service_appointment(request, pk):
    """
    Single object API for the purpose of 
    deleting a service appointment with its id
    """
    try:
        service_appointment = ServiceAppointment.objects.get(id=pk)
        service_appointment.delete()
        return JsonResponse(
            service_appointment,
            encoder=ServiceAppointmentDetailEncoder,
            safe=False,
        )
    except service_appointment.DoesNotExist:
        return JsonResponse(
                {"message": "Service appointment does not exist"},
                status=404,
            )