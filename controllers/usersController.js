import bcrypt from 'bcryptjs';
import path from 'path';
import {promises as fs} from 'fs';
import data from '../data/users.json' with { type: 'json' };
const __dirname = import.meta.dirname;


const usersDB = {
    users: data,
    setUsers: function (data) { this.users = data }
}



const handleNewUser = async (req, res) => {
    const { user, pwd } = req.body;
    if (!user || !pwd) return res.sendStatus(400).json({ 'message': 'Username and password are required.' });
    // check for duplicate usernames in the db
    const duplicate = usersDB.users.find(person => person.username === user);
    if (duplicate) return res.sendStatus(409); //Conflict 
    try {
        //encrypt the password
        const salt = await bcrypt.genSalt(10);
        const hashedPwd = await bcrypt.hash(pwd, salt);
        //store the new user
        const newUser = { "username": user,"pwd": hashedPwd};
        usersDB.setUsers([...usersDB.users, newUser]);
        await fs.writeFile(
            path.join(__dirname, '..', 'data', 'users.json'),
            JSON.stringify(usersDB.users)
        );
    }
    catch (err) {
        res.sendStatus(500).json({ 'message': err.message });
    }
}


export  { handleNewUser };