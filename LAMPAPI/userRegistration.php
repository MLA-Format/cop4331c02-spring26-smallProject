<?php
	# File imports.
	require_once __DIR__ . '/../vendor/autoload.php';
	require_once __DIR__ . '/_sanitizeErrorOut.php';
	require_once __DIR__ . '/_returnResponseAsJson.php';

	# .env setup.
	$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
	$dotenv->load();

	$inData = getRequestInfo();


	$dbConn = new mysqli($_ENV["DB_HOST"], $_ENV["DB_USER"], $_ENV["DB_PASS"], $_ENV["DB_TBLE"]);
	# If statement to check for an errors logging into the db.
	if ($dbConn->connect_error)
	{
		returnResponseAsJson(err: $dbConn->connect_error);
	}
	else
	{
		# SQL query used to check if a user with the username already exists.
		$userCheckRes = $dbConn->execute_query($_ENV["DUP_USER_CHECK_SQL"], [$inData["username"]]);

		# If statement to validate if user already exists or not.
		if ($userCheckRes->num_rows == 1) {

			returnResponseAsJson(err: "Username already exists.");
		
		} else {

		$sqlStatement = $dbConn->prepare($_ENV["INSERT_USER_SQL"]);
		# TODO: Add password hashing.
		$sqlStatement->bind_param("ssss", $inData["firstNameRef"], $inData["lastNameRef"], $inData["username"], $inData["password"]);
		$sqlStatement->execute();
		
		$sqlStatement->close();
		$dbConn->close();
		
		returnResponseAsJson();
		
		}
	}


	# This function gets the json request.
	function getRequestInfo() : array
	{
		return json_decode(file_get_contents('php://input'), true);
	}

?>
