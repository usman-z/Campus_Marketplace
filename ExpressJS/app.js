import express from 'express'

import { getAll } from './database.js'

var app = express()

app.use(express.json())

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Server failed')
  })
  
const PORT = 8080
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
  })

app.get("/student/all", (req, res) => {
    getAll((err, notes) => {
        if (err) {
            console.error('Error fetching data:', err)
            res.status(500).send('Error fetching data from database.')
            return;
        }
        res.send(notes);
    });
});