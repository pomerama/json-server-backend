/* 18.11.2023
Using json-server and json-server-auth
https://github.com/typicode/json-server
https://github.com/jeremyben/json-server-auth#readme
*/

require("dotenv").config();
const jsonServer = require("json-server");
// const auth = require('json-server-auth')
const morgan = require("morgan");

const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();
const PORT = process.env.PORT;

server.db = router.db

/* 18.11.2023
Rules are based on uni filesystem permissions.
- First digit are the permissions for the resource owner.
- Second digit are the permissions for the logged-in users.
- Third digit are the permissions for the public users.

Examples: 
- 664: User must be logged to write the resource. Everyone can read the resource.
- 660: User must be logged to write or read the resource.
- 644: User must own the resource to write the resource. Everyone can read the resource.
- 640: User must own the resource to write the resource. User must be logged to read the resource.

How to use: 
- Have a "users" Array in db.json. e.g. { "email": "some@example.com", "password": "bestPassw0rd" }
- For the API endpoints you want to protect, they need a reference to userId, e.g.:
   "posts": [
    {
      "id": 1,
      "title": "some interesting title",      
      "userId": 1
    }
  ]
- Set the desired rules for the users and other API endpoints like following
*/

// const rules = auth.rewriter({
//   users: 600,
//   posts: 664,
// })
// server.use(rules)


server.use(middlewares);
// server.use(auth);
server.use(morgan("dev"));
server.use((req, res, next) => {
  // Middleware to disable CORS
  res.header("Access-Control-Allow-Origin", "*");
  next();
});
server.use(router);

server.listen(PORT, () => {
  console.log(`JSON Server with auth is running at port ${PORT}`);
});
