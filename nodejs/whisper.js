const { spawn, exec } = require("child_process");
const file = "./sample.mp4";
exec(`whisperx --compute_type int8  --diarize  --hf_token "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" ${file}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);
});
/* 
const outdata = spawn("whisper", ["./sample.mp4"]);

outdata.stdout.on("data", data => {
    console.log(`stdout: ${data}`);
});

outdata.stderr.on("data", data => {
    console.log(`stderr: ${data}`);
});

outdata.on('error', (error) => {
    console.log(`error: ${error.message}`);
});

outdata.on("close", code => {
    console.log(`child process exited with code ${code}`);
}); */