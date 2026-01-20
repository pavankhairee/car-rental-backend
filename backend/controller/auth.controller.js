import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { pgClinet } from '../database.js'


const register = async (req, res) => {

    try {
        const { username, password } = req.body;
        const hashPassword = await bcrypt.hash(password, 10)
        await pgClinet.query(`INSERT INTO users (username, password) VALUES($1,$2);`,[username, hashPassword])
        
        
        res.status(201).json({
            message: "user registered succesfull"
        })
    } catch (err) {
        res.status(500).json({
            message: "Registered Failed",
            err
        })
    }

}

const login = async (req, res) => {
    const { username, password } = req.body;
    const result = await pgClinet.query(`SELECT * FROM users WHERE username = $1;`, [username])
    const User = result.rows[0]
    console.log(User)

    const isPassword = await bcrypt.compare(password, User.password)

    if (!isPassword) {
        return res.status(401).json({ message: 'Incorrect Password Or Incorrect Crendentials' })
    }

    const token = jwt.sign({
        id: User.id
    }, process.env.USERJWT,
        { expiresIn: '7d' }
    );

    res.json({
        token,
        User: {
            id: User.id,
            username: User.username
        }
    })

}

const getMe = async (req, res) => {
    const User_id = req.User.id
    const result = await pgClinet.query(`SELECT * FROM users WHERE id = $1;`, [User_id])
    res.json({
        users: result.rows[0]
    })
}

export { register, login, getMe }