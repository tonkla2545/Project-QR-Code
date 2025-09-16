const express = require('express')
const app = express()
const {readdirSync } = require('fs')

app.use(express.json()); // สำหรับ JSON body
app.use(express.urlencoded({ extended: true })); // สำหรับ form-urlencoded

app.get('/',(rea,res)=>{
    res.send('hello tonkla')
})

// readdirSync('./routes').map((item) => 
//     app.use('/api').require('./routes/'+item))

// const qrcode = require('./routes/qrcode')

// app.use('/api', qrcode)

readdirSync('./routes').map((item)=> 
    app.use('/api',require('./routes/'+item))) // map is loop

app.listen(4000,()=>{
    console.log('Server running')
})