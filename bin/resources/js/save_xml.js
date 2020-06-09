function parse_keyword(text)
{
	var i;
	var return_string = "";
	var all_tokens = text.split(";");

	return_string += get_space(1);
	return_string += "<sml:keywords>\n";
	return_string += get_space(2);
	return_string += "<sml:KeywordList>\n";
	
	for (i = 0; i < all_tokens.length; i++)
	{
		return_string += get_space(3);
		return_string += "<sml:keyword>";
		return_string += all_tokens[i];
		return_string += "</sml:keyword>\n";
	}
	
	return_string += get_space(2);
	return_string += "</sml:KeywordList>\n";
	return_string += get_space(1);
	return_string += "</sml:keywords>\n";

	return return_string;
}

function add_classifier_beginning()
{
	var return_string = "";
	return_string += get_space(1);
	return_string += "<sml:classification>\n";
	return_string += get_space(2);
	return_string += "<sml:ClassifierList>\n";
	return return_string;
}

function add_classifier_ending()
{
	var return_string = "";
	return_string += get_space(2);
	return_string += "</sml:ClassifierList>\n";
	return_string += get_space(1);
	return_string += "</sml:classification>\n";
	return return_string;
}

function parse_classifier(type, text)
{
	var i;
	var return_string = "";
	var all_tokens = text.split(";");
	
	// these two variables are the only things that change based on which 
	// classifier we are adding 
	var term_string  = "";
	var label_string = "";
	
	if (type == 'intended_application')
	{
		term_string  = "<sml:Term definition=\"http://sensorml.com/ont/swe/property/application\">\n";
		label_string = "<sml:label>Intended Application</sml:label>\n";
	}

	if (type == 'sensor_type')
	{
		term_string  = "<sml:Term definition=\"http://sensorml.com/ont/swe/property/sensorType\">\n";
		label_string = "<sml:label>Sensor Type</sml:label>\n";
	}

	for (i = 0; i < all_tokens.length; i++)
	{
		return_string += get_space(3);
		return_string += "<sml:classifier>\n";
		
		return_string += get_space(4);
		return_string += term_string;

		return_string += get_space(5);
		return_string += label_string;
		
		return_string += get_space(5);
		return_string += "<sml:value>";
		return_string += all_tokens[i];
		return_string += "</sml:value>\n";
		
		return_string += get_space(4);
		return_string += "</sml:Term>\n";

		return_string += get_space(3);
		return_string += "</sml:classifier>\n";
	}
	
	return return_string;
}

function parse_physical_system(text)
{
	var return_string = "";
	return_string += get_space(1);
	return_string += "<gml:description>";
	return_string += text;
	return_string += "</gml:description>\n";
	return return_string;
}

function parse_unique_id(text)
{
	var return_string = "";
	return_string += get_space(1);
	return_string += "<gml:identifier codeSpace=\"UniqueID\">";
	return_string += text;
	return_string += "</gml:identifier>\n";
	return return_string;
}

function parse_name(text)
{
	var return_string = "";
	return_string += get_space(1);
	return_string += "<gml:name>";
	return_string += text;
	return_string += "</gml:name>\n";
	return return_string;
}

function parse_heading(text)
{
	var return_string = "";
	return_string += "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n";
	return_string += "<sml:PhysicalSystem gml:id=\"";

	var all_tokens = text.split(":");
	return_string += all_tokens[all_tokens.length - 1];

	return_string += "\" xml:lang=\"en\"\n";
	
	return_string += get_space(1);
	return_string += "xmlns:sml=\"http://www.opengis.net/sensorml/2.0\"\n";
	return_string += get_space(1);
	return_string += "xmlns:swe=\"http://www.opengis.net/swe/2.0\"\n";
   	return_string += get_space(1);
	return_string += "xmlns:gml=\"http://www.opengis.net/gml/3.2\"\n";
   	return_string += get_space(1);
	return_string += "xmlns:gmd=\"http://www.isotc211.org/2005/gmd\"\n";
   	return_string += get_space(1);
	return_string += "xmlns:gco=\"http://www.isotc211.org/2005/gco\"\n";
   	return_string += get_space(1);
	return_string += "xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\"\n";
   	return_string += get_space(1);
	return_string += "xmlns:xlink=\"http://www.w3.org/1999/xlink\"\n";
   	return_string += get_space(1);
    return_string += "xsi:schemaLocation=\"http://www.opengis.net/sensorml/2.0 http://schemas.opengis.net/sensorML/2.0/sensorML.xsd\">\n";

	return return_string;
}

function add_identifier_beginning()
{
	var return_string = "";
	return_string += get_space(1);
	return_string += "<sml:identification>\n";
	return_string += get_space(2);
	return_string += "<sml:IdentifierList>\n";
	return return_string;
}

function add_identifier_ending()
{
	var return_string = "";
	return_string += get_space(2);
	return_string += "</sml:IdentifierList>\n";
	return_string += get_space(1);
	return_string += "</sml:identification>\n";
	return return_string;
}

function parse_identifier(type, text)
{
	var return_string = "";
	
	text = fix_text(text);
	
	// these two variables are the only things that change based on which 
	// identifier we are adding 
	var term_string  = "";
	var label_string = "";
	
	if (type == 'long_name')
	{
		term_string  = "<sml:Term definition=\"http://sensorml.com/ont/swe/property/longName\">\n";
		label_string = "<sml:label>Long Name</sml:label>\n";
	}
	
	if (type == 'short_name')
	{
		term_string  = "<sml:Term definition=\"http://sensorml.com/ont/swe/property/shortName\">\n";
		label_string = "<sml:label>Short Name</sml:label>\n";
	}
	
	if (type == 'serial_number')
	{
		term_string  = "<sml:Term definition=\"http://sensorml.com/ont/swe/property/serialNumber\">\n";
		label_string = "<sml:label>Serial Number</sml:label>\n";
	}
	
	if (type == 'deploying_agency')
	{
		term_string  = "<sml:Term definition=\"http://sensorml.com/ont/swe/property/deployer\">\n";
		label_string = "<sml:label>Deploying Agency</sml:label>\n";
	}

	if (type == 'manufacturer')
	{
		term_string  = "<sml:Term definition=\"http://sensorml.com/ont/swe/property/manufacturer\">\n";
		label_string = "<sml:label>Manufacturer</sml:label>\n";
	}

	if (type == 'model_number')
	{
		term_string  = "<sml:Term definition=\"http://sensorml.com/ont/swe/property/modelNumber\">\n";
		label_string = "<sml:label>Model Number</sml:label>\n";
	}

	return_string += get_space(3);
	return_string += "<sml:identifier>\n";
	
	return_string += get_space(4);
	return_string += term_string;

	return_string += get_space(5);
	return_string += label_string;
	
	return_string += get_space(5);
	return_string += "<sml:value>";
	return_string += text;
	return_string += "</sml:value>\n";
	
	return_string += get_space(4);
	return_string += "</sml:Term>\n";

	return_string += get_space(3);
	return_string += "</sml:identifier>\n";
	
	return return_string;
}

