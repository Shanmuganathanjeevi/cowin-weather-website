console.log("client side js loaded..!");


const pageForm = document.querySelector('form');
const search = document.querySelector('#pincode');
const locate = document.querySelector('#location');
const message1 = document.querySelector('#message-1');
const message2 = document.querySelector('#message-2');

pageForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value;
    const city = locate.value;
    const pincode = 'pincode=' + location;
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = dd + '-' + mm + '-' + yyyy;
    console.log(today)
    const dateParam = 'date=' + today;
    const apiURL = '/cowin?';
    fetch(apiURL + pincode + '&' + dateParam).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                document.querySelector('#cowin').textContent = 'No vaccine status available for provided pincode';
                data.error
            } else {
                document.querySelector('#cowin').innerHTML = '<tr> <th> VACCINE NAME </th><th>HOSPITAL NAME</th> <th> ADDRESS </th><th>FEE_TYPE</th><th> DOSE - 1 AVAILABLITY </th><th>DOSE-2 AVAILABLITY</th> </tr>' + data.response;
            }
        })
    })
    fetch('/weather?address=' + city).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                data.error
                message1.textContent = data.error;
                message2.textContent = '';
            } else {
                message1.textContent = data.location;
                message2.textContent = data.forecast;
            }
        })
    })
})