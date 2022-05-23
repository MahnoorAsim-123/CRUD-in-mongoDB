const express = require("express");
const mongoose = require("mongoose");

const model = require("./schema");

const app = express();
const PORT = process.env.PORT || 5000;


//Allow body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// DB Connection
const DBURI = "";
mongoose.connect(DBURI);
mongoose.connection.on("connected", () => {console.log("DB connected")});
mongoose.connection.on("error", (error) => {console.log("not connected")});

// Get and fetch Data
app.get("/api/getData", (req, res) => {
     model.find({}, (err, data) => {
        if (err) {
            res.send(err)
        } else {
            res.send(data)
        }
    });
});


// Send and Create Data
app.post("/api/createData", (req, res) => {
    const { email, password } = req.body;

    const obj = {
        email,
        password
    }

    model.create(obj, (err, data) => {
        if (err) {
            res.send("Error")
        } else {
            res.send(data)

        }
    })
});


// Update Data
app.put("/api/updateData/:id", (req, res) => {
    const body = req.body;
    const { id } = req.params;

    model.findByIdAndUpdate({ _id: id }, body, { new: true }, (err, data) => {
        if (err) {
            res.send("Error")
        } else {
            res.send(data)

        }
    });
});


// Delete Data
app.delete("/api/deleteData/:id", (req, res) => {
    const { id } = req.params;

    model.findByIdAndRemove({ _id: id }, (err, data) => {
        if (err) {
            res.send("Error")
        } else {
            res.send(data)
        }
    });
});


app.listen(PORT, () => {console.log("Server is started")});