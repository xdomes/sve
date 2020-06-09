<?php 
	// Date Last Modified: 2020-02-01
	// Module:             index.php
	// Object:             Display interface to capture data
	// Return:             xHTML/Display
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
?>
 
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
<link href="resources/css/bootstrap.min.css" rel="stylesheet">
<link href="resources/css/jquery-ui.css"     rel="stylesheet">
<link href="resources/css/main.css"          rel="stylesheet">
<title>X-DOMES: SensorML Online Editor</title>
</head>

<body>
<table width="100%" border="0">
  <tr>
	<td rowspan="2"><img src="../images/sedit2_logo.png" alt="srr logo" style="vertical-align:middle"/></td>
  </tr>
</table>
<hr />
<div class="main-form">

	<!-- buttons for saving (modal), loading (modal), and clearing (reload page) -->

	<!--div class="bg-dark" style="padding:5px; text-align:center"-->
	<div class="bg-dark" style="padding:5px;">
		<!-- use "shadow-none" so the button does not have focus after loading nor saving -->
		<button type="button" class="btn btn-primary btn-bar shadow-none" data-toggle="modal" data-target="#file_save_modal">Save XML</button>
		<!--button type="button" class="btn btn-primary btn-bar shadow-none" onclick="view_xml();"                             >View XML</button-->
		<button type="button" class="btn btn-primary btn-bar shadow-none" data-toggle="modal" data-target="#file_load_modal">Load XML</button>
		<button type="button" class="btn btn-primary btn-bar" onclick="reload_page();">Clear Form</button>
	</div>

	<br>

	<!--div class="container" id="info_div" style="padding:5px; text-align:center"></div-->
	<div class="container" id="info_div" style="padding:5px;"></div>

	<!--ul class="nav nav-tabs justify-content-center col-sm-12" id="myTab" role="tablist"-->
	<ul class="nav nav-tabs justify-content-left col-sm-12" id="myTab" role="tablist">

		<li class="nav-item">
			<a class="nav-link active" data-toggle="tab" role="tab" id="description-tab" href="#description">Header</a>
		</li>
		<li class="nav-item">
			<a class="nav-link" data-toggle="tab" role="tab" id="identification-tab" href="#identification">Identification</a>
		</li>
		<li class="nav-item">
			<a class="nav-link" data-toggle="tab" role="tab" id="classification-tab" href="#classification">Classification</a>
		</li>
		<li class="nav-item">
			<a class="nav-link" data-toggle="tab" role="tab" id="contacts-tab" href="#contact">Contacts</a>
		</li>

		<li class="nav-item">
			<a class="nav-link" data-toggle="tab" role="tab" id="inputs-tab" href="#input">Inputs</a>
		</li> 
		<li class="nav-item">
			<a class="nav-link" data-toggle="tab" role="tab" id="outputs-tab" href="#output">Outputs</a>
		</li>
		<li class="nav-item">
			<a class="nav-link" data-toggle="tab" role="tab" id="parameters-tab" href="#parameter">Parameters</a>
		</li>
		
		<!-- These next four tabs are only for sensor deployment -->

		<li class="nav-item">
			<a class="nav-link" data-toggle="tab" role="tab" id="valid_time-tab" href="#valid_time">Valid Time</a>
		</li>

		<li class="nav-item">
			<a class="nav-link" data-toggle="tab" role="tab" id="history-tab" href="#history">History</a>
		</li> 
		<li class="nav-item">
			<a class="nav-link" data-toggle="tab" role="tab" id="configuration-tab" href="#configuration">Configuration</a>
		</li>
		<li class="nav-item">
			<a class="nav-link" data-toggle="tab" role="tab" id="position-tab" href="#position">Position</a>
		</li>

	</ul>

	<div class="tab-content" id=myTabContent>
	
	<!--
	================================================================================================================
			System Description
	================================================================================================================
	-->

	<div class="tab-pane fade show active" role="tabpanel" id="description">

		<h3>Header</h3>

		<div class="form-group row">
			<label for="file_type" class="col-sm-3 col-form-label">Document Type</label>
			<div class="col-sm-9">
				<select id="file_type" class="form-control" onchange="check_file_type();">
					<option disabled value=""          selected>Please choose a document type</option>
					<option          value="oem"               >OEM Description</option>
					<option          value="deployment"        >Sensor Deployment</option>
				</select>
			</div>
		</div>

		<div id="type_of_title_form" class="form-group row">
			<label for="type_of_title" class="col-sm-3 col-form-label">TypeOf Title</label>
			<div class="col-sm-9">
				<input type="text" class="form-control" id="type_of_title" name="type_of_title" placeholder="">
			</div>
		</div>

		<div id="type_of_href_form" class="form-group row">
			<label for="type_of_href" class="col-sm-3 col-form-label">TypeOf HRef</label>
			<div class="col-sm-9">
				<input type="text" class="form-control" id="type_of_href" name="type_of_href" placeholder="">
			</div>
		</div>

		<div class="form-group row">
			<label for="name" class="col-sm-3 col-form-label">Name</label>
			<div class="col-sm-9">
				<input type="text" class="form-control" id="name" name="name" placeholder="">
			</div>
		</div>
		
		<div class="form-group row">
			<label for="unique_id" class="col-sm-3 col-form-label">Unique ID (URN)</label>
			<div class="col-sm-9">
				<input type="text" class="form-control" id="unique_id" name="unique_id" onchange="update_info_div();"
				        placeholder="">
			</div>
		</div>

		<div class="form-group row">
			<label for="physical_system" class="col-sm-3 col-form-label">Description</label>
			<div class="col-sm-9">
				<textarea class="form-control" id="physical_system" name="physical_system" rows="3"  placeholder=""></textarea>
			</div>
		</div>

		<div class="form-group row">
			<label for="keyword_list" class="col-sm-3 col-form-label">Keywords</label>

			<div class="col-sm-3">
				<input onkeypress="{if (event.keyCode==13) add_to_select_list('keyword')}" type="text" class="form-control" id="keyword_single" name="keyword_single" placeholder="">
			</div>

			<div class="col-sm-3" align="center">
				<button onclick="add_to_select_list('keyword');"      type="button" class="btn btn-primary shadow-none">Add</button>
				<br>
				<button onclick="remove_from_select_list('keyword');" type="button" class="btn btn-primary shadow-none">Remove</button>
			</div>
			
			<div class="col-sm-3">
				<select id="keyword_list" class="form-control" size=6></select>
			</div>
			<input type="hidden" id="keyword_string" name="keyword_string" value=""/>
		</div>
	</div>

	<!--
	================================================================================================================
			System Identifiers
	================================================================================================================
	-->

	<div class="tab-pane fade" role="tabpanel" id="identification">
		
		<h3>Identification</h3>
		
		<div class="form-group row">
			<label for="long_name" class="col-sm-3 col-form-label">Long Name</label>
			<div class="col-sm-9">
				<input type="text" class="form-control" id="long_name" name="long_name" placeholder="">
			</div>
		</div>
		
		<div class="form-group row">
			<label for="short_name" class="col-sm-3 col-form-label">Short Name</label>
			<div class="col-sm-9">
				<input type="text" class="form-control" id="short_name" name="short_name" placeholder="">
			</div>
		</div>

		<div class="form-group row">
			<label for="sys_id_manufacturer" class="col-sm-3 col-form-label">Manufacturer</label>
			<div class="col-sm-9">
				<input type="text" class="form-control" id="sys_id_manufacturer" name="sys_id_manufacturer" placeholder="">
			</div>
		</div>

		<div class="form-group row">
			<label for="sys_id_model_number" class="col-sm-3 col-form-label">Model Number</label>
			<div class="col-sm-9">
				<input type="text" class="form-control" id="sys_id_model_number" name="sys_id_model_number" placeholder="">
			</div>
		</div>

		<div id="deploying_agency_form" class="form-group row">
			<label for="deploying_agency" class="col-sm-3 col-form-label">Deploying Agency</label>
			<div class="col-sm-9">
				<input type="text" class="form-control" id="deploying_agency" name="deploying_agency" placeholder="">
			</div>
		</div>

		<div id="serial_number_form"class="form-group row">
			<label for="serial_number" class="col-sm-3 col-form-label">Serial Number</label>
			<div class="col-sm-9">
				<input type="text" class="form-control" id="serial_number" name="serial_number" placeholder="">
			</div>
		</div>		

	</div>

	<!--
	================================================================================================================
			System Classifiers
	================================================================================================================
	-->

	<div class="tab-pane fade" role="tabpanel" id="classification">

		<h3>Classification</h3>

		<div class="form-group row">
			<label for="intended_application_list" class="col-sm-3 col-form-label">Intended Application</label>

			<div class="col-sm-3">
				<input onkeypress="{if (event.keyCode==13) add_to_select_list('intended_application')}" type="text" class="form-control" id="intended_application_single" name="intended_application_single" placeholder="">
			</div>

			<div class="col-sm-3" align="center">
				<button onclick="add_to_select_list('intended_application');"      type="button" class="btn btn-primary shadow-none">Add</button>
				<br>
				<button onclick="remove_from_select_list('intended_application');" type="button" class="btn btn-primary shadow-none">Remove</button>
			</div>
			
			<div class="col-sm-3">
				<select id="intended_application_list" class="form-control" size=6></select>
			</div>
			<input type="hidden" id="intended_application_string" name="intended_application_string" value=""/>
		</div>
		
		<hr>
		
		<div class="form-group row">
			<label for="sensor_type_list" class="col-sm-3 col-form-label">Sensor Type</label>

			<div class="col-sm-3">
				<input onkeypress="{if (event.keyCode==13) add_to_select_list('sensor_type')}" type="text" class="form-control" id="sensor_type_single" name="sensor_type_single" placeholder="">
			</div>

			<div class="col-sm-3" align="center">
				<button onclick="add_to_select_list('sensor_type');"      type="button" class="btn btn-primary shadow-none">Add</button>
				<br>
				<button onclick="remove_from_select_list('sensor_type');" type="button" class="btn btn-primary shadow-none">Remove</button>
			</div>
			
			<div class="col-sm-3">
				<select id="sensor_type_list" class="form-control" size=6></select>
			</div>
			<input type="hidden" id="sensor_type_string" name="sensor_type_string" value=""/>
		</div>
	</div>

	<!--
	================================================================================================================
			Constraints
	================================================================================================================
	-->

	<div class="tab-pane fade" role="tabpanel" id="valid_time">
	
		<h3>Valid Time</h3>
		
		<div class="form-group row">
			<label for="valid_time_local_id" class="col-sm-3 col-form-label">Local ID</label>
			<div class="col-sm-3">
				<input type="text" class="form-control" id="valid_time_local_id" name="valid_time_local_id" placeholder="">
			</div>
			<div class="col-sm-3">
				<select id="input_state" class="form-control">
					<option selected>before</option>
					<option>after</option>
					<option>begins</option>
					<option>ends</option>
					<option>during</option>
					<option>equals</option>
					<option>contains</option>
					<option>overlaps</option>
					<option>meets</option>
					<option>overlappedBy</option>
					<option>metBy</option>
					<option>begunBy</option>
					<option>endedBy</option>
				</select>
			</div>
			<div class="col-sm-3">
				<input type="text" class="form-control" id="valid_time_date" name="valid_time_date" placeholder="YYYY-MM-DD">
			</div>
		</div>	
	</div>

	<!--
	================================================================================================================
			System Contacts
	================================================================================================================
	-->

	<div class="tab-pane fade" role="tabpanel" id="contact">

		<h3>Contacts</h3>

		<div id="contact_sections">
			<!--  content gets added here when 'add contact' button is used -->
		</div>
		<button style="width:auto;" class="btn btn-primary add_section shadow-none" type="button">Add Contact</button>
	</div>

	<!--
	================================================================================================================
			History
	================================================================================================================
	-->

	<div class="tab-pane fade" role="tabpanel" id="history">

		<h3>History</h3>

		<div id="history_sections">
			<!--  content gets added here when 'add event' button is used -->
		</div>
		<button style="width:auto;" class="btn btn-primary add_section shadow-none" type="button">Add Event</button>
	</div>

	<!--
	================================================================================================================
			Configuration
	================================================================================================================
	-->

	<div class="tab-pane fade" role="tabpanel" id="configuration">

		<h3>Configuration</h3>

		<!-- 
			include one card by default for mode
			other cards are added for each setting
		-->
		<div class="card">

			<div class="card-body">

				<div class="form-group row">
					<label for="setting_type" class="col-sm-3 col-form-label">Setting Type</label>
					<label for="setting_type" class="col-sm-9 col-form-label">Mode (if applicable)</label>
				</div>

				<div class="form-group row">
					<label for="configuration_reference" class="col-sm-3 col-form-label">Reference</label>
					<div class="col-sm-9">
						<input type="text" class="form-control" id="configuration_mode_reference" name="configuration_mode_reference" placeholder="">
					</div>
				</div>

				<div class="form-group row">
					<label for="configuration_value" class="col-sm-3 col-form-label">Value</label>
					<div class="col-sm-9">
						<input type="text" class="form-control" id="configuration_mode_value" name="configuration_mode_value" placeholder="">
					</div>
				</div>
			</div> <!-- end of configuration card-body -->
		</div> <!-- end of configuration card -->
	
		<div id="configuration_sections">
			<!--  content gets added here when 'add setting' button is used -->
		</div>
		<button style="width:auto;" class="btn btn-primary add_section shadow-none" type="button">Add Setting</button>
	</div>

	<!--
	================================================================================================================
			Position
	================================================================================================================
	-->

	<div class="tab-pane fade" role="tabpanel" id="position">
		
		<h3>Latitude</h3>

		<div class="form-group row">
			<label for="latitude_definition" class="col-sm-3 col-form-label">Definition</label>
			<div class="col-sm-9">
				<input type="text" class="form-control" id="latitude_definition" name="latitude_definition" placeholder="">
			</div>
		</div>

		<div class="form-group row">
			<label for="latitude_value" class="col-sm-3 col-form-label">Value</label>
			<div class="col-sm-9">
				<input type="text" class="form-control" id="latitude_value" name="latitude_value" placeholder="">
			</div>
		</div>

		<div class="form-group row">
			<label for="latitude_uom" class="col-sm-3 col-form-label">Unit of Measure</label>
			<div class="col-sm-9">
				<input type="text" class="form-control" id="latitude_uom" name="latitude_uom" placeholder="">
			</div>
		</div>

		<br>
		<h3>Longitude</h3>

		<div class="form-group row">
			<label for="longitude_definition" class="col-sm-3 col-form-label">Definition</label>
			<div class="col-sm-9">
				<input type="text" class="form-control" id="longitude_definition" name="longitude_definition" placeholder="">
			</div>
		</div>

		<div class="form-group row">
			<label for="longitude_value" class="col-sm-3 col-form-label">Value</label>
			<div class="col-sm-9">
				<input type="text" class="form-control" id="longitude_value" name="longitude_value" placeholder="">
			</div>
		</div>

		<div class="form-group row">
			<label for="longitude_uom" class="col-sm-3 col-form-label">Unit of Measure</label>
			<div class="col-sm-9">
				<input type="text" class="form-control" id="longitude_uom" name="longitude_uom" placeholder="">
			</div>
		</div>

		<br>
		<h3>Vertical Datum</h3>

		<div class="form-group row">
			<label for="vertical_datum_definition" class="col-sm-3 col-form-label">Definition</label>
			<div class="col-sm-9">
				<input type="text" class="form-control" id="vertical_datum_definition" name="vertical_datum_definition" placeholder="">
			</div>
		</div>

		<div class="form-group row">
			<label for="vertical_datum_value" class="col-sm-3 col-form-label">Value</label>
			<div class="col-sm-9">
				<input type="text" class="form-control" id="vertical_datum_value" name="vertical_datum_value" placeholder="">
			</div>
		</div>

		<div class="form-group row">
			<label for="vertical_datum_uom" class="col-sm-3 col-form-label">Unit of Measure</label>
			<div class="col-sm-9">
				<input type="text" class="form-control" id="vertical_datum_uom" name="vertical_datum_uom" placeholder="">
			</div>
		</div>

		<br>
		<h3>Orientation</h3>

		<div class="form-group row">
			<label for="orientation_definition" class="col-sm-3 col-form-label">Definition</label>
			<div class="col-sm-9">
				<input type="text" class="form-control" id="orientation_definition" name="orientation_definition" placeholder="">
			</div>
		</div>

		<div class="form-group row">
			<label for="orientation_value" class="col-sm-3 col-form-label">Value</label>
			<div class="col-sm-9">
				<input type="text" class="form-control" id="orientation_value" name="orientation_value" placeholder="">
			</div>
		</div>

		<div class="form-group row">
			<label for="orientation_uom" class="col-sm-3 col-form-label">Unit of Measure</label>
			<div class="col-sm-9">
				<input type="text" class="form-control" id="orientation_uom" name="orientation_uom" placeholder="">
			</div>
		</div>
	</div>

	<!--
	================================================================================================================
			Inputs
	================================================================================================================
	-->

	<div class="tab-pane fade" role="tabpanel" id="input">
		
		<h3>Inputs</h3>

		<div id="input_sections">
			<!--  content gets added here when 'add input' button is used -->
		</div>
		<button style="width:auto;" class="btn btn-primary add_section shadow-none" type="button">Add Input</button>

	</div>

	<!--
	================================================================================================================
			Outputs
	================================================================================================================
	-->

	<div class="tab-pane fade" role="tabpanel" id="output">
		
		<h3>Outputs</h3>

		<!-- 
			include one card by default for output name
			other cards are added for each setting
		-->

		<div class="card">

			<div class="card-body">

				<div class="form-group row">
					<label for="output_name" class="col-sm-3 col-form-label">Output Name</label>
					<div class="col-sm-9">
						<input type="text" class="form-control" id="output_name" name="output_name" placeholder="">
					</div>
				</div>
			</div> <!-- end of card-body -->
		</div> <!-- end of card -->


		<div id="output_sections">
			<!--  content gets added here when 'add setting' button is used -->
		</div>
		<button style="width:auto;" class="btn btn-primary add_section shadow-none" type="button">Add Output</button>

	</div>

	<!--
	================================================================================================================
			Parameters
	================================================================================================================
	-->

	<div class="tab-pane fade" role="tabpanel" id="parameter">
		
		<h3>Parameters</h3>

		<div id="parameter_sections">
			<!--  content gets added here when 'add parameter group' button is used -->
		</div>
		<button style="width:auto;" class="btn btn-primary add_section shadow-none" type="button">Add Parameter Group</button>

	</div>

	<!--
	================================================================================================================
			End of tab-content
	================================================================================================================
	-->

	</div>
