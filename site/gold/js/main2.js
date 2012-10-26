

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

	var car				= {};
		car.make		= ["Make: ", make.val()];
		car.model		= ["Model: ", model.val()];
		car.year		= ["Year: ", year.val()];
		car.color		= ["Color: ", color.val()];
		
	color.focusout(function(){
		console.log(color.val());
	});
	








