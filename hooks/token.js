import jwt from "jsonwebtoken";

const generateToken = async ({ _id, email }) => {
    try {
        return jwt.sign({
            userId: _id.toString(),
            email: email,
        },
            process.env.JWT_SECRET_KEY
        )
    } catch (error) {
        console.error(error);
    }
}

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).send("Access denied. No token provided.");
    }

    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decoded; // Attach decoded user info to request object
        next(); // Continue to the next middleware/route handler
    } catch (error) {
        return res.status(403).send("Invalid token.");
    }
};

export {
    generateToken,
    authenticateToken
} 
