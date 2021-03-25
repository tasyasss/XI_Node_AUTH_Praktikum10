//inisialisasi library
const express = require("express")
const app = express()

// import fungsi authorization auth
const auth = require("./auth")

// import route user
const user = require("./route/user")
app.use("/", user)

//import route pegawai
const pegawai = require("./route/pegawai")
app.use("/pegawai", auth, pegawai)

//import route pelanggaran
const pelanggaran = require("./route/pelanggaran")
app.use("/pelanggaran", auth, pelanggaran)

//import route siswa
const siswa = require("./route/siswa")
app.use("/siswa", auth, siswa)

//import route pelanggaran siswa
//base url -> http://localhost:2000/pelanggaran_siswa
const pelanggaran_siswa = require("./route/pelanggaran_siswa")
app.use("/pelanggaran_siswa", auth, pelanggaran_siswa)

//import route detail pelanggaran siswa
//base url -> http://localhost:2000/detail_pelanggaran_siswa
const detail_pelanggaran_siswa = require("./route/detail_pelanggaran_siswa"
)
app.use("/detail_pelanggaran_siswa", auth, detail_pelanggaran_siswa)

//membuat web server dengan port 2000
app.listen(2000, () => {
    console.log("server run on port 2000")
})