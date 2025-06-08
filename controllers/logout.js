

const path = require('path');
const fs = require('fs').promises;
const usersDB = {
    users: require(path.join(__dirname, '..', 'data', 'users.json')),
    setUsers: function (data) { this.users = data }
}


const handlelogout =  async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204);
    const refreshToken = cookies.jwt;
    const foundUser = usersDB.users.find(person => person.refreshToken === refreshToken);
    if (!foundUser){
        res.clearCookie('jwt', { httpOnly: true });
        return res.sendStatus(204); //No content
    }
    // evaluate password 
    const otherUsers = usersDB.users.filter(person => person.refreshToken !== foundUser.refreshToken);
    const currentUser = { ...foundUser, refreshToken: '' };
    usersDB.setUsers([...otherUsers, currentUser]);
    await fs.writeFile(
        path.join(__dirname, '..', 'data', 'users.json'),
        JSON.stringify(usersDB.users)
    );
    res.clearCookie('jwt', { httpOnly: true , maxAge: 24 * 60*60 * 1000});
    res.sendStatus(204);
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