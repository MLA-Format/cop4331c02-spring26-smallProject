<?php

	function returnData(array $dataArr) : void
	{
		sendResultInfoAsJson(json_encode($dataArr));
	}
?>
