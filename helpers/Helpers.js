var bcrypt = require("bcryptjs")
var moment = require("moment")

function hash_password(password) {
    var hash = bcrypt.hashSync(password, 10);
    return hash
}

function GetTimeNow() {
    return moment().format("YYYY/MM/DD hh:mm:ss")
}
function generateID(count) {
    var _sym = '1234567890'
    var str = ''

    for (var i = 0; i < count; i++) {
        str += _sym[parseInt(Math.random() * (_sym.length))];
    }
    return str
}

module.exports = {
    GetTimeNow: GetTimeNow,
    hash_password: hash_password,
    generateID: generateID
}