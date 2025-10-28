const express = require("express");
const jwt = require("jsonwebtoken")
const app = express();

const SECRET_KEY = 'supersecretadmin';
const JWT_SECRET = 'your_jwt_secret';

app.use(express.json());

const verifyJWT = (req, res, next) => {
    const token = req.headers["authorization"];
    if (!token) return res.status(401).json({Message: "No token is provided"});

    try{
        // console.log(token);
        const decodeJWT = jwt.verify(token, JWT_SECRET);
        req.user = decodeJWT;
        next();
    }catch{
        return res.status(402).json({Message: "Invalid Token"});
    }
}

app.post('/admin/login', (req, res)=>{
    const {secret} = req.body;

    if(secret === SECRET_KEY){
        const token = jwt.sign({role: "admin"}, JWT_SECRET, {expiresIn: "24h"});
        res.json({token});
    }else{
        res.json({message: "Access granted"});
    }
})

app.get('/admin/api/data', verifyJWT, (req, res)=>{
    res.json({mssage: "Protected route accessible"});
})

app.listen(3000, ()=>{
    console.log("Server is running on port 3000");
    
})