// Text Data
let textBtn = document.querySelector('#text-btn');
textBtn.addEventListener('click', function (){
    
    // AJAX
    // Create an AJAX request
    let xhr = new XMLHttpRequest();

    // Prepate the request
    xhr.open('GET', './data/message.txt', true);

    // Send the request
    xhr.send();

    // Process the request 
    xhr.onload = () => {
        if(xhr.status === 200){
            let data = xhr.responseText;
            displayTextData(data);
        }
    };
});

// Display Text Data
let displayTextData = (data) => {
    let htmlTemplate = `<h3>${data}</h3>`;
    document.querySelector('#text-card').innerHTML = htmlTemplate;
};

// JSON Data 
let jsonBtn = document.querySelector('#json-btn');
jsonBtn.addEventListener('click', function () {
    let xhr = new XMLHttpRequest();

    xhr.open('GET', './data/mobile.json', true);

    xhr.send();

    xhr.onload = () => {
        if(xhr.status === 200){
            let data = xhr.responseText;
            let mobile = JSON.parse(data);
            displayJsonData(mobile);
        }
    }
});

// Display JSON Data
let displayJsonData = (mobile) => {
    let htmlTemplate = '';
    htmlTemplate = `<ul class="list-group mt-1">
                        <li class="list-group-item">ID : ${mobile.id}</li>
                        <li class="list-group-item">BRAND : ${mobile.brand}</li>
                        <li class="list-group-item">COLOR : ${mobile.color}</li>
                        <li class="list-group-item">PRICE : ${mobile.price}</li>
                    </ul>`;
    document.querySelector('#json-card').innerHTML = htmlTemplate;
};

// API Data
let apiBtn = document.querySelector('#api-btn');
apiBtn.addEventListener('click', function (){
    let xhr = new XMLHttpRequest();

    xhr.open('GET','https://jsonplaceholder.typicode.com/users', true);

    xhr.send();

    xhr.onload = () => {
        if(xhr.status === 200){
            let data = xhr.responseText;
            let users = JSON.parse(data);
            displayApiData(users);
        }
    };
});

// Display API Data
let displayApiData = (users) => {
    let htmlTemplate = '';
    for(let user of users){
        htmlTemplate += `<ul class="list-group mt-2">
                            <li class="list-group-item">ID : ${user.id}</li>
                            <li class="list-group-item">NAME : ${user.name}</li>
                            <li class="list-group-item">EMAIL : ${user.email}</li>
                            <li class="list-group-item">STREET : ${user.address.street}</li>
                            <li class="list-group-item">CITY : ${user.address.city}</li>
                        </ul>`;
    }
    document.querySelector('#api-card').innerHTML = htmlTemplate;
};