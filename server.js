
const express = require("express");
const app = express();

const PORT = 3000;

// Middleware untuk membaca JSON
app.use(express.json());

// Array penyimpanan biodata
let dataBiodata = [
    {
        id: 1,
        nama: "Andi",
        umur: 20,
        alamat: "Jakarta",
        pekerjaan: "Mahasiswa"
    },
    {
        id: 2,
        nama: "Budi",
        umur: 25,
        alamat: "Bandung",
        pekerjaan: "Programmer"
    }
];

// ID otomatis
let nextId = 3;

// Validasi data biodata
function validasiBiodata(body) {
    const { nama, umur, alamat, pekerjaan } = body;

    return (
        typeof nama === "string" && nama.trim() !== "" &&
        typeof umur === "number" && Number.isFinite(umur) && umur > 0 &&
        typeof alamat === "string" && alamat.trim() !== "" &&
        typeof pekerjaan === "string" && pekerjaan.trim() !== ""
    );
}

// 1. GET: Menampilkan semua biodata
app.get("/api/biodata", (req, res) => {
    res.status(200).json({
        status: "success",
        message: "Berhasil menampilkan seluruh biodata",
        data: dataBiodata
    });
});

// 2. GET: Menampilkan biodata berdasarkan ID
app.get("/api/biodata/:id", (req, res) => {
    const id = Number(req.params.id);

    const biodata = dataBiodata.find(item => item.id === id);

    if (!biodata) {
        return res.status(404).json({
            status: "fail",
            message: "Biodata tidak ditemukan",
            data: null
        });
    }

    res.status(200).json({
        status: "success",
        message: "Biodata berhasil ditemukan",
        data: biodata
    });
});

// 3. POST: Menambahkan biodata
app.post("/api/biodata", (req, res) => {
    if (!validasiBiodata(req.body)) {
        return res.status(400).json({
            status: "fail",
            message: "Semua field wajib diisi dengan format yang benar",
            data: null
        });
    }

    const biodataBaru = {
        id: nextId++,
        nama: req.body.nama.trim(),
        umur: req.body.umur,
        alamat: req.body.alamat.trim(),
        pekerjaan: req.body.pekerjaan.trim()
    };

    dataBiodata.push(biodataBaru);

    res.status(201).json({
        status: "success",
        message: "Biodata berhasil ditambahkan",
        data: biodataBaru
    });
});

// 4. PUT: Memperbarui biodata
app.put("/api/biodata/:id", (req, res) => {
    const id = Number(req.params.id);

    const index = dataBiodata.findIndex(item => item.id === id);

    if (index === -1) {
        return res.status(404).json({
            status: "fail",
            message: "Biodata tidak ditemukan",
            data: null
        });
    }

    if (!validasiBiodata(req.body)) {
        return res.status(400).json({
            status: "fail",
            message: "Semua field wajib diisi dengan format yang benar",
            data: null
        });
    }

    dataBiodata[index] = {
        id: id,
        nama: req.body.nama.trim(),
        umur: req.body.umur,
        alamat: req.body.alamat.trim(),
        pekerjaan: req.body.pekerjaan.trim()
    };

    res.status(200).json({
        status: "success",
        message: "Biodata berhasil diperbarui",
        data: dataBiodata[index]
    });
});

// 5. DELETE: Menghapus biodata
app.delete("/api/biodata/:id", (req, res) => {
    const id = Number(req.params.id);

    const index = dataBiodata.findIndex(item => item.id === id);

    if (index === -1) {
        return res.status(404).json({
            status: "fail",
            message: "Biodata tidak ditemukan",
            data: null
        });
    }

    const biodataDihapus = dataBiodata.splice(index, 1);

    res.status(200).json({
        status: "success",
        message: "Biodata berhasil dihapus",
        data: biodataDihapus[0]
    });
});

// Menjalankan server
app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});
