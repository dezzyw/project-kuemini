const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    console.log("✅ Middleware verifyToken dijalankan...");
    console.log("Headers:", req.headers);

    if (!req.headers.authorization) {
        console.warn("❌ Tidak ada Authorization header!");
        return res.status(401).json({ message: "Unauthorized acces - No token provided" });
    }

    const token = req.headers.authorization.split(' ')[1];
    console.log("🔑 Token yang diterima:", token);

    jwt.verify(token, process.env.ACCES_TOKEN_SECRET, (err, decoded) => { // ✅ Perbaiki typo
        if (err) {
            console.warn("❌ Token tidak valid atau expired!", err);
            return res.status(401).json({ message: "Unauthorized access - Invalid token" });
        }

        console.log("✅ Token valid! Data decoded:", decoded);
        req.decoded = decoded;
        next();
    });
};

module.exports = verifyToken;
