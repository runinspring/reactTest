
function AjaxSetup(userName, apiToken) {
	this.userName = userName;
	this.apiToken = apiToken;
}

AjaxSetup.prototype.initHeaders = function() {
	$.ajaxSetup({
	    headers: { 
	    	'Authorization': "Basic " + btoa(this.userName + ":" + this.apiToken),
		}
	});

	var url = Config.getInstance().getPackageServer() + "/crumbIssuer/api/json";
	jQuery.getJSON(url, function (data) {
		if (data) {
			var crumbRequestField = data["crumbRequestField"];
			var crumb = data["crumb"];

			var header = {};
			header[crumbRequestField] = crumb;

			$.ajaxSetup({
			    headers: header
			});		
		}
	});	
};

(function(){
	var setup = new AjaxSetup("admin", "46256be314cc718b4bbe7bf36cf333f9");
	setup.initHeaders();	
})();
