<?php

	require_once __DIR__ . '/../vendor/autoload.php';
	require_once __DIR__ . '/_returnResponseAsJson.php';
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

	# Check if id exists in request
	if (!isset($inData["id"]))
	{
		returnResponseAsJson(sanitizeErrorOut(compact('id', 'firstName', 'lastName', 'phone', 'email')), "MISSING_ID");
		return;
	}

	$id = $inData["id"];

	# Check if at least one field to update exists
	if (!isset($inData["firstName"]) && !isset($inData["lastName"]) && !isset($inData["phone"]) && !isset($inData["email"]))
	{
		returnResponseAsJson(sanitizeErrorOut(compact('id', 'firstName', 'lastName', 'phone', 'email')), "NO_FIELDS_TO_UPDATE");
		return;
	}

	# Set update fields if provided
	$firstName = $inData["firstName"] ?? "";
	$lastName = $inData["lastName"] ?? "";
	$phone = $inData["phone"] ?? "";
	$email = $inData["email"] ?? "";

	# Initializing database connection.
	$conn = new mysqli($_ENV["DB_HOST"], $_ENV["DB_USER"], $_ENV["DB_PASS"], $_ENV["DB_TBLE"]);

	# If statement used to validate the connection.
	if ($conn->connect_error)
	{
		returnResponseAsJson(sanitizeErrorOut(compact('id', 'firstName', 'lastName', 'phone', 'email')), $conn->connect_error);
	} else {
		# Running SQL statement to update contact
		$sqlStatement = $conn->prepare("UPDATE Contacts SET firstName = ?, lastName = ?, phone = ?, email = ? WHERE ID = ?");
		
		if (!$sqlStatement) {
			returnResponseAsJson(sanitizeErrorOut(compact('id', 'firstName', 'lastName', 'phone', 'email')), "PREPARE_FAILED: " . $conn->error);
			return;
		}

		if (!$sqlStatement->bind_param("ssssi", $firstName, $lastName, $phone, $email, $id)) {
			returnResponseAsJson(sanitizeErrorOut(compact('id', 'firstName', 'lastName', 'phone', 'email')), "BIND_FAILED: " . $sqlStatement->error);
			return;
		}

		if (!$sqlStatement->execute()) {
			returnResponseAsJson(sanitizeErrorOut(compact('id', 'firstName', 'lastName', 'phone', 'email')), "EXECUTE_FAILED: " . $sqlStatement->error);
			return;
		}

		# Checking SQL statement results
		if ($sqlStatement->affected_rows > 0)
		{
			returnResponseAsJson(compact('id', 'firstName', 'lastName', 'phone', 'email'));
		} else {
			returnResponseAsJson(sanitizeErrorOut(compact('id', 'firstName', 'lastName', 'phone', 'email')), "CONTACT_NOT_FOUND");
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