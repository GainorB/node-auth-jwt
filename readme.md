## Node Authentication API using Passport and JWT's

### TECHNOLOGIES/NPM MODULES
1. passport
2. passport-jwt
3. jsonwebtoken
4. bcryptjs
5. PostgreSQL
6. pg-promise
7. bluebird

### ENDPOINTS

To register a new user:

`POST /users/new`

To login (receive a token in the response):

`POST /users/authenticate`

In request, send "Authorization" Header with the token to:

`GET /users/profile`

### PROTECTING ENDPOINTS

Use this in your route to authenticate any request:
```javascript
router.get('/[endpoint]', passport.authenticate('jwt', { session: false }), ((req, res, next) => {
    // IF YOU GET HERE, IT MEANS THE TOKEN IS AUTHENTICATED
    // DO SOMETHING
});
```

#### DOCUMENTATION
1. Json Web Token: https://github.com/auth0/node-jsonwebtoken
2. Passport-JWT: https://github.com/themikenicholson/passport-jwt
3. Passport: https://github.com/jaredhanson/passport 

### DOWNLOAD PROJECT & INSTALL
1. Git clone this project
2. Open up Terminal or Command line
3. Navigate to the directory where the project was cloned to
4. Run this command: psql -f ../config/db/schema.sql
5. This command will create a PostgreSQL database along with the tables
6. Setup environment variables:
    * Create .env file in your project root with these two variables
```
DATABASE_URL=postgres://localhost:5432/userauth_app
SECRET_KEY=28djisjacknc8913!@##^$%dasdfs!@
```
7. To run the application, you need to install the dependencies, run this command: npm install --save
8. To start the application, run this command: npm start
9. The application will run at: localhost:3000, if that port is already in use, run this command: PORT=1738 npm start
10. This command will start the server at: localhost:1738