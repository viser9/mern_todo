const express = require('express');
const { User } = require('./db/user.model');
const app = express();
const jwt = require('jsonwebtoken');
require('dotenv').config()
const jwtPass = process.env.JWT_TOKEN;


app.use(express.json())

function validate(req,res,next){
    const userName = req.body.username;
    const userPassword = req.body.password;
    if(userName && userPassword)
        next();
    else    
        res.status(404).send('Enter valid username or password')
}

app.post('/user/signin',validate,(req,res)=>{
    const userName = req.body.username;
    const userPassword = req.body.password;
    try{
        User.create({
            username :userName,
            password : userPassword,
        })
        res.send('new user created');
    }
    catch(err){
        res.status(404).send('User not created');
    }
})

app.post('/user/login',validate,async(req,res)=>{
    const userName = req.body.username;
    const userPassword = req.body.password;
    try{
        let user = await User.findOne({username : userName})
        console.log(user.username);
        if(user.password === userPassword){
            const token = jwt.sign({
                username : userName,
                password : userPassword
            },jwtPass)
            res.send(token);
        }
        else    
            res.status(404).send('incorrect password or username');
    }catch(err){
        console.log(err);
        res.send('User not registered');
    }
})

app.post('/user/todo',async (req,res)=>{
    const token = req.body.token;
    const data = jwt.verify(token,jwtPass);
    const userName = data.username;
    const todo = req.body.title;
    const desc = req.body.description;
    try{
        let user = await User.findOne({username : userName});
        let todoId = user.todos.length+1;
        user.todos.push({
            id : todoId,
            title : todo,
            description : desc
        })
        await user.save();
        res.send(user);
    }catch(err){
        console.log(err);
    }
})

app.get('/user/todo',async(req,res)=>{
    const token = req.query.token;
    const data = jwt.verify(token,jwtPass);
    const username = data.username;
    try{
        let user = await User.findOne({username : username});
        res.send(user);
    }catch(err){
        console.log(err);
    }
})

app.post('/user/deleteTodo',async(req,res)=>{
    const id = req.body.id;
    try {
        // Assuming User is the mongoose model based on userSchema
        const user = await User.findOneAndUpdate(
            { 'todos._id': id },
            { $pull: { todos: { _id: id } } },
            { new: true }
        );

        if (user) {
            res.send('Item deleted');
        } else {
            res.status(404).send('Todo not found');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
})

app.listen(3000,()=>{
    console.log('listening on port 3000');
})