import express from "express";
import bodyParser from "body-parser";
import appconfig from "./appconfig.js"
import user from "./user.js"
const app = express();
app.use(express.urlencoded());
console.log(appconfig)

const users = []

users.push(user("default", "1.2.3.4"));

app.listen(
  appconfig.port,
  () => console.log(`listening at http://localhost:${appconfig.port}`));

app.get("/", (req, res) => {
  res.send("hello");
});

app.post("/register", (req, res) => {
  console.log(req.body);
  let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  let newUser = user(req.body.username, ip)
  users.push(newUser)
  res.send(users);
});

app.get("/list", (req, res) => {
  res.send(users);
});
