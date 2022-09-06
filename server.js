const express = require("express")
const app = express()
const cors = require('cors')
const db = require("./database.js")

app.use(cors())
app.use(express.static('public'))

const bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const port = 3000

// Start server
app.listen(port, () => console.log(`Example app listening on port ${port}!`))

app.get("/api/books", (req, res, next) => {

    let sql = "SELECT * FROM bok"
    let params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "bok":rows
        })
      })
})


app.get("/api/books/:id", (req, res, next) => {
    let sql = "select * from bok where bokId = ?"
    let params = [req.params.id]
    db.get(sql, params, (err, row) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "bok":row
        })
      })
})


app.post("/api/books", (req, res, next) => {
    let data = {
        bokTitel: req.body.bokTitel,
        bokForfattare: req.body.bokForfattare,
        bokIsbn: req.body.bokIsbn,
        bokPris: req.body.bokPris
    }
    let sql ='INSERT INTO bok (bokTitel, bokForfattare, bokIsbn, bokPris) VALUES (?,?,?,?)'
    let params =[data.bokTitel, data.bokForfattare, data.bokIsbn, data.bokPris]
    db.run(sql, params, function (err, result) {
        if (err){
            res.status(400).json({"error": err.message})
            return;
        }
        res.json({
            "message": "success",
            "bok": data,
            "id" : this.lastID
        })
    })
})

app.put("/api/books", (req, res, next) => {
    let data = {
        bokTitel: req.body.bokTitel,
        bokForfattare: req.body.bokForfattare,
        bokIsbn: req.body.bokIsbn,
        bokPris: req.body.bokPris,
        bokId: req.body.bokId
    }
    let sql ='UPDATE bok SET bokTitel = ?, bokForfattare = ?, bokIsbn = ?, bokPris = ? WHERE bokId = ?'
    let params =[data.bokTitel, data.bokForfattare, data.bokIsbn, data.bokPris, data.bokId]
    db.run(sql, params, function (err, result) {
        if (err){
            res.status(400).json({"error": err.message})
            return;
        }
        res.json({
            "message": "success",
            "bok": data,
            "id" : this.lastID
        })
    })
})

app.delete("/api/books", (req, res, next) => {
    db.run(
        'DELETE FROM bok WHERE bokId = ?',
        req.body.bokId,
        function (err, result) {
            if (err){
                res.status(400).json({"error": res.message})
                return;
            }
            res.json({"message":"deleted", rows: this.changes})
    })
})


