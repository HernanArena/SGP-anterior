// 
function dateProvider() {
	var greet;
	return {
		setGreeting: function (value) {
			greet = value;
		},
		$get: function() {
			return {
				showDate: function() {
					var date = new Date();
					return greet +' '+ date.getHours();
				}
			}
		}
	}
}
