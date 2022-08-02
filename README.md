# CarCar

Team:

* Josh - Service
* Thao - Sales

## Design

## Service microservice

Models to be included: technician, service appointment, AutomobileVO.
In the service microservice, there will be two main models added with ways to create both but a page for listing only the service appointments. The first model, technician, is a standalone entity that takes in two values, a name for the technician and an employee number. This model will eventually be linked to service appointments (since service appointment will take a technician as a field) so in the encoder, I will add an id field and use that as the identifier of technician. The relationship is a one-to-many relationship in which a technician will have many service requests. The service appointment model will take in 5 fields, the VIN number, owner name, date/time of the appointment, the technician working on the request, and reason for appointment. As mentioned earlier, the technician field will be linked to the technician model. The integration with inventory comes into play for the VIN. If the VIN matches an automobile from the inventory, I will highlight the table entry for the Vin. In order to do this, I will need to pull the data about the inventory from the inventory api using a poller and populate an automobile Value Object, which will only hold VIN numbers. Then, when creating the table entries for the list of appointments, I will add a conditional if statement for VIN, checking to see if the VIN is in the Automobile Value Object (from our inventory), to highlight the table entry.

## Sales microservice

Explain your models and integration with the inventory
microservice, here.
