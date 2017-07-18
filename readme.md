## Node Authentication API using JWT

### Modules
1. passport
2. passport-jwt
3. jsonwebtoken
4. bcryptjs

### Endpoints
To register a new user

`POST /users/new`

To login/receive a token

`POST /users/authenticate`

Use token in Authorization header to access profile information

`GET /users/profile`

#### Documentation
1. JWT Tokens: https://jwt.io/introduction/