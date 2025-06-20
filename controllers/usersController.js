import bcrypt from 'bcryptjs';
import User from '../data/User.js';





const handleNewUser = async (req, res) => {
    const { user, pwd, email, phone } = req.body;
    if (!user || !pwd || !email || !phone) return res.sendStatus(400).json({ 'message': 'Username, password, email, and phone are required.' });
    // check for duplicate usernames in the db
    const duplicate = await User.findOne( {$or: [{ username: user }, { email: email }]}).exec();
    if (duplicate) return res.sendStatus(409); //Conflict 
    try {
        //encrypt the password
        const salt = await bcrypt.genSalt(10);
        const hashedPwd = await bcrypt.hash(pwd, salt);
        //store the new user
        const newUser = new User({
            username: user,
            password: hashedPwd,
            email: email,
            phone: phone
        });
        const result = await newUser.save();
        res.status(201).json({ 'message': `New user ${user} created successfully.` });
    }
    catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}

const getAllusers = async (req,res) =>{
    const result = await User.find().exec();
    res.json(result);
}
const deleteSomeUser = async (req,res) => {
    if(!req?.body?.id){
        res.status(400).json({"message":"Please specify an id."});
    }
    const result = await User.deleteOne({_id: req.body.id}).exec();
    res.json(result);
}

const getSomeUser = async (req,res) => {
    if(!req?.params?.id)
    {
        return res.status(400).json({"message" : "Employee id required."});
    }
    const result = await User.findOne({_id: req.params.id}).exec();
    res.json(result);
}

export  { 
    handleNewUser,
    getAllusers, 
    deleteSomeUser,
    getSomeUser 
};