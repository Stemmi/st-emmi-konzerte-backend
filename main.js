require("dotenv").config();
const express = require("express");

const showRouter = require("./routes/showRouter");
const locationRouter = require("./routes/locationRouter");
const bandRouter = require("./routes/bandRouter");
const userRouter = require("./routes/userRouter");

const app = express();

app.use("/show", showRouter);
app.use("/location", locationRouter);
app.use("/band", bandRouter);
app.use("/user", userRouter);

const port = 3000;

app.listen(port, function() {
    console.log(`listening on port ${port}`);
});