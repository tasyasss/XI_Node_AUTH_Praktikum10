const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const cors = require("cors")
const db = require("../config") //import konfigurasi database

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

// GET: /jurusan --> end point untuk mengakses data jurusan
app.get("/", (req,res) => {
    let sql = "select * from jurusan"
    
    db.query(sql, (err, result) => {
        if (err) {
            throw err
        }else{
            let response = {
                count: result.length,
                jurusan: result
            }
            res.setHeader("Content-Type","application/json")
            res.send(JSON.stringify(response))
        }
    })
})

// POST: /jurusan --> end point untuk pencarian data jurusan
app.post("/", (req,res) => {
    let find = req.body.find
    let sql = "select * from jurusan where id_jurusan like '%"+
    find+"%' or nama_jurusan like '%"+find+"%' or kepanjangan like '%"+
    find+"%' or keterangan like '%"+find+"%'"
    
    db.query(sql, (err, result) => {
        if (err) {
            throw err
        }else {
            let response = {
                count: result.length,
                jurusan: result
            }
            res.setHeader("Content-Type","application/json")
            res.send(JSON.stringify(response))
        }
    })
})

// POST: /jurusan/save --> end point untuk insert data jurusan
app.post("/save", (req,res) => {
    let data = {
        id_jurusan: req.body.id_jurusan,
        nama_jurusan: req.body.nama_jurusan,
        kepanjangan: req.body.kepanjangan,
        keterangan: req.body.keterangan
    }
    let message = ""
    let sql = "insert into jurusan set ?"
    
    db.query(sql, data, (err,result) => {
        if (err) {
            message = err.message
        }else{
            message = result.affectedRows + " row inserted"
        }
        let response = {
            message : message
        }
        res.setHeader("Content-Type","application/json")
        res.send(JSON.stringify(response))
    })
})

// POST: /jurusan/update --> end point untuk update data jurusan
app.post("/update", (req,res) => {
    let data = [{
        id_jurusan: req.body.id_jurusan,
        nama_jurusan: req.body.nama_jurusan,
        kepanjangan: req.body.kepanjangan,
        keterangan: req.body.keterangan
    }, req.body.id_jurusan]
    let message = ""
    let sql = "update jurusan set ? where id_jurusan = ?"
    
    db.query(sql, data, (err,result) => {
        if (err) {
            message = err.message
        }else{
            message = result.affectedRows + " row updated"
        }
        let response = {
            message : message
        }
        res.setHeader("Content-Type","application/json")
        res.send(JSON.stringify(response))
    })
})

// DELETE: /jurusan/:jurusan --> end point untuk hapus data jurusan
app.delete("/:id_jurusan", (req,res) => {
    let data = {
        id_jurusan : req.params.id_jurusan
    }
    let message = ""
    let sql = "delete from jurusan where ?"
    
    db.query(sql, data, (err,result) => {
        if (err) {
            message = err.message
        }else{
            message = result.affectedRows + " row deleted"
        }
        let response = {
            message : message
        }
        res.setHeader("Content-Type","application/json")
        res.send(JSON.stringify(response))
    })
})

module.exports = app