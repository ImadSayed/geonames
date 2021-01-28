<?php
    //echo '<script>';
	//echo 'console.log(we are on getWeather.php page)';
	//echo '</script>';
	$executionStartTime = microtime(true) / 1000;

	$url='http://api.geonames.org/citiesJSON?north='.$_REQUEST['north'].'&south='.$_REQUEST['south'].'&east='.$_REQUEST['east'].'&west='.$_REQUEST['west'].'&username=imadsayed';

	$ch = curl_init();
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($ch, CURLOPT_URL,$url);

	$result=curl_exec($ch);
	//echo '<script>';
	//echo 'console.log('. $result  .')';
    //echo '</script>';
	
	curl_close($ch);
    //var_dump($result);

	$decode = json_decode($result,true);	

	$output['status']['code'] = "200";
	$output['status']['name'] = "ok";
	$output['status']['description'] = "weather received";
	$output['status']['returnedIn'] = (microtime(true) - $executionStartTime) / 1000 . " ms";
	$output['data'] = $decode['geonames'];
	
	header('Content-Type: application/json; charset=UTF-8');

	echo json_encode($output); 

/*
Parameters :
north,south,east,west : coordinates of bounding box
callback : name of javascript function (optional parameter)
maxRows : maximal number of rows returned (default = 10)

Result : returns a list of weather stations with the most recent weather observation

Example http://api.geonames.org/weatherJSON?north=44.1&south=-9.9&east=-22.4&west=55.2&username=demo
*/

?>

