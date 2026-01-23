<?php

	function returnWithError(array $decodedJson, string $error) : void
	{
		$retVal = "{";

		foreach ($decodedJson as $key => $val)
		{
			$retVal .= '"' . $key . '":"' . $val . '",';
		}
		$retVal .= '"error":"' . $error . '"}';

		sendResultInfoAsJson($retVal);
	}
?>
