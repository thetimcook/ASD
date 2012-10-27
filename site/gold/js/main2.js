

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








