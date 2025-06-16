const jwt = require("jsonwebtoken");

const ValidateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
    console.log(authHeader)

    if (!authHeader ) {
        console.log("Invalid token format");
        return res.status(401).json({ message: "Unauthorized: Invalid token format" });
    }

    const token = authHeader.split(" ")[1]; 

    try {
        req.user = jwt.verify(token, "Hello Taken"); 
        console.log(req.user)
        next(); 
    } catch (error) {
        console.log("JWT Verification Failed:", error.message);
        return res.status(403).json({ message: "Invalid or expired token", error: error.message });
    }
};

module.exports = { ValidateJWT };