</div>

  <div class="footer">
    <hr />
    <table width="100%" border="0" cellspacing="0" cellpadding="0">
      <tr>
        <td width="9%"><img src="../images/nsf_logo.png" width="70" height="70" alt="nsf logo" /></td>
        <td width="83%" align="center" style="font-size:10px">This project is funded by the National Science Foundation (NSF) as an EarthCube Integrative Activity. EarthCube is a collaboration between the Division of Advanced Cyberinfrastructure (ACI) and the Geosciences Directorate (GEO) of the US National Science Foundation (NSF). For official NSF EarthCube content, please see: <a href="http://www.nsf.gov/geo/earthcube/" target="_blank">http://www.nsf.gov/geo/earthcube/</a>.</td>
        <td width="8%" align="right"><img src="../images/earthcube.png" width="70" height="72" alt="earthcube logo" /></td>
      </tr>
    </table>
  </div>

<!--
================================================================================================================
		Repeatable sections - contact
================================================================================================================
-->

<div id="hidden_sections" style="visibility: hidden;">

	<div class="contact_section card">

		<div class="card-body">

			<div class="form-group row">
				<label for="contact_role" class="col-sm-3 col-form-label">Contact Role</label>
				<div class="col-sm-9">
					<input type="text" class="form-control" id="contact_role" name="contact_role[]" placeholder="">
				</div>
			</div>

			<div class="form-group row">
				<label for="individual_name" class="col-sm-3 col-form-label">Individual Name</label>
				<div class="col-sm-9">
					<input type="text" class="form-control" id="individual_name" name="individual_name[]" placeholder="">
				</div>
			</div>
			
			<div class="form-group row">
				<label for="organization_name" class="col-sm-3 col-form-label">Organization Name</label>
				<div class="col-sm-9">
					<input type="text" class="form-control" id="organization_name" name="organization_name[]" placeholder="">
				</div>
			</div>

			<div class="form-group row">
				<label for="phone_number" class="col-sm-3 col-form-label">Phone Number</label>
				<div class="col-sm-9">
					<input type="text" class="form-control" id="phone_number" name="phone_number[]" placeholder="">
				</div>
			</div>

			<div class="form-group row">
				<label for="fax_number" class="col-sm-3 col-form-label">Fax Number</label>
				<div class="col-sm-9">
					<input type="text" class="form-control" id="fax_number" name="fax_number[]" placeholder="">
				</div>
			</div>

			<div class="form-group row">
				<label for="delivery_point" class="col-sm-3 col-form-label">Delivery Point</label>
				<div class="col-sm-9">
					<input type="text" class="form-control" id="delivery_point" name="delivery_point[]" placeholder="">
				</div>
			</div>

			<div class="form-group row">
				<label for="city" class="col-sm-3 col-form-label">City</label>
				<div class="col-sm-9">
					<input type="text" class="form-control" id="city" name="city[]" placeholder="">
				</div>
			</div>

			<div class="form-group row">
				<label for="administrative_area" class="col-sm-3 col-form-label">Administrative Area</label>
				<div class="col-sm-9">
					<input type="text" class="form-control" id="administrative_area" name="administrative_area[]" placeholder="">
				</div>
			</div>

			<div class="form-group row">
				<label for="postal_code" class="col-sm-3 col-form-label">Postal Code</label>
				<div class="col-sm-9">
					<input type="text" class="form-control" id="postal_code" name="postal_code[]" placeholder="">
				</div>
			</div>

			<div class="form-group row">
				<label for="country" class="col-sm-3 col-form-label">Country</label>
				<div class="col-sm-9">
					<input type="text" class="form-control" id="country" name="country[]" placeholder="">
				</div>
			</div>

			<div class="form-group row">
				<label for="email_address" class="col-sm-3 col-form-label">Email Address</label>
				<div class="col-sm-9">
					<input type="text" class="form-control" id="email_address" name="email_address[]" placeholder="">
				</div>
			</div>
			
			<div class="form-group row">
				<div class="col-sm-3 offset-sm-9">
					<button style="width:auto;" class="btn btn-danger remove_section" type="button">Remove Contact</button>
				</div>
			</div>
			
		</div> <!-- end of contact card-body -->
	</div> <!-- end of contact card -->

