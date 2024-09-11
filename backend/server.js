const express = require('express')
const { Pool } = require('pg')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()
app.use(cors())
app.use(bodyParser.json())

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'db',
    password: 'root',
    port: 1820,
})

app.post('/clientes', async (req, res) => {
    const { nome, email, telefone } = req.body
    try {
        await pool.query('INSERT INTO customers (nome, email, telefone) VALUE ($1, $2, $3)', [nome, email, telefone])
        res.status(201).send('Cliente cadastrado com sucesso!')
    } catch (err) {
        res.status(500).send(err.message)
    }
})

app.get('/clientes', async (req, res) => {
    try {
        const result = await
            pool.query('SELECT * FROM customers')
        res.json(result.rows)
    } catch (err) {
        res.status(500).send(err.message)
    }
})

app.post('/produtos', async (req, res) => {
    const { nome, descricao, preco } = req.body
    try {
        await pool.query('INSERT INTO products (nome, descricao, preco) VALUE ($1, $2, $3)', [nome, descricao, preco])
        res.status(201).send('Produto cadastrado com sucesso!')
    } catch (err) {
        res.status(500).send(err.message)
    }
})

app.get('/produtos', async (req, res) => {
    try {
        const result = await
            pool.query('SELECT * FROM products')
        res.json(result.rows)
    } catch (err) {
        res.status(500).send(err.message)
    }
})

app.post('/clientes', async (req, res) => {
    const { nome, email, telefone } = req.body
    try {
        await pool.query('INSERT INTO customers (nome, email, telefone) VALUE ($1, $2, $3)', [nome, email, telefone])
        res.status(201).send('Cliente cadastrado com sucesso!')
    } catch (err) {
        res.status(201).send(err.message)
    }
})

app.get('/clientes', async (req, res) => {
    try {
        const result = await
            pool.query('SELECT * FROM customers')
        res.json(result.rows)
    } catch (err) {
        res.status(500).send(err.message)
    }
})

// Rota para Relatórios (exemplo combinando clientes e produtos)
app.get('/relatorios', async (req, res) => {
    try {
        const clientes = await pool.query('SELECT * FROM clientes');
        const produtos = await pool.query('SELECT * FROM produtos');
        res.json({ clientes: clientes.rows, produtos: produtos.rows });
    } catch (err) {
        res.status(500).send(err.message)}
})
    pool.query('SELECT NOW ()', () => {
        try {
            console.log("Banco de dados Conectado 😁!")
            app.listen(3000, () => {
                console.log('Servidor rodando na porta 3000🚀')
        })
        } catch(err) {
            console.error(err)
        }
    pool.end()
    })

