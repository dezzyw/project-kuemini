const express = require('express');
const cors = require('cors');
require('dotenv').config(); // Pastikan dotenv dipanggil paling awal
const jwt = require('jsonwebtoken');
const verifyToken = require("./api/middleware/verifyToken"); // Sesuaikan dengan path yang benar


const app = express();
const port = process.env.PORT || 6001;



// Middleware
app.use(cors());
app.use(express.json());

// Koneksi ke MySQL
const sequelize = require('./config/db');

//jwt authentication
app.post('/jwt', async (req, res) => {
    const user = req.body;
    const token = jwt.sign(user, process.env.ACCES_TOKEN_SECRET, {
        expiresIn: '1h'
    });
    
    res.send({token});
})
// Import routes

const menuRoutes = require('./api/routes/menuRoutes');
const cartRouter = require('./api/routes/cartRouter');
const userRouter = require('./api/routes/userRoutes');
const paymentRouter = require('./api/routes/paymentRouter');
const blogRouter = require('./api/routes/blogRoutes');




app.use('/menu', menuRoutes);
app.use('/carts', cartRouter);
app.use('/users', userRouter);
app.use('/payment', paymentRouter);
app.use('/blog', blogRouter); // ✅ Tambahkan paymentRouter yang benar/ buat notifikasi Midtrans




app.get("/", verifyToken,(req, res) => {
    res.send("Hello World!");
});

// Cek koneksi database sebelum menjalankan server
sequelize.sync({ force: false }) // ✅ `force: false` agar data tidak terhapus saat restart
    .then(() => {
        app.listen(port, () => {
            console.log(`🚀 Server is running on port ${port}`);
        });
    })
    .catch(err => console.error('❌ Database sync error:', err));
