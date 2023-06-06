require("dotenv").config();
const express = require("express");
const cors = require("cors");

const showRouter = require("./routes/showRouter");
const locationRouter = require("./routes/locationRouter");
const bandRouter = require("./routes/bandRouter");
const userRouter = require("./routes/userRouter");
const uploadRouter = require("./routes/uploadRouter");

const multer  = require('multer');
const posters = multer({ dest: 'public/images/posters/' });


const app = express();

app.use(cors());
app.use(express.json());

app.use('/static', express.static('public'));

app.use("/api/shows", showRouter);
app.use("/api/locations", locationRouter);
app.use("/api/bands", bandRouter);
app.use("/api/users", userRouter);

app.use("/api/upload", uploadRouter);

const port = 3000;

app.listen(port, function() {
    console.log(`listening on port ${port}`);
});