// Text Button
let textButton = document.querySelector('#text-btn');
textButton.addEventListener('click', function(){
    fetchTextData();
});

let fetchTextData = () => {
    fetch('./data/message.txt').then((response) => {
        if(response.status !== 200){
            console.log(`something went wrong ${response.status}`);
            return;
        }
        response.text().then((data) => {
            let htmlTemplate = `<h3>${data}</h3>`;
            document.querySelector('#text-card').innerHTML = htmlTemplate;
        });
    });
};

// JSON Button
let jsonButton = document.querySelector('#json-btn');
jsonButton.addEventListener('click', function() {
    fetchJSONData();
});

let fetchJSONData = () => {
    fetch('./data/mobile.json').then((response) => {
        if(response.status !== 200){
            console.log(`Somethins Went Wrong ${response.status}`);
            return;
        }
        response.json().then((data) => {
            let mobile = data;
            let htmlTemplate = `<ul class="list-group mt-1">
                                    <li class="list-group-item">ID : ${mobile.id}</li>
                                    <li class="list-group-item">BRAND : ${mobile.brand}</li>
                                    <li class="list-group-item">COLOR : ${mobile.color}</li>
                                    <li class="list-group-item">PRICE : ${mobile.price}</li>
                                </ul>`;
            document.querySelector('#json-card').innerHTML = htmlTemplate;
        });
    });
};

// API Button
let apiButton = document.querySelector('#api-btn');
apiButton.addEventListener('click', function () {
    fetchAPIData();
});

let fetchAPIData = () => {
    fetch('https://jsonplaceholder.typicode.com/users').then((response) => {
        if(response.status !== 200){
            console.log(`SOmething Went Wrong ${response.status}`);
            return;
        }
        response.json().then((data) => {
            let users = data;
            let userListTemplate = '';
            for(let user of users){
                userListTemplate += `<ul class="list-group mt-1">
                                        <li class="list-group-item">ID : ${user.id}</li>
                                        <li class="list-group-item">NAME : ${user.name}</li>
                                        <li class="list-group-item">EMAIL : ${user.email}</li>
                                        <li class="list-group-item">CITY : ${user.address.city}</li>
                                     </ul>`;
            }
            document.querySelector('#api-card').innerHTML = userListTemplate;
        });
    });
};