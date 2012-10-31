$('#test').on('pageinit', function (){
	
	
	
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
	make.val('car.make[1]');
	model.val('car.model[1]');
	year.val('car.year[1]');
	color.val('car.color[1]');

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
	describe.val('car.describe[1]');
	
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
		$('#cars').append('<ul></ul>');
		var makeList = $('#cars > ul');
		makeList
			.attr('data-role','listview')
			.attr('data-filter','true')
			.attr('data-inset','false')
		;
		for (var i=0, len=localStorage.length; i<len; i++){
			var linksLi = $('#linksLi');
			makeList.append('<li></li>');
			var makeSubList = $('#car ul > li');
			makeSubList
				.attr('id','makeSubList')
				.attr('data-role', 'collapsible')
			;
			var makeSubList = $('#makeSubList');
			var key = localStorage.key(i);
			var value = localStorage.getItem(key);
			//Convert the string from local storage value back to an object.
			var obj = JSON.parse(value);
/*			console.log(obj.make);
 			getLogo(obj.make[1], makeSubList); */
			for (var n in obj) {
				makeSubList.append('<p></p>').attr('id','makeSubLi');
				var makeSubLi = $('#makeSubLi');
				var optSubText = obj[n][0]+" "+obj[n][1];
				makeSubLi.innerHTML = optSubText;
				makeSubList.append('<li></li>').attr('id','linksLi');
				
			}
			
			$('#linksLi').append('<br/>');
			
			makeItemLinks(localStorage.key(i), linksLi); //Create edit and delete buttons
			
			$('#linksLi').append('<br/>');
		}
	}
	

	//Get logo for car make.
	function getLogo(logo, makeSubList) {
		var imageLi = document.createElement('h3');
		makeSubList.appendChild(imageLi);
		var newImg = document.createElement('img');
		var setSrc = newImg.setAttribute("src", "images/"+ logo +".jpg");
		imageLi.appendChild(newImg);
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
		linksLi.append('<a></a>');
		var editLink = $('#cars > a:first');
		editLink
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
		return false;
	/*
		var breakTag = document.createElement('br');
		linksLi.appendChild(breakTag);
	*/
		
		//add delete single item link
		linksLi.append('<a></a>');
		var deleteLink = $('#cars > a:last');
		deleteLink
			.attr('id','editLink')
			.attr('data-role','button')
			.attr('data-iron','gear')
			.attr('data-inline','true')
			.attr('data-theme','b')
			.attr('href','#tagcar')
			.html('Delete Car')
		;
		var deleteLink = $('#carlist');
		deleteLink.key = key;
		deleteLink.on("click", deleteItem);
		return false;

	}
	
	getData();

	$('#clear').on("click", clearLocal);

});






