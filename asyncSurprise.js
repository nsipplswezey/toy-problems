/* This was a random gist that popped up recently
 * Written by someone deep into node
 * Highlighting some surprising performance quirks
 * 
 * This is probably something to come back to later
 *
 * In a nutshell, it looks like setTimeout called from a syncronous function
 * Seems to report that it takes longer than just the ms passed to set timeout 
 * In fact, the callback doesn't appear to get invoked until syncronous process time ms + timeout ms
 * 
 * Which is a surprising result for most folks mental model of node syncronous and asyncronous code
 *
 * And there's a surprising fix; which is to clear the last timeout before setting the next one.
 *
 * Now that I write it out, I notice that the callback passed to the first setTimeout in this loop fires as expected
 * And it's only the subsequent callbacks that exhibit the delay.
 *
 * So I now suspect this is a side effect of queing up multiple instances of the exact same setTimeout?
 * That could be tested.
 *
 * Anyway. Super neat, deep quirky node.
 *
 */

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
	timeout = setTimeout(asyncFunction,ms);
        //timeout = setImmediate(asyncFunction);
}

function combined(a) {
    busyWait(300, function() {
        idleWait(100,function(){
            a < 20 && combined(++a);
        });
    }); 
}
combined(0);
