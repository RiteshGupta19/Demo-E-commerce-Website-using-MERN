require('dotenv').config();
const express = require('express');
const app = express();
const cors =require("cors")
const authRouter = require('./router/auth-router');
const contactRouter = require('./router/contact-router')
const serviceroute = require("./router/service-route")
const adminroute = require("./router/admin-router")
const connnectdb = require("./utility/db");
const { config } = require('dotenv');
const errorMiddleware = require('./middleware/error-middlewarw');

const corsOption={
  origin:"http://localhost:5174",
  methods:"GET,POST,PUT,DELETE,PATCH,HEAD",
  Credentials:true,
}
app.use(cors(corsOption));

app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/cont', contactRouter);
app.use("/api/data",serviceroute)

app.use("/api/admin",adminroute);
app.use(errorMiddleware)

const PORT = 5000;
connnectdb().then(()=>{
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
});
