$('#placesBtn').click(async function() {
    
    $('#placesUL').empty();
    $('#loadingP').css('display','block');
    $('#placesMsg').html('');

    let $north, $south, $east, $west; //need these to get variables below
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

        $results = await $.ajax({
            url: "/weather/php/getPlaces.php",
            type: 'POST',
            dataType: 'json',
            data: {
                north: $north,
                south: $south,
                east: $east,
                west: $west
            }
        })

        if($results.status.name == "ok") {

           if($results['data'] == undefined) {
                $('#placesMsg').html('Unfortunately the geonames api currently holds no place data on this country!');
                $('#loadingP').css('display','none');
           } else {
                $('#placesMsg').html('');
                for(let i = 0; i < $results['data'].length; i++) {
                    $newList = $('<ul>'+$results['data'][i]['toponymName']+'</ul>').css({'font-weight':'600', 'font-size':'large', 'margin-bottom': '20px', 'list-style-position': 'inside', 'list-style-type':'square'});
                    $listItem1 = $('<li>Local Name:\t\t'+$results['data'][i]['name']+'</li>').css({'font-weight':'400', 'font-size':'medium'});
                    $newList.append($listItem1);
                    $listItem2 = $('<li>Wikipedia:\t\t'+$results['data'][i]['wikipedia']+'</li>').css({'font-weight':'400', 'font-size':'medium'});
                    $newList.append($listItem2);
                    $listItem3 = $('<li>Population:\t\t'+$results['data'][i]['population']+'</li>').css({'font-weight':'400', 'font-size':'medium'});
                    $newList.append($listItem3);
                    $listItem4 = $('<li>Longitude:\t\t'+$results['data'][i]['lng']+'</li>').css({'font-weight':'400', 'font-size':'medium'});
                    $newList.append($listItem4);
                    $listItem5 = $('<li>Latitude:\t\t'+$results['data'][i]['lat']+'</li>').css({'font-weight':'400', 'font-size':'medium'});
                    $newList.append($listItem5);
                    $('#placesUL').append($newList);
                }

                $('#loadingP').css('display','none');
           }
           
        }

    }
    catch(err) {
        $('#placesMsg').html('Unfortunately the geonames api currently holds no place data on this country!');
        $('#loadingP').css('display','none');
        //console.error("getTimezone.js Error: "+err.message);
    }

});