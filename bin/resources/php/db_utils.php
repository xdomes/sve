﻿﻿﻿﻿﻿<?php 

	// Date Last Modified: 2020-02-01
	// Module:             db_utils.php
	// Object:             Connect to system DB
	// Return:             void
	//
	//
	// Copyright (c) 2020, Texas A&M University-Corpus Christi, Corpus Christi, TX
	// All rights reserved.
	//
	// Redistribution and use in source and binary forms, with or without modification, are permitted provided that 
	// the following conditions are met:
	//
	// 1. Redistributions of source code must retain the above copyright notice, this list of conditions and the 
	//    following disclaimer.
	//
	// 2. Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the 
	//    following disclaimer in the documentation and/or other materials provided with the distribution.
	//
	// 3. Neither the name of the EarthCube X-DOMES nor the names of its contributors, module developers and project
	//    members may be used to endorse or promote products derived from this software without specific prior written
	//    permission.
	//
	// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, 
	// INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE 
	// DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, 
	// SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR 
	// SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, 
	// WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE 
	// USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.	

function connect_to_db()
{
	$db = $_SERVER['DOCUMENT_ROOT']."/srr/db/sensorML_registry.sqlite";
	
	try
	{
		$dbh = new PDO("sqlite:".$db);
		$dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	}
	
	catch (PDOException $e)
	{
		$dbh->rollBack();
		echo "Error!" . $e->getMessage() . "<br/>";
		die();
	}

	return $dbh;
}

function sqlite_fetch_array_ex($res)
{
	if (!($tmprow = $res->fetch(PDO::FETCH_ASSOC)))
		return false;

	$resrow = array();

	foreach($tmprow as $key=>$value)
	{
		$key = preg_replace('/^"(.+)"$/','\1',$key);
		$resrow[$key] = $value;
	}
	
	return $resrow;
}

?>