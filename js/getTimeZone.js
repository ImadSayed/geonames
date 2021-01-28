$('#timezoneBtn').click(async function() {
    
    let $north, $south, $east, $west; //need these to get variables below
    let $longitude, latitude; //need these variables for api fetch
    try {
        $data = await $.ajax({
        url: "/weather/php/getCountryList.php",
        type: 'POST'
        })

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
                west: $west,
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
            }
        })

        if($results.status.name == "ok") {
            if($result['data'][0] == null || $result['data'][0] == undefined) {
                $('#timezoneMsg').html('Unfortunately the geonames api currently holds no timezone data on this country!')
            }else{
                $('#timezoneMsg').html('');
                $('#currentTime').html($result['data'][0]['time']);
                $('#timezoneId').html($result['data'][0]['timezoneId']);
                $('#gmt').html($result['data'][0]['gmtOffset']);
                $('#dst').html($result['data'][0]['dstOffset']);
                $('#sunrise').html($result['data'][0]['sunrise']);
                $('#sunset').html($result['data'][0]['sunset']);
                $('#longitude').html($longitude);
                $('#latitude').html($latitude);
            }
        }

    }
    catch(err) {
        console.error("getTimezone.js Error: "+err);
    }

});