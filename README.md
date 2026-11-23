# Express API

![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg) ![Build](https://github.com/Zeyu-Li/express-api/workflows/Express%20Test/badge.svg)

An express API linked to an NoSQL (mongodb) database

## Running

Requires Node.js 20.19 or newer (CI uses Node 24) and [yarn](https://classic.yarnpkg.com/).

1. First install dependencies with `yarn install`

2. To run the app do `yarn start` (or `yarn dev` to restart on file changes)

The app connects to `mongodb://localhost/api` and listens on port 3000 by default; override them with the
`MONGODB_URI` and `PORT` environment variables.

To run the tests do `yarn test` (they start a throwaway in-memory MongoDB, so no local database is needed)



## Frameworks

* [express](https://www.npmjs.com/package/express)
* [mongoose (mongodb)](https://www.npmjs.com/package/mongoose)
* Testing: vscode REST client extension

CI endpoint testing:

* Node.js test runner (`node:test`)
* Supertest
* mongodb-memory-server

## Hours

Building: 4 Hours

Endpoint Testing: 3 hours



## Issues + notes

Since I've been mostly working with mobile-firebase and with frontend, I had to refresh my memory on backend things + this is my first time making a REST API connected to a database. My experience with fullstack was mostly with firebase and django (which loosely follows a MVC model with most of the unlying (low-level) SQL queries abstracted away). 

* First time making an API connected to a database
* First time using mongodb in JavaScript/TypeScript
* First time sanitizing in express -> decided to use express-mongo-sanitize
* First time doing REST endpoint testing

Bugs (both fixed in the dependency/security update):

Set headers after they are sent to the client warning

Endpoint tests not all passing
