const Employee = require('../data/Employee');
const getAllEmployees = async (req, res) => {
   const database = await Employee.find({}, '-password -refreshToken').exec();
   if(!database) return res.status(204).json({"message":"There's no employee."});
   res.json(database);
} 

const createNewEmployee = async (req, res) => {
    if(!req?.body?.firstname || !req?.body?.lastname)
    {
        return res.status(400).json({"message":"firstname and lastname are must."});
    }
    const duplicate = await Employee.findOne({firstName: req.body.firstame});
    if(duplicate){
        res.status(401).json("Message error: firstname cannot be duplicated.");
    }
    try{
        const newEmployee = new Employee({
            firstName: req.body.firstname,
            lastName: req.body.lastname,
            Age: req.body.Age
        });
        result = await newEmployee.save();
        res.status(201).json(result);
    }
    catch(err) {
        console.error(err);
    }
}

const updateEmployee = async (req, res) => {
    if(!req?.body?.id){
        return res.status(400).json({"message":"require id to update employee"});
    }
    const employee = await Employee.findOneAndUpdate({_id:req.body.id},       //68549ff1d35e7f334c944f07
    {
        firstName: req.body.firstname,
        lastName: req.body.lastname,
        Age: req.body.Age
    }).exec();
    if (!employee) {
        return res.status(400).json({ "message": `Employee ID ${req.body.id} not found` });
    }
    const result = await employee.save();
    res.json(result);
}

const deleteEmployee = async (req, res) => {
    if(!req?.body?.id) {return res.status(400).json({"message" : "Employee id required."});}
    const employee = await Employee.findOne({_id: req.body.id}).exec();
    if (!employee) {
        return res.status(204).json({ "message": `Employee ID ${req.body.id} not found` });
    }
    const result = await employee.deleteOne({_id: req.body.id}).exec();
    res.json(result);
}

const getEmployee = async (req, res) => {
     if(!req?.params?.id) {return res.status(400).json({"message" : "Employee id required."});}
    const employee = await Employee.findOne({_id: req.params.id}).exec();
    if (!employee) {
        return res.status(400).json({ "message": `Employee ID ${req.params.id} not found` });
    }
    res.json(employee);
}

module.exports = {
    getAllEmployees,
    createNewEmployee,
    updateEmployee,
    deleteEmployee,
    getEmployee
}