function parse_valid_time(local_id, input_state, date_string)
{
	var return_string = "";
	return_string += get_space(1);
	return_string += "<sml:validTime>\n";
	return_string += get_space(2);
	return_string += "<gml:TimeInstant gml:id=\"";
	return_string += local_id;
	return_string += "\">\n";
	return_string += get_space(3);
	return_string += "<gml:timePosition indeterminatePosition=\"";
	return_string += input_state;
	return_string += "\">";
	return_string += date_string;
	return_string += "</gml:timePosition>\n";
	return_string += get_space(2);
	return_string += "</gml:TimeInstant>\n";
	return_string += get_space(1);
	return_string += "</sml:validTime>\n";
	return return_string;
}

function add_contact_beginning()
{
	var return_string = "";
	return_string += get_space(1);
	return_string += "<sml:contacts>\n";
	return_string += get_space(2);
	return_string += "<sml:ContactList>\n";
	return return_string;
}

function add_contact_ending()
{
	var return_string = "";
	return_string += get_space(2);
	return_string += "</sml:ContactList>\n";
	return_string += get_space(1);
	return_string += "</sml:contacts>\n";
	return return_string;
}

function empty_contact_single(curr_div)
{
	if (curr_div.find('#contact_role').val().trim()        != "") return false;
	if (curr_div.find('#individual_name').val().trim()     != "") return false;
	if (curr_div.find('#organization_name').val().trim()   != "") return false;
	if (curr_div.find('#phone_number').val().trim()        != "") return false;
	if (curr_div.find('#fax_number').val().trim()          != "") return false;
	if (curr_div.find('#delivery_point').val().trim()      != "") return false;
	if (curr_div.find('#city').val().trim()                != "") return false;
	if (curr_div.find('#administrative_area').val().trim() != "") return false;
	if (curr_div.find('#postal_code').val().trim()         != "") return false;
	if (curr_div.find('#country').val().trim()             != "") return false;
	if (curr_div.find('#email_address').val().trim()       != "") return false;

	return true;
}

function empty_contact_all()
{
	var return_val = true;

	$('#contact_sections .contact_section:not(:empty)').each(function()
	{
		if (!empty_contact_single($(this))) return_val = false;
	});

	return return_val;
}

function parse_contact(curr_div)
{
	var return_string = "";
	return_string += get_space(3);

	return_string += "<sml:contact";
	if (curr_div.find('#contact_role').val() != "")
	{
		return_string += " xlink:arcrole=\"";
		return_string += fix_text(curr_div.find('#contact_role').val());
		return_string += "\"";
	}
	return_string += ">\n";

	return_string += get_space(4);
	return_string += "<gmd:CI_ResponsibleParty>\n";

	if (curr_div.find('#individual_name').val() != "")
	{
		return_string += get_space(5);
		return_string += "<gmd:individualName>\n";
		return_string += get_space(6);
		return_string += "<gco:CharacterString>";
		return_string += fix_text(curr_div.find('#individual_name').val());
		return_string += "</gco:CharacterString>\n";
		return_string += get_space(5);
		return_string += "</gmd:individualName>\n";
	}

	if (curr_div.find('#organization_name').val() != "")
	{
		return_string += get_space(5);
		return_string += "<gmd:organisationName>\n";
		return_string += get_space(6);
		return_string += "<gco:CharacterString>";
		return_string += fix_text(curr_div.find('#organization_name').val());
		return_string += "</gco:CharacterString>\n";
		return_string += get_space(5);
		return_string += "</gmd:organisationName>\n";
	}

	return_string += get_space(5);
	return_string += "<gmd:contactInfo>\n";
	return_string += get_space(6);
	return_string += "<gmd:CI_Contact>\n";
	
	// check for either phone number or fax number
	if (curr_div.find('#phone_number').val() != "" || curr_div.find('#fax_number').val() != "")
	{
		return_string += get_space(7);
		return_string += "<gmd:phone>\n";
		return_string += get_space(8);
		return_string += "<gmd:CI_Telephone>\n";
		
		// add phone number, if it was submitted
		if (curr_div.find('#phone_number').val() != "")
		{
			return_string += get_space(9);
			return_string += "<gmd:voice>\n";
			return_string += get_space(10);
			return_string += "<gco:CharacterString>";
			return_string += fix_text(curr_div.find('#phone_number').val());
			return_string += "</gco:CharacterString>\n";
			return_string += get_space(9);
			return_string += "</gmd:voice>\n";
		}
		
		// add fax number, if it was submitted
		if (curr_div.find('#fax_number').val() != "")
		{
			return_string += get_space(9);
			return_string += "<gmd:facsimile>\n";
			return_string += get_space(10);
			return_string += "<gco:CharacterString>";
			return_string += fix_text(curr_div.find('#fax_number').val());
			return_string += "</gco:CharacterString>\n";
			return_string += get_space(9);
			return_string += "</gmd:facsimile>\n";
		}

		return_string += get_space(8);
		return_string += "</gmd:CI_Telephone>\n";
		return_string += get_space(7);
		return_string += "</gmd:phone>\n";
	}

	return_string += get_space(7);
	return_string += "<gmd:address>\n";
	return_string += get_space(8);
	return_string += "<gmd:CI_Address>\n";

	if (curr_div.find('#delivery_point').val() != "")
	{
		return_string += get_space(9);
		return_string += "<gmd:deliveryPoint>\n";
		return_string += get_space(10);
		return_string += "<gco:CharacterString>";
		return_string += fix_text(curr_div.find('#delivery_point').val());
		return_string += "</gco:CharacterString>\n";
		return_string += get_space(9);
		return_string += "</gmd:deliveryPoint>\n";
	}

	if (curr_div.find('#city').val() != "")
	{
		return_string += get_space(9);
		return_string += "<gmd:city>\n";
		return_string += get_space(10);
		return_string += "<gco:CharacterString>";
		return_string += fix_text(curr_div.find('#city').val());
		return_string += "</gco:CharacterString>\n";
		return_string += get_space(9);
		return_string += "</gmd:city>\n";
	}

	if (curr_div.find('#administrative_area').val() != "")
	{
		return_string += get_space(9);
		return_string += "<gmd:administrativeArea>\n";
		return_string += get_space(10);
		return_string += "<gco:CharacterString>";
		return_string += fix_text(curr_div.find('#administrative_area').val());
		return_string += "</gco:CharacterString>\n";
		return_string += get_space(9);
		return_string += "</gmd:administrativeArea>\n";
	}

	if (curr_div.find('#postal_code').val() != "")
	{
		return_string += get_space(9);
		return_string += "<gmd:postalCode>\n";
		return_string += get_space(10);
		return_string += "<gco:CharacterString>";
		return_string += fix_text(curr_div.find('#postal_code').val());
		return_string += "</gco:CharacterString>\n";
		return_string += get_space(9);
		return_string += "</gmd:postalCode>\n";
	}

	if (curr_div.find('#country').val() != "")
	{
		return_string += get_space(9);
		return_string += "<gmd:country>\n";
		return_string += get_space(10);
		return_string += "<gco:CharacterString>";
		return_string += fix_text(curr_div.find('#country').val());
		return_string += "</gco:CharacterString>\n";
		return_string += get_space(9);
		return_string += "</gmd:country>\n";
	}

	if (curr_div.find('#email_address').val() != "")
	{
		return_string += get_space(9);
		return_string += "<gmd:electronicMailAddress>\n";
		return_string += get_space(10);
		return_string += "<gco:CharacterString>";
		return_string += fix_text(curr_div.find('#email_address').val());
		return_string += "</gco:CharacterString>\n";
		return_string += get_space(9);
		return_string += "</gmd:electronicMailAddress>\n";
	}

	return_string += get_space(8);
    return_string += "</gmd:CI_Address>\n";
	return_string += get_space(7);
	return_string += "</gmd:address>\n";

	return_string += get_space(6);
	return_string += "</gmd:CI_Contact>\n";
	return_string += get_space(5);
	return_string += "</gmd:contactInfo>\n";

	return_string += get_space(5);
	return_string += "<gmd:role gco:nilReason=\"inapplicable\"/>\n";
	
	return_string += get_space(4);
	return_string += "</gmd:CI_ResponsibleParty>\n";
	return_string += get_space(3);
	return_string += "</sml:contact>\n";

	return return_string;
}

