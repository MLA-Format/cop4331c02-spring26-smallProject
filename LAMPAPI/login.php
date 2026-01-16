<?php

	# This function returns the json response.
	function getRequestInfo() : stdClass
	{
		return json_decode(file_get_contents('php://input'), true);	
	}


	# This function sends the $obj data.
	function sendResultInfoAsJson(stdClass $obj) : void
	{
		header('Content-type: applicaton/json');
		echo $obj;
	}

	# This function handles adding an error value to the data and then sending it.
	function returnWithError($err) : void
	{
		# TODO: Validate $retVal json is correct.
		$retVal = '{"id":0,"firstName":"","lastName":"","error":"' . $err . '"}';
		sendResultInfoAsJson($retVal);
	}

?>
