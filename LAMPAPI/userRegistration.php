<?php
	require_once __DIR__ . '/vendor/autoload.php';
	$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
	$dotenv->load();

	require_once '_returnWithError.php';

	$inData = getRequestInfo();

	# TODO: Populate env vals.
	$dbConn = new mysqli(getenv("host"), getenv("user"), getenv("pass"), getenv("tble"));
	if ($dbConn->connect_error)
	{
		returnResponseAsJson(err: $dbConn->connect_error);
	}
	else
	{
		$sqlStatement = $dbConn->prepare(getenv("insertUser"));
		# TODO: Add password hashing.
		$sqlStatement->bind_param("ssss", $inData["firstNameRef"], $inData["lastNameRef"], $inData["username"], $inData["password"]);
		$sqlStatement->execute();
		$sqlStatement->close();
		$dbConn->close();
		returnResponseAsJson();
	}


	# This function returns the json response.
	function getRequestInfo() : array
	{
		return json_decode(file_get_contents('php://input'), true);
	}

?>
