const fs = require('fs')
const path = require('path')
const express = require('express')
const { set } = require('ramda')

const app = express()

app.use(express.static(path.join(__dirname, '/public')))
app.set('views', './src/views')
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
	res.render('index', { title: 'Index' })
})

app.listen(3000, () => {
	console.log('PS Project Running on port 3000!')
})
