<?php 
	// Date Last Modified: 2020-02-01
	// Module:             get_xml_file.php
	// Object:             Retreive the XML file from server
	// Return:             Proper filename for parsing
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

$file     = $_GET["filename"];
$location = $_GET["location"];

if ($location == "local") $filename = '/var/www/html/sensorml/resources/xml/' . $file;

if ($location == "external")
{
	if      (substr($file, 0, 7) == 'http://' ) $file = substr($file, 0 - (strlen($file)-7) );
	else if (substr($file, 0, 8) == 'https://') $file = substr($file, 0 - (strlen($file)-8) );

	$filename = '/var/www/html/sensorml/resources/xml/external/' . $file;
}

if (file_exists($filename))	readfile($filename);

?>
