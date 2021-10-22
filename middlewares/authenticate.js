require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports = function authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token === null) return res.status(403).json({ error: true });

    // console.log('Cookies: ', req.cookies)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.status(403).json({ err });
        req.user = user;
        next();
    });
};