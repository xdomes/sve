$('#inputGroupFile01').on('change',function() {

	// get the file name
	file_name_from_load = $(this).val().replace('C:\\fakepath\\', "");
	
	// don't add the ".xml" extension, its added automatically later on saving
	$("#xml_filename").val(file_name_from_load.substring(0, file_name_from_load.length-4));

	// replace the "Choose a file" label
	$(this).next('.custom-file-label').html(file_name_from_load);
});

function load_xml()
{
	var reader = new FileReader();
	reader.onload = function (e) {
		var xmlDoc = $.parseXML(e.target.result);
		load_xml_doc(xmlDoc);
	}
	
	reader.readAsText($("#inputGroupFile01")[0].files[0]);
}

function clear_repeats()
{
	var i;
	var selector_string;

	visible_history_section_counter = 0;

	// go through this loop backwards so parameter_sub is cleared first
	for (i = repeatable_sections.length - 1; i >= 0; i--)
	{
		selector_string = "#" + repeatable_sections[i] + "_sections ." + repeatable_sections[i] + "_section:not(:empty)";
		$(selector_string).each(function()
		{
			$(this).fadeOut();
			$(this).empty();
		});
	}
}

function load_system_description(xml)
{
	var physical_system_xml = $(xml).find("sml\\:PhysicalSystem").first();
	var curr_field;
	
	var keywords_xml;
	var keyword_list_xml;

	// check if this file is for an oem description or sensor deployment
	curr_field = $(physical_system_xml).children("sml\\:typeOf");

	// if the "type of" element is present, this is a sensor deployment
	if (curr_field.length)
	{
		$('#file_type').val('deployment');

		// this statement will show the appropriate fields and menu tabs
		//check_file_type();

		// don't need to use escape when just looking for attributes
		$('#type_of_title').val(fix_text(curr_field.attr("xlink:title")));
		$('#type_of_href' ).val(fix_text(curr_field.attr("xlink:href" )));
	}
	
	// otherwise, this is an oem description
	else
	{
		$('#file_type').val('oem');

		// this statement will hide the appropriate fields and menu tabs
		//check_file_type();
	}

	curr_field = $(physical_system_xml).children("gml\\:name");
	$('#name').val(fix_text(curr_field.text()));

	curr_field = $(physical_system_xml).children("gml\\:identifier");
	$('#unique_id').val(fix_text(curr_field.text()));

	curr_field = $(physical_system_xml).children("gml\\:description");
	$('#physical_system').val(fix_text(curr_field.text()));

	keywords_xml = $(physical_system_xml).children("sml\\:keywords").first();
	keyword_list_xml = $(keywords_xml).find("sml\\:KeywordList");

	$(keyword_list_xml).find("sml\\:keyword").each(function()
	{
		push_item_to_list("keyword", fix_text($(this).text()));
	});
	
	check_file_type();
}

function load_system_identifiers(xml)
{
	var curr_label;
	var curr_value;

	$(xml).find("sml\\:identifier").each(function()
	{
		curr_label = $(this).find("sml\\:label");
		curr_label = curr_label.text().trim().split(" ").join("").toLowerCase();
		
		curr_value = fix_text($(this).find("sml\\:value").text());
		
		if (curr_label == "longname")
		{
			$('#long_name').val(curr_value);
		}
		
		if (curr_label == "shortname")
		{
			$('#short_name').val(curr_value);
		}
		
		if (curr_label == "serialnumber")
		{
			$('#serial_number').val(curr_value);
		}
		
		if (curr_label == "deployingagency")
		{
			$('#deploying_agency').val(curr_value);
		}

		if (curr_label == "manufacturer")
		{
			$('#sys_id_manufacturer').val(curr_value);
		}
		
		if (curr_label == "modelnumber")
		{
			$('#sys_id_model_number').val(curr_value);
		}

	});
	
	if ($('#type_of_href').val() != "" && $('#sys_id_manufacturer').val() == "")
	{
		get_field_from_typeof('manufacturer', 'sys_id_manufacturer');
	}

	if ($('#type_of_href').val() != "" && $('#sys_id_model_number').val() == "")
	{
		get_field_from_typeof('modelnumber', 'sys_id_model_number');
	}
}

