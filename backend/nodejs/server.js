const express = require("express");
const app = express();
const cors = require("cors");
const crypto = require("crypto");
const fs = require("fs");
const port = 3000;

app.use(cors());

app.use(express.json());

app.post("/node/sha256", (req, res) => {
    let num1 = req.query.firstinput;
    let num2 = req.query.secondinput;
    if (typeof num1 == "undefined" || typeof num2 == "undefined") {
        return res.status(400).json({message: "inputs can't be empty"})
    }
    if (isNaN(num1) || isNaN(num2)) {
        return res.status(400).json({message: "inputs must be numbers"})
    }
    const hash = crypto.createHash('sha256').update((parseInt(num1) + parseInt(num2)).toString()).digest('base64');
    res.json({
        result: hash,
    });
});

app.get("/node/write", (req, res) => {
    let line = req.query.input;
    if (typeof line == "undefined") {
        return res.status(400).json({message: "input can't be empty"})
    }
    if (isNaN(line)) {
        return res.status(400).json({message: "input must be a number"})
    }
    if (line < 0 || line > 100) {
        return res.status(400).json({message: "line number must be between 0 and 100"})
    }
    file = fs.readFile("./test.txt", function (err, data) {
        if (err) return res.status(500).json({message: "internal server error"});
        let lines = data.toString().split(/[\r\n]+/);
        // res.json({
        //     result: lines[line],
        // });
        res.send(lines[line])
    });
});

app.listen(port, () => {
    console.log(`HW1 app listening at http://localhost:${port}`);
});