<!--
================================================================================================================
		Repeatable sections - history
================================================================================================================
-->

	<div class="history_section card" id="id_temp">

		<div class="card-header" id="heading_temp">
			<h2 class="mb-0">
				<button id="heading_button" class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapse_temp" aria-expanded="false" aria-controls="collapse_temp">
					History Event
				</button>
			</h2>
		</div> <!-- end of history card-heading -->

		<div id="collapse_temp" class="collapse" aria-labelledby="heading_temp" data-parent="#history_sections">
			<div class="card-body">

				<div class="form-group row">
					<label for="history_label" class="col-sm-3 col-form-label">Event Label</label>
					<div class="col-sm-9">
						<input type="text" class="form-control" id="history_label" name="history_label[]" placeholder="">
					</div>
				</div>

				<div class="form-group row">
					<label for="history_description" class="col-sm-3 col-form-label">Description</label>
					<div class="col-sm-9">
						<input type="text" class="form-control" id="history_description" name="history_description[]" placeholder="">
					</div>
				</div>

				<div class="form-group row">
					<label for="history_local_id" class="col-sm-3 col-form-label">Local ID</label>
					<div class="col-sm-9">
						<input type="text" class="form-control" id="history_local_id" name="history_local_id[]" placeholder="">
					</div>
				</div>

				<div class="form-group row">
					<label for="history_time" class="col-sm-3 col-form-label">Time</label>
					<div class="col-sm-9">
						<input type="text" class="form-control" id="history_time" name="history_time[]" placeholder="">
					</div>
				</div>

				<div class="form-group row">
					<label for="history_data_record_label" class="col-sm-3 col-form-label">Data Record Label</label>
					<div class="col-sm-9">
						<input type="text" class="form-control" id="history_data_record_label" name="history_data_record_label[]" placeholder="">
					</div>
				</div>

				<div class="form-group row">
					<label for="history_event_type" class="col-sm-3 col-form-label">Event Type</label>
					<div class="col-sm-9">
						<input type="text" class="form-control" id="history_event_type" name="history_event_type[]" placeholder="">
					</div>
				</div>
				
				<div class="form-group row">
					<label for="history_component_id" class="col-sm-3 col-form-label">Component ID</label>
					<div class="col-sm-9">
						<input type="text" class="form-control" id="history_component_id" name="history_component_id[]" placeholder="">
					</div>
				</div>

				<div class="form-group row">
					<label for="history_serial_number" class="col-sm-3 col-form-label">Serial Number</label>
					<div class="col-sm-9">
						<input type="text" class="form-control" id="history_serial_number" name="history_serial_number[]" placeholder="">
					</div>
				</div>

				<div class="form-group row">
					<label for="history_manufacture_date" class="col-sm-3 col-form-label">Manufacture Date</label>
					<div class="col-sm-9">
						<input type="text" class="form-control" id="history_manufacture_date" name="history_manufacture_date[]" placeholder="">
					</div>
				</div>

				<div class="form-group row">
					<label for="history_deployed_period" class="col-sm-3 col-form-label">Deployed Period</label>
					<div class="col-sm-9">
						<input type="text" class="form-control" id="history_deployed_period" name="history_deployed_period[]" placeholder="">
					</div>
				</div>

				<div class="form-group row">
					<label for="history_firmware_version" class="col-sm-3 col-form-label">Firmware Version</label>
					<div class="col-sm-9">
						<input type="text" class="form-control" id="history_firmware_version" name="history_firmware_version[]" placeholder="">
					</div>
				</div>

				<div class="form-group row">
					<label for="history_calibration_date" class="col-sm-3 col-form-label">Calibration Date</label>
					<div class="col-sm-9">
						<input type="text" class="form-control" id="history_calibration_date" name="history_calibration_date[]" placeholder="">
					</div>
				</div>

				<div class="form-group row">
					<label for="history_calibration_location" class="col-sm-3 col-form-label">Calibration Location</label>
					<div class="col-sm-9">
						<input type="text" class="form-control" id="history_calibration_location" name="history_calibration_location[]" placeholder="">
					</div>
				</div>

				<div class="form-group row">
					<label for="history_additional_documentation" class="col-sm-3 col-form-label">Additional Documentation</label>
					<div class="col-sm-9">
						<input type="text" class="form-control" id="history_additional_documentation" name="history_additional_documentation[]" placeholder="">
					</div>
				</div>

				<div class="form-group row">
					<div class="col-sm-3 offset-sm-9">
						<button style="width:auto;" class="btn btn-danger remove_section" type="button">Remove Event</button>
					</div>
				</div>

			</div> <!-- end of history card-body -->
		</div> <!-- end of history collapse -->
	</div> <!-- end of history card -->

