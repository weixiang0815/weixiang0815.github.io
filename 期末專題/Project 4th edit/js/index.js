// 讓"功能介紹"欄位中的"馬上錄影"按鈕，一按就畫面至頂並打開設定錄影資訊的彈出視窗
$(() => {
    let eleStartRecording = document.getElementById('start-recording')
    let modalStartRecording = new bootstrap.Modal(eleStartRecording)
    $('#record-right-now').on('click', () => {
        $("html,body").animate({
            scrollTop: 0
        }, 1);
        modalStartRecording.show()
    })
})

// 讓"立即拍攝"欄位中的"現在使用"按鈕，一按就畫面至頂並打開設定錄影資訊的彈出視窗
$(() => {
    let eleStartRecording = document.getElementById('start-recording')
    let modalStartRecording = new bootstrap.Modal(eleStartRecording)
    $('#use-it-right-now').on('click', () => {
        $("html,body").animate({
            scrollTop: 0
        }, 1);
        modalStartRecording.show()
    })
})