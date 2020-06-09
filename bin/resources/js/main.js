var repeatable_sections = ["contact", "history", "configuration", "input", "output", "parameter", "parameter_sub"];
var repeatable_templates = {};

var history_section_counter = 0;
var visible_history_section_counter = 0;

var parameter_group_section_counter = 0;
var parameter_sub_section_counter = 0;

var file_name_from_load = "";

// role choices for contact
var available_contact_roles = [
	"http://sensorml.com/def/role/Sales",
	"http://sensorml.com/def/role/expert",
	"http://sensorml.com/ont/swe/role/Operator"
];

$(document).ready(function()
{
	// hide the appropriate fields and menu tabs until needed
	hide_all();

	$("#valid_time_date").datepicker({dateFormat: "yy-mm-dd"});

	// populate the list of iri titles
	get_iri_list();
	
	make_repeatable_templates();
	set_defaults_for_position();
	set_default_info_div();
	check_url_params();
});

function fix_text(text)
{
	if (text != null)
	{
		text = text.replace(/\s\s+/g, " ").trim();
		text = text.replace("<", "less than");
		text = text.replace(">", "greater than");
		text = text.replace("&", "and");
	}

	return text;
}

function set_defaults_for_position()
{
	$('#latitude_definition').val('http://sensorml.com/ont/swe/property/Latitude');
	$('#longitude_definition').val('http://sensorml.com/ont/swe/property/Longitude');
	$('#vertical_datum_definition').val('http://sensorml.com/ont/swe/property/Altitude');
	$('#orientation_definition').val('http://sensorml.com/ont/swe/property/TrueHeading');

	$('#latitude_uom').val('deg');
	$('#longitude_uom').val('deg');
	$('#vertical_datum_uom').val('m');
	$('#orientation_uom').val('deg');
}

function make_repeatable_templates()
{
	var i;
	var selector_string;

	for (i = 0; i < repeatable_sections.length; i++)
	{
		// make a copy of the "original" section from the "hidden" div in index.php
		selector_string = '#hidden_sections .' + repeatable_sections[i] + '_section';
		repeatable_templates[repeatable_sections[i]] = $(selector_string).clone();

		if (repeatable_sections[i].substring(repeatable_sections[i].length - 3, repeatable_sections[i].length) != "sub")
		{
			// loading the page should initiate adding of one blank section
			add_section(repeatable_sections[i], "user");

			// this provides the functionality of adding and removing a new section when button is clicked
			// need to use a handler function because an inline function won't know the contents of variable i
			selector_string = '#' + repeatable_sections[i];
			$(selector_string).on("click", ".add_section",    { str: repeatable_sections[i] }, add_section_on_click);

			// this also handles subsections
			selector_string += '_sections';
			$(selector_string).on("click", ".remove_section", { str: repeatable_sections[i] }, remove_section_on_click);
		}
	}
}

function remove_section_on_click(event)
{
	// get the div we want to fade (in relation to the button)
	var section = $(event.target).parent().parent().parent().parent();
	
	if (event.data.str == "history")
	{
		// the div we need to fade is one level up for history 
		section = section.parent();

		// on removal of a history div, only change the visible_history_section_counter value
		// the other history counter is used as an identifier, needs to be unique
		visible_history_section_counter--;
	}

	if (event.data.str == "parameter")
	{
		// the div we need to fade is one level up for parameter group
		section = section.parent();
	}
	
	if (event.data.str == "parameter_sub")
	{
		// the div we need to fade is one level up for parameter sub
		section = section.parent();
	}

	// now we can use the same code to fade out regardless of section type
	section.fadeOut(300, function()
	{
		$(this).empty();
	});
}

function add_section_on_click(event)
{
	// "event.data.str" has the name of the repeatable section
	// call the 'add_section' function with just the name of the section (extracted from event parameter)
	add_section(event.data.str, "user");
}

