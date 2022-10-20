const fs = require('fs')
const path = require('path')
const express = require('express')
const { set, F, __ } = require('ramda')

const app = express()

app.set('views', path.join(__dirname, '/views'))
app.set('view engine', 'ejs')

app.use(express.static(path.join(__dirname, '/public')))
app.use(express.urlencoded({ extended: true }))

const accountData = fs.readFileSync(
	'src/json/accounts.json',
	'utf8'
)
const userData = fs.readFileSync('src/json/users.json', 'utf8')

const accounts = JSON.parse(accountData)
const users = JSON.parse(userData)

app.get('/', (req, res) => {
	res.render('index', {
		title: 'Account Summary',
		accounts: accounts,
	})
})

app.get('/savings', (req, res) => {
	res.render('account', {
		account: accounts.savings,
	})
})

app.get('/checking', (req, res) => {
	res.render('account', {
		account: accounts.checking,
	})
})

app.get('/credit', (req, res) => {
	res.render('account', {
		account: accounts.credit,
	})
})

app.get('/profile', (req, res) => {
	res.render('profile', {
		user: users[0],
	})
})

app.get('/transfer', (req, res) => {
	res.render('transfer')
})

app.post('/transfer', (req, res) => {
	const fromAcc = req.body.from
	const toAcc = req.body.to
	const amount = req.body.amount

	currentFromBalance = accounts[fromAcc].balance
	currentToBalance = accounts[toAcc].balance
	newFromBalance = currentFromBalance - parseInt(amount)
	newToBalance = currentToBalance + parseInt(amount)

	accounts[fromAcc].balance = newFromBalance
	accounts[toAcc].balance = newToBalance

	const accountsJSON = JSON.stringify(accounts)

	fs.writeFileSync(
		path.join(__dirname, 'json', 'accounts.json'),
		accountsJSON,
		'utf8'
	)

	res.render('transfer', { message: 'Transfer Completed' })
})

app.get('/payment', (req, res) => {
	res.render('payment', { account: accounts.credit })
})

app.post('/payment', (req, res) => {
	const amount = parseInt(req.body.amount)

	currentCreditBalance = accounts.credit.balance
	newCreditBalance = currentCreditBalance - amount

	currentCreditAvailable = accounts.credit.available
	newCreditAvailable = currentCreditAvailable + amount

	accounts.credit.balance = newCreditBalance
	accounts.credit.available = newCreditAvailable

	const accountsJSON = JSON.stringify(accounts)

	fs.writeFileSync(
		path.join(__dirname, 'json', 'accounts.json'),
		accountsJSON,
		'utf8'
	)

	res.render('payment', {
		message: 'Payment Successful',
		account: accounts.credit,
	})
})

app.listen(3000, () => {
	console.log('PS Project Running on port 3000!')
})
