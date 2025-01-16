const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const connectDB = require("./db/connectDB");
const userModel = require("./model/userModel");
const port = process.env.PORT || 3005;

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors(
    {
        origin: process.env.FRONTEND_URL,
        methods: 'GET, POST',
        allowedHeaders: '*',
        credentials: true
    }
));


app.get("/", (req, res) => {
    res.json({
        msg: "Hellow moto"
    });
})

app.post("/login", async (req, res) => {
    try {
        const { name, email, password, number } = req.body;

        if(!name || !email || !password || !number ) {
            return res.status(400).json({
                msg: "All fields are required"
            });
        }

        const user = await userModel.findOne({ email });
        if(user) {
            return res.status(404).json({
                msg: "User already exit"
            });
        }

        const payload = {
            name,
            email,
            password,
            number
        };

        const newUser = await userModel(payload);
        newUser.save();

        return res.status(200).json({
            msg: "User created successfully",
            newUser,
        });

    } catch (error) {
        return res.status(500).json({
            msg: error.message || error
        })
    }
});

app.listen(port, () => {
    console.log(`Port is listening on ${port}`);
})
connectDB();