// have this function separate so it can be used by load_xml as well as when user manually adds a section
function add_section(str, source)
{
	var selector_string = '#' + str + '_sections';
	
	// clone section first, make a copy of the copy
	var section = repeatable_templates[str].clone();
	
	// if this is a history section, make changes to div id's and attr's based on history section counter
	if (str == "history")
	{
		// add default "deployment" values only when user is adding a 
		// section what will be the only history section visible
		// visible_history_section_counter value can go up and down
		// don't add defaults when loading from file
		if (visible_history_section_counter == 0 && source == "user")
		{
			assign_deployment_values($(section));
		}

		history_section_counter++;
		visible_history_section_counter++;
		
		// base the div id's and attr's on history_section_counter
		// history_section_counter value only goes up, so these will always be unique
		$(section).attr("id", "history_" + (history_section_counter));

		$(section).find(".collapsed"  ).attr("data-target",    "#history_card_body_"   + (history_section_counter));
		$(section).find(".collapsed"  ).attr("aria-controls",   "history_card_body_"   + (history_section_counter));
		$(section).find(".collapse"   ).attr("id",              "history_card_body_"   + (history_section_counter));
		$(section).find(".collapse"   ).attr("aria-labelledby", "history_card_header_" + (history_section_counter));
		$(section).find(".card-header").attr("id",              "history_card_header_" + (history_section_counter));
		
		$(section).find('#history_label').on("change", { ctr: history_section_counter }, update_history_title);
		$(section).find('#history_time' ).on("change", { ctr: history_section_counter }, update_history_title);
	}

	if (str == "parameter")
	{
		parameter_group_section_counter++;
		
		// base the div id's and attr's on parameter_group_section_counter
		// parameter_group_section_counter value only goes up, so these will always be unique
		$(section).attr("id", "parameter_" + (parameter_group_section_counter));

		$(section).find('#parameter_sub_sections').attr("id", "parameter_sub_sections_"  + (parameter_group_section_counter));

		$(section).find(".collapsed"  ).attr("data-target",    "#parameter_card_body_"   + (parameter_group_section_counter));
		$(section).find(".collapsed"  ).attr("aria-controls",   "parameter_card_body_"   + (parameter_group_section_counter));
		$(section).find(".collapse"   ).attr("id",              "parameter_card_body_"   + (parameter_group_section_counter));
		$(section).find(".collapse"   ).attr("aria-labelledby", "parameter_card_header_" + (parameter_group_section_counter));
		$(section).find(".card-header").attr("id",              "parameter_card_header_" + (parameter_group_section_counter));

		$(section).find('#parameter_group_name').on("change", { ctr: parameter_group_section_counter }, update_parameter_group_title);

		$(section).on("click", ".add_sub_section", { str: "#parameter_sub_sections_" + (parameter_group_section_counter) }, add_sub_section_on_click);
	}

	if (str == "contact")
	{
		$(section).find('#contact_role').autocomplete({ source: available_contact_roles });
	}

	// add the new section
	section.hide().appendTo(selector_string).fadeIn(300);
	return section;
}

function assign_deployment_values(curr_div)
{
	curr_div.find('#history_label'     ).val ("System Deployment");
	curr_div.find('#history_event_type').val ("System Deployment");
	curr_div.find('#heading_button'    ).text("System Deployment");	
}

function add_sub_section_on_click(event)
{
	add_sub_section(event.data.str);
}

function add_sub_section(str)
{
	//var selector_string = event.data.str;
	var selector_string = str;

	// clone section first, make a copy of the copy
	var section = repeatable_templates["parameter_sub"].clone();

	parameter_sub_section_counter++;
	
	// base the div id's and attr's on parameter_sub_section_counter
	// parameter_sub_section_counter value only goes up, so these will always be unique
	$(section).attr("id", "parameter_sub_" + (parameter_sub_section_counter));

	$(section).find(".collapse").attr("data-parent", selector_string);

	$(section).find(".collapsed"  ).attr("data-target",    "#parameter_sub_card_body_"   + (parameter_sub_section_counter));
	$(section).find(".collapsed"  ).attr("aria-controls",   "parameter_sub_card_body_"   + (parameter_sub_section_counter));
	$(section).find(".collapse"   ).attr("id",              "parameter_sub_card_body_"   + (parameter_sub_section_counter));
	$(section).find(".collapse"   ).attr("aria-labelledby", "parameter_sub_card_header_" + (parameter_sub_section_counter));
	$(section).find(".card-header").attr("id",              "parameter_sub_card_header_" + (parameter_sub_section_counter));

	$(section).find('#parameter_field_name'      ).on("change",   { ctr: parameter_sub_section_counter }, update_parameter_sub_title         );
	$(section).find('#add_parameter_sub_value'   ).on("click",    { ctr: parameter_sub_section_counter }, sub_add_to_select_list             );
	$(section).find('#remove_parameter_sub_value').on("click",    { ctr: parameter_sub_section_counter }, sub_remove_from_select_list        );
	$(section).find('#value_type_single'         ).on("keypress", { ctr: parameter_sub_section_counter }, sub_add_to_select_list_key         );
	$(section).find('#parameter_constraint_type' ).on("change",   { ctr: parameter_sub_section_counter }, hide_show_parameter_constraint_divs);

	$(section).find("#parameter_sub_interval_div"      ).hide();
	$(section).find("#parameter_sub_allowed_values_div").hide();
	
	section.hide().appendTo(selector_string).fadeIn(300);
	return section;
}

function update_history_title (event)
{
	var ctr = event.data.ctr;
	var temp_label = $('#history_' + ctr).find('#history_label').val().trim();
	var temp_value = $('#history_' + ctr).find('#history_time' ).val().trim();
	
	if (temp_label == "") temp_label = "History Event";
	if (temp_value != "") temp_value = " (" + temp_value + ")";
	
	$('#history_' + ctr).find('#heading_button').text(temp_label + temp_value);
}

