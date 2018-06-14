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
    let reply_token = req.body.events[0].replyToken
    reply(reply_token)
    res.sendStatus(200)
})

app.listen(process.env.PORT || 3000)

function reply(reply_token) {
    let headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer {tG62gkBW3Y8+UxmavBC/7PfuGbJyKVRSbMt0bM05JXqiqwbFeT//mSm4m91Bc5FjpCZgpU1SqLHPAcULoCfEmzxkmkY8NaEyyHR7Sbl1t1XvKHIHicJXJ+gXFd/8x4y7ULoIFWHOMgyEb1Gadx2h8AdB04t89/1O/w1cDnyilFU=}'
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