const mailservice = require('../servise/mail-service')


const FeedbackController = {
    async feedback(req, res, next){
        try{
            const {email, topic, text} = req.body
            console.log(email)
            await mailservice.feedback(email, topic, text)
            res.json(true)
        }catch (e){
            next(e)
        }
    }

}

module.exports = FeedbackController