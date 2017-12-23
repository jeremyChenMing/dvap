
export default {
    'GET /names': { users: [1,2]},
    'POST /dogs': (req,res) => {res.end('OK')}
};


// const mock = {}
// require('fs').readdirSync(require('path').join(__dirname + '/mock')).forEach(function(file) {
//     Object.assign(mock, require('./mock/' + file))
// })
// module.exports = mock