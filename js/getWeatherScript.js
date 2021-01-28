$('#btnSubmit').click(async function() {
    
    let $north, $south, $east, $west, $j;
    try {
        $data = await $.ajax({
        url: "/weather/php/getCountryList.php",
        type: 'POST'
        })

        $countryCode = $('#dd_country').val();
        for(let i = 0; i < $data['data'].length; i++) {
            if($countryCode === $data['data'][i]['countryCode']) {
                $north = $data['data'][i]['north'];
                $south = $data['data'][i]['south'];
                $east = $data['data'][i]['east'];
                $west = $data['data'][i]['west'];
            }
        }

        $result = await $.ajax({
            url: "/weather/php/getWeather.php",
            type: 'POST',
            dataType: 'json',
            data: {
                north: $north,
                south: $south,
                east: $east,
                west: $west
            }
        })

        if($result.status.name == "ok") {
            if($result['data'][0] == null || $result['data'][0] == undefined) {
                $('#msg').html('Unfortunately the geonames api currently holds no weather data on this country!')
            }else{
                $('#msg').html('');
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
        success: function($data) {
            $countryCode = $('#dd_country').val();
            console.log("countrycode: "+$countryCode);
            for(let i = 0; i < $data['data'].length; i++) {
                if($countryCode === $data['data'][i]['countryCode']) {
                    $north = $data['data'][i]['north'];
                    $south = $data['data'][i]['south'];
                    $east = $data['data'][i]['east'];
                    $west = $data['data'][i]['west'];
                    $j = i;
                }
            }
        },
        error: function(e) {
            console.error("outer error: "+e.message);
        }
        })
        */



    }
    catch(err) {
        console.log(err);
        console.error(err);
    }
    
});
              
