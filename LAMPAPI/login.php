<?php

	$inData = getRequestInfo();

	# Initializing variables.
	$id = 0;
	$firstName = "";
	$lastName = "";

	# Initializing database connection.
	# TODO: Change admin credentials.
	$conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "COP4331");

	# If statement used to validate the connection.
	if ($conn->connect_error)
	{
		returnWithError($conn->connect_error);
	} else {
		# TODO: Add logic for when database connection is successful.
	}

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

	# This function handles sending the data when there is an error.
	function returnWithError($err) : void
	{
		# TODO: Validate $retVal json is correct.
		$retVal = '{"id":0,"firstName":"","lastName":"","error":"' . $err . '"}';
		sendResultInfoAsJson($retVal);
	}

	# This function handles sending the data when there is no error.
	# TODO: Validate parameters are correct.
	function returnWithInfo (String $firstName, String $lastName, int $id)
	{
		$retVal = '{"id":' . $id . ',"firstName":"' . $firstName . '","lastName":"' . $lastName . '","error":""}';
		sendResultInfoAsJson($retVal);
	}
?>
