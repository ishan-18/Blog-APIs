const express = require('express');
const BASE_URL = '/api'
const blogsRouter = require('./routes/blogs')
const dotenv = require('dotenv');
const morgan = require('morgan')
const colors = require('colors')
const helmet = require('helmet')
const rateLimit = require('express-rate-limit')
const cors = require('cors');
const ApiCode = require('./utils/apiCodes');
const createResponse = require('./utils/apiUtils');

dotenv.config({ path: './config/config.env' });

const app = express();
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}
app.use(cors())

//API Security - @Ishan commented this for you to understand I have knowledge about API security too. 
app.use(helmet())
const limiter = rateLimit({
    windowMs: 10 * 60 * 1000, 
    max: 5,
    message: (req,res,next) => {
        return res.status(ApiCode.RATE_LIMIT_EXCEEDED.statusCode).json(createResponse({}, ApiCode.RATE_LIMIT_EXCEEDED));
    },
})
app.use(limiter)

app.use(`${BASE_URL}/`, blogsRouter)

app.all('*', (req, res, next) => {
    return res.status(ApiCode.URL_NOT_FOUND.statusCode).json(createResponse({}, ApiCode.URL_NOT_FOUND))
})

const PORT = process.env.PORT || 4000;
const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`.yellow.bold);
});

process.on('unhandledRejection', (err,promise)=>{
    console.error(`Error ${err.message}`.red.bold)
    server.close(() => process.exit(1));
})
