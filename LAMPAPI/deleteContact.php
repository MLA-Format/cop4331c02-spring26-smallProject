<?php

        require_once __DIR__ . '/../vendor/autoload.php';
        require_once __DIR__ . '/_returnResponseAsJson.php';
        require_once __DIR__ . '/_sanitizeErrorOut.php';

        $dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
        $dotenv->load();

        $inData = getRequestInfo();

        # Initializing variables.
        $id = 0;

        if (!isset($inData["id"]))
        {
        returnResponseAsJson(sanitizeErrorOut(compact('id')), "MISSING_ID");
         return;
        }

        $id = $inData["id"];

        # Initializing database connection.
        $conn = new mysqli($_ENV["DB_HOST"], $_ENV["DB_USER"], $_ENV["DB_PASS"], $_ENV["DB_TBLE"]);

        # If statement used to validate the connection.
        if ($conn->connect_error)
        {
                        returnResponseAsJson(sanitizeErrorOut(compact('id')), $conn->connect_error);
        } else {
                # Running SQL statement.
                $sqlStatement = $conn->prepare("DELETE FROM Contacts WHERE ID = ?");
                if(!$sqlStatement){
                   returnResponseAsJson(sanitizeErrorOut(compact('id')), $conn->error);
                   $conn->close();
                   return;
                }

                if(!$sqlStatement->bind_param("i", $id)){
                   returnResponseAsJson(sanitizeErrorOut(compact('id')), "BIND: " . $sqlStatement->error);
                   return;
                }
                if(!$sqlStatement->execute()){
                   returnResponseAsJson(sanitizeErrorOut(compact('id')), "EXEC: " . $sqlStatement->error);
                   return;
                }
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
