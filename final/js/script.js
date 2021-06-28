/* 負責"主要展示區"欄位中"錄影裝置"區的互動功能 */

let mediaRecorder;
let recordedBlobs;

const errorMsgElement = document.querySelector('span#errorMsg');
const recordedVideo = document.querySelector('video#recorded');
const recordButton = document.querySelector('button#record');
const playButton = document.querySelector('button#play');
const downloadButton = document.querySelector('button#download');
var count = 0;

// 錄影設定彈出視窗的互動功能
$('#send-the-info').on('click', () => {
    if ($('#filename').val() != "" && $('#resolution').val() != "") {
        count++;
        if (count == 2) {
            $("button#start").text('啟用新設定');
        }
    } else {
        if ($('#filename').val() == "") {
            alert("檔案名稱不得為空白");
        }
        if ($('#resolution').val() == "") {
            alert("請選擇一種畫質");
        }
    };
    if (count > 1) {
        $("p#new-setting-reminder").text('若要套用新的影片設定，記得點選"啟用新設定"喔!');
        $("button#start").on("click", () => {
            $("p#new-setting-reminder").empty();
        });
    }
});

// 錄影裝置裡"開始錄影"按鈕的功能
recordButton.addEventListener('click', () => {
    if (recordButton.textContent === '開始錄影') {
        startRecording();
    } else {
        stopRecording();
        recordButton.textContent = '開始錄影';
        playButton.disabled = false;
        downloadButton.disabled = false;
    }
});

// 錄影裝置裡"播放"按鈕的功能
playButton.addEventListener('click', () => {
    const superBuffer = new Blob(recordedBlobs, { type: 'video/webm' });
    recordedVideo.src = null;
    recordedVideo.srcObject = null;
    recordedVideo.src = window.URL.createObjectURL(superBuffer);
    recordedVideo.controls = true;
    recordedVideo.play();
});

// 錄影裝置裡"下載錄影檔"按鈕的功能
downloadButton.addEventListener('click', () => {
    const blob = new Blob(recordedBlobs, { type: 'video/mp4' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = $('#filename').val() + '.mp4';
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    }, 100);
});

function handleDataAvailable(event) {
    console.log('handleDataAvailable', event);
    if (event.data && event.data.size > 0) {
        recordedBlobs.push(event.data);
    }
}

function startRecording() {
    recordedBlobs = [];
    let options = { mimeType: 'video/webm;codecs=vp9,opus' };
    try {
        mediaRecorder = new MediaRecorder(window.stream, options);
    } catch (e) {
        console.error('Exception while creating MediaRecorder:', e);
        errorMsgElement.innerHTML = `Exception while creating MediaRecorder: ${JSON.stringify(e)}`;
        return;
    }

    console.log('Created MediaRecorder', mediaRecorder, 'with options', options);
    recordButton.textContent = '停止錄影';
    playButton.disabled = true;
    downloadButton.disabled = true;
    mediaRecorder.onstop = (event) => {
        console.log('Recorder stopped: ', event);
        console.log('Recorded Blobs: ', recordedBlobs);
    };
    mediaRecorder.ondataavailable = handleDataAvailable;
    mediaRecorder.start();
    console.log('MediaRecorder started', mediaRecorder);
}

function stopRecording() {
    mediaRecorder.stop();
}

function handleSuccess(stream) {
    recordButton.disabled = false;
    console.log('getUserMedia() got stream:', stream);
    window.stream = stream;

    const gumVideo = document.querySelector('video#gum');
    gumVideo.srcObject = stream;
}

async function init(constraints) {
    try {
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        handleSuccess(stream);
    } catch (e) {
        console.error('navigator.getUserMedia error:', e);
        errorMsgElement.innerHTML = `navigator.getUserMedia error:${e.toString()}`;
    }
}

document.querySelector('button#start').addEventListener('click', async() => {
    const hasEchoCancellation = document.querySelector('#echoCancellation').checked;
    const constraints = {
        audio: {
            echoCancellation: { exact: hasEchoCancellation }
        },
        video: {
            width: $('#resolution').val() / 9 * 16,
            height: $('#resolution').val()
        }
    };
    console.log('Using media constraints:', constraints);
    await init(constraints);
});