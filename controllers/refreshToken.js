

const path = require('path');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const usersDB = {
    users: require(path.join(__dirname, '..', 'data', 'users.json')),
    setUsers: function (data) { this.users = data }
}


const handleRefreshToken =  (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(400).json({ 'message': 'Username and password are required.' });
    const refreshToken = cookies.jwt;
    const foundUser = usersDB.users.find(person => person.refreshToken === refreshToken);
    if (!foundUser) return res.sendStatus(401); //Unauthorized 
    // evaluate password 
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err || foundUser.username !== decoded.username) return res.sendStatus(403); //Forbidden
            const accessToken = jwt.sign(
                { "username": decoded.username },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '30s' }
            );
            res.json({ accessToken });
        }
    );
}

module.exports =  {handleRefreshToken} ;