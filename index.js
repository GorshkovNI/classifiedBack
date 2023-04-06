const express = require('express')
const userRouter = require('./routes/user.routes')
const cookieParser = require('cookie-parser')
const cors = require('cors')

const PORT = process.env.PORT || 8080

const authRouter = require('./src/login/login')


const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:3000'
}))

app.listen(PORT, () => {
    console.log(`Server has been start on port ${PORT}`)
})

app.use(authRouter)
app.use('/api', userRouter)

