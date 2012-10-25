

$('tagcar').on('pageinit', function (){
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

var conditionValue,
	holdValues
;








