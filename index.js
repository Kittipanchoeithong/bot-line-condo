const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const mysql = require('mysql')
const port = process.env.PORT || 3000
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
    let reply_token = req.body.events[0].replyToken
    reply(reply_token)
    let msg = req.body.events[0].message.text
    var re = new RegExp("[r][e][g][i][s][t][e][r]");
    if (re.test(msg)) {
        console.log("Valid", msg);
    } else {
        console.log("Invalid", msg);
    }
    res.sendStatus(200)
})


function reply(reply_token) {
    let headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer {a7FvVoAOXfMdUFIjyUvYlasoDBi0OP8ZvkzALFr1SmgaFs+eeTwzmqj/Z+MWwRlCpCZgpU1SqLHPAcULoCfEmzxkmkY8NaEyyHR7Sbl1t1VFCMZMoxNA1NeB+VI4VdIcqpOZ0sy2ThZl+C3v6zpk3wdB04t89/1O/w1cDnyilFU=}'
    }
    let body = JSON.stringify({
        replyToken: reply_token,
        messages: [{
            type: 'text',
            text: 'Hello'
        },
        {
            type: 'text',
            text: 'How are you?'
        }]
    })
    request.post({
        url: 'https://api.line.me/v2/bot/message/reply',
        headers: headers,
        body: body
    }, (err, res, body) => {
        console.log('status = ' + res.statusCode);
    });
}




app.listen(port)





