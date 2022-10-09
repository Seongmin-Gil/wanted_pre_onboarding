const app = require("./app");

app.set("port", process.env.PORT || 8000);

const server = app.listen(app.get("port"), () => {
  process.send("ready");
  console.log(`Server Listening on Port ${app.get("port")}`);
});

server.setTimeout(5000);
