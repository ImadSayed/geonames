$('#btnSubmit').click(async function() {

    $('#loadingW').css('display','block');
    $('#weatherDiv2').empty();
    $('#msg').html('');
    
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
                $('#weatherDiv2').empty();
                $('#loadingW').css('display','none');
                $('#msg').html('Unfortunately the geonames api currently holds no weather data on this country!')
            }else{
                $('#msg').html('');
                $tables = [];
                for(let i = 0; i < $result['data'].length; i++) {

                    $tbl = $('<table></table>').addClass('weatherTable');
                    
                    $th1 = $('<th></th>').attr('colspan','2');
                    $th1.append(document.createTextNode('Weather Station'));
                    $tr1 = $('<tr></tr>');
                    $tr1.append($th1);
                    $tbl.append($tr1);

                    $td1 = $('<td></td>').attr('colspan','2');
                    $td1.append(document.createTextNode($result['data'][i]['stationName']));
                    $tr2 = $('<tr></tr>');
                    $tr2.append($td1);
                    $tbl.append($tr2);

                    $th2 = $('<th></th>').attr('colspan','2');
                    $th2.append(document.createTextNode('Latitude'));
                    $tr3 = $('<tr></tr>');
                    $tr3.append($th2);
                    $tbl.append($tr3);

                    $td2 = $('<td></td>').attr('colspan','2');
                    $td2.append(document.createTextNode($result['data'][i]['lat']));
                    $tr4 = $('<tr></tr>');
                    $tr4.append($td2);
                    $tbl.append($tr4);

                    $th3 = $('<th></th>').attr('colspan','2');
                    $th3.append(document.createTextNode('Longitude'));
                    $tr5 = $('<tr></tr>');
                    $tr5.append($th3);
                    $tbl.append($tr5);

                    $td3 = $('<td></td>').attr('colspan','2');
                    $td3.append(document.createTextNode($result['data'][i]['lng']));
                    $tr6 = $('<tr></tr>');
                    $tr6.append($td3);
                    $tbl.append($tr6);

                    $th4 = $('<th></th>');
                    $th5 = $('<th></th>');
                    $th4.append(document.createTextNode('Attribute'));
                    $th5.append(document.createTextNode('Data'));
                    $tr7 = $('<tr></tr>');
                    $tr7.append($th4);
                    $tr7.append($th5);
                    $tbl.append($tr7);

                    $td4 = $('<td></td>');
                    $td5 = $('<td></td>');
                    $td4.append(document.createTextNode('Temperature (Celsius)'));
                    $td5.append(document.createTextNode($result['data'][i]['temperature']));
                    $tr8 = $('<tr></tr>');
                    $tr8.append($td4);
                    $tr8.append($td5);
                    $tbl.append($tr8);

                    $td6 = $('<td></td>');
                    $td7 = $('<td></td>');
                    $td6.append(document.createTextNode('Humidity'));
                    $td7.append(document.createTextNode($result['data'][i]['humidity']));
                    $tr9 = $('<tr></tr>');
                    $tr9.append($td6);
                    $tr9.append($td7);
                    $tbl.append($tr9);

                    $td8 = $('<td></td>');
                    $td9 = $('<td></td>');
                    $td8.append(document.createTextNode('Weather Condition'));
                    $td9.append(document.createTextNode($result['data'][i]['weatherCondition']));
                    $tr10 = $('<tr></tr>');
                    $tr10.append($td8);
                    $tr10.append($td9);
                    $tbl.append($tr10);

                    $td10 = $('<td></td>');
                    $td11 = $('<td></td>');
                    $td10.append(document.createTextNode('Wind Direction'));
                    $td11.append(document.createTextNode($result['data'][i]['windDirection']));
                    $tr11 = $('<tr></tr>');
                    $tr11.append($td10);
                    $tr11.append($td11);
                    $tbl.append($tr11);

                    $td12 = $('<td></td>');
                    $td13 = $('<td></td>');
                    $td12.append(document.createTextNode('Wind Speed'));
                    $td13.append(document.createTextNode($result['data'][i]['windSpeed']));
                    $tr12 = $('<tr></tr>');
                    $tr12.append($td12);
                    $tr12.append($td13);
                    $tbl.append($tr12);

                    $td14 = $('<td></td>');
                    $td15 = $('<td></td>');
                    $td14.append(document.createTextNode('Clouds'));
                    $td15.append(document.createTextNode($result['data'][i]['clouds']));
                    $tr13 = $('<tr></tr>');
                    $tr13.append($td14);
                    $tr13.append($td15);
                    $tbl.append($tr13);

                    $td16 = $('<td></td>');
                    $td17 = $('<td></td>');
                    $td16.append(document.createTextNode('Dew Point'));
                    $td17.append(document.createTextNode($result['data'][i]['dewPoint']));
                    $tr14 = $('<tr></tr>');
                    $tr14.append($td16);
                    $tr14.append($td17);
                    $tbl.append($tr14);

                    $tables.push($tbl);
                }

                for(let j = 0; j < $result['data'].length; j++) {
                    $('#weatherDiv2').append($tables[j]);
                }
                
                $('#loadingW').css('display','none');
                
                /*
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
                */
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
              
