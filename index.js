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
    password: "123456",
    database: "condo"
});

con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
    // var sql = "SELECT * FROM user";
    // con.query(sql, function (err, result, fields) {
    //     if (err) throw err;
    //     console.log(result);
    // });
});



//ดึงข้อมูลมาจากwebhook
app.post('/webhook', (req, res) => {
    let reply_token = req.body.events[0].replyToken
    let user_id = req.body.events[0].source.userId
    let msg = req.body.events[0].message.text


    // reply(reply_token)
    // reply(user_id)

    //ตรวจสอบข้อความเข้า
    var re = new RegExp("[r][e][g][i][s][t][e][r]");
    if (re.test(msg)) {
        console.log("Valid", msg);
        // var sql = "UPDATE user SET Key = '" + user_id + "' WHERE Rendom = '" + msg + "' ";
        // con.query(sql, function (err, result) {
        //     if (err) throw err;
        //     console.log(result.affectedRows + " record(s) updated");
        //     console.log(555,result);
        //     console.log(666,user_id);
        // });
        con.query("UPDATE user SET Key = '" + user_id + "' WHERE Rendom = '" + msg + "' ", function (err, result, fields) {
            // if any error while executing above query, throw error
            if (err) throw err;
            // if there is no error, you have the result
            console.log(result);
          });


    } else {
        if (msg == "สวัสดี" || msg == "hello") {
            reply(user_id, "สวัสดีเราคือใคร ใครคือเรา")
        } else {
            reply(user_id, "มันคืออะไรหรอ ?")
        }
    }
    res.sendStatus(200)
})

//ส่งให้ผู้ใช้เข้าไลน์
function reply(user_id, send_msg) {
    let headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer {a7FvVoAOXfMdUFIjyUvYlasoDBi0OP8ZvkzALFr1SmgaFs+eeTwzmqj/Z+MWwRlCpCZgpU1SqLHPAcULoCfEmzxkmkY8NaEyyHR7Sbl1t1VFCMZMoxNA1NeB+VI4VdIcqpOZ0sy2ThZl+C3v6zpk3wdB04t89/1O/w1cDnyilFU=}'
    }
    let body = JSON.stringify({
        to: user_id,
        messages: [{
            type: 'text',
            text: send_msg
        }]
    })
    request.post({
        url: 'https://api.line.me/v2/bot/message/push',
        headers: headers,
        body: body
    }, (err, res, body) => {
        console.log('status = ' + res.statusCode);
    });
}




app.listen(port)





