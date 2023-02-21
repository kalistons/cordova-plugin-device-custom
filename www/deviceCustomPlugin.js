var argscheck = require('cordova/argscheck'),
    channel = require('cordova/channel'),
    utils = require('cordova/utils'),
    exec = require('cordova/exec'),
    cordova = require('cordova');

channel.createSticky('onCordovaInfoReady');
channel.waitForInitialization('onCordovaInfoReady');

/**
 * This represents the mobile device, and provides properties for inspecting the model, version, UUID of the
 * phone, etc.
 * @constructor
 */
function DeviceCustomPlugin() {
	this.available = false;
	this.version = null;
    this.memMax = null;
    this.memUsed = null;
    this.diskFree = null;
    this.diskTotal = null;
    this.realDiskFree = null;
    this.realDiskTotal = null;
    this.model = null;
    this.operatingSystem = "android";
    this.osVersion = null;
    this.platform = null;
    this.manufacturer = null;
    this.isVirtual = null;
    this.name = null;

    var me = this;

    channel.onCordovaReady.subscribe(function () {
        
		me.getInfo(function(info){
			var buildLabel = cordova.version;
			
			me.available = true;
			me.version = buildLabel;
			me.memUsed = info.memUsed;
			me.memMax = info.memMax;
			me.diskFree = info.diskFree;
			me.diskTotal =info.diskTotal;
			me.realDiskFree =info.realDiskFree;
			me.realDiskTotal =info.realDiskTotal;
			me.model =info.model;
			me.operatingSystem =info.operatingSystem;
			me.osVersion =info.osVersion;
			me.platform =info.platform;
			me.manufacturer =info.manufacturer;
			me.isVirtual =info.isVirtual;
			me.name =info.name;
			channel.onCordovaInfoReady.fire();
		}, function(e){
			me.available = false;
			utils.alert('[ERROR] Error initializing Cordova DeviceCustomPlugin: ' + e);
		});
         
    });

}

/**
 * Get device info
 *
 * @param {Function} successCallback The function to call when the heading data is available
 * @param {Function} errorCallback The function to call when there is an error getting the heading data. (OPTIONAL)
 */
DeviceCustomPlugin.prototype.getInfo = function (successCallback, errorCallback) {
    argscheck.checkArgs('fF', 'DeviceCustomPlugin.getInfo', arguments);
    exec(successCallback, errorCallback, "DeviceCustomPlugin", "getDeviceInfo", []);
};

module.exports = new DeviceCustomPlugin();