$.ajax({
    url: "/weather/php/getCountryList.php",
    type: 'POST',
    success: function(result) {

        //console.log(result);

        if (result.status.name == "ok") {
            const len =  result['data'].length; //results array length

            function fillDropDownList() {
                const container = document.getElementById('dd_country');   //html drop down list <select>
                
                for(let i = 0; i < len; i++) {
                    let opt = document.createElement('option'); //create an option for the drop down list
                    opt.value = result['data'][i]['countryCode']; //assign option value
                    let text = document.createTextNode(result['data'][i]['countryName']);
                    opt.appendChild(text);
                    container.appendChild(opt);
                }
            }
            fillDropDownList();
        }
    
    },
    error: function(error) {
        // your error code
        console.log("Error - getCountriesScript.js - : "+error.message);
    }
}); 

/*
    {"lng":-78.1672389,"observation":"KGVQ 280007Z AUTO 30007KT 10SM BKN026 M07/M08 A3019 RMK AO2 FZRANO",
    "ICAO":"KGVQ",
    "clouds":"broken clouds",
    "dewPoint":"-8",
    "cloudsCode":"BKN",
    "datetime":"2021-01-28 00:07:00",
    "temperature":"-7",
    "humidity":92,
    "stationName":"Genesee County Airport",
    "weatherCondition":"n/a",
    "windDirection":300,
    "windSpeed":"07",
*/