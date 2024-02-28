const userModel = require('../model/user.model'); // Import user model for interacting with user data
const { success, failed, successWithToken } = require('../helper/response'); // Import response helper functions

const bcrypt = require('bcrypt'); // Import bcrypt for password hashing
const jwtToken = require('../helper/generateJWT'); // Import JWT token generation helper

module.exports = {
    // Controller for user registration
    register: (req, res) => {
        try {
            const { name, email, phone, password, level } = req.body; // Extract user data from request body

            // Hash the password using bcrypt
            bcrypt.hash(password, 10, (err, hash) => {
                if (err) {
                    failed(res, err.message, 'Failed', 'Hash Password Failed'); // Handle password hashing error
                }
                const data = { // Create user data object with hashed password
                    name,
                    email,
                    phone,
                    password: hash,
                    level,
                    image: 'https://res.cloudinary.com/dmkviiqax/image/upload/v1670737726/default_frc_pr_f6t9gz.png', // Default image URL
                }

                // Check if the email is already taken
                userModel.checkEmail(email)
                    .then((result) => {
                        if (result.rowCount === 0) { // If email is not taken
                            // Register the user with the provided data
                            userModel.register(data)
                                .then((result) => {
                                    success(res, result.rowCount, 'success', 'Register Success'); // Successful registration response
                                })
                                .catch((err) => {
                                    failed(res, err.message, 'failed', 'Register Failed'); // Handle registration failure
                                })
                        } else {
                            failed(res, null, 'failed', 'Email is already taken'); // Handle existing email error
                        }
                    })
                    .catch((err) => {
                        failed(res, err.message, 'failed', 'Failed to check user email'); // Handle email check failure
                    })
            })
        } catch (err) {
            console.log(err); // Log any unexpected errors
        }
    },

    // Controller for user login
    login: (req, res) => {
        const { email, password } = req.body; // Extract email and password from request body

        // Check if the email exists in the database
        userModel.checkEmail(email)
            .then((result) => {
                const user = result.rows[0]; // Extract user data from query result
                if (result.rowCount > 0) { // If user with the email exists
                    // Compare the provided password with the hashed password in the database
                    bcrypt.compare(password, user.password)
                        .then(async (result) => {
                            if (result) { // If password matches
                                // Generate JWT token for authentication
                                const token = await jwtToken({
                                    email: user.email,
                                    level: user.level,
                                })
                                // Successful login response with JWT token
                                successWithToken(res, user, token, 'success', 'Login Success');
                            } else {
                                failed(res, null, 'failed', 'Email or Password Incorrect'); // Handle incorrect password
                            }
                        })
                } else {
                    failed(res, null, 'failed', 'Email or Password Incorrect'); // Handle non-existent email
                }
            })
            .catch((err) => {
                failed(res, err.message, 'failed', 'Internal server error'); // Handle database query error
            })
    },

    // Controller for checking email existence
    checkEmail: (req, res) => {
        const email = req.params.email; // Extract email from request parameters

        // Check if the email exists in the database
        userModel.checkEmail(email)
            .then((result) => {
                success(res, result.rows, 'success', 'Get email user success'); // Successful response with email data
            })
            .catch((err) => {
                failed(res, err.message, 'failed', 'Get email user failed'); // Handle email check failure
            });
    },
}
