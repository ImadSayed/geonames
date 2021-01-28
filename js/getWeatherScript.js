$('#btnSubmit').click(async function() {
    
    let $north, $south, $east, $west, $j;
    try {
        $data = await $.ajax({
        url: "/weather/php/getCountryList.php",
        type: 'POST'
        })

        $countryCode = $('#dd_country').val();
        console.log("countrycode: "+$countryCode);
        for(let i = 0; i < $data['data'].length; i++) {
            if($countryCode === $data['data'][i]['countryCode']) {
                $north = $data['data'][i]['north'];
                $south = $data['data'][i]['south'];
                $east = $data['data'][i]['east'];
                $west = $data['data'][i]['west'];
                $j = i;
                console.log("nsew:"+ $north + ", " + $south + ", " + $east + ", " + $west + ", i = "+$j);
            }
        }
        console.log("2nd nsew:"+ $north + ", " + $south + ", " + $east + ", " + $west + ", i = "+$j);

        $result = await $.ajax({
            url: "/weather/php/getWeather.php",
            type: 'POST',
            dataType: 'json',
            data: {
                north: $north,
                south: $south,
                east: $east,
                west: $west,
            }
        })
            //success: function(result) {
        console.log("weather results: "+$result['data']);
        let date  = new Date();

        if ($result.status.name == "ok") {
            if($result['data'][0] == null || $result['data'][0] == undefined) {
                $('#msg').html('Unfortunately the geonames api currently holds no weather data on this country!')
            }else{
                $('#weatherDiv').css('display','block');
                $('#date').html($result['data'][0]['datetime']);
                $('#station').html($result['data'][0]['stationName']);
                $('#longitude').html($result['data'][0]['lng']);
                $('#latitude').html($result['data'][0]['lat']);
                $('#temperature').html($result['data'][0]['temperature']).css('text-align', 'center');
                $('#humidity').html($result['data'][0]['humidity']).css('text-align', 'center');
                $('#condition').html($result['data'][0]['weatherCondition']).css('text-align', 'center');
                $('#direction').html($result['data'][0]['windDirection']).css('text-align', 'center');
                $('#speed').html($result['data'][0]['windSpeed']).css('text-align', 'center');
                $('#clouds').html($result['data'][0]['clouds']).css('text-align', 'center');
                $('#dew').html($result['data'][0]['dewPoint']).css('text-align', 'center');
            }
        }
            
            //}

        /*
        success: function(countryResult) {
            $countryCode = $('#dd_country').val();
            console.log("countrycode: "+$countryCode);
            for(let i = 0; i < countryResult['data'].length; i++) {
                if($countryCode === countryResult['data'][i]['countryCode']) {
                    $north = countryResult['data'][i]['north'];
                    $south = countryResult['data'][i]['south'];
                    $east = countryResult['data'][i]['east'];
                    $west = countryResult['data'][i]['west'];
                    $j = i;
                    console.log("nsew:"+ $north + ", " + $south + ", " + $east + ", " + $west + ", i = "+$j);
                }
            }
            //found parameters for following request
             
        },
        error: function(e) {
            console.error("outer error: "+e.message);
        }
        })

        

        ,
            error: function(error) {
                console.error("inner error: "+error);
            }
        });
        */



    }
    catch(err) {
        console.log(err);
        console.error(err);
    }
    
});
              
