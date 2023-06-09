require('dotenv').config()
const express = require('express')
const mongose = require('mongoose')
const userRouter = require('./server/routes/user.routes')
const addRouter = require('./server/routes/createAd.routes')
const userProfile = require('./server/routes/userProfile.routes')
const getAd = require('./server/routes/getAd.routes')
const feedbackRouter = require('./server/routes/feedback.routes')
const searchRouter = require('./server/routes/search.routes')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const errorMiddlewares = require('./server/middlewares/error-middlewares')
const Ads = require("./server/models/Ads/Ads");
const PORT = process.env.PORT

const app = express()
app.use(express.json({limit: '50mb'}))
app.use(express.urlencoded({limit: '50mb'}))
app.use(cookieParser())
app.use(cors({
    origin: ['https://getit-khaki.vercel.app', 'https://www.getit.market', 'http://localhost:3000'],
    //origin: 'http://localhost:3000',
    credentials: true,
    exposedHeaders: ['set-cookie', 'Content-Length', 'X-Foo', 'X-Bar']
}))
app.get('/',  (req, res) => {
    res.send('Это сервер приложения GetIt')
})
app.use('/api', userRouter)
app.use('/add-item', addRouter)
app.use('/profile', userProfile)
app.use('/item', getAd)
app.use('/feedback', feedbackRouter)
app.use('/search', searchRouter)
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




