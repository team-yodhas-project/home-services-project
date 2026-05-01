var express=require('express');
var app=express();

var dotenv=require('dotenv');
dotenv.config();

const cors=require('cors');
app.use(cors());
app.use(express.json());

const bodyParser=require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

var connectDB=require('./db');
connectDB();

app.get('/',(req,res)=>{
    res.send('hello World')
})

app.post('/auth/register',(req,res)=>{
    res.send(req.body)
})

app.listen(5000,()=>{
    console.log("Server is running on port 5000");
})