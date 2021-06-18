// var eleStartRecording = document.getElementById('start-recording')
// var modalStartRecording = new bootstrap.Modal(eleStartRecording)
// modalStartRecording.show()

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