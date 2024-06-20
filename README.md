## Technologies Used
Application is written in [Typescript](https://www.typescriptlang.org/) with [Node.js](https://nodejs.org/en) as runtime using [Express.js](https://expressjs.com/) framework and containerized using [Docker](https://www.docker.com/)

## How to run locally

1. Clone the repository: `git clone https://github.com/naveenaraipole97/receipt-processor.git`


1. Navigate to the Project Directory `cd receipt-processor`

### With Docker
1. Ensure [Docker](https://docs.docker.com/engine/install/) is installed and running
1. Project uses [make utility](https://www.gnu.org/software/make/) to manage build and run rules, ensure make is installed i.e run `make --version` 

1. Build the Docker Image. Run `make build`


1.  Run the Docker Image. Run `make run`

### Without Docker
1. To run app without docker ensure[ Node v20+](https://nodejs.org/en) is installed
1. Run the app `npm install && npm start`

## Test the Application

The application should now be running on http://localhost:3000. Test the application using the following endpoints:

### Process Receipts

* Path: `/receipts/process`
* Method: `POST`
* Payload: Receipt JSON
* Response: JSON containing an id for the receipt.
* example
    ```sh
    curl --location 'http://localhost:3000/receipts/process' \
    --header 'Content-Type: application/json' \
    --data '{
    "retailer": "M&M Corner Market",
    "purchaseDate": "2022-03-20",
    "purchaseTime": "14:33",
    "items": [
        {
        "shortDescription": "Gatorade",
        "price": "2.25"
        },{
        "shortDescription": "Gatorade",
        "price": "2.25"
        },{
        "shortDescription": "Gatorade",
        "price": "2.25"
        },{
        "shortDescription": "Gatorade",
        "price": "2.25"
        }
    ],
    "total": "9.00"
    }'
    ```

### Get Points

* Path: `/receipts/{id}/points`
* Method: `GET`
* Response: A JSON object containing the number of points awarded.
* example:
    ```sh
    curl --location 'http://localhost:3000/receipts/9f624f5c-f449-42cb-9e-ee5eaff02edf/points'
    ```

Use tools like [Postman](https://www.postman.com/) or [curl](https://curl.se/) to interact with these endpoints on localhost:3000.