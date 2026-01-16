<?php

	# This function returns the json response.
	function getRequestInfo() : json
	{
		return json_decode(file_get_contents('php://input'), true);	
	}

?>
