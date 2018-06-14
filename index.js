const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const mysql = require('mysql')

var app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

var con = mysql.createConnection({
    host: "35.186.157.171",
    user: "root",
    password: "123456"
});

con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});




app.post('/webhook', (req, res) => {
    let msg = req.body.events[0].message.text
    var re = new RegExp("[r][e][g][i][s][t][e][r]");
    if (re.test(msg)) {
        console.log("Valid", msg);
    } else {
        console.log("Invalid", msg);
    }
    res.sendStatus(200)
})

app.listen(process.env.PORT || 3000)





