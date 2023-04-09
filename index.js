require('dotenv').config()
const express = require('express')
const userRouter = require('./server/routes/user.routes')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const errorMiddlewares = require('./server/middlewares/error-middlewares')
const PORT = process.env.PORT

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}))
app.use('/api', userRouter)
app.use(errorMiddlewares)

const start = async () => {
    try{
        app.listen(PORT, () => {
            console.log(`Server has been start on port ${PORT}`)
        })
    }
    catch (e){
        console.log(e)
    }
}

start()