function add_history_beginning()
{
	var return_string = "";
	return_string += get_space(1);
	return_string += "<sml:history>\n";
	return_string += get_space(2);
	return_string += "<sml:EventList>\n";
	return return_string;
}

function add_history_ending()
{
	var return_string = "";
	return_string += get_space(2);
	return_string += "</sml:EventList>\n";
	return_string += get_space(1);
	return_string += "</sml:history>\n";
	return return_string;
}

function empty_history_single(curr_div)
{
	if (curr_div.find('#history_label'                   ).val().trim() != "") return false;
	if (curr_div.find('#history_description'             ).val().trim() != "") return false;
	if (curr_div.find('#history_local_id'                ).val().trim() != "") return false;
	if (curr_div.find('#history_time'                    ).val().trim() != "") return false;
	if (curr_div.find('#history_data_record_label'       ).val().trim() != "") return false;
	if (curr_div.find('#history_event_type'              ).val().trim() != "") return false;
	if (curr_div.find('#history_component_id'            ).val().trim() != "") return false;
	if (curr_div.find('#history_serial_number'           ).val().trim() != "") return false;
	if (curr_div.find('#history_manufacture_date'        ).val().trim() != "") return false;
	if (curr_div.find('#history_deployed_period'         ).val().trim() != "") return false;
	if (curr_div.find('#history_firmware_version'        ).val().trim() != "") return false;
	if (curr_div.find('#history_calibration_date'        ).val().trim() != "") return false;
	if (curr_div.find('#history_calibration_location'    ).val().trim() != "") return false;
	if (curr_div.find('#history_additional_documentation').val().trim() != "") return false;

	return true;
}

function empty_history_all()
{
	var return_val = true;

	$('#history_sections .history_section:not(:empty)').each(function()
	{
		if (!empty_history_single($(this))) return_val = false;
	});

	return return_val;
}

