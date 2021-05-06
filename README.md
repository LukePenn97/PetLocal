# PetLocal

### Lighthouse Labs Midterm Buy/Sell Site

- Web app for buying / selling pets
- Lets users quickly find pets and contact sellers
- Post, edit, and delete listings as an admin
- Browse featured or all listings
- Save your favourite listings for later

## Getting Started

1. Create the `.env` by using `.env.example` as a reference: `cp .env.example .env`
2. Update the .env file with your correct local information 
  - username: `labber` 
  - password: `labber` 
  - database: `midterm`
3. Install dependencies: `npm i`
4. Fix to binaries for sass: `npm rebuild node-sass`
5. Reset database: `npm run db:reset`
  - Check the db folder to see what gets created and seeded in the SDB
7. Run the server: `npm run local`
  - Note: nodemon is used, so you should not have to restart your server
8. Visit `http://localhost:8080/`

## Dependencies

- Node 10.x or above
- NPM 5.x or above
- PG 6.x
- "bcrypt": "^5.0.1",
- "body-parser": "^1.19.0",
- "chalk": "^2.4.2",
- "cookie-session": "^1.4.0",
- "dotenv": "^2.0.0",
- "ejs": "^2.6.2",
- "express": "^4.17.1",
- "morgan": "^1.9.1",
- "node-sass": "^4.12.0",
- "node-sass-middleware": "^0.11.0",
- "pg-native": "^3.0.0"

## Tech Stack

- backend: Node && Express
- frontend: html && css && javascript && bootstrap && jquery && ajax && scss

