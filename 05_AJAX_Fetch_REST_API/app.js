import { BrainHttp } from "./api/BrainHttp.js"

let serverURL = `http://127.0.0.1:3000/api`;

// GET Button
let getButton = document.querySelector('#get-btn');
getButton.addEventListener('click', function() {
    fetchEmployees();
});

// Fetch Employees
let fetchEmployees = () => {
    let url = `${serverURL}/employees`;
    BrainHttp.get(url).then((data) => {
        let employees = data;
        let employeeRows = '';
        for(let employee of employees){
            employeeRows += `<tr>
                                <td>${employee.id}</td>
                                <td>${employee.first_name}</td>
                                <td>${employee.last_name}</td>
                                <td>${employee.email}</td>
                                <td>${employee.gender}</td>
                                <td>${employee.ip_address}</td>
                             </tr>`
        }
        document.querySelector('#table-body').innerHTML = employeeRows;
    }).catch((err) => {
        console.error(err);
    });
};

// POST Button
let postButton = document.querySelector('#post-btn');
postButton.addEventListener('click', function() {
    let url = `${serverURL}/employees`;
    let newEmployee = {
        first_name : 'Rajat',
        last_name : 'Gautam',
        email : 'rajat@gmail.com',
        gender : 'Male',
        ip_address : '124.123.122.121'
    };
    BrainHttp.post(url, newEmployee).then((data) => {
        console.log(data);
        fetchEmployees();
    }).catch((err) => {
        console.error(err);
    });
});

// PUT Button
let putButton = document.querySelector('#put-btn');
putButton.addEventListener('click', function() {
    let employeeID = '_abcdef';
    let url =  `${serverURL}/employees/${employeeID}`;
    let updatedEmployee = {
        first_name : 'Ayush',
        last_name : 'Yadav',
        email : 'ayush_yadav@gmail.com',
        gender : 'Male',
        ip_address : '255.255.255.255'
    };
    BrainHttp.put(url, updatedEmployee).then((data) => {
        console.log(data);
        fetchEmployees();
    }).catch((err) => {
        console.error(err);
    });
});

// DELETE Button
let deleteButton = document.querySelector('#delete-btn');
deleteButton.addEventListener('click', function() {
    let employeeID = '_uvwxyz';
    let url =  `${serverURL}/employees/${employeeID}`;
    BrainHttp.delete(url).then((data) => {
        console.log(data);
        fetchEmployees();
    }).catch((err) => {
        console.error(err);
    });
});