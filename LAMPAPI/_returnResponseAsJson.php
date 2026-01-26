<?php

	# This function returns a data array as a json response.
	function returnResponseAsJson(array $dataArr = [], string $err = "") : void
	{
		if ($err !== "")
		{
			$dataArr["error"] = $err;
		}
		header('Content-type: application/json');
		echo json_encode($dataArr);
	}
?>
