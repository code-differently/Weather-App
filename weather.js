// step 1 - create response object
let zipCode = new XMLHttpRequest();
let zip = prompt("enter zipcode to get city & state");


// step 2 - create call back
    zipCode.onreadystatechange = function() {
        if (zipCode.readyState === 4 && zipCode.status === 200) {
            let response = JSON.parse(zipCode.responseText);
            console.log(response);
            let city = response.places[0]["place name"];
            let state = response.places[0]["state abbreviation"];
 document.getElementById('location').innerHTML = city + ", " + state;
        } 
    }
// step 3 - create an open request
    zipCode.open('GET', `http://api.zippopotam.us/US/${zip}`);
// step 4 - send the request 
    zipCode.send();