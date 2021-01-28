$('#timezoneBtn').click(async function() {
    
    let $north, $south, $east, $west; //need these to get variables below
    let $longitude, latitude; //need these variables for api fetch
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

        $weatherResults = await $.ajax({
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
        
        $longitude = $weatherResults['data'][0]['lng'];
        $latitude = $weatherResults['data'][0]['lat'];

        $results = await $.ajax({
            url: "/weather/php/getTimezone.php",
            type: 'POST',
            dataType: 'json',
            data: {
                longitude: $longitude,
                latitude: $latitude
            },
            error: function(e) {
                console.log("e: "+e);
                console.error(e);
            }
        })
        if($results.status.name == "ok") {
            if($weatherResults['data'][0] == null || $weatherResults['data'][0] == undefined) {
                $('#timezoneMsg').html('Unfortunately the geonames api currently holds no timezone data on this country!')
            }else{
                $('#timezoneMsg').html('');
                $('#currentTime').html($results['data']['time'].slice(-5));
                $('#timezoneId').html($results['data']['timezoneId']);
                $('#gmt').html($results['data']['gmtOffset']);
                $('#dst').html($results['data']['dstOffset']);
                $('#sunrise').html($results['data']['sunrise']);
                $('#sunset').html($results['data']['sunset']);
                $('#longitude').html($longitude);
                $('#latitude').html($latitude);
            }
        }

    }
    catch(err) {
        console.error("getTimezone.js Error: "+err.message);
    }

});