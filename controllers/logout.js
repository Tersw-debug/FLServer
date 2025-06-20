
const User = require('../data/User');

const handlelogout =  async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.status(204);
    const refreshToken = cookies.jwt;
    const foundUser = await User.findOne({refreshToken: refreshToken}).exec();
    if (!foundUser){
        res.clearCookie('jwt', { httpOnly: true });
        return res.status(204); //No content
    }
    // evaluate password 
    foundUser.refreshToken = '';
    const result = await foundUser.save();
    res.clearCookie('jwt', { httpOnly: true , maxAge: 24 * 60*60 * 1000});
    res.status(204);
}

module.exports =  {handlelogout} ;
/*
Sets
realtion and function
logic 
graph theory
algebric structures
Complexity theory
*/