function update_parameter_group_title (event)
{
	var ctr = event.data.ctr;
	var temp_label = $('#parameter_' + ctr).find('#parameter_group_name').val().trim();

	if (temp_label == "") temp_label = "Parameter Group";

	$('#parameter_' + ctr).find('#heading_button').text(temp_label);
}

function update_parameter_sub_title (event)
{
	var ctr = event.data.ctr;
	var temp_label = $('#parameter_sub_' + ctr).find('#parameter_field_name').val().trim();

	if (temp_label == "") temp_label = "Parameter Field";

	$('#parameter_sub_' + ctr).find('#sub_heading_button').text(temp_label);
}

function hide_show_parameter_constraint_divs (event)
{
	var ctr = event.data.ctr;

	if ($('#parameter_sub_' + ctr).find('#parameter_constraint_type').val() == "none")
	{
		$('#parameter_sub_' + ctr).find('#parameter_sub_interval_div'      ).hide();
		$('#parameter_sub_' + ctr).find('#parameter_sub_allowed_values_div').hide();
	}

	if ($('#parameter_sub_' + ctr).find('#parameter_constraint_type').val() == "interval")
	{
		$('#parameter_sub_' + ctr).find('#parameter_sub_interval_div'      ).show();
		$('#parameter_sub_' + ctr).find('#parameter_sub_allowed_values_div').hide();
	}

	if ($('#parameter_sub_' + ctr).find('#parameter_constraint_type').val() == "allowed_values")
	{
		$('#parameter_sub_' + ctr).find('#parameter_sub_interval_div'      ).hide();
		$('#parameter_sub_' + ctr).find('#parameter_sub_allowed_values_div').show();
	}	
}

/*---------------- 

These next four functions handle the list inputs of the form (ex: keywords)
They are also called when loading data from file

---------------- */

function push_item_to_list(type, val)
{
	var element_id_list = type + "_list";
	var lst=document.getElementById(element_id_list);
	var option=document.createElement("option");
	option.text=val;
	lst.add(option,null);
	lst.selectedIndex = lst.length-1;
	make_list_string(type);
}

function add_to_select_list(type)
{
	var element_id_single = type + "_single";
	var txtitem=document.getElementById(element_id_single);
	
	if (txtitem.value == "")
	{
		return 0;
	}
	
	push_item_to_list(type, txtitem.value);
	txtitem.value = "";
}

function remove_from_select_list(type)
{
	var element_id_list = type + "_list";
	var lst=document.getElementById(element_id_list);
	lst.remove(lst.selectedIndex);
	lst.selectedIndex = lst.length-1;
	make_list_string(type);
}
	
function make_list_string(type)
{
	var element_id_list = type + "_list";
	var x=document.getElementById(element_id_list);
	var txt="";
	var i;
	for (i=0;i<x.length;i++)
	{
		if (txt=="")
		{
			txt=txt + x.options[i].text;
		}
		else
		{
			txt=txt + ";" + x.options[i].text;
		}
	}
	var element_id_string = type + "_string";
	document.getElementById(element_id_string).value = txt;
}

/*---------------- 

These next four functions handle the list inputs of the form (ex: keywords)
when using nested fields

---------------- */

function sub_push_item_to_list(ctr, val)
{
	var lst = $('#parameter_sub_' + ctr).find('#value_type_list')[0];
	var option = document.createElement("option");
	option.text = val;
	lst.add(option,null);
	lst.selectedIndex = lst.length-1;
	sub_make_list_string(ctr);
}

function sub_add_to_select_list(event)
{
	var ctr = event.data.ctr;
	var temp_label = $('#parameter_sub_' + ctr).find('#value_type_single').val().trim();

	if (temp_label == "")
	{
		return 0;
	}
	
	sub_push_item_to_list(ctr, temp_label);
	$('#parameter_sub_' + ctr).find('#value_type_single').val("");
}

function sub_add_to_select_list_key(event)
{
	if (event.keyCode == 13)
	{
		sub_add_to_select_list(event);
	}
}

function sub_remove_from_select_list(event)
{
	var ctr = event.data.ctr;
	var lst = $('#parameter_sub_' + ctr).find('#value_type_list')[0];
	
	lst.remove(lst.selectedIndex);
	lst.selectedIndex = lst.length-1;
	sub_make_list_string(ctr);
}
	
function sub_make_list_string(ctr)
{
	var x = $('#parameter_sub_' + ctr).find('#value_type_list')[0];	
	var txt = "";
	var i;

	for (i = 0; i < x.length; i++)
	{
		if (txt == "")
		{
			txt = txt + x.options[i].text;
		}
		else
		{
			txt = txt + ";" + x.options[i].text;
		}
	}
	
	$('#parameter_sub_' + ctr).find('#value_type_string').val(txt);
}

