const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const cors = require("cors")
const db = require("../config")

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

// endpoint untuk mengakses data (siswa)
app.get("/", (req,res) => {
    let sql = "SELECT s.id_siswa, s.nis, s.nama_siswa, s.kelas, s.jurusan, s.point, " +
    "j.nama_jurusan, j.kepanjangan " + "FROM siswa s JOIN jurusan j ON s.jurusan = j.id_jurusan"
    db.query(sql, (err, result) => {
        if (err) {
            throw err
        }
        else{
            let response = {
                count: result.length,
                siswa: result
            }
        
            res.setHeader("Content-Type","application/json")
            res.send(JSON.stringify(response))
        }
    })    
})

// endpoint untuk mengakses data (jurusan)
app.get("/jurusan", (req,res) => {
    let sql = "select * from jurusan"
    db.query(sql, (err, result) => {
        if (err) {
            throw err
        }
        else{
            let response = {
                count: result.length,
                jurusan: result
            }
        
            res.setHeader("Content-Type","application/json")
            res.send(JSON.stringify(response))
        }
    })
})

// endpoint untuk mencari data
app.post("/", (req,res) => {
    let find = req.body.find
    //let sql = "select * from siswa where blablabls"
    let sql = "select * FROM siswa s JOIN jurusan j ON s.jurusan = j.id_jurusan where id_siswa like '%"+
        find+"%' or nis like '%"+find+"%' or nama_siswa like '%"+
        find+"%' or kelas like '%"+find+"%' or jurusan like '%"+
        find+"%' or point like '%"+find+"%'"
    db.query(sql, (err, result) => {
        if (err) {
            throw err
        } else {
            let response = {
                count: result.length,
                siswa: result
            }
        
            res.setHeader("Content-Type","application/json")
            res.send(JSON.stringify(response))
        }
    })
})

// endpoint untuk menambah data
app.post("/save", (req,res) => {
    let data = {
        id_siswa: req.body.id_siswa,
        nis: req.body.nis,
        nama_siswa: req.body.nama_siswa,
        kelas: req.body.kelas,
        jurusan: req.body.jurusan,
        point: req.body.point
    }
    let message = ""

    let sql = "insert into siswa set ?"
    db.query(sql, data, (err,result) => {
        if (err) {
            message = err.message
        } else {
            message = result.affectedRows + " data siswa berhasil ditambahkan"
        }

        let response = {
            message : message
        }
        res.setHeader("Content-Type","application/json")
        res.send(JSON.stringify(response))
    })
})

// endpoint untuk mengedit data
app.post("/update", (req,res) => {
    let data = [{
        id_siswa: req.body.id_siswa,
        nis: req.body.nis,
        nama_siswa: req.body.nama_siswa,
        kelas: req.body.kelas,
        jurusan: req.body.jurusan,
        point: req.body.point
    }, req.body.id_siswa]
    let message = ""

    let sql = "update siswa set ? where id_siswa = ?"
    db.query(sql, data, (err,result) => {
        if (err) {
            message = err.message
        } else {
            message = result.affectedRows + " data siswa berhasil diperbarui"
        }

        let response = {
            message : message
        }
        res.setHeader("Content-Type","application/json")
        res.send(JSON.stringify(response))
    })
})

// endpoint untuk menghapus data
app.delete("/:id_siswa", (req,res) => {
    let data = {
        id_siswa : req.params.id_siswa
    }
    let message = ""
    let sql = "delete from siswa where ?"
    db.query(sql, data, (err,result) => {
        if (err) {
            message = err.message
        } else {
            message = result.affectedRows + " data siswa berhasil dihapus"
        }

        let response = {
            message : message
        }
        res.setHeader("Content-Type","application/json")
        res.send(JSON.stringify(response))
    })
})

module.exports = app