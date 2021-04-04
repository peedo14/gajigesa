<h1 align='center'>GAJIGESA TEST</h1>

Based on the requirement, im choosing the stack below to create the web server

- [NestJS](https://nestjs.com/)
- MySQL
- [Prisma](https://docs.nestjs.com/recipes/prisma#prisma)
- [Socket.io](https://docs.nestjs.com/websockets/gateways#installation)
- [Swagger](https://docs.nestjs.com/openapi/introduction)

<br>

# Setup
create a new database in your local<br>
create `.env` from `.env.example` and change the values<br><br>
run `npm run init:dev`, the command below should executed
```
npm install
npm run prisma:reset
npm run prisma:deploy
npm run prisma:seed
```
This will create `Notes`, `Tags` and `migration_log` table in your local database

<br>

# Running your app
```
npm run start:dev
```

API Documentation can be accessed at `localhost:3000/api/docs`

<br>

# Socket Client
using socket version 2 to match compatible version of socket in [NestJS](https://docs.nestjs.com/websockets/gateways#installation)
```
npm run socket:client
```

To test the socket, open another terminal and run the command above. this will run the `client.ts`<br>

Hit create notes API from swagger or postman, you will see the emitted notes from NestJS to client in the terminal.