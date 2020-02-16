import express from "express";
import appconfig from "./appconfig.js"
import user from "./user.js"
const app = express();

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
  res.send("hello");
});

app.get("/list", (req, res) => {
  res.send(users);
});
