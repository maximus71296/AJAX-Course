import {BrainHttp} from "./api/BrainHttp.js";
const serverURL = `http://127.0.0.1:3000/api`

// GET Button
let getButton = document.querySelector('#get-btn');
getButton.addEventListener('click', function(){
    fetchEmployees();
});

let fetchEmployees = () => {
    let http = new BrainHttp();
    let url = `${serverURL}/employees`;
    http.get(url, (err, employees) => {
        if(err) throw err;
        let tableRows = '';
        for(let employee of employees){
            tableRows += `<tr>
                            <td>${employee.id}</td>
                            <td>${employee.first_name}</td>
                            <td>${employee.last_name}</td>
                            <td>${employee.email}</td>
                            <td>${employee.gender}</td>
                            <td>${employee.ip_address}</td>
                          </tr>`
        }
        document.querySelector('#table-body').innerHTML = tableRows;
    });
};

// POST Button
let postButton = document.querySelector('#post-btn');
postButton.addEventListener('click', function() {
    let url = `${serverURL}/employees`;
    let employee = {
        first_name : 'Rajat',
        last_name : 'Gautam',
        email : 'rajat@gmail.com',
        gender : 'Male',
        ip_address : '127.0.0.5'
    };
    let http = new BrainHttp();
    http.post(url, employee, (data) => {
        alert(JSON.stringify(data));
        fetchEmployees();
    });
});

// PUT Button
let putButton = document.querySelector('#put-btn');
putButton.addEventListener('click', function (){
    let empID = '_abcdef';
    let employee = {
        id : empID,
        first_name : 'Ayush',
        last_name : 'Yadav',
        email : 'ayush_yadav@gmail.com',
        gender : 'Male',
        ip_address : '255.255.255.255'
    };
    let url = `${serverURL}/employees/${empID}`;
    let http = new BrainHttp();
    http.put(url, employee, (data) => {
        alert(JSON.stringify(data));
        fetchEmployees();
    });
});

// DELETE Button
let deleteButton = document.querySelector('#delete-btn');
deleteButton.addEventListener('click', function() {
    let empID = '_uvwxyz';
    let url = `${serverURL}/employees/${empID}`;
    let http = new BrainHttp();
    http.delete(url, (data) => {
        alert(JSON.stringify(data));
        fetchEmployees();
    });
});