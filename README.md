## Fastify API with Prisma
### Rental Cars

This project implements a Fastify API using Prisma for managing car rentals. The application was developed to meet the needs of a Brazilian car rental corporation, facilitating operations with features like car registration, listing, and rental price calculation based on loyalty programs and weekday/weekend pricing.

-------------------------------------------------------------

Features

    Car Management:
        Register cars with manufacturer, model, year, and category.
        List all registered cars or filter them by category.
        Remove registered cars.
    Rental Price Calculation:
        Calculate the cheapest car rental based on date range and loyalty status.
        Includes dynamic pricing for weekdays and weekends.
    Integration with FIPE API:
        Fetch valid car manufacturers and models dynamically.
    Database:
        Local SQLite database via Prisma, configurable for other database types.
    Scalable Architecture:
        Designed with Fastify for high performance and extensibility.


-------------------------------------------------------------

Technologies Used

    Backend:
        Fastify
        Node.js
    Database:
        SQLite (via Prisma)
    External APIs:
        FIPE API for car manufacturer and model data


-------------------------------------------------------------
### Run Locally

#### Requirements

Before starting, ensure you have the following tools installed:

    Node.js (22.11.0)
    npm



Clone the project

```bash
  git clone https://github.com/flea777/desafioPedroBim.git
```

Go to the project directory

```bash
  cd desafioPedroBim
```
Create a .env file in the project root with the following content

```bash
  DATABASE_URL="file:./dev.db"
```

Install dependencies

```bash
  npm install
```

----------------------

#### Routes

Base url: http://localhost:3000

#### GET /helloworld

Description: Returns a basic "Hello, World!" message for testing purposes.
Response:

```bash
{
  "hello": "world"
}
```

#### GET /

Description: Fetches all cars from the database.
Response:

```bash
[
  {
    "id": "1",
    "manufacturer": "Toyota",
    "model": "Corolla",
    "modelYear": 2021,
    "category": "Sedan",
    "weekdayPrice": 100,
    "weekendPrice": 120,
    "weekdayPriceLoyalty": 90,
    "weekendPriceLoyalty": 110,
    "rentals": 3
  }
]
```

#### GET /:category

Description: Fetches cars filtered by a specific category.
Parameters:

category (string) - The category of cars to filter (e.g., "Sedan", "Van").



#### POST /cheapest

Description: Finds the cheapest car available within a specific rental period.
```bash
{
  "startDate": "2024-11-01",
  "endDate": "2024-11-10",
  "isLoyaltyMember": true
}
```

#### POST / 

Description: Creates a new car in the system.

```bash
{
  "manufacturer": "Toyota",
  "model": "Corolla",
  "modelYear": 2021,
  "category": "Sedan",
  "weekdayPrice": 100,
  "weekendPrice": 120,
  "weekdayPriceLoyalty": 90,
  "weekendPriceLoyalty": 110,
  "rentals": 0
}
```

#### DELETE /:id

Description: Deletes a car by its ID.

Parameters:

id (string) - The unique identifier of the car to delete.