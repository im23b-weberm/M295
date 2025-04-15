const express = require('express');
const app = express()
const PORT = 3000

app.get('/:postalCode', async (req, res) => {
  const { postalCode } = req.params
  const url = `https://app-prod-ws.meteoswiss-app.ch/v1/plzDetail?plz=${postalCode}00`

  try {
    const response = await fetch(url)
    const data = await response.json()
    const temperature = data?.currentWeather?.temperature
    if (temperature !== undefined) {
      res.json({ temperature })
    } else {
      res.status(500).json({ error: 'Temperature data not found in response' })
    }
  } catch (error) {
    console.error('Fetch error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

app.listen(PORT, () => {
  console.log("Server is running at http://localhost:${PORT}")
})