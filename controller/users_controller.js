require('dotenv').config();

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//import database 


/**
 * 
 * @param {*} req should include body with name, email, password 
 * @param {*} res status and message is returned
 */
const addUser = async (req, res) => {
    try {
        //check if the user already exist in the database
        

        //Stop processing and throw error message if user already exist (email address taken)
        if (user.length > 0){
            const err = new Error('Email taken!');
            err.status = 400;
            throw err;
        }
        
        //new user
        user = {
            name: req.body.name,
            email: req.body.email,
            password: await bcrypt.hash(req.body.password, 12)
        };

        //add user to database

        
        //return user status on successful add to database
        res.status(201).json({
            status: 'success',
            message: 'User Registered'
        });  

    } catch (err) {

        res.status(err.status ? err.status : 401).json({
            status: 'fail',
            message: err.message
        });
    }
}


/**
 * 
 * @param {*} req should include body with email and password
 * @param {*} res status, message, and data with token and user data returned
 */
const loginUser = async (req, res) => {
    try {
        //find the current user by the request email
        //const current = 
        
        //throw error if no user with email
        if(current.length == 0){
            const err = new Error('Invalid Login!');
            err.status = 400;
            throw err;
        } else if (bcrypt.compareSync(req.body.password, current[0].password)) {
            //if the request password matches the current user password
            //generate an access token.
            const tokenPayload = {
                exp: Math.floor(Date.now() / 1000) + (60 * 60),
                email: current[0].email,
                id: current[0].id
            };
            const accessToken = jwt.sign(tokenPayload, process.env.SECRET );
            // return response that includes access token
            res.status(201).json({
                status: 'success',
                message: 'User Logged In!',
                data: {
                    token: accessToken,
                    user: {
                        email: current[0].email,
                        name: current[0].name,
                        id: current[0].id
                    }
                }
            });
        } else {
            // throw error if the password does not match
            const err = new Error('Invalid Login!')
            err.status = 400;
            throw err;
        }

    } catch(err) {
        res.status(err.status ? err.status : 401).json({
            status: err.status,
            message: err.message
        });
    }
}

module.exports = { addUser, loginUser }