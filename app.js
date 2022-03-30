const express= require("express");
const app= express();
const bodyparser= require("body-parser");
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));
require("dotenv").config();

app.get("/", (req, res) => {
  res.send({message: "Welcome to Fidigames"});
});

require("./routes")(app);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Listening port ${PORT}`)
})
