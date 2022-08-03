# CarCar

Team:

* Josh - Service
* Thao - Sales

## Design

## Service microservice

Models to be included: technician, service appointment, AutomobileVO.
In the service microservice, there will be two main models added with ways to create both but a page for listing only the service appointments. The first model, technician, is a standalone entity that takes in two values, a name for the technician and an employee number. This model will eventually be linked to service appointments (since service appointment will take a technician as a field) so in the encoder, I will add an id field and use that as the identifier of technician. This will also be important later on in the appointment creation form since the foreign key asks for the id of a technician instead of a technician object but when I load the technicians into the state of the service form, it will load the entire object. Because the id is in the encoder, I can easily reset the value of my form submission field for technician to the technician id. The relationship is a one-to-many relationship in which a technician will have many service requests. The service appointment model will take in 6 fields, the VIN number, owner name, date/time of the appointment, the technician working on the request, reason for appointment and a finished boolean. As mentioned earlier, the technician field will be linked to the technician model. The integration with inventory comes into play for the VIN. If the VIN matches an automobile from the inventory, I will highlight the table entry for the Vin. In order to do this, I will need to pull the data about the inventory from the inventory api using a poller and populate an automobile Value Object, which will only hold VIN numbers. Then, when creating the table entries for the list of appointments, I will add a conditional if statement for VIN, checking to see if the VIN is in the Automobile Value Object (from our inventory), to highlight the table entry. For the service history, I will filter all service appointments by the finished boolean so that I only show appointments that have been finished. In the service history page, the search bar function will also be in the format of a form with a submit function that filters the state containing service appointment data. The problem domain in this case is automobile services that don't pertain to sales of a car and I would define the bounded context as everything that has to do with servicing a vehicle including creating the appointment itself and also finding/creating a technician capable of servicing a vehicle. It also includes being able to view appointments and specific appointments pertaining to a VIN. If it were up to me, I'd probably look for a different way to compare VINs in our inventory vs the service appointments but I'll stick to the course instructions. I would probably go about this by loading the automobiles from our inventory api into the state of the service list and history pages, then convert the objects into a single array containing only the vin values and use an includes function to check if the VIN in a service appointment is in the array.

## Sales microservice

Explain your models and integration with the inventory
microservice, here.
