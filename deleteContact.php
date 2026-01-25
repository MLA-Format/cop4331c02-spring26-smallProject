<?php

	require_once __DIR__ . '/vendor/autoload.php';
	require_once __DIR__ . '/helpers.php';
	$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
	$dotenv->load();

	$inData = getRequestInfo();

	# Initializing variables.
	$id = 0;

	# Initializing database connection.
	$conn = new mysqli(getenv("DATABASE_HOST"), getenv("DATABASE_USER"), getenv("DATABASE_PASS"), getenv("DATABASE_NAME"));

	# If statement used to validate the connection.
	if ($conn->connect_error)
	{
		returnResponseAsJson(sanitizeErrorOut(compact('id')), $conn->connect_error);
	} else {
		# Running SQL statement.
		$sqlStatement = $conn->prepare("DELETE FROM COP4331Contacts WHERE ID = ?");
		$sqlStatement->bind_param("i", $inData["id"]);
		$sqlStatement->execute();

		# Checking SQL statement results.
		if ($sqlStatement->affected_rows > 0)
		{
			returnResponseAsJson(compact('id'));
		} else {
			returnResponseAsJson(sanitizeErrorOut(compact('id')), "CONTACT_NOT_FOUND");
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