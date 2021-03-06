console.log('hello this is client javascript');



const weatherForm = document.querySelector('form');
const search = document.getElementById('search');
const weatherMsg = document.getElementById("p_msg");
const locationMsg = document.getElementById("p_location");

weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    
    locationMsg.textContent = 'Loading Weather Information ...';
    weatherMsg.textContent = '';
    const location = search.value;

    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            var returnStr = '';
            if(data.error){
                returnStr = data.error;
            }
            else{
                locationMsg.textContent = data.location;
                weatherMsg.textContent = data.forecast;
            }
        });
    });    
});