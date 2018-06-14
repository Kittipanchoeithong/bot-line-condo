var express = require('express')
var app = express()
 
app.post('/webhook', (req, res) => {
    // let reply_token = req.body.events[0].replyToken
    // reply(reply_token)
    res.sendStatus(200)
})

app.listen(process.env.PORT||3000)