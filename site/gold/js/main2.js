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
							'<p>'+ car.condition +'</p>'+
							'<p>'+ car.display +'</p>'+
							'<p>'+ car.describe +'</p>'+
						'</div>'
					).appendTo('#jsonlist');
				};
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
		car.make		= ["Make: ", make.val()];
		car.model		= ["Model: ", model.val()];
		car.year		= ["Year: ", year.val()];
		car.color		= ["Color: ", color.val()];
		car.condition	= ["Condition: ", condition];
		car.display		= ["What makes it stand out? ", display];
		car.describe	= ["Describe the car in your own words. ", describe.val()];
		
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
	make.val(''+ car.make[1]);
	model.val(''+ car.model[1]);
	year.val(''+ car.year[1]);
	color.val(''+ car.color[1]);

	var checkboxes = document.forms[0].display;
	for (var i=0; i<car.display[1].length; i++) {
		document.getElementById(car.display[1][i]).setAttribute("checked", "checked");
	}
	
	var radios = document.forms[0].condition;
	for (var i=0; i<radios.length; i++) {
		if (radios[i].value == "Amazing" && car.condition[1] == "Amazing"){
			radios[i].setAttribute("checked", "checked");
		} else if (radios[i].value == "Not so amazing" && car.condition[1] == "Not so amazing") {
			radios[i].setAttribute("checked", "checked");
		} else if (radios[i].value == "Rubbish" && car.condition[1] == "Rubbish") {
			radios[i].setAttribute("checked", "checked");
		}
	}
	describe.val(''+ car.describe[1]);
	
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
}


$('#carlist').on('pageinit', function(editCar){
	function autoFill() {
		for (var n in json) {
			var id = Math.floor(Math.random()*1000000000000);
			localStorage.setItem(id, JSON.stringify(json[n]));
		}
	}


	function getData(makeItemlinks){
		if(localStorage.length === 0) {
			alert("There are no cars in yourf Garage, so I went ahead and added a couple!");
			autoFill();
		}
		$('<ul></ul>')
			.appendTo('#cars')
			.attr('id', 'makeList')
			.attr('data-role','listview')
			.attr('data-filter','true')
			.attr('data-inset','false')
		;
		for (var i=0, len=localStorage.length; i<len; i++){
			$('<li></li>').attr('id','linkLi');
			var linksLi = $('#linkLi');
			$('<li></li>')
				.appendTo('#makeList')
				.attr('id','makeSubList')
				.attr('data-role', 'collapsible')
			;
			var makeSubList = $('#makeSubList');
			var key = localStorage.key(i);
			var value = localStorage.getItem(key);
			//Convert the string from local storage value back to an object.
			var obj = JSON.parse(value);
			for (var n in obj) {
				$('<p></p>').appendTo('#makeSubList').attr('id','makeSubLi');
				var makeSubLi = $('#makeSubLi');
				var optSubText = obj[n][0]+" "+obj[n][1];
				makeSubLi.html(''+ optSubText);
				console.log(obj[n][1]);
				linksLi.appendTo('#makeSubList');
			}
			
			$('<br/>').appendTo('#linksLi');
			makeItemLinks(localStorage.key(i), linksLi); //Create edit and delete buttons
			$('<br/>').appendTo('#linksLi');
		}
	}

	

	//Get logo for car make.
	function getLogo(logo, makeSubList) {
		$('<h3></h3>').appendTo('makeSubList').attr('id','imageLi');
		var imageLi = $('#imageLi');
		$('<img></img>').attr('id','newImg').attr('src','images/'+ logo +'.jpg');
		$('#newImg').appendTo('#imageLi');
	}
	
	function deleteItem() {
		var ask = confirm("Are you sure you want to delete this car.");
		if (ask) {
			localStorage.removeItem(this.key);
			alert("Car was deleted!");
			window.location.reload();
		} else {
			alert("Car was not deleted!");
		}
	}
	
	function clearLocal() {
		if (localStorage.length === 0) {
			alert("No cars to clear.");
		} else {
			localStorage.clear();
			alert("All cars are deleted!");
			window.location.reload();
			return false;
		}
	}
	
	
	//Create the edit and delete links for each item
	function makeItemLinks(key, linksLi) {
		//add edit single item link
		$('<a></a>').appendTo('#linksLi')
			.attr('id','editLink')
			.attr('data-role','button')
			.attr('data-iron','gear')
			.attr('data-inline','true')
			.attr('data-theme','b')
			.attr('href','#tegcar')
			.html('Edit Car')
		;
		var editLink = $('#editLink');
		editLink.key = key;
		editLink.on("click", editCar);
	/*
		var breakTag = document.createElement('br');
		linksLi.appendChild(breakTag);
	*/
		
		//add delete single item link
		$('<a></a>').appendTo('#linksLi')
			.attr('id','deleteLink')
			.attr('data-role','button')
			.attr('data-iron','gear')
			.attr('data-inline','true')
			.attr('data-theme','b')
			.attr('href','#tagcar')
			.html('Delete Car')
		;
		var deleteLink = $('#deleteLink');
		deleteLink.key = key;
		deleteLink.on("click", deleteItem);
	}
	
	getData();

	$('#clear').on("click", clearLocal);

});






