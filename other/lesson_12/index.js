import express from "express";
import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });

const clients = [];

wss.on("connection", (ws) => {
  let id = clients.length;
  clients[id] = ws;

  console.log(`Hoвe з\'єднання #${id}`);
  // надсилаємо клієнту повідомлення
  clients[id].send(`Привіт, вам надано номер №${id}`);
  // відправляємо всім іншим
  clients.forEach((item, index) => {
    if (index !== id) {
      item.send(`До нас приєднався номер - ${id}`);
    }
  });
});

const app = express();

app.get("", (_, res) =>
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
        <title>WebSocket</title>
      </head>
      <script>
        window.onload = () => {
          const ws = new WebSocket('ws://localhost:8080');
           ws.onmessage = e =>   document.body.innerHTML = '<h5>' + e.data + '</h5>';
        };
      </script>
      <body></body>
    </html>
`)
);

app.listen(3000, () => {
  console.log("Example app listening on port 3000!");
});
