"use strict";

var timeout;

function millis(hr) {
	return hr[0] * 1000 + Math.floor(hr[1] / 1000000);
}

function busyWait(ms, cb) {
	var hr0 = process.hrtime();
	while (millis(process.hrtime(hr0)) < ms);
	var elapsed = millis(process.hrtime(hr0));
	console.log("busy:\texpected " + ms + ", got " + elapsed);
	cb();
}

function idleWait(ms, cb) {
	var hr0 = process.hrtime();

        var asyncFunction = function(){
	  var elapsed = millis(process.hrtime(hr0));
	  console.log("idle:\texpected " + ms + ", got " + elapsed + //
		      (elapsed > ms + 100 ? " SURPRISE!!" : ""));
	  cb();

	}

	//clearTimeout(timeout);
	//console.log(process._getActiveHandles()[2]);
	//console.log(process._getActiveRequests());
	//timeout = setTimeout(asyncFunction,ms);
        timeout = setImmediate(asyncFunction);
}

function combined(a) {
    busyWait(300, function() {
        idleWait(100,function(){
            a < 20 && combined(++a);
        });
    }); 
}
combined(0);
