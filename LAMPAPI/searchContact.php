<?php

	require_once __DIR__ . '/../vendor/autoload.php';
	require_once __DIR__ . '/_returnResponseAsJson.php';
	require_once __DIR__ . '/_sanitizeErrorOut.php';

	$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
	$dotenv->load();

	$inData = getRequestInfo();

	# Initializing variables.
	$searchResults = array();

	# Check if required fields exist in request
	if (!isset($inData["userID"]) || !isset($inData["name"]))
	{
		$errorRes = array("userID" => 0, "name" => "");
		returnResponseAsJson(sanitizeErrorOut($errorRes), "MISSING_SEARCH_PARAMETERS");
		return;
	}

	$userID = $inData["userID"];
	$name = $inData["name"];

	# Initializing database connection.
	$conn = new mysqli($_ENV["DB_HOST"], $_ENV["DB_USER"], $_ENV["DB_PASS"], $_ENV["DB_TBLE"]);

	# If statement used to validate the connection.
	if ($conn->connect_error)
	{
		returnResponseAsJson(sanitizeErrorOut(compact('userID', 'name')), $conn->connect_error);
	} else {
		# Running SQL statement to search by concatenated firstName and lastName for specific userID
		$sqlStatement = $conn->prepare("SELECT ID, firstName, lastName, phone, email, userID FROM Contacts WHERE userID = ? AND CONCAT(firstName, ' ', lastName) LIKE ?");
		
		if (!$sqlStatement) {
			returnResponseAsJson(sanitizeErrorOut(compact('userID', 'name')), "PREPARE_FAILED: " . $conn->error);
			return;
		}

		# Add wildcards to search string for partial match
		$searchName = "%" . $name . "%";

		if (!$sqlStatement->bind_param("is", $userID, $searchName)) {
			returnResponseAsJson(sanitizeErrorOut(compact('userID', 'name')), "BIND_FAILED: " . $sqlStatement->error);
			return;
		}

		if (!$sqlStatement->execute()) {
			returnResponseAsJson(sanitizeErrorOut(compact('userID', 'name')), "EXECUTE_FAILED: " . $sqlStatement->error);
			return;
		}

		# Fetch all matching results
		$result = $sqlStatement->get_result();
		
		if ($result->num_rows > 0)
		{
			while ($row = $result->fetch_assoc())
			{
				$searchResults[] = $row;
			}
			returnResponseAsJson(array("results" => $searchResults));
		} else {
			returnResponseAsJson(array("results" => array()), "NO_CONTACTS_FOUND");
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