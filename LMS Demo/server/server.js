import dotenv from 'dotenv'
import app from './app.js'

const PORT = process.env.PORT || '5000';
const ENV = process.env.NODE_ENV || 'development';

dotenv.config();


app.listen(PORT,()=>{

console.log(`Server is running in ${ENV} mode on port ${PORT}`);



})