# CarCar

Team:

- Josh - Service
- Thao - Sales

# Table of Contents

- [Service Microservice](#Service-Microservice)
   * [Technician Model](#Technician-Model)
   * [Service Appointment Model](#Service-Appointment-Model)
- [Sales Microservice](#Sales-Microservice)
   - [Frontend](#Frontend)
      - [Class Components](#Class-Components)
      - [Functional Components](#Functional-Components)
- [App and Nav](#App-and-Nav)

# Design

## Service Microservice

Models to be included:

- technician
- service appointment
- AutomobileVO

In the service microservice, there will be two main models added with ways to create both but a page for listing only the service appointments. 

* [Technician Model](#Technician-Model)
* [Service Appointment Model](#Service-Appointment-Model)

### Technician Model

The first model, technician, is a standalone entity that takes in two values:

- a `name` for the technician
- an `employee number`

This model will eventually be linked to `service appointments` (since service appointment will take a technician as a field) so in the encoder, I will add an `id` field and use that as the identifier of technician. 

This will also be important later on in the appointment creation form since the foreign key asks for the `id` of a technician instead of a technician object but when I load the technicians into the state of the service form, it will load the entire object. Because the `id` is in the encoder, I can easily reset the value of my form submission field for technician to the `technician id`. The relationship is a **one-to-many** relationship in which a technician will have many service requests. 

### Service Appointment Model

The service appointment model will take in 6 fields: 
- the `VIN` number
- `owner name`
- date/time of the `appointment`
- the `technician` working on the request
- `reason` for appointment
- a `finished` boolean. 

As mentioned earlier, the `technician` field will be linked to the **technician model**. The integration with inventory comes into play for the `VIN`. 

If the VIN matches an automobile from the inventory, I will highlight the table entry for the VIN. In order to do this, I will need to pull the data about the inventory from the inventory api using a poller and populate an automobile `Value Object`, which will only hold `VIN` numbers. 

Then, when creating the table entries for the list of appointments, I will add a conditional if statement for VIN, checking to see if the VIN is in the `Automobile Value Object` (from our inventory), to highlight the table entry. 

For the `service history`, I will filter all service `appointments` by the finished boolean so that I only show appointments that have been finished. In the service history page, the search bar function will also be in the format of a form with a submit function that filters the state containing service appointment data. 

The problem domain in this case is automobile services that don't pertain to sales of a car and I would define the bounded context as everything that has to do with servicing a vehicle including creating the appointment itself and also finding/creating a technician capable of servicing a vehicle. 

It also includes being able to view `appointments` and specific appointments pertaining to a `VIN`. If it were up to me, I'd probably look for a different way to compare VINs in our inventory vs the service appointments, but I'll stick to the course instructions. 

I would probably go about this by loading the automobiles from our inventory api into the state of the service list and history pages, then convert the objects into a single array containing only the VIN values and use an includes function to check if the VIN in a service appointment is in the array.

## Sales Microservice

We used **Django** to build out the backend model, views, urls for the Sales microservice.

- `Settings`: Ensure the Django app and project are linked as well as the CORS
- `Model`: AutomobileVO, SalesStaff, Customer and Sale. Note: Sale model has ForeignKey relationships with AutomobileVO, SalesStaff and Customer
- `Views`: Utilizing function views to write `GET`, `POST`, `DELETE` for each model. 

   _Note: Since the api_sales function take in `sales_staff`, `customer` and `auto data`, I made sure the content of each data entry is getting the correct value by comparing VIN for auto, id for sales_staff and customer._

- `URLs`: incorporating different urlpatterns for both urls project and app files
- `Polling`: Ensure the correct polling of data from Automobile in the Inventory API into AutomobileVO in Sales API by polling in the href and VIN

### Frontend 

The frontend is set up in **React** as follows:

| Method | Path                  | Description                                   |
| ------ | --------------------- | --------------------------------------------- |
| GET    | /api/sales/           | Get a list of sales                           |
| POST   | /api/sales/new        | Create a new sales                            |
| GET    | /api/sales/history/   | Filter out the sales history of a sales staff |
| POST   | /api/salestaffs/new/  | Register a new sales staff                    |
| POST   | /api/customers/new/   | Register a new customer                       |
| GET    | /api/automobiles/     | Get a list of automobiles                     |
| POST   | /api/automobiles/new/ | Register a new automobile                     |

#### Components

- [Class Components](#Class-Components)
- [Functional Components](#Functional-Components)

##### Class Components

Class components are utilized to create SalesStaffForm, CustomerForm, SalesRecordForm, AutomobileForm

   - Both SalesStaffForm and CustomerForm are straight forward form. handleChange has been set up to dry up the code and avoid multiple handleFieldChange. To create a good user experience, the fields'data is deleted after submit

   - AutomobileForm has a select component so I need to utilize componentDidMount to fetch the list of models for user to select. Once value has been selected, data.models will need to be deleted in the handleSubmit to ensure the content will match with the generated dictionary

   - SalesRecordForm has 3 selected components so not only I have to use the componentDidMount to fetch the list of each datapoint, but also the forEach to generate the data into the correlated field. The data then being map into JSX.

##### Functional Components

Functional Components are utilized to create SalesList, SalesHistory, AutomobileList

   - Utilizing useEffect and useState hooks to generate SalesList and AutomobileList. The data is then mapped out into the appropriate value-field in JSX with href as the key

   - Since we want to filter the sales history based on the salesstaff, we fetch the data from both api/sales/ and api/salesstaffs/. The list of sales staffs is generated into the select tag in the JSX. Once the user choose the sales staff, the data is being saved in selectedStaff. Both data will be mapped out through the if function in the JSX to display the sales history from the selectedStaff.
     - Note: since the selectedStaff will be a string, I use the Number constructor to change that into an integer in order to compare it with the sale.sales_staff.id

### App and Nav

All forms and list then getting import to `App.js` and render on the Nav bar.
