const express = require('express')
const { accounts, writeJSON } = require('../data.js')

const router = express.Router()

router.get('/transfer', (req, res) => {
	res.render('transfer')
})

router.post('/transfer', (req, res) => {
	const fromAcc = req.body.from
	const toAcc = req.body.to
	const amount = req.body.amount

	currentFromBalance = accounts[fromAcc].balance
	currentToBalance = accounts[toAcc].balance
	newFromBalance = currentFromBalance - parseInt(amount)
	newToBalance = currentToBalance + parseInt(amount)

	accounts[fromAcc].balance = newFromBalance
	accounts[toAcc].balance = newToBalance

	writeJSON()

	res.render('transfer', { message: 'Transfer Completed' })
})

router.get('/payment', (req, res) => {
	res.render('payment', { account: accounts.credit })
})

router.post('/payment', (req, res) => {
	const amount = parseInt(req.body.amount)

	currentCreditBalance = accounts.credit.balance
	newCreditBalance = currentCreditBalance - amount

	currentCreditAvailable = accounts.credit.available
	newCreditAvailable = currentCreditAvailable + amount

	accounts.credit.balance = newCreditBalance
	accounts.credit.available = newCreditAvailable

	writeJSON()

	res.render('payment', {
		message: 'Payment Successful',
		account: accounts.credit,
	})
})

module.exports = router
