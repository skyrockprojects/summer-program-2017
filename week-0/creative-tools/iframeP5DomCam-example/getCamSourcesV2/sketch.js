// 1. Run this example to print to console all the sources.
// 2. Determine the ID of the video source you'd like to use.
// 3. Place the ID as a string where it says 'put_desired_source_id_here'.
// 4. Comment in lines 15-21 to set options for the capture.
// 5. (Optional) remove line 14 and lines 29-39 (the gotSources function).
//    They are no longer necessary.

var capture;
var options;

function setup() {
  
  if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
  console.log("enumerateDevices() not supported.");
  return;
}

// List cameras and microphones.

navigator.mediaDevices.enumerateDevices()
.then(function(devices) {
  devices.forEach(function(device) {
    console.log(device.kind + ": " + device.label +
                " id = " + device.deviceId);
  });
})
.catch(function(err) {
  console.log(err.name + ": " + err.message);
});
  
  capture = createCapture(options);
  console.log(capture);

}
