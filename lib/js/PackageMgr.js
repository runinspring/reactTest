function PackageMgr(autoPackage) {
	this.autoPackage = autoPackage;

	this.jobMgr = new JobMgr();

	this.updater = null;
}

PackageMgr.prototype.getAutoPackage = function() {
	return this.autoPackage;
}

PackageMgr.prototype.getJobMgr = function() {
	return this.jobMgr;
}

PackageMgr.prototype.initJobMgr = function () {
	var index = 0;

	this.jobMgr.setIndex(index);
	this.jobMgr.setWeightBase(index);
}

PackageMgr.prototype.build = function() {
	var job = this.jobMgr.getCurrentJob();
	var jobName = job.getJobName();
	var jobUrl = Config.getInstance().getPackageServer() + "/job/" + jobName;

	var buildUrl = this.autoPackage.getBuildUrl();
	var url = jobUrl + buildUrl;

	// jenkins: start to build
	jQuery.post(url);
}

PackageMgr.prototype.startPackage = function() {
	var promise = this.updateJobArr();

	var thiz = this;
	jQuery.when.apply(null, [promise]).done(function() {
		thiz.initJobMgr();

		var promiseArr = thiz.updateBuildNumberArr();
		jQuery.when.apply(null, promiseArr).done(function() {
			console.log("build number array: " + thiz.jobMgr.buildNumberArr);

			thiz.build();

			var startTime = thiz.autoPackage.getStartTime();
			thiz.updater = new StatusUpdater(startTime, thiz, thiz.autoPackage.statusCallback, thiz.autoPackage.successCallback);
			thiz.updater.startUpdateStatus();
		});
	});
}

PackageMgr.prototype.stop = function() {
	var queueUrl = Config.getInstance().getPackageServer() + "/queue/api/json"
	var job = this.jobMgr.getCurrentJob();

	var thiz = this;
	var promise = jQuery.getJSON(queueUrl, function (data) {
		var jobName = job.getJobName();
		var items = data.items;
		for (var i=0; i<items.length; i++) {
			var item = items[i];
			if (jobName == item.task.name) {
				job.setIsCancelled(true);

				var cancelUrl = Config.getInstance().getPackageServer() + "/queue/cancelItem?id=" + item.id;
				// jenkins: cancel waiting in queue.
				jQuery.post(cancelUrl);

				break;
			}
		}
	});

	jQuery.when.apply(null, [promise]).done(function() {
		if (job) {
			var isCancelled = job.getIsCancelled();
			if (!isCancelled) {
				var jobName = job.getJobName();
				var buildNumber = thiz.jobMgr.getCurrentBuildNumber();
				var jobUrl = Config.getInstance().getPackageServer() + "/job/" + jobName + "/" + buildNumber;

				var stopUrl = thiz.autoPackage.getStopUrl();
				var url = jobUrl + stopUrl;

				// jenkins: stop building.
				jQuery.post(url);
			}
		}
	});
}

PackageMgr.prototype.stopPackage = function() {
	this.stop();
	if (this.updater) {
		this.updater.stopUpdateStatus();
	}
}

PackageMgr.prototype.autoPackageViewCallback = function(data) {
	var arr = [];

	var jobs = data.jobs;
	for (var i=0; i<jobs.length; i++) {
		var job = new Job(jobs[i].name);
		arr.push(job);
	}

	this.jobMgr.setJobArr(arr);
}

PackageMgr.prototype.updateJobArr = function() {
	var packageName = this.autoPackage.getPackageName();
	var thiz = this;
	var promise = jQuery.getJSON(Config.getInstance().getPackageServer() + "/view/" + packageName + "/api/json", function(data) {
		thiz.autoPackageViewCallback(data);
	});

	return promise;
}

PackageMgr.prototype.updateBuildNumberArrCallback = function(data) {
	var jobMgr = this.jobMgr;
	var index = jobMgr.getIndexByName(data.name);
	jobMgr.setBuildNumberArrElement(index, data.nextBuildNumber);
}

PackageMgr.prototype.updateBuildNumberArr = function() {
	var promiseArr = [];

	var jobMgr = this.jobMgr;

	var thiz = this;
	var length = jobMgr.getJobsCount();
	for (var i=0; i<length; i++) {
		var job = jobMgr.getJobByIndex(i);
		var jobName = job.getJobName();
		var jobUrl = Config.getInstance().getPackageServer() + "/job/" + jobName;
		var url = jobUrl + "/api/json";
		var promise = jQuery.getJSON(url, function(data) {
			thiz.updateBuildNumberArrCallback(data);
		});

		promiseArr.push(promise);
	}

	return promiseArr;
}