function get_field_from_typeof(doc_label, form_field)
{
	$.get("resources/php/get_xml_file.php", 
	{
		filename: $('#type_of_href').val(),
		location: "external"
	},
	function(response)
	{
		var data = response;

		if (data.length)
		{
			var xml = $.parseXML(data);
			var curr_label;
			var curr_value;
			
			// parse the doc, find the field
			$(xml).find("sml\\:identifier").each(function()
			{
				curr_label = $(this).find("sml\\:label");
				curr_label = curr_label.text().trim().split(" ").join("").toLowerCase();
				
				curr_value = fix_text($(this).find("sml\\:value").text());
				
				if (curr_label == doc_label)
				{
					$('#' + form_field).val(curr_value);
				}
			});
		}
	});	
}

function load_system_classifiers(xml)
{
	var curr_label;
	var curr_value;

	$(xml).find("sml\\:classifier").each(function()
	{
		curr_label = $(this).find("sml\\:label");
		curr_label = curr_label.text().trim().split(" ").join("").toLowerCase();
		
		curr_value = fix_text($(this).find("sml\\:value").text());

		if (curr_label == "intendedapplication")
		{
			push_item_to_list("intended_application", curr_value);
		}
		
		if (curr_label == "sensortype")
		{
			push_item_to_list("sensor_type", curr_value);
		}
	});
}

function load_valid_time(xml)
{
	var valid_time_doc;
	var time_instant_doc;
	var valid_time_local_id;

	var time_pos;
	var input_state_val;
	
	valid_time_doc = $(xml).find("sml\\:validTime");
	time_instant_doc = $(valid_time_doc).find("gml\\:TimeInstant");

	// don't need to use escape when just looking for attributes
	valid_time_local_id = time_instant_doc.attr("gml:id");

	time_pos = $(time_instant_doc).find("gml\\:timePosition");
	input_state_val = time_pos.attr("indeterminatePosition")
	
	$('#valid_time_local_id').val(fix_text(valid_time_local_id));
	$('#input_state').val(input_state_val);
	$('#valid_time_date').val(time_pos.text());
}

function load_contacts(xml)
{
	var section;
	var outer;
	var inner;

	$(xml).find("sml\\:contact").each(function()
	{
		section = add_section("contact", "load");
		
		outer = $(this).attr("xlink:arcrole");
		if (outer)
		{
			$(section).find('#contact_role').val(fix_text(outer));
		}

		outer = $(this).find("gmd\\:individualName");
		inner = $(outer).find("gco\\:CharacterString");
		$(section).find('#individual_name').val(fix_text(inner.text()));

		outer = $(this).find("gmd\\:organisationName");
		inner = $(outer).find("gco\\:CharacterString");
		$(section).find('#organization_name').val(fix_text(inner.text()));

		outer = $(this).find("gmd\\:voice");
		inner = $(outer).find("gco\\:CharacterString");
		$(section).find('#phone_number').val(fix_text(inner.text()));

		outer = $(this).find("gmd\\:facsimile");
		inner = $(outer).find("gco\\:CharacterString");
		$(section).find('#fax_number').val(fix_text(inner.text()));

		outer = $(this).find("gmd\\:deliveryPoint");
		inner = $(outer).find("gco\\:CharacterString");
		$(section).find('#delivery_point').val(fix_text(inner.text()));

		outer = $(this).find("gmd\\:city");
		inner = $(outer).find("gco\\:CharacterString");
		$(section).find('#city').val(fix_text(inner.text()));

		outer = $(this).find("gmd\\:administrativeArea");
		inner = $(outer).find("gco\\:CharacterString");
		$(section).find('#administrative_area').val(fix_text(inner.text()));

		outer = $(this).find("gmd\\:postalCode");
		inner = $(outer).find("gco\\:CharacterString");
		$(section).find('#postal_code').val(fix_text(inner.text()));

		outer = $(this).find("gmd\\:country");
		inner = $(outer).find("gco\\:CharacterString");
		$(section).find('#country').val(fix_text(inner.text()));

		outer = $(this).find("gmd\\:electronicMailAddress");
		inner = $(outer).find("gco\\:CharacterString");
		$(section).find('#email_address').val(fix_text(inner.text()));
	});
}

