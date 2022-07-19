// Text Data Button
let textButton = document.querySelector('#text-btn');
textButton.addEventListener('click', function() {
    fetchTextData();
});

let fetchTextData = () => {
    axios.get('./data/message.txt').then((response) => {
        if(response.status !== 200){
            console.log(`Something Went Wrong ${response.status}`);
            return; 
        }
        let fileContent = response.data;
        document.querySelector('#text-card').innerHTML = `<h3>${fileContent}</h3>`;
    }).catch((err) => {
        console.error(err);
    });
};

// JSON Data Button
let jsonButton = document.querySelector('#json-btn');
jsonButton.addEventListener('click', function() {
    fetchJSONData();
});

let fetchJSONData = () => {
    axios.get('./data/mobile.json').then((response) => {
        if(response.status !== 200){
            console.log(`Something Went Wrong ${response.status}`);
            return; 
        }
        let mobile = response.data;
        let htmlTemplate = `<ul class="list-group">
                                <li class="list-group-item">ID : ${mobile.id}</li>
                                <li class="list-group-item">BRAND : ${mobile.brand}</li>
                                <li class="list-group-item">COLOR : ${mobile.color}</li>
                                <li class="list-group-item">PRICE : ${mobile.price}</li>
                            </ul>`;
        document.querySelector('#json-card').innerHTML = htmlTemplate;

    }).catch((err) => {
        console.error(err);
    });
};

// API DATA Button
let apiButton = document.querySelector('#api-btn');
apiButton.addEventListener('click', function() {
    fetchAPIData();
});

let fetchAPIData = () => {
    axios.get('https://jsonplaceholder.typicode.com/users').then((response) => {
        if(response.status !== 200){
            console.log(`Something Went Wrong ${response.status}`);
            return; 
        }
        let users = response.data;
        let userList = '';
        for(user of users){
            userList += `<ul class="list-group mt-1">
                            <li class="list-group-item">ID : ${user.id}</li>
                            <li class="list-group-item">NAME : ${user.name}</li>
                            <li class="list-group-item">EMAIL : ${user.email}</li>
                            <li class="list-group-item">CITY : ${user.address.city}</li>
                         </ul>`
        }
        document.querySelector('#api-card').innerHTML = userList;
    }).catch((err) => {
        console.error(err);
    });
};