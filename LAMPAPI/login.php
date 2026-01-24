<?php
	# Imports.
	require_once __DIR__ . '/vendor/autoload.php';
	require_once . '_returnResponseAsJson.php'
	require_once . ''

	$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
	$dotenv->load();

	$inData = getRequestInfo();

	# Initializing variables.
	$res = array("id"=>0, "firstName"=>"", "lastName"=>"");
	
	# Initializing database connection.
	# TODO: Add credentials to .env.
	$conn = new mysqli(getenv("DATABASE_HOST"), getenv("DATABASE_USER"), getenv("DATABASE_PASS"), getenv("DATABASE_NAME"));

	# If statement used to validate the connection.
	if ($conn->connect_error)
	{
		returnResponseAsJson(dataArr: sanitizeErrorOut($res), err: $conn->connect_error);
	} else {
		# Running SQL statement.
		# TODO: Add SQL Statement later.
		$sqlStatement = $conn->prepare(getenv("SQL_LOGIN"));
		$sqlStatement->bind_param("ss", $inData["login"], $inData["password"]);
		$sqlStatement->execute();

		# Checking SQL statement results.
		if ($row = $sqlStatement->get_result()->fetch_assoc())
		{
			$res["firstName"] = $row["firstName"];
			$res["lastName"] = $row["lastName"];
			$res["id"] = $row["id"];

			returnResponseAsJson(dataArr: $res);
		} else {

			returnResponseAsJson(dataArr: sanitizeErrorOut($res), err: "NOT_FOUND");
		}

		# Close all connections.
		$sqlStatement->close();
		$conn->close();


	}

	# This function returns the json response.
	function getRequestInfo() : stdClass
	{
		return json_decode(file_get_contents('php://input'), true);	
	}

?>