<!--
================================================================================================================
		Repeatable sections - configuration
================================================================================================================
-->

	<div class="configuration_section card">

		<div class="card-body">

			<div class="form-group row">
				<label for="setting_type" class="col-sm-3 col-form-label">Setting Type</label>
				<label for="setting_type" class="col-sm-9 col-form-label">Value</label>
			</div>

			<div class="form-group row">
				<label for="configuration_reference" class="col-sm-3 col-form-label">Reference</label>
				<div class="col-sm-9">
					<input type="text" class="form-control" id="configuration_reference" name="configuration_reference[]" placeholder="">
				</div>
			</div>

			<div class="form-group row">
				<label for="configuration_value" class="col-sm-3 col-form-label">Value</label>
				<div class="col-sm-9">
					<input type="text" class="form-control" id="configuration_value" name="configuration_value[]" placeholder="">
				</div>
			</div>

			<div class="form-group row">
				<div class="col-sm-3 offset-sm-9">
					<button style="width:auto;" class="btn btn-danger remove_section" type="button">Remove Setting</button>
				</div>
			</div>

		</div> <!-- end of configuration card-body -->
	</div> <!-- end of configuration card -->

<!--
================================================================================================================
		Repeatable sections - input
================================================================================================================
-->

	<div class="input_section card">

		<div class="card-body">

			<div class="form-group row">
				<label for="input_name" class="col-sm-3 col-form-label">Name</label>
				<div class="col-sm-9">
					<input type="text" class="form-control" id="input_name" name="input_name[]" placeholder="">
				</div>
			</div>

			<div class="form-group row">
				<label for="input_label" class="col-sm-3 col-form-label">Label</label>
				<div class="col-sm-9">
					<input type="text" class="form-control" id="input_label" name="input_label[]" placeholder="">
				</div>
			</div>

			<div class="form-group row">
				<label for="input_description" class="col-sm-3 col-form-label">Description</label>
				<div class="col-sm-9">
					<input type="text" class="form-control" id="input_description" name="input_description[]" placeholder="">
				</div>
			</div>

			<div class="form-group row">
				<label for="input_definition" class="col-sm-3 col-form-label">Definition</label>
				<div class="col-sm-9">
					<input type="text" class="form-control" id="input_definition" name="input_definition[]" placeholder="">
				</div>
			</div>

			<div class="form-group row">
				<div class="col-sm-3 offset-sm-9">
					<button style="width:auto;" class="btn btn-danger remove_section" type="button">Remove Input</button>
				</div>
			</div>

		</div> <!-- end of input card-body -->
	</div> <!-- end of input card -->

