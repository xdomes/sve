<?php 
	// Date Last Modified: 2020-02-01
	// Module:             get_type_of_title.php
	// Object:             Determine what sensor type
	// Return:             sensor type & title
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

require_once("db_utils.php");

function get_type_of_title($dbh)
{
	//$sql = "select iri from sensorML order by iri";
	$sql = 'SELECT urn from sensorML WHERE typeOf="oem" AND status="public" AND valid=1';
	$res = $dbh->query($sql);
	$iri_list = array();

	while($row = sqlite_fetch_array_ex($res))
	{
		$iri_list[] = $row;
	}

	echo json_encode($iri_list);
}

$dbh = connect_to_db();

if($dbh)
{
	$action = $_GET["action"];

	switch ($action)
	{
		case "list":
		{
			get_type_of_title($dbh);
		}
		break;
	}
}

$dbh = null;

?>
