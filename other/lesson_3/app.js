import express from "express";
import { router } from "./router.js";

const app = express();

app.use(express.json());
app.use(router);

app.get("/contact/:id", (req, res) => {
  res.send(`<div>Hello ${req.params.id}!</div>
    <div>Do you see my query: ${JSON.stringify(req.query)}</div>
    `);
});

app.post("/contact", (req, res) => {
  res.send(`<div>Hello ${req.params.id}!</div>
    <div>Do you see body: ${JSON.stringify(req.body)}</div>
    `);
});

app.listen(3000, () => {
  console.log("Example app listening on port 3000!");
});
