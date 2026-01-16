<?php

	# This function returns the json response.
	function getRequestInfo() : stdClass
	{
		return json_decode(file_get_contents('php://input'), true);	
	}


	# TODO: Add comment and figure out what this does.
	function sendResultInfoAsJson($obj) : void
	{
		header('Content-type: applicaton/json');
		echo $obj;
	}

?>
