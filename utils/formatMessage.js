const moment = require('moment')

function formatMessage (user, message) {
    return {
        user: user,
        time: moment().format('h:mm a'),
        message: message
    }
}

module.exports = formatMessage