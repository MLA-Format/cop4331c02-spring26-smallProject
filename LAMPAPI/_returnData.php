<?php

	# This function returns a data array as a json response.
	function returnRespnseAsJson(array $dataArr) : void
	{
		header('Content-type: application/json');
		echo json_encode($dataArr);
	}
?>
