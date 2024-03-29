$('#jsondata').on('pageinit', function (){
	$(function(){
		$.ajax({
			url: 'xhr/cars.php',
			type: 'GET',
			dataType: 'json',
			success: function (response){
				for(var i=0, j=response.cars.length; i<j; i++){
					var car = response.cars[i];
					$(''+
						'<div data-role="collapsible">'+
							'<h3>'+ car.make[1] +'</h3>'+
							'<p>'+ car.make +'</p>'+
							'<p>'+ car.model +'</p>'+
							'<p>'+ car.year +'</p>'+
							'<p>'+ car.color +'</p>'+
						'</div>'
					).appendTo('#jsonlist');
					$('#jsonlist').trigger("create");
				};
			}
		});
	});
});

$('#xmldata').on('pageinit', function() { 
	$(function(){
		$.ajax({  
			type: "GET",  
			url: "xhr/tablets.xml",  
			dataType: "xml",  
			success: parseXml
		});     
	});  
	function parseXml(xml) {  
	$(xml).find("item").each(function() {  
	//find each instance of loc in xml file and wrap it in a link  
		$(''+
			'<div data-role="collapsible">'+
				'<h3>'+ $(this).find("title").text() +'</h3>'+
				'<p> Resolution: '+ $(this).find("res").text() +'</p>'+
				'<p> Processer: '+ $(this).find("pro").text() +'</p>'+
				'<p> Height: '+ $(this).find("height").text() +'</p>'+
				'<p> Width: '+ $(this).find("width").text() +'</p>'+
				'<p> Depth: '+ $(this).find("depth").text() +'</p>'+
				'<p> Weight: '+ $(this).find("weight").text() +'</p>'+
				'<p> Price: '+ $(this).find("price").text() +'</p>'+
			'</div>' 
		).appendTo('#xmllist');
		$('#xmllist').trigger("create");
		});
	}
});

$('#csvdata').on('pageinit', function(){
	$(function(){
		$.ajax({  
			type: "GET",  
			url: "xhr/friends.csv",  
			dataType: "text",  
			success: function(data) {
				var lines = data.split("\n");
				
				for (var i=0, j=lines.length; i<j; i++) {
				    var row = lines[i];
				    var columns = row.split(",");
				    $(''+
						'<div data-role="collapsible">'+
							'<h3>'+ columns[0] +'</h3>'+
							'<p> Name: '+ columns[0] +'</p>'+
							'<p> Age: '+ columns[1] +'</p>'+
							'<p> Job: '+ columns[2] +'</p>'+
							'<p> Location: '+ columns[3] +'</p>'+
						'</div>' 
					).appendTo('#csvlist');
					$('#csvlist').trigger("create");
				}
			}
		});   
	});
});

$('#tagcar').on('pageinit', function (){
	var tagForm = $('#addItem');
	tagForm.validate({
		invalidHandler: function (form, validator) {
			
		},
		submitHandler: function () {
			var data = tagForm.serializeArray();
			storeData(this.key);
			window.location.reload();
		}
	});
	
	var make = $('#make');
		model = $('#model');
		year = $('#year');
		color = $('#color');
		describe = $('#describe');
			
	function storeData(key) {
		if (!key) {
			var id = $.now();
		} else {
			id = key;
		}	
		var condition = $('form input:checked').val();
		var display = getCheckboxValue();
		var car				= {};
			car.make		= make.val();
			car.model		= model.val();
			car.year		= year.val();
			car.color		= color.val();
			car.condition	= condition;
			car.display		= display;
			car.describe	= describe.val();
			
		localStorage.setItem(id, JSON.stringify(car));
		alert("Car Tagged!");
	}
	
	function getCheckboxValue() {
		var checkboxes = document.forms[0].display;
		var holdValues = [];
		for (var i=0, j=checkboxes.length; i<j; i++){
			if(checkboxes[i].checked){
				var checkedValue = checkboxes[i].value;
				holdValues.push(checkedValue);
			}
		}
		return holdValues;	
	}
	
	function editCar() {
		//Grab the data from our item from local storage
		var value = localStorage.getItem(this.key);
		var car = JSON.parse(value);
		
		//Show the form
		/* toggleControls("off"); */
		
		//populate form fields with current values
		make.val(''+ car.make);
		model.val(''+ car.model);
		year.val(''+ car.year);
		color.val(''+ car.color);
	
		var checkboxes = document.forms[0].display;
		for (var i=0; i<car.display.length; i++) {
			$(''+ car.display[i]).attr("checked", "checked");
		}
		
		var radios = document.forms[0].condition;
		for (var i=0; i<radios.length; i++) {
			if (radios[i].value == "Amazing" && car.condition == "Amazing"){
				radios[i].attr("checked", "checked");
			} else if (radios[i].value == "Not so amazing" && car.condition == "Not so amazing") {
				radios[i].attr("checked", "checked");
			} else if (radios[i].value == "Rubbish" && car.condition == "Rubbish") {
				radios[i].attr("checked", "checked");
			}
		}
		describe.val(''+ car.describe);
		
		//remove teh listener from input save button.
		save.removeEventListener("click", storeData);
		//Change submit button value to edit button
		$('#headerBar').html('Edit Car Tag');
		$('#submit').val('Edit Car Tag');
		var editSubmit = $('#submit');
		//Save the key value established in this function as a property of the editSubmit event
		//so we can use that value when we save the data we edited.
		editSubmit.on("click", validate);
		editSubmit.key = this.key;
		event.stopPropagation();
	}

});

