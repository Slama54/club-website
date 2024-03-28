import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

console.log('dfz',process.env)
mongoose.connect(process.env.MONGO).then(
    ()=>{
        console.log('mongoDb is connected')
    }
).catch((err)=>{
    console.log(err)
})
const app = express();
app.listen(3000, ()=>{
    console.log('server is running on port 3000 !!')
});