function parse_history(curr_div, i)
{
	var return_string   = "";
	var curr_label      = curr_div.find('#history_label'     ).val().trim().toLowerCase();
	var curr_event_type = curr_div.find('#history_event_type').val().trim().toLowerCase();
	
	return_string += get_space(3);
	return_string += "<sml:event>\n";
	return_string += get_space(4);
	return_string += "<sml:Event";

	// checking if this is the first div
	if (i == 0)
	{
		// check if this is the initial deployment
		if (curr_label.includes("deployment") || curr_event_type.includes("deployment"))
		{
			return_string += " definition=\"http://sensorml.com/ont/swe/property/deploymentEvent\"";
		}
	}

	return_string += ">\n";

	if (curr_div.find('#history_label').val().trim() != "")
	{
		return_string += get_space(5);
		return_string += "<swe:label>";
		return_string += fix_text(curr_div.find('#history_label').val());
		return_string += "</swe:label>\n";
	}

	if (curr_div.find('#history_description').val().trim() != "")
	{
		return_string += get_space(5);
		return_string += "<swe:description>";
		return_string += fix_text(curr_div.find('#history_description').val());
		return_string += "</swe:description>\n";
	}

	if (curr_div.find('#history_local_id').val().trim() != "" ||
		curr_div.find('#history_time'    ).val().trim() != "" )
	{
		return_string += get_space(5);
		return_string += "<sml:time>\n";
		return_string += get_space(6);
		return_string += "<gml:TimeInstant";
		
		if (curr_div.find('#history_local_id').val().trim() != "")
		{
			return_string += " gml:id=\"";
			return_string += fix_text(curr_div.find('#history_local_id').val());
			return_string += "\"";
		}
		
		return_string += ">\n";
		
		if (curr_div.find('#history_time').val().trim() != "")
		{
			return_string += get_space(7);
			return_string += "<gml:timePosition>\n";
			return_string += get_space(8);
			return_string += fix_text(curr_div.find('#history_time').val());
			return_string += "\n";
			return_string += get_space(7);
			return_string += "</gml:timePosition>\n";
		}
		
		return_string += get_space(6);
		return_string += "</gml:TimeInstant>\n";
		return_string += get_space(5);
		return_string += "</sml:time>\n";
	}

	return_string += get_space(5);
	return_string += "<sml:property>\n";
	return_string += get_space(6);
	return_string += "<swe:DataRecord>\n";

	if (curr_div.find('#history_data_record_label').val().trim() != "")
	{
		return_string += get_space(7);
		return_string += "<swe:label>";
		return_string += fix_text(curr_div.find('#history_data_record_label').val());
		return_string += "</swe:label>\n";
	}

	if (curr_div.find('#history_event_type').val().trim() != "")
	{
		return_string += get_space(7);
		return_string += "<swe:field name=\"EventType\">\n";
		return_string += get_space(8);
		return_string += "<swe:Category definition=\"http://mmisw.org/ont/mvco/historyEventType\">\n";
		return_string += get_space(9);
		return_string += "<swe:value>";
		return_string += fix_text(curr_div.find('#history_event_type').val());
		return_string += "</swe:value>\n";
		return_string += get_space(8);
		return_string += "</swe:Category>\n";
		return_string += get_space(7);
		return_string += "</swe:field>\n";
	}

	if (curr_div.find('#history_component_id').val().trim() != "")
	{
		return_string += get_space(7);
		return_string += "<swe:field name=\"ComponentID\"\n";
		return_string += get_space(8);
		return_string += "xlink:href=\"";
		return_string += fix_text(curr_div.find('#history_component_id').val());
		return_string += "\"/>\n";
	}
	
	if (curr_div.find('#history_serial_number').val().trim() != "")
	{
		return_string += get_space(7);
		return_string += "<swe:field name=\"SerialNumber\">\n";
		return_string += get_space(8);
		return_string += "<swe:Category definition=\"http://sensorml.com/ont/swe/property/serialNumber\">\n";
		return_string += get_space(9);
		return_string += "<swe:value>";
		return_string += fix_text(curr_div.find('#history_serial_number').val());
		return_string += "</swe:value>\n";
		return_string += get_space(8);
		return_string += "</swe:Category>\n";
		return_string += get_space(7);
		return_string += "</swe:field>\n";
	}

	if (curr_div.find('#history_manufacture_date').val().trim() != "")
	{
		return_string += get_space(7);
		return_string += "<swe:field name=\"ManufactureDate\">\n";
		return_string += get_space(8);
		return_string += "<swe:Time definition=\"http://sensorml.com/ont/swe/property/manufactureDate\"\n";
		return_string += get_space(9);
		return_string += "referenceFrame=\"http://www.opengis.net/def/trs/OGC/0/GPS\">\n";
		return_string += get_space(9);
		return_string += "<swe:label>Manufacture Date</swe:label>\n";
		return_string += get_space(9);
		return_string += "<swe:uom xlink:href=\"http://www.opengis.net/def/uom/ISO‐8601/0/Gregorian\"/>\n";
		return_string += get_space(9);
		return_string += "<swe:value>";
		return_string += fix_text(curr_div.find('#history_manufacture_date').val());
		return_string += "</swe:value>\n";
		return_string += get_space(8);
		return_string += "</swe:Time>\n";
		return_string += get_space(7);
		return_string += "</swe:field>\n";
	}
	
	if (curr_div.find('#history_deployed_period').val().trim() != "")
	{
		return_string += get_space(7);
		return_string += "<swe:field name=\"deployedPeriod\">\n";
		return_string += get_space(8);
		return_string += "<swe:TimeRange definition=\"http://sensorml.com/ont/swe/property/deployedTimeRange\"\n";
		return_string += get_space(9);
		return_string += "referenceFrame=\"http://www.opengis.net/def/trs/OGC/0/GPS\">\n";
		return_string += get_space(9);
		return_string += "<swe:label>Deployed Period</swe:label>\n";
		return_string += get_space(9);
		return_string += "<swe:uom xlink:href=\"http://www.opengis.net/def/uom/ISO‐8601/0/Gregorian\"/>\n";
		return_string += get_space(9);
		return_string += "<swe:value>";
		return_string += fix_text(curr_div.find('#history_deployed_period').val());
		return_string += "</swe:value>\n";
		return_string += get_space(8);
		return_string += "</swe:TimeRange>\n";
		return_string += get_space(7);
		return_string += "</swe:field>\n";
	}

	if (curr_div.find('#history_firmware_version').val().trim() != "")
	{
		return_string += get_space(7);
		return_string += "<swe:field name=\"FirmwareVersion\">\n";
		return_string += get_space(8);
		return_string += "<swe:Category definition=\"http://sensorml.com/ont/swe/property/firmwareVersion\">\n";
		return_string += get_space(9);
		return_string += "<swe:value>";
		return_string += fix_text(curr_div.find('#history_firmware_version').val());
		return_string += "</swe:value>\n";
		return_string += get_space(8);
		return_string += "</swe:Category>\n";
		return_string += get_space(7);
		return_string += "</swe:field>\n";
	}

	if (curr_div.find('#history_calibration_date').val().trim() != "")
	{
		return_string += get_space(7);
		return_string += "<swe:field name=\"CalibrationDate\">\n";
		return_string += get_space(8);
		return_string += "<swe:Time\n";
		return_string += get_space(9);
		return_string += "referenceFrame=\"http://www.opengis.net/def/trs/OGC/0/GPS\">\n";
		return_string += get_space(9);
		return_string += "<swe:label>Calibration Date</swe:label>\n";
		return_string += get_space(9);
		return_string += "<swe:uom xlink:href=\"http://www.opengis.net/def/uom/ISO‐8601/0/Gregorian\"/>\n";
		return_string += get_space(9);
		return_string += "<swe:value>";
		return_string += fix_text(curr_div.find('#history_calibration_date').val());
		return_string += "</swe:value>\n";
		return_string += get_space(8);
		return_string += "</swe:Time>\n";
		return_string += get_space(7);
		return_string += "</swe:field>\n";
	}
	
	if (curr_div.find('#history_calibration_location').val().trim() != "")
	{
		return_string += get_space(7);
		return_string += "<swe:field name=\"CalibrationLocation\">\n";
		return_string += get_space(8);
		return_string += "<swe:Category>\n";
		return_string += get_space(9);
		return_string += "<swe:value>";
		return_string += fix_text(curr_div.find('#history_calibration_location').val());
		return_string += "</swe:value>\n";
		return_string += get_space(8);
		return_string += "</swe:Category>\n";
		return_string += get_space(7);
		return_string += "</swe:field>\n";
	}

	if (curr_div.find('#history_additional_documentation').val().trim() != "")
	{
		return_string += get_space(7);
		return_string += "<swe:field name=\"AdditionalDocumentation\"\n";
		return_string += get_space(8);
		return_string += "xlink:href=\"";
		return_string += fix_text(curr_div.find('#history_additional_documentation').val());
		return_string += "\"/>\n";
	}

	return_string += get_space(6);
	return_string += "</swe:DataRecord>\n";
	return_string += get_space(5);
	return_string += "</sml:property>\n";
	return_string += get_space(4);
	return_string += "</sml:Event>\n";
	return_string += get_space(3);
	return_string += "</sml:event>\n\n";
	
	return return_string;
}

function parse_type_of(type_of_title, type_of_href)
{
	var return_string = "";
	return_string += get_space(1);
	return_string += "<sml:typeOf xlink:title=\"" + type_of_title + "\"\n";
	return_string += get_space(2);
	return_string += "xlink:href=\"" + type_of_href + "\"\/>\n";

	return return_string;
}

function add_configuration_beginning()
{
	var return_string = "";
	return_string += get_space(1);
	return_string += "<sml:configuration>\n";
	return_string += get_space(2);
	return_string += "<sml:Settings>\n";
	return return_string;
}

function add_configuration_ending()
{
	var return_string = "";
	return_string += get_space(2);
	return_string += "</sml:Settings>\n";
	return_string += get_space(1);
	return_string += "</sml:configuration>\n";
	return return_string;
}

function parse_configuration_mode(ref, val)
{
	var return_string = "";
	return_string += get_space(3);
	// two spaces after "Mode"
	return_string += "<sml:setMode  ref=\"";
	return_string += ref;
	return_string += "\">";
	return_string += val;
	return_string += "</sml:setMode>\n";
	return return_string;
}

function empty_configuration_single(curr_div)
{
	if (curr_div.find('#configuration_reference').val().trim() != "") return false;
	if (curr_div.find('#configuration_value').val().trim()     != "") return false;
	return true;
}

