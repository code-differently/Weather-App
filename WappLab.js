

// calling API
const weather = document.querySelector(".placeName");

const userZip = prompt("What's your Zip Code?");
const userLink = 'http://api.zippopotam.us/us/' + parseInt(userZip);  

var client = new XMLHttpRequest();
	client.open("GET", userLink,);
	client.onreadystatechange = function() {
   		 if(client.readyState == 4) {
        console.log ('working');
    };
   		 if(client.readyState == 4 && client.status === 200) {
     	   let zipData = JSON.parse(client.responseText);
     		   const {places: 
      		      [{"place name": placeName, state: state, latitude: lat, longitude: lon}]
      	       } = zipData;
						weather.textContent = placeName + ", " + state;
						
		let request = client.open("GET", `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&appid={APIKey}`)
		             console.log(request)								 
			}

}


!function(d,s,id) {
	var js,fjs=d.getElementsByTagName(s)[0];
	if(!d.getElementById(id)){
		js=d.createElement(s);js.id=id;js.src='https://weatherwidget.io/js/widget.min.js';
		fjs.parentNode.insertBefore(js,fjs);}
	}
		(document,'script','weatherwidget-io-js');


client.send();

