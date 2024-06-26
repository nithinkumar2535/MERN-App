import express from 'express';
const router = express.Router();
import UserModel from '../models/userModel.js';
import bcrypt from 'bcryptjs'

router.get('/', (req,res)=>{
    if(req.session.name){
        res.json({Valid: true, username: req.session.name, isAdmin: req.session.isAdmin})
    }else{
        res.json({Valid: false})
    }
})

router.post('/register', (req,res)=>{
   bcrypt.hash(req.body.password,10)
        .then((hashedPassword)=>{
            req.body.password = hashedPassword;
            console.log(hashedPassword)
            return UserModel.create(req.body);
        })
        .then(()=>{
            res.status(200).json({message: "success"})
        })
                            
        .catch((error)=>{
            res.status(404).json({message:"email already exist"});
            console.log("email exist");
        })
})

router.post("/login", (req, res) => {
    // Destructuring email and password from req.body
    const { email, password } = req.body;
 
    // Using findOne to fetch single user
    UserModel.findOne({ email: email })
    .then((user) => {
        if (user) { 
            bcrypt.compare(password,user.password)
            .then((result)=>{
                if (result) {
                    req.session.name = user.name;
                   req.session.userId = user.id
                    req.session.isAdmin = user.admin;
                    res.json({Login: true});
                } else {
                    res.json("incorrect password");
                }
            })
            
        } else {
            res.json("invalid email");
        }
    })
    .catch((error) => {
        res.status(500).json(error);
    });
 });

// Logout get request
router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error("Error destroying session", err);
            res.status(500).send("Internal server error");
        } else {
            console.log("Session destroyed successfully");
            res.json("logoutsuccess"); 
        }
    });
});

export default router;

