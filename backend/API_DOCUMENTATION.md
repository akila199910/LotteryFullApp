# 📘 Lottery App API Documentation

This file documents all available REST API endpoints of the Lottery App Backend.

Base URL: http://localhost:8080

1. Get All Tickets

GET /api/tickets

Returns all pre-loaded lottery tickets.
 
✔ Response (200 OK)

{
  "status": 200,
  "message": "Tickets fetched successfully",
  "data": [
    { "id": 1, "sequence": "4627U" },
    { "id": 2, "sequence": "9301X" }
  ]
}

❌ Response (404 Not Found)

{
  "status": 404,
  "message": "No tickets found",
  "data": []
}


2. Play Lottery

POST /api/play

Allows a guest to play the lottery using name, contact number, and ticket ID.

✔ Request Body

{
  "name": "Akila",
  "contactNumber": "0771234567",
  "ticketId": 1
}

Request Validation Rules

Field	        Rules
name	        Required, non-empty
contactNumber	Must start with 07, exactly 10 digits
ticketId	Must be valid integer & exist in DB


✔ Response (201 Created)

{
  "status": 201,
  "message": "Ticket played successfully",
  "data": {
    "lotteryId": 12,
    "selectedSequence": "4627U",
    "drawnSequence": "2473U",
    "winningPercentage": 40,
    "amountWon": 40000.0
  }
}

Error Responses

Validation Error (400)
{
  "status": 400,
  "message": "Contact number must start with 07 and be exactly 10 digits."
}

Ticket Not Found (404)
{
  "status": 404,
  "message": "Ticket not found"
}

Server Error (500)
{
  "status": 500,
  "message": "Internal server error"
}

🧪 Testing Tools

You can test using:

Postman