$('#account').on("pageinit", function() {
	$.couch.db("cartagapp").view("carlist/cars", {
		success: function(data) {
			console.log(data);
		}
	});
});

$('#carlist').on('pageinit', function(editCar){
	function autoFill() {
		$.ajax({
			url: 'xhr/jsoncars.php',
			type: 'GET',
			dataType: 'json',
			success: function (response){
				for (var i=0, j=response.cars.length; i<j; i++) {
					var car = response.cars[i];
					var id = Math.floor(Math.random()*1000000000000);
					localStorage.setItem(id, JSON.stringify(car));
				}	
			}
		});
		
	}
	function getData(makeItemlinks){
		if(localStorage.length === 0) {
			alert("There are no cars in your Garage, so I went ahead and added a couple!");
			autoFill();
		}
		for (var i=0, len=localStorage.length; i<len; i++){
			var key = localStorage.key(i);
			var value = localStorage.getItem(key);
			//Convert the string from local storage value back to an object.
			var obj = JSON.parse(value);
			if(!isNaN(key)) {
				$(''+
					'<div id="'+ key +'" data-role="collapsible" data-inset="false" style="margin:0px">'+
						'<h3>'+ obj.make +'</h3>'+
						'<p> Make: '+ obj.make +'</p>'+
						'<p> Model: '+ obj.model +'</p>'+
						'<p> Year: '+ obj.year +'</p>'+
						'<p> Color: '+ obj.color +'</p>'+
						'<p> Condition: '+ obj.condition +'</p>'+
						'<p> What made it stand out? '+ obj.display +'</p>'+
						'<p> Why was this car worth tagging? '+ obj.describe +'</p>'+
						'<li><a class="editLink" data-role="button" data-inline="true" data-theme="b" href="#tagcar" data-mini="true">Edit Car</a>'+
						'<a class="deleteLink" data-role="button" data-inline="true" data-theme="b" href="#tagcar" data-mini="true">Delete Car</a>'+
						'</li>'+
					'</div>' 
				).appendTo('#makeList');

				makeItemLinks(localStorage.key(i));  //Create edit and delete buttons

			}
			
		}
		$('#makeList').trigger("create");
		
	}
	
	function deleteItem() {
		var ask = confirm("Are you sure you want to delete this car.");
		if (ask) {
			$('div').remove();
			alert("Car was deleted!");
			window.location.reload();
			
		} else {
			alert("Car was not deleted!");
		}
		event.stopPropagation();
	}
	
	function clearLocal() {
		if (localStorage.length === 0) {
			alert("No cars to clear.");
		} else {
			localStorage.clear();
			alert("All cars are deleted!");
			window.location.reload();
		}
	}
	
	
	//Create the edit and delete links for each item
	function makeItemLinks(key) {
		//add edit single item link
		
		var editLink = $('.editLink');
		editLink.key = key;
		editLink.on("click", editCar);

		//add delete single item link

		var deleteLink = $('.deleteLink');
		deleteLink.key = key;
		deleteLink.on("click", deleteItem);
	}
	
	getData();

	$('#clear').on("click", clearLocal);

});






