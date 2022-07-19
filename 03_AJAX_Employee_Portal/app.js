import { BrainHttp } from "./api/BrainHttp.js";
const serverURL = 'http://127.0.0.1:3000/api';

// DOM Content Loaded
window.addEventListener('DOMContentLoaded', function() {
    fetchAllEmployees();
});

let fetchAllEmployees = () => {
    let http = new BrainHttp();
    let url = `${serverURL}/employees`;
    http.get(url, (err , employees) => {
        if(err) throw err;
        let employeeRows ='';
        for(let employee of employees){
            employeeRows += `<tr>
                                <td>${employee.id}</td>
                                <td>${employee.first_name}</td>
                                <td>${employee.last_name}</td>   
                                <td>${employee.email}</td>
                                <td>${employee.gender}</td>
                                <td>${employee.ip_address}</td>
                                <td>
                                    <button class="btn btn-secondary btn-sm mt-0 update">Update</button>
                                    <button class="btn btn-danger btn-sm mt-0 delete">Delete</button>
                                </td>
                             </tr>`
        }
        document.querySelector('#table-body').innerHTML = employeeRows;
    });
};

// Add Employee Form
let addEmployeeForm = document.querySelector('#add-employee-form');
addEmployeeForm.addEventListener('submit', function(e) {
    e.preventDefault(); // Stop Auto Form Submit
    $('#add-employee-modal').modal('hide'); // Close the modal
    let employee = {
        first_name : document.querySelector('#add-first-name').value,
        last_name : document.querySelector('#add-last-name').value,
        email : document.querySelector('#add-email').value,
        gender : document.querySelector('#add-gender').value,
        ip_address : document.querySelector('#add-ip-address').value, 
    };
    let url = `${serverURL}/employees`;
    let http = new BrainHttp();
    http.post(url , employee , (data) => {
        console.log(data);
        fetchAllEmployees();
        clearFormFields();
    });
});

let clearFormFields = () => {
    document.querySelector('#add-first-name').value = '';
    document.querySelector('#add-last-name').value = '';
    document.querySelector('#add-email').value = '';
    document.querySelector('#add-gender').value = '';
    document.querySelector('#add-ip-address').value = '';
};

// Click Event on entire Table Body
let tableBody = document.querySelector('#table-body');
tableBody.addEventListener('click', function(e) {
    let targetElement = e.target;

    // Click on Delete Button
    if(targetElement.classList.contains('delete')){
        let selectedID = targetElement.parentElement.parentElement.firstElementChild.innerHTML;
        let url =  `${serverURL}/employees/${selectedID}`;
        let http = new BrainHttp();
        http.delete(url, (data) =>{
            fetchAllEmployees();
        });
    }

    // Click on Update Button 
    if(targetElement.classList.contains('update')){
        let selectedID = targetElement.parentElement.parentElement.firstElementChild.innerHTML;
        let http = new BrainHttp();
        let url = `${serverURL}/employees`;
        http.get(url, (err, employees) => {
            if(err) throw err;
            let selectedEmployee = employees.find((employee) => {
                return employee.id === selectedID.trim();
            });
            populateUpdateModal(selectedEmployee);
        });
    }
});

let populateUpdateModal = (selectedEmployee) => {
    document.querySelector('#update-emp-id').value = selectedEmployee.id;
    document.querySelector('#update-first-name').value = selectedEmployee.first_name;
    document.querySelector('#update-last-name').value = selectedEmployee.last_name;
    document.querySelector('#update-email').value = selectedEmployee.email;
    document.querySelector('#update-gender').value = selectedEmployee.gender;
    document.querySelector('#update-ip-address').value = selectedEmployee.ip_address;
    $('#update-employee-modal').modal('show'); // Show the modal
};

// Update Form Submission
let updateEmployeeForm = document.querySelector('#update-employee-form');
updateEmployeeForm.addEventListener('submit', function(e) {
    let employeeID = document.querySelector('#update-emp-id').value.trim();
    e.preventDefault();
    $('#update-employee-modal').modal('hide'); // Hide the modal
    let employee = {
        first_name : document.querySelector('#update-first-name').value,
        last_name : document.querySelector('#update-last-name').value,
        email : document.querySelector('#update-email').value,
        gender : document.querySelector('#update-gender').value,
        ip_address : document.querySelector('#update-ip-address').value, 
    };
    let url = `${serverURL}/employees/${employeeID}`;
    let http = new BrainHttp();
    http.put(url , employee , (data) => {
        console.log(data);
        fetchAllEmployees();
    });
});