function empty_configuration_all()
{
	var return_val = true;

	$('#configuration_sections .configuration_section:not(:empty)').each(function()
	{
		if (!empty_configuration_single($(this))) return_val = false;
	});

	return return_val;
}

function parse_configuration(curr_div)
{
	var return_string = "";
	return_string += get_space(3);
	return_string += "<sml:setValue ref=\"";
	return_string += fix_text(curr_div.find('#configuration_reference').val());
	return_string += "\">";
	return_string += fix_text(curr_div.find('#configuration_value').val());
	return_string += "</sml:setValue>\n";
	return return_string;
}

function latitude_empty()
{
	if ($('#latitude_definition').val().trim() != "") return false;
	if ($('#latitude_value').val().trim()      != "") return false;
	if ($('#latitude_uom').val().trim()        != "") return false;
	return true;
}

function longitude_empty()
{
	if ($('#longitude_definition').val().trim() != "") return false;
	if ($('#longitude_value').val().trim()      != "") return false;
	if ($('#longitude_uom').val().trim()        != "") return false;
	return true;
}

function vertical_datum_empty()
{
	if ($('#vertical_datum_definition').val().trim() != "") return false;
	if ($('#vertical_datum_value').val().trim()      != "") return false;
	if ($('#vertical_datum_uom').val().trim()        != "") return false;
	return true;
}

function location_empty()
{
	if (!latitude_empty())       return false;
	if (!longitude_empty())      return false;
	if (!vertical_datum_empty()) return false;
	return true;
}

function orientation_empty()
{
	if ($('#orientation_definition').val().trim() != "") return false;
	if ($('#orientation_value').val().trim()      != "") return false;
	if ($('#orientation_uom').val().trim()        != "") return false;
	return true;
}

function position_empty()
{
	if (!location_empty())    return false;
	if (!orientation_empty()) return false;
	return true;
}

function parse_position()
{
	var return_string = "";
	return_string += get_space(1);
	return_string += "<sml:position>\n";
	return_string += get_space(2);
	return_string += "<swe:DataRecord>\n";

	// check if there is location data (any of lat, long, vertical)
	if (!location_empty())
	{
		return_string += get_space(3);
		return_string += "<swe:field name=\"location\">\n";
		return_string += get_space(4);
		// no closing bracket, continues to next line
		return_string += "<swe:Vector\n";
		return_string += get_space(5);
		return_string += "definition=\"http://sensorml.com/ont/swe/property/SensorLocation\"\n";
		return_string += get_space(5);
		return_string += "referenceFrame=\"http://www.opengis.net/def/crs/EPSG/6.7/4326\">\n";
		
		// check if latitude was entered
		if (!latitude_empty())
		{
			return_string += get_space(5);
			return_string += "<swe:coordinate name=\"Latitude\">\n";
			return_string += get_space(6);
			return_string += "<swe:Quantity definition=\"";
			return_string += fix_text($('#latitude_definition').val());
			return_string += "\" axisID=\"Lat\">\n";
			return_string += get_space(7);
			return_string += "<swe:uom code=\"" + fix_text($('#latitude_uom').val()) + "\"/>\n";
			return_string += get_space(7);
			return_string += "<swe:value>" + fix_text($('#latitude_value').val()) + "</swe:value>\n";
			return_string += get_space(6);
			return_string += "</swe:Quantity>\n";
			return_string += get_space(5);
			return_string += "</swe:coordinate>\n";
		}

		// check if latitude was entered
		if (!longitude_empty())
		{
			return_string += get_space(5);
			return_string += "<swe:coordinate name=\"Longitude\">\n";
			return_string += get_space(6);
			return_string += "<swe:Quantity definition=\"";
			return_string += fix_text($('#longitude_definition').val());
			return_string += "\" axisID=\"Long\">\n";
			return_string += get_space(7);
			return_string += "<swe:uom code=\"" + fix_text($('#longitude_uom').val()) + "\"/>\n";
			return_string += get_space(7);
			return_string += "<swe:value>" + fix_text($('#longitude_value').val()) + "</swe:value>\n";
			return_string += get_space(6);
			return_string += "</swe:Quantity>\n";
			return_string += get_space(5);
			return_string += "</swe:coordinate>\n";
		}

		// check if vertical datum was entered
		if (!vertical_datum_empty())
		{
			return_string += get_space(5);
			return_string += "<swe:coordinate name=\"Altitude\">\n";
			return_string += get_space(6);
			return_string += "<swe:Quantity definition=\"";
			return_string += fix_text($('#vertical_datum_definition').val());
			return_string += "\" axisID=\"Z\">\n";
			return_string += get_space(7);
			return_string += "<swe:uom code=\"" + fix_text($('#vertical_datum_uom').val()) + "\"/>\n";
			return_string += get_space(7);
			return_string += "<swe:value>" + fix_text($('#vertical_datum_value').val()) + "</swe:value>\n";
			return_string += get_space(6);
			return_string += "</swe:Quantity>\n";
			return_string += get_space(5);
			return_string += "</swe:coordinate>\n";
		}
		
		return_string += get_space(4);
		return_string += "</swe:Vector>\n";
		return_string += get_space(3);
		return_string += "</swe:field>\n";
	}

	// check if there is orientation data
	if (!orientation_empty())
	{
		return_string += get_space(3);
		return_string += "<swe:field name=\"orientation\">\n";
		return_string += get_space(4);
		// no closing bracket, continues to next line
		return_string += "<swe:Vector\n";
		return_string += get_space(5);
		return_string += "definition=\"http://sensorml.com/ont/swe/property/SensorOrientation\"\n";
		return_string += get_space(5);
		return_string += "referenceFrame=\"http://www.opengis.net/def/crs/NED\">\n";
		
		return_string += get_space(5);
		return_string += "<swe:coordinate name=\"trueHeading\">\n";
		return_string += get_space(6);
		return_string += "<swe:Quantity definition=\"";
		return_string += fix_text($('#orientation_definition').val());
		return_string += "\">\n";
		return_string += get_space(7);
		return_string += "<swe:uom code=\"" + fix_text($('#orientation_uom').val()) + "\"/>\n";
		return_string += get_space(7);
		return_string += "<swe:value>" + fix_text($('#orientation_value').val()) + "</swe:value>\n";
		return_string += get_space(6);
		return_string += "</swe:Quantity>\n";
		return_string += get_space(5);
		return_string += "</swe:coordinate>\n";

		return_string += get_space(4);
		return_string += "</swe:Vector>\n";
		return_string += get_space(3);
		return_string += "</swe:field>\n";
	}

	return_string += get_space(2);
	return_string += "</swe:DataRecord>\n";
	return_string += get_space(1);
	return_string += "</sml:position>\n";
	
	return return_string;
}

function add_input_beginning()
{
	var return_string = "";
	return_string += get_space(1);
	return_string += "<sml:inputs>\n";
	return_string += get_space(2);
	return_string += "<sml:InputList>\n";
	return return_string;
}

