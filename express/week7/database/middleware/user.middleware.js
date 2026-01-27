const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    let token = req.headers.authorization;

    if (!token) {
        return res.status(403).send("Token ki zaroorat hai authentication ke liye");
    }

    try {
        if (token.startsWith("Bearer ")) {
            token = token.split(" ")[1];
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        
        req.user = decoded;
        
        next(); 
    } catch (error) {
        return res.status(401).send("Ghalat Token!");
    }
}

// Sahi Export (module.exports) ✅
module.exports = { verifyToken };