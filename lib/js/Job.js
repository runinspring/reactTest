function Job(jobName) {
	this.jobName = jobName;

	this.isCancelled = false;
}

Job.prototype.getJobName = function() {
	return this.jobName;
}

Job.prototype.setJobName = function(jobName) {
	this.jobName = jobName;
}

Job.prototype.getIsCancelled = function() {
	return this.isCancelled;
}

Job.prototype.setIsCancelled = function(isCancelled) {
	this.isCancelled = isCancelled;
}