<!--
================================================================================================================
		Repeatable sections - output
================================================================================================================
-->

	<div class="output_section card">

		<div class="card-body">

			<div class="form-group row">
				<label for="output_field_name" class="col-sm-3 col-form-label">Field Name</label>
				<div class="col-sm-9">
					<input type="text" class="form-control" id="output_field_name" name="output_field_name[]" placeholder="">
				</div>
			</div>

			<div class="form-group row">
				<label for="output_definition" class="col-sm-3 col-form-label">Definition</label>
				<div class="col-sm-9">
					<input type="text" class="form-control" id="output_definition" name="output_definition[]" placeholder="">
				</div>
			</div>

			<div class="form-group row">
				<label for="output_uom" class="col-sm-3 col-form-label">Unit of Measure</label>
				<div class="col-sm-9">
					<input type="text" class="form-control" id="output_uom" name="output_uom[]" placeholder="">
				</div>
			</div>

			<div class="form-group row">
				<div class="col-sm-3 offset-sm-9">
					<button style="width:auto;" class="btn btn-danger remove_section" type="button">Remove Output</button>
				</div>
			</div>

		</div> <!-- end of output card-body -->
	</div> <!-- end of output card -->

<!--
================================================================================================================
		Repeatable sections - parameter (group)
================================================================================================================
-->

	<div class="parameter_section card" id="id_temp">

		<div class="card-header" id="heading_temp">
			<h2 class="mb-0">
				<button id="heading_button" class="btn btn-link collapsed" type="button" data-toggle="collapse" 
				        data-target="#collapse_temp" aria-expanded="false" aria-controls="collapse_temp">Parameter Group</button>
			</h2>
		</div> <!-- end of parameter_group card-heading -->

		<div id="collapse_temp" class="collapse" aria-labelledby="heading_temp" data-parent="#parameter_sections">
			
			<div class="card-body">

				<div class="form-group row">
					<label for="parameter_group_name" class="col-sm-3 col-form-label">Group Name</label>
					<div class="col-sm-9">
						<input type="text" class="form-control" id="parameter_group_name" name="parameter_group_name[]" placeholder="">
					</div>
				</div>

				<div id="parameter_sub">

					<div id="parameter_sub_sections">
						<!--  content gets added here when 'add parameter field' button is used -->
					</div>
					<button style="width:auto;" class="btn btn-primary add_sub_section shadow-none" type="button">Add Parameter Field</button>

				</div>

				<div class="form-group row">
					<div class="col-sm-4 offset-sm-8">
						<button style="width:auto;" class="btn btn-danger remove_section" type="button">Remove Parameter Group</button>
					</div>
				</div>

			</div> <!-- end of parameter card-body -->
		</div> <!-- end of parameter collapse -->
	</div> <!-- end of parameter card -->
	
