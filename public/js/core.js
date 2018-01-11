$(document).ready(() => {
	console.log('ready');
	$('form').submit(function(e) {
		e.preventDefault();
		var action = $(this).attr('action');
		var data = {};
		$(this).find('input[type="text"], input[type="checkbox"], select').each(function() {
			data[$(this).attr('name')] = $(this).val();
		});
		$(this).find('input[type="checkbox"]').each(function() {
			data[$(this).attr('name')] = $(this).is(':checked');
		});
		$('#root').empty().append('<div class="row center">Searching...</div>');
		console.log(data);
		$.ajax({
			type: 'POST',
			url: action,
			async: true,
			data: JSON.stringify(data),
			dataType: "json",
			contentType: "application/json",
			success: (data) => {
				$('#root').empty();
				console.log(data);
				if (data.length == 0) {
					$('#root').append('<div class="row center">Sorry, nothing was found.</div>');
				} else {
					console.log('wtf');
					for (var i=0; i < data.length; i++){
						$('#root').append(`<div class="row center">
						<div>${data[i].mb_name}</div>
						<div>${data[i].mb_model}</div>
						<div>${data[i].cpu_name}</div>
						<div>${data[i].cpu_model}</div>
						<div>${data[i].cooler_name}</div>
						<div>${data[i].cooler_model}</div>
						<div>${data[i].gpu_name}</div>
						<div>${data[i].gpu_model}</div>
						<div>${data[i].ram_name}</div>
						<div>${data[i].ram_model}</div>
						<div>${data[i].hdd_name}</div>
						<div>${data[i].hdd_model}</div>
						<div>${data[i].ps_name}</div>
						<div>${data[i].ps_model}</div>
						<div>${data[i].price}</div>					
						</div>`);
					}
				}
			},
		});
	});
});


