require("dotenv").config();
const express = require("express");
// import routers here

const app = express();

// app.use routers here

// move get to controller
app.get("/", function (req, res) {
    try {
        res.send("Hello");
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
});

const port = 3000;

app.listen(port, function() {
    console.log(`listening on port ${port}`);
});