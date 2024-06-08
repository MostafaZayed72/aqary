const express = require('express')
const yahooFinance = require('yahoo-finance')
const app = express()
const PORT = 3001

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

app.get('/stock/:symbol', async (req, res) => {
  try {
    const { symbol } = req.params
    const data = await yahooFinance.historical({
      symbol,
      from: '2023-01-01',
      to: '2023-12-31',
      period: 'd'
    })
    res.json(data)
  } catch (error) {
    res.status(500).send(error)
  }
})

app.listen(PORT, () => {
  console.log(`Proxy server is running on http://localhost:${3000}`)
})
