<?php

	function sanitizeErrorOut(array $decodedJson) : array
	{
		$sanitizedArr = array();
		foreach ($decodedJson as $key => $val)
		{
			if (is_string($val))
			{
				$sanitizedArr[$key] = "";
			} else if (is_int($val))
			{
				$sanitizedArr[$key] = 0;
			}
		}

		return $sanitizedArr;
	}

?>