function load_history(xml)
{
	var section;
	
	var history_xml = $(xml).find("sml\\:history");
	var event_list_xml = $(history_xml).find("sml\\:EventList");
	var little_event_xml = $(event_list_xml).find("sml\\:event")

	var little_time_xml;
	var time_instant_xml;
	
	var history_label;
	var history_description;
	var history_time_id;
	var history_time_value;
	
	var property_xml;
	var data_record_xml;
	
	var data_record_label;
	
	var field_value;
	var field_href;
	
	$(little_event_xml).find("sml\\:Event").each(function()
	{
		section = add_section("history", "load");
		
		// label and description should be children of "sml:Event"
		history_label = $(this).children("swe\\:label").first().text();
		history_description = $(this).children("swe\\:description").first().text();
		
		little_time_xml = $(this).find("sml\\:time");
		time_instant_xml = $(little_time_xml).find("gml\\:TimeInstant");
		history_time_id = $(time_instant_xml).attr("gml:id");
		history_time_value = $(time_instant_xml).find("gml\\:timePosition").text().trim();
		
		$(section).find('#heading_button').text(fix_text(history_label) + " (" + fix_text(history_time_value) + ")");
		$(section).find('#history_label').val(fix_text(history_label));
		$(section).find('#history_description').val(fix_text(history_description));
		$(section).find('#history_local_id').val(fix_text(history_time_id));
		$(section).find('#history_time').val(fix_text(history_time_value));
		
		property_xml = $(this).find("sml\\:property");
		data_record_xml = $(property_xml).find("swe\\:DataRecord");

		// the data record label should be a child of DataRecord
		data_record_label = $(data_record_xml).children("swe\\:label").first().text();
		$(section).find('#history_data_record_label').val(fix_text(data_record_label));
		
		// find all the fields for this event
		$(this).find("swe\\:field").each(function()
		{
			field_value = fix_text($(this).find("swe\\:value").text());
			
			if ($(this).attr("name") == "EventType")       
				$(section).find('#history_event_type').val(field_value);

			if ($(this).attr("name") == "SerialNumber")    
				$(section).find('#history_serial_number').val(field_value);

			if ($(this).attr("name") == "manufacturerDate" || $(this).attr("name") == "ManufactureDate")
				$(section).find('#history_manufacture_date').val(field_value);
			
			if ($(this).attr("name") == "deployedPeriod" || $(this).attr("name") == "DeploymentTimeRange")
				$(section).find('#history_deployed_period').val(field_value);

			if ($(this).attr("name") == "FirmwareVersion")
				$(section).find('#history_firmware_version').val(field_value);

			if ($(this).attr("name") == "CalibrationDate")
				$(section).find('#history_calibration_date').val(field_value);

			if ($(this).attr("name") == "CalibrationLocation")
				$(section).find('#history_calibration_location').val(field_value);
			
			field_href = fix_text($(this).attr("xlink:href"));
			
			if ($(this).attr("name") == "ComponentID")
				$(section).find('#history_component_id').val(field_href);

			if ($(this).attr("name") == "AdditionalDocumentation")
				$(section).find('#history_additional_documentation').val(field_href);
		});
	});
}

function load_configuration(xml)
{
	var config_xml = $(xml).find("sml\\:configuration");
	var config_settings_xml = $(config_xml).find("sml\\:Settings");
	var mode_setting = $(config_settings_xml).find("sml\\:setMode");
	var section;

	// don't need to use escape when just looking for attributes
	$('#configuration_mode_reference').val(fix_text(mode_setting.attr("ref")));
	$('#configuration_mode_value').val(fix_text(mode_setting.text()));

	$(config_settings_xml).find("sml\\:setValue").each(function()
	{
		section = add_section("configuration", "load");
		$(section).find('#configuration_reference').val(fix_text($(this).attr("ref")));
		$(section).find('#configuration_value').val(fix_text($(this).text()));
	});
}

