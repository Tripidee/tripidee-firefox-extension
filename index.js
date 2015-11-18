var buttons = require('sdk/ui/button/action');
var tabs = require("sdk/tabs");
var self = require("sdk/self");
var { attach, detach } = require('sdk/content/mod');
var { Style } = require('sdk/stylesheet/style');

// Create button
var button = buttons.ActionButton({
	id: "tripidee",
	label: "Add to Tripidee",
	icon: {
		"16": "./icon-16.png",
		"32": "./icon-32.png",
		"64": "./icon-64.png"
	},
	onClick: handleClick
});

/*
// On tab ready, inject scripts and listen for data
tabs.on("ready", function(tab) {

	// Inject scripts
	worker = tab.attach({
		contentScriptFile: self.data.url("content-script.js")
	});

	// Listen for data
	// Open new tab when we have what we need
	worker.port.on("sendImages", function(message) {
		var imgParam = encodeURIComponent( JSON.stringify(message) );
		var titleParam = encodeURIComponent( tab.title );
		var URLParam = encodeURIComponent( tab.url );
		tabs.open({
			url: "https://www.tripidee.com/trips/stops/create/from/browser/extension/"+titleParam+"/"+URLParam+"/"+imgParam
		});
	});
	
});
*/

// Handle button click event
function handleClick(state) {
	// Inject scripts
	tabs.activeTab.attach({
		contentScriptFile: [
			self.data.url("jquery.min.js"),
			self.data.url("getimages.js")
		]
	});
	
	var style = Style({
	  uri: './getimages.css'
	});
	
	attach(style, tabs.activeTab);
}

