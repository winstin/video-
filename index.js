const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

function transform(sourceFile, outputStream, start, duration) {
	const params = [`-ss`, start, `-i`, sourceFile, `-t`, duration, '-f', 'mpegts', '-'];
	return new Promise((r, j) => {
    const cp = spawn('ffmpeg', params);
    // ffmpeg 标准输出流
		cp.stdout.pipe(outputStream);
    // 将 ffmpeg 执行的过程日志输出到程序的标准输出流，通常为console
		cp.stderr.pipe(process.stdout);
		cp.on('error', (err) => {
			j(err);
		});
		cp.on('close', (code) => {
			console.log(`ffmpeg process close all stdio with code ${code}`);
			r(code);
		});
		cp.on('exit', (code) => {
			console.log(`ffmpeg process exited with code ${code}`);
		});
	});
}

async function run() {
	const inputFile = path.join(__dirname, './out/didi.mp4');
    console.log(inputFile);
	const output = fs.createWriteStream(path.join(__dirname, 'output.mp4'));
	await transform(inputFile, output, 0, 100);
}

run();