const express = require('express')
const userRouter = require('./routes/user.routes')
const cors = require('cors')

const PORT = process.env.PORT || 8080

const app = express()
app.use(express.json())
app.use(cors())

app.listen(PORT, () => {
    console.log(`Server has been start on port ${PORT}`)
})

app.use('/api', userRouter)

