function AndroidNativeAutoPackage() {
	this.packageName = "AndroidNativeAutoPackage";

	this.buildUrl = "/buildWithParameters?token=mytoken&delay=0sec";

	this.startTime = new Date();

	this.projectZipFileName = "HelloWroldApp_eclipse.zip";
	this.isFullProject = true;
	this.isEclipseProject = true;
	this.egretProjectName = "HelloTemplate";
	this.androidSupportVersion = "4.0.2";
	this.statusBuildCallBack = null;//编译进度的回调方法
	this.buildEndCallBack = null;//编译完成的回调方法
	
}

AndroidNativeAutoPackage.prototype = new AutoPackage();

AndroidNativeAutoPackage.prototype.getBuildUrl = function () {
	var url = this.buildUrl + "&projectZipFileName=" + this.projectZipFileName;
	url += "&isFullProject=" + this.isFullProject;
	url += "&isEclipseProject=" + this.isEclipseProject;
	url += "&egretProjectName=" + this.egretProjectName;
	url += "&androidSupportVersion=" + this.androidSupportVersion;
	return url;
}
//完整的EclipseProject
AndroidNativeAutoPackage.prototype.setFullEclipseProject = function (projectZipFileName) {
	this.projectZipFileName = projectZipFileName;

	this.isFullProject = true;
	this.isEclipseProject = true;
}
//完整的AndroidStudioProject
AndroidNativeAutoPackage.prototype.setFullAndroidStudioProject = function (projectZipFileName) {
	this.projectZipFileName = projectZipFileName;

	this.isFullProject = true;
	this.isEclipseProject = false;
}
//只有资源包
AndroidNativeAutoPackage.prototype.setAssetsProject = function (projectZipFileName, egretProjectName, androidSupportVersion) {
	// console.log('AndroidNativeAutoPackage',this)
	this.projectZipFileName = projectZipFileName || this.projectZipFileName;
	this.egretProjectName = egretProjectName || this.egretProjectName;
	this.androidSupportVersion = androidSupportVersion || this.androidSupportVersion;

	this.isFullProject = false;
	this.isEclipseProject = true;
}

AndroidNativeAutoPackage.prototype.statusCallback = function (msg) {//更新进度，当前的进度信息
	// console.log('statusCallback',g_android_native_auto_package_mgr)
	var mgr = g_android_native_auto_package_mgr;
	mgr.getAutoPackage().statusBuildCallBack(msg);
	// var mgr = g_android_native_auto_package_mgr;
	// mgr.getAutoPackage().buildEndCallBack('http://asdfasdaf.com'+Math.floor(Math.random()*100));
}

AndroidNativeAutoPackage.prototype.successCallback = function (jobUrl, buildNumber) {//成功之后的url地址
	var mgr = getAndroidNativeAutoPackageMgr();
	var autoPackage = mgr.getAutoPackage();

	var postfixPos = autoPackage.projectZipFileName.indexOf(".zip");
	var dir = "";
	if (autoPackage.isFullProject) {
		dir = autoPackage.projectZipFileName.substring(0, postfixPos);
	} else {
		dir = autoPackage.egretProjectName + "App";
	}

	var url = "";
	if (autoPackage.isEclipseProject) {
		url = jobUrl + "/" + buildNumber + "/artifact/" + dir + "/proj.android/bin/" + dir + "-debug.apk";
	} else {
		url = jobUrl + "/" + buildNumber + "/artifact/" + dir + "/proj.android/app/build/outputs/apk/app-debug.apk";
	}
	var mgr = g_android_native_auto_package_mgr;
	mgr.getAutoPackage().buildEndCallBack(url);
	
	//todo 
	//输出地址信息

	// var oA = document.createElement("a");
	// oA.href = url;
	// oA.target="_blank";
	// oA.innerHTML = "build Number: " + buildNumber + " " + dir + "-debug.apk";

	// var oDiv = document.createElement("div");
	// oDiv.appendChild(oA);

	// var oLog = $("#nativeLog")[0];
	// oLog.insertBefore(oDiv, oLog.firstChild);
}

var g_android_native_auto_package_mgr = null;
function getAndroidNativeAutoPackageMgr() {
	if (!g_android_native_auto_package_mgr) {
		var autoPackage = new AndroidNativeAutoPackage();
		g_android_native_auto_package_mgr = new PackageMgr(autoPackage);
	}


	return g_android_native_auto_package_mgr;
}

function startAndroidNativeAutoPackage(type, zipName, projectName, supportVersion,statusBuildCallBack,buildEndCallBack) {
	// console.log('type:', type, "fileName:", zipName, 'projectName:', projectName, 'supportVersion:', supportVersion);
	// console.log('statusBuildCallBack',statusBuildCallBack)
	var mgr = getAndroidNativeAutoPackageMgr();
	var autoPackage = mgr.getAutoPackage();
	autoPackage.setStartTime(new Date());
	// console.log(666,autoPackage)
	autoPackage.statusBuildCallBack = statusBuildCallBack;//状态的反回方法
	autoPackage.buildEndCallBack = buildEndCallBack;//编译完成的回调方法
	switch (type) {
		case 1:
			autoPackage.setFullEclipseProject(zipName);
			break;
		case 2:
			autoPackage.setFullAndroidStudioProject(zipName);
			break;
		case 3:
			autoPackage.setAssetsProject(zipName, projectName, supportVersion);
			break;
	}
	
	// console.log('sadfasd',autoPackage)
	// buildEndCallBack('http://baidu.com')
	// return;
	mgr.startPackage();
}
function stopAndroidNativeAutoPackage() {
	var mgr = getAndroidNativeAutoPackageMgr();
	mgr.stopPackage();
}