function add_input_ending()
{
	var return_string = "";
	return_string += get_space(2);
	return_string += "</sml:InputList>\n";
	return_string += get_space(1);
	return_string += "</sml:inputs>\n";
	return return_string;
}

function empty_input_single(curr_div)
{
	if (curr_div.find('#input_name'       ).val().trim() != "") return false;
	if (curr_div.find('#input_label'      ).val().trim() != "") return false;
	if (curr_div.find('#input_description').val().trim() != "") return false;
	if (curr_div.find('#input_definition' ).val().trim() != "") return false;

	return true;
}

function empty_input_all()
{
	var return_val = true;

	$('#input_sections .input_section:not(:empty)').each(function()
	{
		if (!empty_input_single($(this))) return_val = false;
	});

	return return_val;
}

function parse_input(curr_div)
{
	var return_string = "";
	return_string += get_space(3);
	return_string += "<sml:input";
	
	if (curr_div.find('#input_name').val().trim() != "")
	{
		return_string += " name=\"";
		return_string += fix_text(curr_div.find('#input_name').val());
		return_string += "\"";
	}
	
	return_string += ">\n";

	if (curr_div.find('#input_definition' ).val().trim() != "" || 
	    curr_div.find('#input_description').val().trim() != "" || 
	    curr_div.find('#input_label'      ).val().trim() != "" )
	{
		return_string += get_space(4);
		return_string += "<sml:ObservableProperty";

		if (curr_div.find('#input_definition').val().trim() != "")
		{
			return_string += "\n";
			return_string += get_space(5);
			return_string += "definition=\"";
			return_string += fix_text(curr_div.find('#input_definition').val());
			return_string += "\"";
		}
		
		return_string += ">\n";
		
		if (curr_div.find('#input_label').val().trim() != "")
		{
			return_string += get_space(5);
			return_string += "<swe:label>";
			return_string += fix_text(curr_div.find('#input_label').val());
			return_string += "</swe:label>\n";
		}
		
		if (curr_div.find('#input_description').val().trim() != "")
		{
			return_string += get_space(5);
			return_string += "<swe:description>";
			return_string += fix_text(curr_div.find('#input_description').val());
			return_string += "</swe:description>\n";
		}
		
		return_string += get_space(4);
		return_string += "</sml:ObservableProperty>\n";
	}
	
	return_string += get_space(3);
	return_string += "</sml:input>\n";
	return return_string;
}

function add_output_beginning(output_name)
{
	var return_string = "";
	return_string += get_space(1);
	return_string += "<sml:outputs>\n";
	return_string += get_space(2);
	return_string += "<sml:OutputList>\n";
	return_string += get_space(3);
	return_string += "<sml:output";
	
	if (output_name != "")
	{
		return_string += " name=\"";
		return_string += output_name;
		return_string += "\"";
	}

	return_string += ">\n";
	return_string += get_space(4);
	return_string += "<swe:DataRecord>\n";

	return return_string;
}

function add_output_ending()
{
	var return_string = "";
	return_string += get_space(4);
	return_string += "</swe:DataRecord>\n";
	return_string += get_space(3);
	return_string += "</sml:output>\n";
	return_string += get_space(2);
	return_string += "</sml:OutputList>\n";
	return_string += get_space(1);
	return_string += "</sml:outputs>\n";
	return return_string;
}

function empty_output_single(curr_div)
{
	if (curr_div.find('#output_field_name').val().trim() != "") return false;
	if (curr_div.find('#output_definition').val().trim() != "") return false;
	if (curr_div.find('#output_uom'       ).val().trim() != "") return false;

	return true;
}

function empty_output_all()
{
	var return_val = true;

	$('#output_sections .output_section:not(:empty)').each(function()
	{
		if (!empty_output_single($(this))) return_val = false;
	});

	return return_val;
}

function parse_output(curr_div)
{
	var return_string = "";
	return_string += get_space(5);
	return_string += "<swe:field";
	
	if (curr_div.find('#output_field_name').val().trim() != "")
	{
		return_string += " name=\"";
		return_string += fix_text(curr_div.find('#output_field_name').val());
		return_string += "\"";
	}
	
	return_string += ">\n";
	
	if (curr_div.find('#output_definition').val().trim() != "" ||
	    curr_div.find('#output_uom'       ).val().trim() != "")
	{
		return_string += get_space(6);
		return_string += "<swe:Quantity";
		
		if (curr_div.find('#output_definition').val().trim() != "")
		{
			return_string += " definition=\"";
			return_string += fix_text(curr_div.find('#output_definition').val());
			return_string += "\"";
		}

		return_string += ">\n";

		if (curr_div.find('#output_uom').val().trim() != "")
		{
			return_string += get_space(7);
			return_string += "<swe:uom code=\"";
			return_string += fix_text(curr_div.find('#output_uom').val());
			return_string += "\"/>\n";
		}

		return_string += get_space(6);
		return_string += "</swe:Quantity>\n";
	}

	return_string += get_space(5);
	return_string += "</swe:field>\n";
	
	return return_string;
}

function add_parameter_group_beginning()
{
	var return_string = "";
	return_string += get_space(1);
	return_string += "<sml:parameters>\n";
	return_string += get_space(2);
	return_string += "<sml:ParameterList>\n";
	return return_string;
}

function add_parameter_group_ending()
{
	var return_string = "";
	return_string += get_space(2);
	return_string += "</sml:ParameterList>\n";
	return_string += get_space(1);
	return_string += "</sml:parameters>\n";
	return return_string;
}

function empty_parameter_sub_single(curr_div)
{
	if (curr_div.find('#parameter_field_name' ).val().trim() != "") return false;
	if (curr_div.find('#parameter_definition' ).val().trim() != "") return false;
	if (curr_div.find('#parameter_label'      ).val().trim() != "") return false;
	if (curr_div.find('#parameter_description').val().trim() != "") return false;
	if (curr_div.find('#parameter_value'      ).val().trim() != "") return false;
	if (curr_div.find('#parameter_uom'        ).val().trim() != "") return false;

	if (curr_div.find('#parameter_interval').val().trim() != "" &&
	    curr_div.find('#parameter_constraint_type').val() == "interval") return false;

	if (curr_div.find('#value_type_string').val() != "" &&
	    curr_div.find('#parameter_constraint_type').val() == "allowed_values") return false;

	return true;
}

function empty_parameter_group_single(curr_div)
{
	var return_val = true;

	// even just the name will make the group non-empty
	if (curr_div.find('#parameter_group_name').val().trim() != "") return false;

	curr_div.find('.parameter_sub_section:not(:empty)').each(function()
	{
		if (!empty_parameter_sub_single($(this))) return_val = false;
	});

	return return_val;	
}

function empty_parameter_group_all()
{
	var return_val = true;

	$('#parameter_sections .parameter_section:not(:empty)').each(function()
	{
		if (!empty_parameter_group_single($(this))) return_val = false;
	});

	return return_val;
}

