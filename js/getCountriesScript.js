$.ajax({
    url: "/weather/php/getCountryList.php",
    type: 'POST',
    success: function(result) {

        //console.log(result);

        if (result.status.name == "ok") {
            const len =  result['data'].length; //results array length

            /*function fillCountryList() {
                const container = document.getElementById('country');   //html input text box
                container.setAttribute('list','countries'); // set textbox list attribute

                let dl = document.createElement('datalist');    //create a new datalist element
                dl.id = 'countries';    //set the datalist id

                for (let i = 0; i < len; i++) {
                    let option = document.createElement('option');  //create option element
                    option.value = result['data'][i]['countryName']; //assign option value
                    dl.appendChild(option); //append option to datalist
                }
                container.appendChild(dl);  //add datalist as child of input text box
            }*/

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


            //fillCountryList();
            fillDropDownList();

        }
    
    },
    error: function(error) {
        // your error code
        console.log("Error - getCountriesScript.js - : "+error.message);
    }
}); 