function load_position(xml)
{
	var position_xml = $(xml).find("sml\\:position");
	var data_record_xml = $(position_xml).find("swe\\:DataRecord");
	var vector_xml;
	var coord_name;
	var quantity_xml;
	var position_definition;
	var uom_xml;
	var uom_code;
	var position_value;
	
	$(data_record_xml).find("swe\\:field").each(function()
	{
		vector_xml = $(this).find("swe\\:Vector");

		$(vector_xml).find("swe\\:coordinate").each(function()
		{
			coord_name = $(this).attr("name");
			quantity_xml = $(this).find("swe\\:Quantity");
			position_definition = fix_text($(quantity_xml).attr("definition"));
			uom_xml = $(quantity_xml).find("swe\\:uom");
			uom_code = fix_text($(uom_xml).attr("code"));
			position_value = fix_text($(quantity_xml).find("swe\\:value").text());

			if (coord_name == "Lat" || coord_name == "Latitude")
			{
				$('#latitude_definition').val(position_definition);
				$('#latitude_value').val(position_value);
				$('#latitude_uom').val(uom_code);
			}

			if (coord_name == "Lon" || coord_name == "Longitude")
			{
				$('#longitude_definition').val(position_definition);
				$('#longitude_value').val(position_value);
				$('#longitude_uom').val(uom_code);
			}

			if (coord_name == "Alt" || coord_name == "Altitude")
			{
				$('#vertical_datum_definition').val(position_definition);
				$('#vertical_datum_value').val(position_value);
				$('#vertical_datum_uom').val(uom_code);
			}

			if (coord_name == "trueHeading")
			{
				$('#orientation_definition').val(position_definition);
				$('#orientation_value').val(position_value);
				$('#orientation_uom').val(uom_code);
			}
		});
	});
}

function load_input(xml)
{
	var inputs_xml = $(xml).find("sml\\:inputs");
	var input_list_xml = $(inputs_xml).find("sml\\:InputList");
	
	var section;
	var observable_property_xml;

	$(input_list_xml).find("sml\\:input").each(function()
	{
		section = add_section("input", "load");
		
		$(section).find('#input_name').val(fix_text($(this).attr("name")));
		
		observable_property_xml = $(this).find("sml\\:ObservableProperty");
		
		$(section).find('#input_definition' ).val(fix_text($(observable_property_xml).attr("definition")));
		$(section).find('#input_label'      ).val(fix_text($(observable_property_xml).find("swe\\:label"      ).text()));
		$(section).find('#input_description').val(fix_text($(observable_property_xml).find("swe\\:description").text()));
	});
}

function load_output(xml)
{
	var outputs_xml = $(xml).find("sml\\:outputs");
	var output_list_xml = $(outputs_xml).find("sml\\:OutputList");
	var output_xml = $(output_list_xml).find("sml\\:output");
	
	$('#output_name').val(fix_text($(output_xml).attr("name")));
	
	var data_record_xml = $(output_xml).find("swe\\:DataRecord");
	
	var section;
	var quantity_xml;
	var uom_xml;

	$(data_record_xml).find("swe\\:field").each(function()
	{
		section = add_section("output", "load");
		
		$(section).find('#output_field_name').val(fix_text($(this).attr("name")));
		
		quantity_xml = $(this).find("swe\\:Quantity");
		
		$(section).find('#output_definition').val(fix_text($(quantity_xml).attr("definition")));
		
		uom_xml = $(quantity_xml).find("swe\\:uom");
		
		$(section).find('#output_uom').val(fix_text($(uom_xml).attr("code")));
	});
}

