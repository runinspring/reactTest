function AutoPackage() {
	this.packageName = "";
	this.buildUrl = "";
	this.stopUrl = "/stop";
	this.startTime = null;
}

AutoPackage.prototype.getPackageName = function() {
	return this.packageName;
}

AutoPackage.prototype.getBuildUrl = function() {
	return this.buildUrl;
}

AutoPackage.prototype.getStopUrl = function() {
	return this.stopUrl;
}

AutoPackage.prototype.getStartTime = function() {
	return this.startTime;
}

AutoPackage.prototype.setStartTime = function(startTime) {
	this.startTime = startTime;
}

AutoPackage.prototype.statusCallback = function(msg) {

}

AutoPackage.prototype.successCallback = function(jobUrl, buildNumber) {

}