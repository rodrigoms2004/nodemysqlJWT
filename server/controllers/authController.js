const jwt = require('jsonwebtoken')
const _ = require('lodash');
// const userModel = require('../models/userModel')

Object.prototype.isEmpty = function() {
    for (let key in this) {
        if(this.hasOwnProperty(key)) { return false; }
    }
    return true;
}

const authController = {

    // LOGIN A USER
    login: async (req, res) => {
        const body = _.pick(req.body, ['user', 'pwd'])
        const query = `SELECT usr.id 
                        FROM nodemysql_db.Users usr 
                        WHERE usr.username = '${body.user}' AND usr.password = '${body.pwd}'`
        
        await req.connection.query(query, (err, data_id) => {

            const token = jwt.sign({ data_id }, process.env.SECRET, {
                expiresIn: 300 // expires in 5 minutes
            })
            
            if (err) {
                res.status(500).send('invalid login!')
            } else if (data_id.isEmpty()) {
                res.status(404).send({ "error": "not found" })
            } else {
                res.status(200).send({ auth: true, token: token })     
            }
        })
    },

    // LOGOUT A USER
    logout: (req, res) => {
        res.status(200).send({ auth: false, token: null })
    }

}

module.exports = authController
