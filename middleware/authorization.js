require('dotenv').config();
const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const authHeader = req.headers.authorization;
    
    //if there is no auth header access denied
    if (!authHeader){
        res.status(401).json({
            status: 'fail',
            message: 'Unauthorized!'
        });
    }

    //get the second part of the authorization header
    //authorization: Bearer <JWT TOKEN>
    const token = authHeader.split(' ')[1];

    try {
        //if the token is valid save the user info into the request
        const user = jwt.verify(token, process.env.SECRET);
        req.user = user;
        next();
    } catch (err) {
        //if token not valid or something goes wrong
        res.status(401).json({
            status: 'fail',
            message: 'Unauthorized!'
        });
    }

};

module.exports = auth;