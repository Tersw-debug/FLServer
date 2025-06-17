
import data from '../data/users.json' with { type: 'json' };
import bcrypt from 'bcryptjs';
import {promises as fs} from 'fs';
import path from 'path';
const __dirname = import.meta.dirname;
import jwt from 'jsonwebtoken';
import 'dotenv/config';
const {sign,verify} = jwt;



const usersDB = {
    users: data,
    setUsers: function (data) { this.users = data }
}


const handleLogin = async (req, res) => {
    const { user, pwd } = req.body;
    if (!user || !pwd) return res.sendStatus(400).json({ 'message': 'Username and password are required.' });
    const foundUser = usersDB.users.find(person => person.username === user);
    if (!foundUser) return res.sendStatus(401); //Unauthorized 
    // evaluate password 
    const match = await bcrypt.compare(pwd, foundUser.password);
    if (match) {
        const role = Object.values(foundUser.roles);
        console.log(role);
        const accessToken = jwt.sign(
            { "username": foundUser.username },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '30s' }
        );
        const refreshToken = sign(
            { "username": foundUser.username },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        );
        const otherUsers = usersDB.users.filter(person => person.username !== foundUser.username);
        const currentUser = { ...foundUser, refreshToken };
        usersDB.setUsers([...otherUsers, currentUser]);
        await fs.writeFile(
            path.join(__dirname, '..', 'data', 'users.json'),
            JSON.stringify(usersDB.users)
        );
        res.cookie('jwt', refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 , sameSite: 'None', secure:false}); //When production secure:true
        res.json({accessToken});
    } else {
        res.sendStatus(401);
    }
}

export { handleLogin };