/*---------------- 

end of list input functions

---------------- */

// keep this function for later when saving "templates" to database
function save_to_db()
{
	//console.log('save xml');
	$.post("resources/php/process_form_data.php",
	{
		keyword_list_string: $('#keyword_list_string').val()
	},
	function(data,status)
	{
		alert("Data: " + data + "\nStatus: " + status);
	});
}

// get rid of those weird "blackhole" characters that are 
// being prepended to the response from the server
function clean_echo(text)
{
	while(text[0] == '﻿')
	{
		text = text.substring(1, text.length);
	}
	return text;
}

// get iri title choices from database
// use them with "autocomplete" jquery-ui widget
function get_iri_list()
{
	$.get("resources/php/get_type_of_title.php", 
	{
		action: "list"
	},
	function(response)
	{
		var data = JSON.parse(clean_echo(response));

		if (data.length)
		{
			var items = [];

			$.each(data, function(index, item) 
			{
				items.push(item.urn);
			});
			
			$("#type_of_title").autocomplete({
				source: items
			});
		}
	});
}

// use the with the "clear" button
function reload_page()
{
	var urls = location.href.split("?");
	location.href=urls[0];
}

// hide all tabs specific to a document type until a document type is specified by user
function hide_all()
{
	$('#type_of_href_form').hide();
	$('#type_of_title_form').hide();
	$('#deploying_agency_form').hide();
	$('#serial_number_form').hide();

	$('#identification-tab').hide();
	$('#classification-tab').hide();
	$('#valid_time-tab').hide();
	$('#contacts-tab').hide();

	$('#history-tab').hide();
	$('#configuration-tab').hide();
	$('#position-tab').hide();
	$('#inputs-tab').hide();
	$('#outputs-tab').hide();
	$('#parameters-tab').hide();
}

function set_default_info_div()
{
	var new_html = "<h3>{ No document type defined }</h3>";
	$("#info_div").html(new_html);
}

function update_info_div()
{
	var file_type_text = "";
	var unique_id_text = "";

	if ($('#file_type').val() == "deployment") file_type_text = "Sensor Deployment";
	if ($('#file_type').val() == "oem")        file_type_text = "OEM Description";

	if ($('#unique_id').val() != "")
	{
		unique_id_text += " (";
		unique_id_text += $('#unique_id').val();
		unique_id_text += ")";
	}
	
	var new_html = "";
	new_html += "<h3>";
	new_html += file_type_text;
	new_html += unique_id_text;
	new_html += "</h3>";
	$("#info_div").html(new_html);
}

// add or remove fields and tabs based on document type
function check_file_type()
{
	// sensor deployment has "type of" fields, serial number, deploying agency, history, configuration, position, valid time
	// sensor deployment has inputs, outputs, parameters
	if ($('#file_type').val() == "deployment")
	{
		$('#type_of_title_form').show();
		$('#type_of_href_form').show();
		$('#serial_number_form').show();
		$('#deploying_agency_form').show();

		$('#history-tab').show();
		$('#configuration-tab').show();
		$('#position-tab').show();
		$('#valid_time-tab').show();

		// $('#inputs-tab').hide();
		// $('#outputs-tab').hide();
		// $('#parameters-tab').hide();
		
		// made this change 2019-12-06 to allow for "homemade" sensors (chords);ffonseca
		$('#inputs-tab').show();
		$('#outputs-tab').show();
		$('#parameters-tab').show();

		// default for both types
		// need to call show because they are hidden on page load
		$('#identification-tab').show();
		$('#classification-tab').show();
		$('#contacts-tab').show();
	}
	
	// oem description has no "type of" fields, no serial number, no deploying agency, no history, no configuration, no position, no valid time
	// oem description has inputs, outputs, parameters
	if ($('#file_type').val() == "oem")
	{
		$('#type_of_href_form').hide();
		$('#type_of_title_form').hide();
		$('#serial_number_form').hide();
		$('#deploying_agency_form').hide();

		$('#history-tab').hide();
		$('#configuration-tab').hide();
		$('#position-tab').hide();
		$('#valid_time-tab').hide();

		$('#inputs-tab').show();
		$('#outputs-tab').show();
		$('#parameters-tab').show();

		// default for both types
		// need to call show because they are hidden on page load
		$('#identification-tab').show();
		$('#classification-tab').show();
		$('#contacts-tab').show();
	}
	
	update_info_div();
}

function generate_id()
{
	var return_string = "";
	var my_alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	var i;

	for (i = 0; i < 25; i++)
		return_string += my_alpha.charAt(Math.floor(Math.random() * my_alpha.length));

	return return_string;
}	
