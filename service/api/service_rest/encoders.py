from common.json import ModelEncoder
from .models import Technician, AutomobileVO, ServiceAppointment

class AutomovileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = ['VIN']

class TechnicianListEncoder(ModelEncoder):
    model = Technician
    properties = [
        'name',
        'employee_number',
        'id',
    ]

class TechnicianDetailEncoder(ModelEncoder):
    model = Technician
    properties = [
        'name',
        'employee_number',
        'id',
    ]

class ServiceAppointmentListEncoder(ModelEncoder):
    model = ServiceAppointment
    properties = [
        'VIN',
        'owner',
        'date_time',
        'technician',
        'reason',
        'id',
        'finished',
    ]
    encoders = {
        'technician': TechnicianDetailEncoder(),
    }

class ServiceAppointmentDetailEncoder(ModelEncoder):
    model = ServiceAppointment
    properties = [
        'VIN',
        'owner',
        'date_time',
        'technician',
        'reason',
        'id',
        'finished',
    ]
    encoders = {
        'technician': TechnicianDetailEncoder(),
    }