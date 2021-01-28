<?php
    //echo '<script>';
	//echo 'console.log(we are on getWeather.php page)';
	//echo '</script>';
    $executionStartTime = microtime(true) / 1000;
    
	$url='http://api.geonames.org/timezoneJSON?lat='.$_REQUEST['latitude'].'&lng='.$_REQUEST['longitude'].'&username=imadsayed';

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
	$output['data'] = $decode;
	
	header('Content-Type: application/json; charset=UTF-8');

	echo json_encode($output); 

?>

