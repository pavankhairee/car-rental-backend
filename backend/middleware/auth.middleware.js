import "dotenv/config"
import jwt from "jsonwebtoken"

const AuthMiddlware = async (req, res, next) => {

    try {
        const authHeader = req.headers.auth;
        if (!authHeader) {
            return res.status(401).json({ message: "Authorization header missing" })
        }

        const token = authHeader

        if (!token) {
            res.status(401).json({ message: "Token Missing" })
        }

        const decoded = jwt.verify(token, process.env.USERJWT)

        req.User = {
            id: decoded.id
        };
        next()
    } catch (err) {
        res.status(401).json({ message: "Invalid or expire token" })
    }

}

export { AuthMiddlware }