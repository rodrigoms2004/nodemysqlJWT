// CRUD = Create, Read, Update, Delete
// Create = POST method
// READ   = GET method
// UPDATE = PUT or PATCH methods
// DELETE = DELETE method

const router = require('express').Router()
const authController = require('../controllers/authController')
const clientesController = require('../controllers/clientesController')
const {authenticate} = require('./../middleware/authenticate');

// API LOGIN
router.post('/login', authController.login)
router.get('/logout', authController.logout)

// API Clientes
router.get('/clientes', authenticate, clientesController.listAll)
router.get('/clientes/:id?', authenticate, clientesController.listById)
// router.delete('/clientes/:id', authenticate, clientesController.deleteById)
// router.post('/clientes', authenticate, clientesController.create)
// router.patch('/clientes/:id', authenticate, clientesController.update)

router.get('/', (req, res, next) => {
    const error = new Error('Deu ruim')
    error.status = 404
    next(error)
  })




module.exports = router



// // http://localhost:3000/clientes
// router.get('/clientes', verifyJWT, (req, res) => {
//     execSQLQuery('SELECT * FROM Clientes', res)
// })

// // http://localhost:3000/clientes/1
// router.get('/clientes/:id?', verifyJWT,(req, res) => {
//     let filter = ''
//     if(req.params.id) {
//         // filter = ' WHERE ID=' + parseInt(req.params.id)
//         // execSQLQuery('SELECT * FROM Clientes' + filter, res)
//         const consulta = 'SELECT * FROM Clientes WHERE id = ?'
//         execSQLQuery(consulta, res, parseInt(req.params.id))
        
//     }
// })

// // curl -X DELETE http://localhost:3000/clientes/1
// router.delete('/clientes/:id', verifyJWT, (req, res) => {
//     execSQLQuery('DELETE FROM Clientes WHERE ID=' + parseInt(req.params.id), res);
// })

// // curl -X POST -d "nome=luiz&cpf=12345678901" http://localhost:3000/clientes
// router.post('/clientes', verifyJWT, (req, res) => {
//     const nome = req.body.nome.substring(0, 150)
//     const cpf = req.body.cpf.substring(0, 11)
//     execSQLQuery(`INSERT INTO Clientes(Nome, CPF) VALUES('${nome}', '${cpf}')`,res)
// })

// // curl -X PATCH -d "nome=fernando&cpf=12345678901" http://localhost:3000/clientes/4
// router.patch('/clientes/:id', verifyJWT,(req, res) => {
//     const id = parseInt(req.params.id);
//     const nome = req.body.nome.substring(0,150)
//     const cpf = req.body.cpf.substring(0, 11)
//     execSQLQuery(`UPDATE Clientes SET Nome='${nome}', CPF='${cpf}' WHERE ID=${id}`, res)
// })




