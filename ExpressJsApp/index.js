var express = require("express")
var app = express()

app.get('/', (req, res) => {
    res.send("Hello World!")
})

var server = app.listen(8081, () => {
    var port = server.address().port

    console.log(`Example app listening at 127.0.0.1:${port}`)
})