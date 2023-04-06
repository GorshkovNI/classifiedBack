const PASSWORD_SECRET = 'abc'
const crypto = require('crypto')

const hashPassword = (password) => {
    return crypto.createHmac("sha256", PASSWORD_SECRET).update(password).digest("hex")
}

module.exports = {
    PASSWORD_SECRET,
    hashPassword
}