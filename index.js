const express = require("express");
require("./db/mongoose")
const app = express();
const userRouter = require("./router/user")
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(userRouter)


app.listen(port, () => {
  console.log("Server is running on " + port);
});
