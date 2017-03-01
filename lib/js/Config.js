function Config() {
	this.deviceIP = "127.0.0.1";
	this.devicePort = "8080";
	this.packageServer = "http://10.0.12.5:8080";
}

Config.prototype.getPackageServer = function() {
	return this.packageServer;
}

Config.prototype.getDeviceIP = function() {
	return this.deviceIP;
}

Config.prototype.getDevicePort = function() {
	return this.devicePort;
}

Config.instance = null;

Config.getInstance = function() {
	if (!Config.instance) {
		Config.instance = new Config();

		var url = window.location.search.substring(1);
		var variables = url.split('&');
		for (var i = 0; i < variables.length; i++) {
			var params = variables[i].split('=');
			var key = params[0];
			var value = params[1];

			Config.instance[key] = value;
		}
	}

	return Config.instance;
}