<?php

	require_once __DIR__ . '/../vendor/autoload.php';
	require_once __DIR__ . '/_returnResponseAsJson.php'
	require_once __DIR__ . '/_sanitizeErrorOut.php';
	
	$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
	$dotenv->load();

	$inData = getRequestInfo();

	# Initializing variables.
	$id = 0;
	$firstName = "";
	$lastName = "";
	$phone = "";
	$email = "";
	$userID = 0;

	# Initializing database connection.
	$conn = new mysqli($_ENV["DB_HOST"], $_ENV["DB_USER"], $_ENV["DB_PASS"], $_ENV["DB_TBLE"]);

	# If statement used to validate the connection.
	if ($conn->connect_error)
	{
		returnResponseAsJson(sanitizeErrorOut(compact('id', 'firstName', 'lastName', 'phone', 'email', 'userID')), $conn->connect_error);
	} else {
		# Running SQL statement.
		$sqlStatement = $conn->prepare("INSERT INTO Contacts (firstName, lastName, phone, email, userID) VALUES (?, ?, ?, ?, ?)");
		$sqlStatement->bind_param("ssssi", $inData["firstName"], $inData["lastName"], $inData["phone"], $inData["email"], $inData["userID"]);
		$sqlStatement->execute();

		# Checking SQL statement results.
		if ($sqlStatement->affected_rows > 0)
		{
			$id = $conn->insert_id;
			returnResponseAsJson(compact('id', 'firstName', 'lastName', 'phone', 'email', 'userID'));
		} else {
			returnResponseAsJson(sanitizeErrorOut(compact('id', 'firstName', 'lastName', 'phone', 'email', 'userID')), "FAILED_TO_ADD_CONTACT");
		}

		# Close all connections.
		$sqlStatement->close();
		$conn->close();
	}

	# This function returns the json response.
	function getRequestInfo() : array
	{
		return json_decode(file_get_contents('php://input'), true);	
	}
?>
