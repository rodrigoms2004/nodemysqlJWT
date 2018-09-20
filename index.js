require('dotenv-safe').config();
const jwt = require('jsonwebtoken')


const express = require('express');
const app = express();         
const bodyParser = require('body-parser');
const port = 3000; //porta padrão
const mysql = require('mysql');


// configurando o body parser para pegar POSTS mais tarde
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// definindo rotas 
const router = express.Router()
router.get('/', (req, res) => res.json({ message: 'Funcionando!' }))
app.use('/', router)

// authentication
router.post('/login', (req, res, next) => {
    if(req.body.user === 'luiz' && req.body.pwd === '123') {
        // auth ok
        const id = 1; // esse id viria do banco de dados
        const token = jwt.sign({ id }, process.env.SECRET, {
            expiresIn: 300 // expires in 5 minutes
        })
        res.status(200).send({ auth: true, token: token })
    } else {
        res.status(500).send('Login inválido!')
    }
})

router.get('/logout', (req, res) => {
    res.status(200).send({ auth: false, token: null })
})

const verifyJWT = (req, res, next) => {
    const token = req.headers['x-access-token']
    if (!token) {
        return res.status(401).send({ auth: false, message: 'No token provided.' })
    }
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if (err) {
            return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' })
        }
        // se tudo estiver ok, salva no request para uso posterior
        req.userId = decoded.id
        next()
    })
}

// ###################################################################



// http://localhost:3000/clientes
router.get('/clientes', verifyJWT, (req, res) => {
    execSQLQuery('SELECT * FROM Clientes', res)
})

// http://localhost:3000/clientes/1
router.get('/clientes/:id?', verifyJWT,(req, res) => {
    let filter = ''
    if(req.params.id) {
        // filter = ' WHERE ID=' + parseInt(req.params.id)
        // execSQLQuery('SELECT * FROM Clientes' + filter, res)
        const consulta = 'SELECT * FROM Clientes WHERE id = ?'
        execSQLQuery(consulta, res, parseInt(req.params.id))
        
    }
})

// curl -X DELETE http://localhost:3000/clientes/1
router.delete('/clientes/:id', verifyJWT, (req, res) => {
    execSQLQuery('DELETE FROM Clientes WHERE ID=' + parseInt(req.params.id), res);
})

// curl -X POST -d "nome=luiz&cpf=12345678901" http://localhost:3000/clientes
router.post('/clientes', verifyJWT, (req, res) => {
    const nome = req.body.nome.substring(0, 150)
    const cpf = req.body.cpf.substring(0, 11)
    execSQLQuery(`INSERT INTO Clientes(Nome, CPF) VALUES('${nome}', '${cpf}')`,res)
})

// curl -X PATCH -d "nome=fernando&cpf=12345678901" http://localhost:3000/clientes/4
router.patch('/clientes/:id', verifyJWT,(req, res) => {
    const id = parseInt(req.params.id);
    const nome = req.body.nome.substring(0,150)
    const cpf = req.body.cpf.substring(0, 11)
    execSQLQuery(`UPDATE Clientes SET Nome='${nome}', CPF='${cpf}' WHERE ID=${id}`, res)
})

// inicia o servidor
app.listen(port)
console.log('API funcionando')

const execSQLQuery = (sqlQry, res, id) => {
    const connection = mysql.createConnection({
        host        : '172.16.105.153 ',
        port        : '3306',
        user        : 'user01',
        password    : 'cisco123',
        database    : 'nodemysql_db'
    })

    connection.query(sqlQry, [id], (error, results, fields) => {
        if(error) {
            res.json(error)
        } else {
            res.json(results)
        }
        connection.end()
        console.log('executou!')
    })
}

