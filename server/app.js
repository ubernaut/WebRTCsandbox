import express from "express";
import appconfig from "./appconfig.js"
const app = express();

console.log(appconfig)

const users = []

app.listen(appconfig.port, () => console.log(`listening at http://localhost:${appconfig.port}`));

app.get("/", (req, res) => {
  res.send("hello");
});
