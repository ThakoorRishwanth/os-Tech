const express = require('express')
require('dotenv').config()
const port = process.env.PORT || 8181
const db_uri = process.env.MONGO_URI
const connectToDb = require('./config/db')
const router = require('./routes/userRoutes')
const app = express();
const cors = requier('cors')

app.use(cors())

app.use(express.json())

app.get('/', (req, res)=>{
    res.send('This is home Route')
})

app.use('/api', router);

app.listen(port, async()=>{
 try{

     await connectToDb(db_uri)
     console.log('Connected to DataBase')
     console.log(`Server is running at port: ${port}`)

    }catch(err){
        console.log(err)
    }
})