<!--
================================================================================================================
		Repeatable sections - parameter single
================================================================================================================
-->

	<div class="parameter_sub_section card" id="id_temp">

		<div class="card-header" id="heading_temp">
			<h2 class="mb-0">
				<button id="sub_heading_button" class="btn btn-link collapsed" type="button" data-toggle="collapse" 
				    data-target="#collapse_temp" aria-expanded="false" aria-controls="collapse_temp">Parameter Field</button>
			</h2>
		</div> <!-- end of parameter sub card-heading -->

		<div id="collapse_temp" class="collapse" aria-labelledby="heading_temp" data-parent="#parameter_sub_sections">

			<div class="card-body">

				<div class="form-group row">
					<label for="parameter_field_name" class="col-sm-3 col-form-label">Field Name</label>
					<div class="col-sm-9">
						<input type="text" class="form-control" id="parameter_field_name" name="parameter_field_name[]" placeholder="">
					</div>
				</div>

				<div class="form-group row">
					<label for="parameter_field_type" class="col-sm-3 col-form-label">Field Type</label>
					<div class="col-sm-9">
						<select id="parameter_field_type" name="parameter_field_type[]" class="form-control">
							<option disabled value=""      selected>Please choose a field type</option>
							<option          value="quantity"      >Quantity</option>
							<option          value="count"         >Count</option>
							<option          value="quantity_range">Quantity Range</option>
							<option          value="category"      >Category</option>
						</select>
					</div>
				</div>

				<div class="form-group row">
					<label for="parameter_definition" class="col-sm-3 col-form-label">Field Type Definition</label>
					<div class="col-sm-9">
						<input type="text" class="form-control" id="parameter_definition" name="parameter_definition[]" placeholder="">
					</div>
				</div>

				<div class="form-group row">
					<label for="parameter_label" class="col-sm-3 col-form-label">Label</label>
					<div class="col-sm-9">
						<input type="text" class="form-control" id="parameter_label" name="parameter_label[]" placeholder="">
					</div>
				</div>

				<div class="form-group row">
					<label for="parameter_description" class="col-sm-3 col-form-label">Description</label>
					<div class="col-sm-9">
						<input type="text" class="form-control" id="parameter_description" name="parameter_description[]" placeholder="">
					</div>
				</div>

				<div class="form-group row">
					<label for="parameter_value" class="col-sm-3 col-form-label">Value</label>
					<div class="col-sm-9">
						<input type="text" class="form-control" id="parameter_value" name="parameter_value[]" placeholder="">
					</div>
				</div>

				<div class="form-group row">
					<label for="parameter_uom" class="col-sm-3 col-form-label">Unit of Measure</label>
					<div class="col-sm-9">
						<input type="text" class="form-control" id="parameter_uom" name="parameter_uom[]" placeholder="">
					</div>
				</div>

				<div class="form-group row">
					<label for="parameter_constraint_type" class="col-sm-3 col-form-label">Constraint Type</label>
					<div class="col-sm-9">
						<select id="parameter_constraint_type" name="parameter_constraint_type[]" class="form-control">
							<option disabled value=""      selected>Please choose a constraint type</option>
							<option          value="none"          >None</option>							
							<option          value="interval"      >Interval</option>
							<option          value="allowed_values">Allowed Values</option>
						</select>
					</div>
				</div>

				<div class="form-group row" id="parameter_sub_interval_div">
					<label for="parameter_interval" class="col-sm-3 col-form-label">Interval</label>
					<div class="col-sm-9">
						<input type="text" class="form-control" id="parameter_interval" name="parameter_interval[]" placeholder="">
					</div>
				</div>

				<div class="form-group row" id="parameter_sub_allowed_values_div">
					<label for="parameter_value_list" class="col-sm-3 col-form-label">Allowed Values</label>

					<div class="col-sm-3">
						<input type="text" class="form-control" id="value_type_single" name="value_type_single[]" placeholder="">
					</div>

					<div class="col-sm-3" align="center">
						<button id="add_parameter_sub_value"    type="button" class="btn btn-primary shadow-none">Add</button>
						<br>
						<button id="remove_parameter_sub_value" type="button" class="btn btn-primary shadow-none">Remove</button>
					</div>
					
					<div class="col-sm-3">
						<select id="value_type_list" name="value_type_list[]" class="form-control" size=6></select>
					</div>
					<input type="hidden" id="value_type_string" name="value_type_string[]" value=""/>
				</div>

				<div class="form-group row">&nbsp;</div>

				<div class="form-group row">
					<div class="col-sm-3 offset-sm-9">
						<button style="width:auto;" class="btn btn-danger remove_section" type="button">Remove Field</button>
					</div>
				</div>

			</div> <!-- end of parameter single card-body -->
		</div> <!-- end of parameter single collapse -->
	</div> <!-- end of parameter single card -->


