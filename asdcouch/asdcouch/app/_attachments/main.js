$(document).ready(function(){
	$.ajax({
		url: "_view/cars",
		dataType: "json",
		success: function(data) {
			$.each(data.rows, function(index, cars) {
				var key = cars.key
					make = cars.value.make
					model = cars.value.model
					year = cars.value.year
					color = cars.value.color
					display = cars.value.display
					condition = cars.value.condition
					describe = cars.value.describe
				$(''+
					'<div data-role="collapsible">'+
						'<h3>'+ key +'</h3>'+
						'<p>Make: '+ make +'</p>'+
						'<p>Model: '+ model +'</p>'+
						'<p>Year: '+ year +'</p>'+
						'<p>Color: '+ color +'</p>'+
						'<p>What makes it stand out? '+ display +'</p>'+
						'<p>Condition: '+ condition +'</p>'+
						'<p>Describe the car in your own words. '+ describe +'</p>'+
					'</div>'
				).appendTo('#carlist');
			});
		$('#carlist').trigger("create");
		}
	});
});






