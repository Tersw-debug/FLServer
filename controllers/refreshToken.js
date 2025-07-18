

const path = require('path');
const jwt = require('jsonwebtoken');
const User = require('../data/User');

const handleRefreshToken = async (req, res) => {
    const cookies = req.cookies;
    if(!cookies?.jwt) return res.sendStatus(401).json({ 'message': 'No refresh token found.' });
    const refreshToken = cookies.jwt;
    const foundUser = await User.findOne({refreshToken: refreshToken}).exec();
    if(!foundUser){
        res.clearCookie('jwt', { httpOnly: true });
        return res.sendStatus(403).json({ 'message': 'Forbidden: Invalid refresh token.' }); // Forbidden
    }
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) =>{
            const roles = Object.values(foundUser.roles);
            if(err || foundUser.username !== decoded.username){
                res.clearCookie('jwt', { httpOnly: true });
                return res.sendStatus(403).json({ 'message': 'Forbidden: Invalid refresh token.' }); // Forbidden
            }
            const accessToken = jwt.sign(
                {
                     "UserInfo": {
                        "username": decoded.username,
                        "roles": roles
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '30s' }
            )
            res.json({accessToken});
        }
    );

}

module.exports =  {handleRefreshToken};