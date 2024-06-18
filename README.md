## Clone the Repository

### Clone the repository using the following command:

git clone https://github.com/naveenaraipole97/receipt-processor.git


## Navigate to the Project Directory

### Change to the directory where the repository was cloned:

cd receipt-processor

## Build the Docker Image

### Build the Docker image using the make command:
make build


## Run the Docker Container

### Run the Docker container with the following command:
make run

## Test the Application

The application should now be running on localhost:3000. You can test the application using the following endpoints:

### Process Receipts

Path: /receipts/process
Method: POST
Payload: Receipt JSON
Response: JSON containing an id for the receipt.

### Get Points

Path: /receipts/{id}/points
Method: GET
Response: A JSON object containing the number of points awarded.

You can use tools like Postman or a web browser to interact with these endpoints on localhost:3000.