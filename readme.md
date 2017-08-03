## Node Authentication API using Passport and JWT's

### NPM MODULES
1. passport
2. passport-jwt
3. jsonwebtoken
4. bcryptjs

### ENDPOINTS

To register a new user:

`POST /users/new`

To login (receive a token in the response):

`POST /users/authenticate`

In request, send "Authorization" Header with the token to:

`GET /users/profile`

### PROTECTING ENDPOINTS

Use this middleware, in your route to authenticate any request
```javascript
passport.authenticate('jwt', { session: false })
```

#### DOCUMENTATION
1. Json Web Token: https://github.com/auth0/node-jsonwebtoken
2. Passport-JWT: https://github.com/themikenicholson/passport-jwt
3. Passport: https://github.com/jaredhanson/passport 

### DOWNLOAD PROJECT & INSTALL
1. Git clone or download this project
2. Open up Terminal or Command line
3. Navigate to the directory where the project was cloned or downloaded to
4. To run the application, you need to install the dependencies, run this command: npm install --save
5. To start the application, run this command: npm start
6. The application will run at: localhost:3000, if that port is already in use, run this command: PORT=1738 npm start
7. This command will start the server at: localhost:1738