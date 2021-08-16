# Express API

![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg) ![Build](https://github.com/Zeyu-Li/express-api/workflows/Express%20Test/badge.svg)

An express API linked to an NoSQL (mongodb) database

## Running

1. First install dependencies with `npm install`

2. To run the app do `npm start`

To run the tests do `npm test`



## Frameworks

* [express](https://www.npmjs.com/package/express)
* [mongoose (mongodb)](https://www.npmjs.com/package/mongoose)
* [express-mongo-sanitize](https://www.npmjs.com/package/express-mongo-sanitize)
* Testing: vscode REST client extension

CI endpoint testing:

* Jest
* Supertest

## Hours

Building: 4 Hours

Endpoint Testing: 3 hours



## Issues + notes

Since I've been mostly working with mobile-firebase and with frontend, I had to refresh my memory on backend things + this is my first time making a REST API connected to a database. My experience with fullstack was mostly with firebase and django (which loosely follows a MVC model with most of the unlying (low-level) SQL queries abstracted away). 

* First time making an API connected to a database
* First time using mongodb in JavaScript/TypeScript
* First time sanitizing in express -> decided to use express-mongo-sanitize
* First time doing REST endpoint testing

Bugs:

Set headers after they are sent to the client warning

Endpoint tests not all passing
