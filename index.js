require('dotenv').config()
const express = require('express')
const mongose = require('mongoose')
const userRouter = require('./server/routes/user.routes')
const addRouter = require('./server/routes/ad.routes')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const errorMiddlewares = require('./server/middlewares/error-middlewares')
const PORT = process.env.PORT

const app = express()
app.use(express.json({limit: '50mb'}))
app.use(express.urlencoded({limit: '50mb'}))
app.use(cookieParser())
app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}))
app.use('/api', userRouter)
app.use('/add-item', addRouter)
app.use(errorMiddlewares)

const start = async () => {
    try{
        await mongose.connect('mongodb+srv://nigorshkov99:H35WuHi2n1sToFGa@classified.jgjonfn.mongodb.net/?retryWrites=true&w=majority')
        app.listen(PORT, () => {
            console.log(`Server has been start on port ${PORT}`)
        })
    }
    catch (e){
        console.log(e)
    }
}

start()




