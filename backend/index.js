const express = require('express')
const app = express()
const port =8000
const mongoDB = require('./db')
const cors = require('cors');

app.use(cors());
mongoDB()

app.use((req,resp,next)=>{
    resp.setHeader("Access-Control-Allow-Origin", "http://localhost:3000")
    resp.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type,Accept"
    )
    next()
})
app.use('/api',require('./Routes/CreateUser'))
app.use('/api',require('./Routes/DisplayData'))
app.use('/api',require('./Routes/OrderData'))

app.use(express.json())
app.get('/',(req,resp)=>{
    resp.send('hello world')
})

app.listen(port,()=>{
    console.log(`listening on port ${port}`)
})