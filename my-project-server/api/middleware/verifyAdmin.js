const jwt = require('jsonwebtoken');
const User = require('../models/User');

const verifyAdmin = async (req, res, next) => {
    const email = req.decoded.email;

    try {
        const user = await User.findOne({ where: { email } }); // ✅ perbaikan di sini
        const isAdmin = user?.role === 'admin';

        if (!isAdmin) {
            return res.status(403).send({ message: "forbidden access!" });
        }

        next();
    } catch (error) {
        console.error("❌ Error saat verifikasi admin:", error);
        return res.status(500).send({ message: "Internal server error" });
    }
};

module.exports = verifyAdmin;
