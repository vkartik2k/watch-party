$(document).ready(function () {
    let db = firebase.firestore()
    let video = document.getElementById("movie");
    video.onplay = () => {
        console.log("played")
        db.collection("room").doc('testroom').set({ isplay: true })
        .then(function () {
            console.log("Object successfully written!")
        })
        .catch(function (error) {
            console.error("Error writing document: ", error)
        })
    }
    video.onpause = () => {
        db.collection("room").doc('testroom').set({ isplay: false })
        .then(function () {
            console.log("Object successfully written!")
        })
        .catch(function (error) {
            console.error("Error writing document: ", error)
        })
    }

    video.ontimeupdate = (e) => {
    }
    $('#loadVideo').on('click', () => {
        let address = $('#videoAddress').val()
        address = "file:///" + address
        console.log(address)
        document.getElementById("videoInternal").src = address;
        video.load();
        $('#overlay').hide()
    })

    $(document).click(function (e) {
        if ($('#overlay').is(e.target) && !$('#overlayContainer').is(e.target)) {
            $('#overlay').hide()
        }
    })
    $('#openOverlay').click(() => $('#overlay').show())
    // db.collection("paintEditor").doc(variables.paintEditorId).onSnapshot(function (snapshot) {
    //     let dataArr = snapshot.data().content
    //     context.lineWidth = variables.strokeSize
    //     context.lineCap = "round"
    //     context.strokeStyle = variables.color
    //     dataArr.forEach(data => {
    //         setTimeout(() => q.push(data), data.t + (ij * 80))
    //     })
    //     ij++
    //     if (i - 1 == q.length) ij = 0
    // })
    let count = 0;
    db.collection("room").doc('testroom').onSnapshot(function (snapshot) {
        let play = snapshot.data().isplay
        if(play && count) video.play()
        else video.pause()
        count+=1
    })
})
