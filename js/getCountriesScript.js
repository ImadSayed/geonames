$.ajax({
    url: "/weather/php/getCountryList.php",
    type: 'POST',
    success: function(result) {
        
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