</div> <!-- end of hidden sections -->

<!--
================================================================================================================
		Modals - save xml
================================================================================================================
-->

<div class="modal fade" id="file_save_modal" tabindex="-1" role="dialog" aria-labelledby="file_download_modal_label" aria-hidden="true">
	<div class="modal-dialog modal-dialog-centered" role="document">
		<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title" id="file_download_modal_label">Save form content</h5>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
			</div>
			
			<div class="modal-body">

				Please enter a filename.<br><br>

				<div class="input-group">
					<input type="text" class="form-control" id="xml_filename" name="xml_filename" placeholder="">
					<div class="input-group-append">
						<span class="input-group-text" id="xml_file_extension">.xml</span>
					</div>
				</div>

				<br>Click OK to save.

			</div>
			
			<div class="modal-footer">
				<button style="margin: 5px;width: 100px;" type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
				<button type="button" class="btn btn-primary" data-dismiss="modal" onclick="save_xml();">OK</button>
			</div>
		</div>
	</div>
</div> <!-- end of file save modal -->

<!--
================================================================================================================
		Modals - load xml
================================================================================================================
-->

<div class="modal fade" id="file_load_modal" tabindex="-1" role="dialog" aria-labelledby="file_load_modal_label" aria-hidden="true">
	<div class="modal-dialog modal-dialog-centered" role="document">
		<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title" id="file_load_modal_label">Load form content</h5>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
			</div>

			<div class="modal-body">
			
				NOTICE:<br><br>
				This sensorML2 editor does not handle processes. Only OEM Descriptive records, and Simple Deployments can be viewed and edited. Also, please clear the form before  loading an XML file.
				<br><br>

				<div class="input-group">
					<div class="custom-file">
						<input type="file" class="custom-file-input" id="inputGroupFile01">
						<label class="custom-file-label" for="inputGroupFile01">Choose a file</label>
					</div>
				</div>

				<br>Click OK to load.

			</div>

			<div class="modal-footer">
				<button style="margin: 5px;width: 100px;" type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
				<button type="button" class="btn btn-primary" data-dismiss="modal" onclick="load_xml();">OK</button>
			</div>
		</div>
	</div>
</div> <!-- end of file load modal -->

<!--
================================================================================================================
		end of modals
================================================================================================================
-->

<script src="resources/js/jquery-3.3.1.min.js"></script>
<script src="resources/js/bootstrap.bundle.min.js"></script>
<script src="resources/js/jquery-ui.js"></script>
<script src="resources/js/main.js"></script>
<script src="resources/js/load_xml.js"></script>
<script src="resources/js/save_xml.js"></script>
<!-- script src="resources/js/view_xml.js"></script-->
<script src="resources/js/autoload.js"></script>
</body>
</html>