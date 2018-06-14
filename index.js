const express = require('express')
const mysql = require('mysql');
const request = require('request')
var app = express()

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
    // let reply_token = req.body.events[0].replyToken
    // reply(reply_token)
    res.sendStatus(200)
})

app.listen(process.env.PORT || 3000)

