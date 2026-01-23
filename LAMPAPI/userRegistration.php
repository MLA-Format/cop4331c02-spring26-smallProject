<?php
	require_once __DIR__ . '/vendor/autoload.php'
	$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
	$dotenv->load();

	$inData = getRequestInfo();

	# Initializing variables.
	$firstName = "";
	$lastName = "";
	$username = "";
	$password = "";
	

	# This function returns the json response.
	function getRequestInfo() : stdClass
	{
		return json_decode(file_get_contents('php://input'), true);
	}
	
	# TODO: Look into sharing functions between php files.
	function sendResultInfoAsJson(stdClass $obj) : void
	{
		header('Content-type: application/json');
		echo $obj;
	}

	
?>
