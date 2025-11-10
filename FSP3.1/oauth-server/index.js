const express = require("express");
const app = express();
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();
const PORT = process.env.PORT || 4000;

const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.get("/", (req, res)=>{
    res.json(`<h1>Welcome to OAuth API server.</h1>`)
})

app.get("/auth/github", (req, res)=>{
    const gitHubUrl = `https://github.com/login/oauth/authorize?clientid? =${process.env.GITHUB_CLIENT_ID}&scope=user,repo,security_events`;
    res.redirect(gitHubUrl);
})

app.get("/auth/github/callback",async (req, res)=>{
    const {code} = req.query;
    try {
        const tokenResponse = await axios.post(`https://github.com/login/oauth/access_token`,{
            client_id: process.env.GITHUB_CLIENT_ID,
            client_secret: process.env.GITHUB_CLIENT_SECRET,
            code,
        },{
            headers: {Accept: "application/json"}
        })
        const accessToken = tokenResponse.data.access_token;
        res.cookie("access_token: ", accessToken);
        return res.redirect(`${process.env.FRONTEND_URL}/v1/profile/github`);
    } catch (error) {
        res.status(500).json(error);
    }
})

app.listen(PORT,()=>{
    console.log(`Server is running http://localhost:${PORT}`);
});