import express from 'express';
import bcrypt from 'bcrypt';
import User from './../models/User.js';
import jwt from 'jsonwebtoken';

const login = express.Router();

login.post('/', async (req, res) =>{
    const { email, password } = req.body;

    const registeredUser = await User.findOne(
        { where: {email }}
    ).catch(
        (err) => {
            console.log("Error: ", err);
        }
    )
        if(!registeredUser) {
            return res 
            .status(400)
            .json({message: "Email ou Senha Inválidos. "})
        }
        if (bcrypt.compareSync(password, registeredUser.password)) {
            return res 
            .status(400)
            .json({message: "Email ou Senha Inválidos. "})
    }
    const token = jwt.sign(
        {
            id: registeredUser.id,
            name: registeredUser.name,
            admin: registeredUser.admin
        },
        process.env.JWT_SECRET,
        
        {
            expiresIn: '1h'
        }
    );

        res.json(
            {
                mesage: "BEM VINDO! ",
                token: token
            }
        )
});

export default login;