// 视频截取
// const { spawn } = require("child_process");
const videoPath = "./out/didi.mp4";
const outPath = "./out/pic";


var spawn = require('child_process').spawn;
var child = spawn('node', ['./index.js'], {stdio : ['ipc']});
child.on('message', msg => {
	console.log('parent process get : ' + msg.str);
})
child.send({str : 'hello child'});

console.log('111')

// 切割视频
const ffmpeg = spawn("ffmpeg", [
  "-i",
  videoPath,
  "-vf",
  "thumbnail",
  "-frames:v",
  "1",
  "-c:v",
  "png",
  "-f",
  "image2pipe",
  "pipe:1",
  `${outPath}/out%03d.png`,
]);
ffmpeg.on("close", (code) => {
  console.log(`child process exited with code ${code}`);
});
ffmpeg.stderr.on("data", (data) => {
  console.log(data.toString());
});
