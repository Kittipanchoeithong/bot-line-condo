const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const mysql = require('mysql')
const port = process.env.PORT || 3000
var app = express()

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

var con = mysql.createConnection({
    host: "191.96.37.188",
    user: "blackdiamond",
    password: "BDM24032538",
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
        // var sql = "SELECT * FROM user WHERE Rendom = '" + msg + "' ";
        var sql = "UPDATE user set Uid = '" + user_id + "'  WHERE Rendom = '" + msg + "'";
        con.query(sql, function (err, result, fields) {
            if (err) throw err;


            console.log(555, result);
            console.log(666, user_id);

        });
    } else {
        if (msg == "Uid") {
            reply(user_id, "UID ของคุณคือ : '" + user_id + "'")
        } else {
            reply(user_id, "โปรดติดต่อเจ้าหน้าที่ผู้ดูแลระบบ")
        }
    }
    res.sendStatus(200)
})


app.post('/send', (req, res) => {
    console.log("testTTTTTTTT", req.body)
    var uid = req.body.uid
    var msg = req.body.message
    reply(uid, msg)
    res.sendStatus(200)
})



//ส่งให้ผู้ใช้เข้าไลน์
function reply(user_id, send_msg) {
    console.log(user_id, send_msg)
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





