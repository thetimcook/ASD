/*

var parseTagForm = function(data){
	
	console.log(data);
};

$('#tagcar').ready(function(){
	
	var tagform= $('#cartagform');
	tagform.validate({
		invalidHandler: function(form, validator){
			
		},
		submitHandler: function(){
			var data = tagform.serializeArray();
			parseTagForm(data);
		}
	});
});

*/



$('#home').on('pageinit', function (){
	//code needed for home page goes here
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
	
/*
	var displayLink = ge('list');
	displayLink.addEventListener("click", getData);
*/

	

});


//The functions below can go inside or outside the pageinit function for the page in which it is needed.
function ge(x) {
	var theElement = document.getElementById(x);
	return theElement;
};
var conditionValue,
	holdValues
;


function storeData(key) {
	if (!key) {
		var formDate = ge('date').value;
		var id = Date.parse(formDate);
	} else {
		id = key;
	}
	//Gather all form field values and store in an object.
	//Object properties contain array with form label and input values.
	var condition = getSelectedRadio();
	var display = getCheckboxValue();
	var car				= {};
		car.make 		= ["Make: ", ge('make').value];
		car.model		= ["Model: ", ge('model').value];
		car.year		= ["Year: ", ge('year').value];
		car.color 		= ["Color: ", ge('color').value];
		car.condition	= ["Condition: ", condition];
		car.display		= ["What makes it stand out? ", display];
		car.describe	= ["Describe the car in your own words. ", ge('describe').value];
	// Save data to local storage: Use Strinify to convert our object to a sting.
	localStorage.setItem(id, JSON.stringify(car));
	alert("Car Tagged!");
}	

function getSelectedRadio(){
	var radios = document.forms[0].condition;
	for (var i=0; i<radios.length; i++){
		if(radios[i].checked){
			var conditionValue = radios[i].value;
		}
	}
	return conditionValue;
}
function getCheckboxValue(){
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
	ge('make').value = car.make[1];
	ge('model').value = car.model[1];
	ge('year').value = car.year[1];
	ge('color').value = car.color[1];

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
	ge('describe').value = car.describe[1];
	
	//remove teh listener from input save button.
	save.removeEventListener("click", storeData);
	//Change submit button value to edit button
	ge('headerBar').innerHTML = "Edit Car Tag";
	ge('submit').value = "Edit Car Tag";
	var editSubmit = ge('submit');
	//Save the key value established in this function as a property of the editSubmit event
	//so we can use that value when we save the data we edited.
	editSubmit.addEventListener("click", validate);
	editSubmit.key = this.key;
}




/*
	$("#garage").ready(function(){
	getData();
    alert('Your DOM is ready.Now below this u can run all ur javascript');
    });
*/
	

/*
	var save = ge('submit');
	save.addEventListener("click", tagForm);
*/



$('#carlist').on('pageinit', function(editCar){
	
	
	function autoFill() {
		for (var n in json) {
			var id = Math.floor(Math.random()*1000000000000);
			localStorage.setItem(id, JSON.stringify(json[n]));
		}
	}
	
	function getData(){
	/* 		toggleControls("on"); */
		if(localStorage.length === 0) {
			alert("There are no cars in your Garage, so I went ahead and added a couple!");
			autoFill();
		}
		
		//Write Data from local storage to the browser.
		var makeDiv = ge('cars');
		var makeList = document.createElement('ul');
		makeDiv.appendChild(makeList);
		makeList.setAttribute("data-role", "listview");
		makeList.setAttribute("data-filter", "true");
		makeList.setAttribute("data-inset", "false");
	/* 		document.body.appendChild(makeDiv);
		ge('cars').style.display = "block"; */
		for (var i=0, len=localStorage.length; i<len; i++){
			var linksLi = document.createElement('li');
			var makeSubList = document.createElement('li');
			makeList.appendChild(makeSubList);
			makeSubList.setAttribute("data-role", "collapsible");
	
			var key = localStorage.key(i);
			var value = localStorage.getItem(key);
			//Convert the string from local storage value back to an object.
			var obj = JSON.parse(value);
			console.log(obj.make);
/* 			getLogo(obj.make[1], makeSubList); */
			for (var n in obj) {
				var makeSubLi = document.createElement('p');
				makeSubList.appendChild(makeSubLi);
				var optSubText = obj[n][0]+" "+obj[n][1];
				makeSubLi.innerHTML = optSubText;
				makeSubList.appendChild(linksLi);
			}
			
			var breakTag = document.createElement('br');
			linksLi.appendChild(breakTag);
			
			makeItemLinks(localStorage.key(i), linksLi); //Create edit and delete buttons
			
			var breakTag = document.createElement('br');
			linksLi.appendChild(breakTag);
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
			alert("No cars to clear.")
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
		var editLink = document.createElement('a');
		editLink.setAttribute("data-role", "button");
		editLink.setAttribute("data-icon", "gear");
		editLink.setAttribute("data-inline", "true");
		editLink.setAttribute("data-theme", "b");
		editLink.href = '#tagcar';
		editLink.key = key;
		var editText = "Edit Car";
		editLink.addEventListener("click", editCar);
		editLink.innerHTML = editText;
		linksLi.appendChild(editLink);
		
	/*
		var breakTag = document.createElement('br');
		linksLi.appendChild(breakTag);
	*/
		
		//add delete single item link
		var deleteLink = document.createElement('a');
		deleteLink.setAttribute("data-role", "button");
		deleteLink.setAttribute("data-icon", "delete");
		deleteLink.setAttribute("data-inline", "true");
		deleteLink.setAttribute("data-theme", "b");
		deleteLink.href = '#carlist';
		deleteLink.key = key;
		var deleteText = "Delete Car";
		deleteLink.addEventListener("click", deleteItem);
		deleteLink.innerHTML = deleteText;
		linksLi.appendChild(deleteLink);
	}
	
	getData();

	var clearLink = ge('clear');
	clearLink.addEventListener("click", clearLocal);

});	












	

