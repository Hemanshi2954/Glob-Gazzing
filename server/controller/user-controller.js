import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import Token from '../model/token.js'
import User from '../model/user.js';

dotenv.config();

export const signupUser = async (request, response) => {
    try {
        // const salt = await bcrypt.genSalt();
        // const hashedPassword = await bcrypt.hash(request.body.password, salt);
        const hashedPassword = await bcrypt.hash(request.body.password, 10);

        const user = { username: request.body.username, name: request.body.name, password: hashedPassword }

        const newUser = new User(user);
        await newUser.save();

        return response.status(200).json({ msg: 'Signup successfull' });
    } catch (error) {
        console.error("Error during signup:", error.message);
        return response.status(500).json({ msg: 'Error while signing up user' });
    }
}


// Login User
export const loginUser = async (request, response) => {
    try {
        // Fetch user from the database
        const user = await User.findOne({ username: request.body.username });
        
        if (!user) {
            // Return error if username is not found
            return response.status(400).json({ msg: 'Username does not exist' });
        }

        // Compare the password
        const match = await bcrypt.compare(request.body.password, user.password);

        if (match) {
            // Generate access and refresh tokens
            const accessToken = jwt.sign(user.toJSON(), process.env.ACCESS_SECRET_KEY, { expiresIn: '15m' });
            const refreshToken = jwt.sign(user.toJSON(), process.env.REFRESH_SECRET_KEY);

            // Save the refresh token to the database
            const newToken = new Token({ token: refreshToken });
            await newToken.save();

            // Send response with tokens and user details
            return response.status(200).json({ 
                accessToken, 
                refreshToken, 
                name: user.name, 
                username: user.username 
            });
        } else {
            // Return error if the password is incorrect
            return response.status(400).json({ msg: 'Incorrect password' });
        }
    } catch (error) {
        console.error("Error during login:", error.message);
        return response.status(500).json({ msg: 'Error while logging in user' });
    }
};

// Logout User
export const logoutUser = async (request, response) => {
    try {
        // Remove the refresh token from the database
        const token = request.body.token;
        await Token.deleteOne({ token });

        // Send a success response
        return response.status(204).json({ msg: 'Logout successful' });
    } catch (error) {
        console.error("Error during logout:", error.message);
        return response.status(500).json({ msg: 'Error while logging out user' });
    }
};