import jwt from "jsonwebtoken"

const authMiddleware = (req, res, next) => {
    const token = req.headers.token;

    if (!token) {
        return res.status(401).json({ message: "Token lipsă" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // aici e cheia — atașezi user-ul pe req
        next();
    } catch (err) {
        return res.status(401).json({ message: "Token invalid" });
    }
};

export default authMiddleware;