function parse_parameter_field(curr_div, group_idx, field_idx)
{
	var parameter_field_type;
	var all_tokens;
	var i;
	var return_string = "";
	
	// ---------------------------------------------------------------------
	
	return_string += get_space(5);
	return_string += "<swe:field name=\"";
	
	if (curr_div.find('#parameter_field_name').val().trim() != "")
		return_string += fix_text(curr_div.find('#parameter_field_name').val());
	else
		return_string += "parameter_field_" + (field_idx) + "_group_" + (group_idx);

	return_string += "\">\n";

	// ---------------------------------------------------------------------
	
	parameter_field_type = curr_div.find('#parameter_field_type').val();

	if (curr_div.find('#parameter_field_type').val() == null)
		parameter_field_type = "quantity";

	return_string += get_space(6);
	
	if (parameter_field_type == "quantity"      ) return_string += "<swe:Quantity";
	if (parameter_field_type == "count"         ) return_string += "<swe:Count";
	if (parameter_field_type == "quantity_range") return_string += "<swe:QuantityRange";
	if (parameter_field_type == "category"      ) return_string += "<swe:Category";

	if (curr_div.find('#parameter_definition').val().trim() != "") 
	{
		return_string += " definition=\"";
		return_string += fix_text(curr_div.find('#parameter_definition').val());
		return_string += "\"";
	}

	return_string += ">\n";

	// ---------------------------------------------------------------------

	if (curr_div.find('#parameter_label').val().trim() != "")
	{
		return_string += get_space(7);
		return_string += "<swe:label>";
		return_string += fix_text(curr_div.find('#parameter_label').val());
		return_string += "</swe:label>\n";
	}
	
	// ---------------------------------------------------------------------

	if (curr_div.find('#parameter_description').val().trim() != "")
	{
		return_string += get_space(7);
		return_string += "<swe:description>";
		return_string += fix_text(curr_div.find('#parameter_description').val());
		return_string += "</swe:description>\n";
	}

	// ---------------------------------------------------------------------

	if (curr_div.find('#parameter_uom').val().trim() != "")
	{
		return_string += get_space(7);
		return_string += "<swe:uom code=\"";
		return_string += fix_text(curr_div.find('#parameter_uom').val());
		return_string += "\"/>\n";
	}

	// ---------------------------------------------------------------------

	if (curr_div.find('#parameter_interval').val().trim() != "" &&
	    curr_div.find('#parameter_constraint_type').val() == "interval")
	{
		return_string += get_space(7);
		return_string += "<swe:constraint>\n";
		return_string += get_space(8);
		return_string += "<swe:AllowedValues>\n";
		return_string += get_space(9);
		return_string += "<swe:interval>";
		return_string += fix_text(curr_div.find('#parameter_interval').val());
		return_string += "</swe:interval>\n";
		return_string += get_space(8);
		return_string += "</swe:AllowedValues>\n";
		return_string += get_space(7);
		return_string += "</swe:constraint>\n";
	}

	// ---------------------------------------------------------------------
	
	if (curr_div.find('#value_type_string').val() != "" &&
	    curr_div.find('#parameter_constraint_type').val() == "allowed_values")
	{
		
		return_string += get_space(7);
		return_string += "<swe:constraint>\n";
		return_string += get_space(8);
		return_string += "<swe:AllowedValues>\n";

		all_tokens = curr_div.find('#value_type_string').val().split(";");
		for (i = 0; i < all_tokens.length; i++)
		{
			return_string += get_space(9);
			return_string += "<swe:value>";
			return_string += all_tokens[i];
			return_string += "</swe:value>\n";
		}

		return_string += get_space(8);
		return_string += "</swe:AllowedValues>\n";
		return_string += get_space(7);
		return_string += "</swe:constraint>\n";
	}
	
	// ---------------------------------------------------------------------	

	if (curr_div.find('#parameter_value').val().trim() != "")
	{
		return_string += get_space(7);
		return_string += "<swe:value>";
		return_string += fix_text(curr_div.find('#parameter_value').val());
		return_string += "</swe:value>\n";
	}

	// ---------------------------------------------------------------------

	return_string += get_space(6);

	if (parameter_field_type == "quantity"      ) return_string += "</swe:Quantity>\n";
	if (parameter_field_type == "count"         ) return_string += "</swe:Count>\n";
	if (parameter_field_type == "quantity_range") return_string += "</swe:QuantityRange>\n";
	if (parameter_field_type == "category"      ) return_string += "</swe:Category>\n";

	// ---------------------------------------------------------------------

	return_string += get_space(5);
	return_string += "</swe:field>\n\n";

	return return_string;
}

function parse_parameter_group(curr_div, group_idx)
{
	var return_string = "";
	return_string += get_space(3);
	return_string += "<sml:parameter name=\"";
	
	if (curr_div.find('#parameter_group_name').val().trim() != "")
		return_string += fix_text(curr_div.find('#parameter_group_name').val());
	else
		return_string += "parameter_group_" + (group_idx);
	
	return_string += "\">\n";
	return_string += get_space(4);
	return_string += "<swe:DataRecord>\n\n";

	curr_div.find('.parameter_sub_section:not(:empty)').each(function(index)
	{
		if (!empty_parameter_sub_single($(this))) 
			return_string += parse_parameter_field($(this), group_idx, index + 1);
	});

	return_string += get_space(4);
	return_string += "</swe:DataRecord>\n";
	return_string += get_space(3);
	return_string += "</sml:parameter>\n\n";
	
	return return_string;
}

function add_section_heading(text)
{
	var return_string = "\n";
	var i;
	var first_length  = 25 - Math.floor(text.length/2);
	var second_length = 50 - first_length - text.length;
	
	return_string += get_space(1);
	return_string += "<!-- ================================================== -->\n";
	return_string += get_space(1);
	return_string += "<!-- ";
	for (i = 0; i < first_length; i++)  return_string += " ";
	return_string += text;
	for (i = 0; i < second_length; i++) return_string += " ";
	return_string += " -->\n";
	return_string += get_space(1);
	return_string += "<!-- ================================================== -->\n\n";
	return return_string;
}

function get_space(levels)
{
	var return_string = "";
	var i;

	for (i = 0; i < levels; i++)
	{
		return_string += "   ";
	}
	
	return return_string;
}

