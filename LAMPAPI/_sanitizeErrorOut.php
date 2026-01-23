<?php
	# This function sanitized all values in an associative array for returning when an error occurs.
	function sanitizeErrorOut(array $arr) : array
	{
		$sanitizedArr = array();
		foreach ($arr as $key => $val)
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
