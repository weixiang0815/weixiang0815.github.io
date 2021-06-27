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

// 設計"主要展示區"中"歡迎標語"與"錄影裝置"來回切換的功能畫面互動功能
$(() => {
    $('#recorder').hide()
    $('#back-to-recording').hide()
})
$('#send-the-info').on('click', () => {
    $('#welcome').slideUp(1000)
    $('#recorder').slideDown(1000)
    $('#back-to-recording').show(1000)
    $('#start-recording-button').fadeOut(1000)
})
$('#back-to-welcome').on('click', () => {
    document.getElementById('welcome-word').innerText = '想繼續錄影嗎?'
    $('#welcome').slideDown(1000)
    $('#recorder').slideUp(1000)
})
$('#back-to-recording').on('click', () => {
    $('#welcome').slideUp(1000)
    $('#recorder').slideDown(1000)
})