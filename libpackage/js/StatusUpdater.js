function StatusUpdater(startTime, testMgr, statusCallback, successCallback) {
	this.startTime = startTime;
	this.testMgr = testMgr;
	this.statusCallback = statusCallback;
	this.successCallback = successCallback;

	this.timerId = -1;
}

StatusUpdater.prototype.calcProgress = function(weight, baseTime) {
	var result = -1;
	if (baseTime > 1) {
		var jobMgr = this.testMgr.getJobMgr();
		var index = jobMgr.getIndex();
		var delta = weight == 1 ? 0 : parseInt(index * weight * 100);

		var progress = parseInt((new Date() - this.startTime) * 100 / baseTime);
		progress = progress >=100 ? 99 : progress;
		progress = parseInt(progress * weight);

		result = delta + progress;
	}

	return result;
}

StatusUpdater.prototype.autoTestStatusCallback = function(data) {
	var jobMgr = this.testMgr.getJobMgr();

	var weight = jobMgr.getWeight();
	var progress = this.calcProgress(weight, data.estimatedDuration);
	this.statusCallback(progress + "%");

	var index = jobMgr.getIndex();
	if (jobMgr.isLastJob(index)) {
		if (data.result == "SUCCESS" || data.result == "FAILURE") {
			this.statusCallback("100% " + data.result);

			window.clearInterval(this.timerId);

			if (this.successCallback) {
				var job = jobMgr.getLastJob();
				var jobName = job.getJobName();
				var server = Config.getInstance().getPackageServer();
				var jobUrl = server + "/job/" + jobName;
				var index = jobMgr.getLastJobIndex();
				var buildNumber = jobMgr.getBuildNumberByIndex(index);

				this.successCallback(jobUrl, buildNumber);
			}
		}
	} else {
		if (data.duration > 0 && data.result == "SUCCESS") {

			window.clearInterval(this.timerId);

			jobMgr.moveIndex();

			this.startUpdateStatus();
		}
	 
	}
}

StatusUpdater.prototype.autoTestUpdateStatus = function() {
	var jobMgr = this.testMgr.getJobMgr();

	var job = jobMgr.getCurrentJob();
	var jobName = job.getJobName();
	var buildNumber = jobMgr.getCurrentBuildNumber();
	var weight = jobMgr.getWeight();

	var server = Config.getInstance().getPackageServer();
	var jobUrl = server + "/job/" + jobName;
	var url = jobUrl + "/" + buildNumber + "/api/json";

	var thiz = this;
	jQuery.getJSON(url, function (data) {
		thiz.autoTestStatusCallback(data);
	});
}

StatusUpdater.prototype.startUpdateStatus = function() {
	var thiz = this;
	// poll the server to update progress
	this.timerId = window.setInterval(function () {
		thiz.autoTestUpdateStatus();
	}, 1000);
}

StatusUpdater.prototype.stopUpdateStatus = function() {
	window.clearInterval(this.timerId);
	this.statusCallback("TEST CANCELLED!");
}