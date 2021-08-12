Create an API endpoint that accepts the following User information and abides by the following Acceptance Criteria:
Request parameters:

```json
{
 first_name: String,
 last_name: String,
 phone_number: String,
 product_id: Integer,
}
```

Acceptance Criteria:
A client can send the above request and expect the following behavior

* A successful (200 OK) response if:
   * the request data is valid and sanitized
   * a product exists in the database (product_id)
   * a user is successfully found or created, and an order object is created
* A bad request (400) response with appropriate error message if:
   * the request data is invalid or not clean
   * a product with the given product_id is not found
   * a user fails to be found or created
   Data Models to Consider:
* User
* Product
* Order
* ApiRequest (bonus points for logging requests and errors)

Guidelines
- Host all your code in a publicly available github repository
- Use NodeJS with any framework of your choice (ie: Express.JS, NestJS, ect)
- Keep track of total hours worked on the project and include it in a readme.md file
- include instructions on how to start the application in a readme.md file
- Log any challenges, issues, or bugs in the readme.md
- Once finished, reply to this email with the link to the repository.

If you have any questions or need clarification, please don't hesitate to reach out to us! 

Good Luck!