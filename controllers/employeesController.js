const data = {
    employees: require('../data/employees.json'),
    setEmployees: function (data) { this.employees = data; },
};

const getAllEmployees = (req,res) => {
    res.json(data.employees);
}

const  postAllEmployees = (req, res) => {
    const poEmployee = {
        id:data.employees?.length? data.employees[data.employees.length - 1].id + 1 : 1,
        firstname: req.body.firstname,
        lastname: req.body.lastname
    }
    if(!poEmployee.firstname || !poEmployee.lastname){
        return res.sendStatus(400).json({ "message": "First and last names are required" });
    }
    data.setEmployees([...data.employees, poEmployee]);
    res.sendStatus(201).json(data.employees);
}

const updateAllEmployees = (req, res) => {
    const puEmployee = data.employees.find(emp => emp.id === parseInt(req.body.id));
    if(!puEmployee){
        return res.sendStatus(400).json({ "message": `Employee ID ${req.body.id} not found` });
    }
    if(puEmployee === req.body.firstname || puEmployee === req.body.lastname){
        puEmployee.firstname = req.body.firstname;
        puEmployee.lastname = req.body.lastname;
    }
    const filteredArray = data.employees.filter(emp => emp.id !== parseInt(req.body.id));
    const unsortedArray = [...filteredArray, puEmployee];
    data.setEmployees(unsortedArray.sort((a, b) => a.id - b.id));
    
    res.json(data.employees);
}

const deleteAllEmployees = (req, res) => {
    const employe = data.employees.find(emp => emp.id === parseInt(req.body.id));
    if(!employe){
        return res.sendStatus(400).json({ "message": `Employee ID ${req.body.id} not found` });
    }
    const filteredArray = data.employees.filter(emp => emp.id !== parseInt(req.body.id));
    data.setEmployees([...filteredArray]);
    res.json(data.employees);
}

const getEmployee = (req, res) => {
    const employee = data.employees.find(emp => emp.id === parseInt(req.params.id));
    if(!employee){
        return res.sendStatus(400).json({ "message": `Employee ID ${req.params.id} not found` });
    }
    res.json(employee);
}

module.exports = {
    getAllEmployees,
    postAllEmployees,
    updateAllEmployees,
    deleteAllEmployees,
    getEmployee
}