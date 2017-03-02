function JobMgr() {
	this.jobArr = [];
	this.index = -1;
	this.buildNumberArr = [];
	this.weightBase = 1;
}

JobMgr.prototype.setJobArr = function(arr) {
	this.jobArr = arr;
}

JobMgr.prototype.getIndex = function() {
	return this.index;
}

JobMgr.prototype.setIndex = function(index) {
	this.index = index;
}

JobMgr.prototype.setBuildNumberArrElement = function(index, value) {
	this.buildNumberArr[index] = value;
}

JobMgr.prototype.setWeightBase = function(jobIndex) {
	var jobsCount = this.getJobsCount();
	if (jobsCount > 0) {
		var base = jobsCount - jobIndex;
		if (base >= 1) {
			this.weightBase = base;
		}
	}
}

JobMgr.prototype.getWeight = function() {
	var weight = 1.0 / this.weightBase;

	return weight;
}

JobMgr.prototype.getJobsCount = function() {
	return this.jobArr.length;
}

JobMgr.prototype.getJobByIndex = function(index) {
	var job = null;

	var length = this.getJobsCount();
	if (index >=0 && index <= length - 1) {
		job = this.jobArr[index];
	}

	return job;
}

JobMgr.prototype.getIndexByName = function(jobName) {
	var index = -1;

	var length = this.getJobsCount();
	for (var i=0; i<length; i++) {
		var job = this.getJobByIndex(i);
		if (jobName && job && job.getJobName() == jobName) {
			index = i;
		}
	}

	return index;
}

JobMgr.prototype.moveIndex = function() {
	this.index++;
	var length = this.getJobsCount();
	this.index = this.index % length;
}

JobMgr.prototype.getCurrentJob = function() {
	var job = this.getJobByIndex(this.index);

	return job;
}

JobMgr.prototype.getLastJobIndex = function() {
	var length = this.getJobsCount();
	var index = length - 1;

	return index;
}

JobMgr.prototype.getLastJob = function() {
	var index = this.getLastJobIndex();
	var job = this.getJobByIndex(index);

	return job;
}

JobMgr.prototype.isLastJob = function(index) {
	var lastJobIndex = this.getLastJobIndex();

	return index == lastJobIndex ? true : false;
}

JobMgr.prototype.getBuildNumberByIndex = function(index) {
	var buildNumber = 0;

	var length = this.buildNumberArr.length;
	if (length > 0) {
		if (index >=0 && index <= length - 1) {
			buildNumber = this.buildNumberArr[index];
		}
	}

	return buildNumber;
}

JobMgr.prototype.getCurrentBuildNumber = function() {
	var index = this.getIndex();
	var buildNumber = this.getBuildNumberByIndex(index);

	return buildNumber;
}