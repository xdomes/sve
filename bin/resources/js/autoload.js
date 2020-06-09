function check_url_params()
{
	var i;
	var file_name = "";
	var curr_param_arr;
	
	// get everything after the question mark
	var query_string = location.href.split("?")[1];
	
	if (query_string)
	{
		// disregard everything after the hash mark (if it exists)
		query_string = query_string.split('#')[0];

		// get the individual parameters
		var query_strings = query_string.split("&");
		
		for (i = 0; i < query_strings.length; i++)
		{
			curr_param_arr = query_strings[i].split('=');
			if (curr_param_arr[0] == "file" && file_name == "")
			{
				file_name = curr_param_arr[1];
			}
		}
	}
	
	if (file_name != "")
		attempt_autoload(file_name);
}

function attempt_autoload(file)
{
	$.get("resources/php/get_xml_file.php", 
	{
		filename: file,
		location: "local"
	},
	function(response)
	{
		var data = response;

		if (data.length)
		{
			// don't add the ".xml" extension, its added automatically later on saving
			$("#xml_filename").val(file.substring(0, file.length-4));
			
			var xmlDoc = $.parseXML(data);
			load_xml_doc(xmlDoc);
		}
	});	
}