function form_to_text()
{
	var return_string = "";

	return_string += parse_heading(fix_text($('#unique_id').val()));
	
	return_string += add_section_heading("System Description");
	
	if ($('#physical_system').val() != "")
	{
		return_string += parse_physical_system(fix_text($('#physical_system').val()));
	}

	if ($('#unique_id').val() != "")
	{
		return_string += parse_unique_id(fix_text($('#unique_id').val()));
	}

	if ($('#name').val() != "")
	{
		return_string += parse_name(fix_text($('#name').val()));
	}

	// add keywords, if any
	if ($('#keyword_string').val() != "")
	{
		return_string += parse_keyword($('#keyword_string').val());
	}

	// check if we have any identifier information to add
	if ($('#long_name').val()     != "" || $('#short_name').val()       != "" ||
	    $('#serial_number').val() != "" || $('#deploying_agency').val() != "")
	{
		return_string += add_section_heading("System Identifiers");
		return_string += add_identifier_beginning();

		if ($('#long_name').val() != "")
		{
			return_string += parse_identifier('long_name', $('#long_name').val());
		}

		if ($('#short_name').val() != "")
		{
			return_string += parse_identifier('short_name', $('#short_name').val());
		}


		// only add "serial number" and "deploying agency" if this is a sensor deployment
		if ($('#file_type').val() == "deployment")
		{
			if ($('#serial_number').val() != "")
			{
				return_string += parse_identifier('serial_number', $('#serial_number').val());
			}

			if ($('#deploying_agency').val() != "")
			{
				return_string += parse_identifier('deploying_agency', $('#deploying_agency').val());
			}
		}

		if ($('#sys_id_manufacturer').val() != "")
		{
			return_string += parse_identifier('manufacturer', $('#sys_id_manufacturer').val());
		}

		if ($('#sys_id_model_number').val() != "")
		{
			return_string += parse_identifier('model_number', $('#sys_id_model_number').val());
		}

		return_string += add_identifier_ending();		
	}

	// check if we have any classifier information to add
	if ($('#intended_application_string').val() != "" || $('#sensor_type_string').val() != "")
	{
		return_string += add_section_heading("System Classifiers");
		return_string += add_classifier_beginning();

		// add intended applications, if any
		if ($('#intended_application_string').val() != "") 
		{
			return_string += parse_classifier('intended_application', $('#intended_application_string').val());
		}

		// add sensor types, if any		
		if ($('#sensor_type_string').val() != "") 
		{
			return_string += parse_classifier('sensor_type', $('#sensor_type_string').val());
		}

		return_string += add_classifier_ending();
	}

	// check if we have any contact information to add
	//if ($('#contact_sections .contact_section:not(:empty)').length)
	if (!empty_contact_all())
	{
		return_string += add_section_heading("System Contacts");
		return_string += add_contact_beginning();

		// find each contact and add the info
		$('#contact_sections .contact_section:not(:empty)').each(function()
		{
			if (!empty_contact_single($(this)))
			{
				return_string += parse_contact($(this));
			}
		});
		
		return_string += add_contact_ending();
	}

	/* --------------------------------------------------------------------------------------------------------------------
	
			CHECKING FOR FIELDS RELATED TO SENSOR DEPLOYMENT
	
	   -------------------------------------------------------------------------------------------------------------------- */
	   
	// add the sections specific to sensor deployment
	if ($('#file_type').val() == "deployment")
	{
		// check if we have any time constraint information to add
		if ($('#valid_time_local_id').val() != "")
		{
			return_string += add_section_heading("Constraints");
			return_string += parse_valid_time(fix_text($('#valid_time_local_id').val()), $('#input_state option:selected').text(), $('#valid_time_date').val());
		}
		
		// only add history section if this is a deployment
		// check if any history info was entered
		if (!empty_history_all())
		{
			return_string += add_section_heading("History");
			return_string += add_history_beginning();
			
			$('#history_sections .history_section:not(:empty)').each(function(index)
			{
				// if the current history section has data, parse it
				if (!empty_history_single($(this)))
				{
					return_string += parse_history($(this), index);
				}
			});
			
			return_string += add_history_ending();
		}

		// only add "type of" section if this is a deployment
		return_string += add_section_heading("Type Of Parent");
		return_string += parse_type_of(fix_text($('#type_of_title').val()), fix_text($('#type_of_href').val()));
	
		// only add configuration section if this is a deployment
		// check if any configuration info was entered
		if ($('#configuration_mode_reference').val().trim() != "" || 
		    $('#configuration_mode_value').val().trim()     != "" || 
			!empty_configuration_all())
		{
			return_string += add_section_heading("Configuration System Parameters");
			return_string += add_configuration_beginning();

			// add the mode if it was entered
			if ($('#configuration_mode_reference').val().trim() != "" || 
		        $('#configuration_mode_value').val().trim()     != "")
			{
				return_string += parse_configuration_mode(fix_text($('#configuration_mode_reference').val()), 
				                                          fix_text($('#configuration_mode_value'    ).val()));
			}

			// find each configuration setting and add the info
			if (!empty_configuration_all())
			{
				$('#configuration_sections .configuration_section:not(:empty)').each(function()
				{
					// if the current configuration section has data, parse it
					if (!empty_configuration_single($(this)))
					{
						return_string += parse_configuration($(this));
					}
				});
			}
			return_string += add_configuration_ending();
		}
	
		// only add position section if this is a deployment
		// check if any position data was entered
		if (!position_empty())
		{
			return_string += add_section_heading("Station Location and Orientation");
			return_string += parse_position();
		}
	}
	
	/* --------------------------------------------------------------------------------------------------------------------
	
			INPUT, OUTPUT, AND PARAMETER ARE APPLICABLE TO BOTH DOCUMENT TYPES
	
	   -------------------------------------------------------------------------------------------------------------------- */
	
	// check if any input info was entered
	if (!empty_input_all())
	{
		return_string += add_section_heading("Profiler Inputs");
		return_string += add_input_beginning();
		
		$('#input_sections .input_section:not(:empty)').each(function()
		{
			// if the current input section has data, parse it
			if (!empty_input_single($(this)))
			{
				return_string += parse_input($(this));
			}
		});
		
		return_string += add_input_ending();
	}

	
	// check if any output info was entered
	if ($('#output_name').val().trim() != "" || !empty_output_all())
	{
		return_string += add_section_heading("Profiler Outputs");
		return_string += add_output_beginning(fix_text($('#output_name').val()));

		$('#output_sections .output_section:not(:empty)').each(function()
		{
			// if the current output section has data, parse it
			if (!empty_output_single($(this)))
			{
				return_string += parse_output($(this));
			}
		});
		
		return_string += add_output_ending();
	}

	
	// check if any parameter group info was entered
	if (!empty_parameter_group_all())
	{
		return_string += add_section_heading("Profiler Parameters");
		return_string += add_parameter_group_beginning();

		$('#parameter_sections .parameter_section:not(:empty)').each(function(index)
		{
			// if the current parameter section has data, parse it
			if (!empty_parameter_group_single($(this)))
			{
				return_string += parse_parameter_group($(this), index + 1);
			}
		});
		
		return_string += add_parameter_group_ending();
	}

	return_string += "\n</sml:PhysicalSystem>\n";
	return return_string;
}

function download(filename, text) 
{
	var element = document.createElement('a');
	element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
	element.setAttribute('download', filename);
	element.style.display = 'none';
	document.body.appendChild(element);
	element.click();
	document.body.removeChild(element);
}

function save_xml()
{
	download($('#xml_filename').val()+".xml",form_to_text());
}
