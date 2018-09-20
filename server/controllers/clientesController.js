const jwt = require('jsonwebtoken')
const _ = require('lodash');

Object.prototype.isEmpty = function() {
    for (let key in this) {
        if(this.hasOwnProperty(key)) { return false; }
    }
    return true;
}

const clientesController = {
    listAll: async (req, res) => {
        const query = `SELECT cli.id, cli.Nome, cli.CPF
                        FROM nodemysql_db.Clientes cli`

        await req.connection.query(query, (err, data) => {

            if (err) {
                console.log(err)
                res.status(500).send('invalid login!')
            } else if (data.isEmpty()) {
                res.status(404).send({ "error": "not found" })
            } else {
                res.status(200).json(data)     
            }
        })
    },

    listById : async (req, res) => {
        const id = req.params.id
        const query = `SELECT cli.id, cli.Nome, cli.CPF
                        FROM nodemysql_db.Clientes cli
                        WHERE cli.id = '${id}'`

        await req.connection.query(query, (err, data) => {

            if (err) {
                console.log(err)
                res.status(500).send('invalid login!')
            } else if (data.isEmpty()) {
                res.status(404).send({ "error": "not found" })
            } else {
                res.status(200).json(data)     
            }
        })
    }
}

module.exports = clientesController

//     let filter = ''
//     if(req.params.id) {
//         // filter = ' WHERE ID=' + parseInt(req.params.id)
//         // execSQLQuery('SELECT * FROM Clientes' + filter, res)
//         const consulta = 'SELECT * FROM Clientes WHERE id = ?'
//         execSQLQuery(consulta, res, parseInt(req.params.id))