function load_parameters(xml)
{
	var physical_system_xml = $(xml).find("sml\\:PhysicalSystem");
	var parameters_xml = $(physical_system_xml).children("sml\\:parameters");
	var parameter_list_xml = $(parameters_xml).find("sml\\:ParameterList");
	var data_record_xml;

	var parameter_group_name;
	var parameter_field_name;

	var section;
	var sub_section;
	
	var child_xml;
	var field_xml;
	
	var constraint_xml;
	var allowed_values_xml;
	var interval_xml;
	var allowed_list_xml;

	$(parameter_list_xml).find("sml\\:parameter").each(function()
	{
		section = add_section("parameter", "load");

		parameter_group_name = fix_text($(this).attr("name"));
		$(section).find('#parameter_group_name').val(parameter_group_name);
		$(section).find('#heading_button').text(parameter_group_name);
		
		data_record_xml = $(this).find("swe\\:DataRecord");
		$(data_record_xml).find("swe\\:field").each(function()
		{
			sub_section = add_sub_section("#parameter_sub_sections_" + (parameter_group_section_counter));
			
			parameter_field_name = fix_text($(this).attr("name"));
			$(sub_section).find('#parameter_field_name').val(parameter_field_name);
			$(sub_section).find('#sub_heading_button').text(parameter_field_name);
			
			child_xml = $(this).find(":first-child");
			if (child_xml.is("swe\\:Quantity"))
			{
				$(sub_section).find('#parameter_field_type').val("quantity");
				field_xml = $(this).find("swe\\:Quantity");
			}

			if (child_xml.is("swe\\:Count"))
			{
				$(sub_section).find('#parameter_field_type').val("count");
				field_xml = $(this).find("swe\\:Count");
			}

			if (child_xml.is("swe\\:QuantityRange"))
			{
				$(sub_section).find('#parameter_field_type').val("quantity_range");
				field_xml = $(this).find("swe\\:QuantityRange");
			}

			if (child_xml.is("swe\\:Category"))
			{
				$(sub_section).find('#parameter_field_type').val("category");
				field_xml = $(this).find("swe\\:Category");
			}

			$(sub_section).find('#parameter_definition' ).val(fix_text($(field_xml).attr    ("definition"       )));
			$(sub_section).find('#parameter_label'      ).val(fix_text($(field_xml).find    ("swe\\:label"      ).text()));
			$(sub_section).find('#parameter_description').val(fix_text($(field_xml).find    ("swe\\:description").text()));
			$(sub_section).find('#parameter_uom'        ).val(fix_text($(field_xml).find    ("swe\\:uom"        ).attr("code")));
			$(sub_section).find('#parameter_value'      ).val(fix_text($(field_xml).children("swe\\:value"      ).text()));

			constraint_xml = $(field_xml).find("swe\\:constraint");

			if (constraint_xml.length)
			{
				allowed_values_xml = $(constraint_xml).find("swe\\:AllowedTokens");
				if (!allowed_values_xml.length) allowed_values_xml = $(constraint_xml).find("swe\\:AllowedValues");
				
				interval_xml = $(allowed_values_xml).find("swe\\:interval");
				if (interval_xml.length)
				{
					$(sub_section).find('#parameter_interval'        ).val(fix_text($(interval_xml).text()));
					$(sub_section).find('#parameter_constraint_type' ).val("interval");
					$(sub_section).find('#parameter_sub_interval_div').show();
				}

				allowed_list_xml = $(allowed_values_xml).find("swe\\:value");
				if (allowed_list_xml.length)
				{
					$(allowed_list_xml).each(function()
					{
						sub_push_item_to_list(parameter_sub_section_counter, fix_text($(this).text()));
					});
					
					$(sub_section).find('#parameter_constraint_type').val("allowed_values");
					$(sub_section).find('#parameter_sub_allowed_values_div').show();
				}
			}
			
			else
			{
				$(sub_section).find('#parameter_constraint_type').val("none");
			}
		});
	});
}

function load_xml_doc(xml)
{
	clear_repeats();

	load_system_description(xml);
	load_system_identifiers(xml);
	load_system_classifiers(xml);
	load_valid_time(xml);
	load_contacts(xml);
	load_history(xml);
	load_configuration(xml);
	load_position(xml);
	load_input(xml);
	load_output(xml);
	load_parameters(xml);	
	
	$('#description-tab').click();
}
