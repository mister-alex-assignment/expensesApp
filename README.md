## Task
Implement web app to track expenses (transaction date, amount, recipient, currency, type (food/drinks/other)).

## Base Tech
- node.js with express framework
- Frontend framework (react.js)
- UI Framework (Boostratp)
- Relational DB (MySQL)

## Deployment instructions
**Pre-requisites**
- Docker
- git

**Instructions**
- create a new folder `expenses`
- open 'expenses' in a terminal
- clone git repository there `git clone https://github.com/mister-alex-assignment/expensesApp.git`
- `cd expensesApp`
- `docker-compose up`
- wait until build is finalized and the db and app started

## Application
- available via http://localhost:3001

## Shutdown and cleanup
The command `docker-compose down` removes the containers and default network, but preserves your Expenses database.

The command `docker-compose down --volumes` removes the containers, default network, and the Expenses database.

## Implementation details
- the database is saved into /expenses-api/database/db folder. Inorder to deploy this solution into production environment the default location must be changed, as well as the database password.
- REST api is built on top of express-generator boilerplate
- WEB spa is built on top of Create React App (Facebook)