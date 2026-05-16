var express=require('express');
var app=express();

var path=require('path');
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.static(path.join(__dirname, 'public')));

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

var authRouter=require('./routers/auth.router');
var serviceRouter=require('./routers/service.router');
    var adminRouter=require('./routers/admin.router');
var bookingRouter=require('./routers/booking.router');
var reviewRouter=require('./routers/review.router');
var userRouter=require('./routers/user.router');
app.use('/api/auth',authRouter);
app.use('/api/services',serviceRouter);
app.use('/api/admin',adminRouter);
app.use('/api/bookings',bookingRouter);
app.use('/api/reviews',reviewRouter);
app.use('/api/users',userRouter);


app.get('/',(req,res)=>{
    res.send("Welcome to Home Services API");
});

app.listen(5000,()=>{
    console.log("Server is running on port 5000");
})