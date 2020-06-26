$(document).ready(function () {
    let db = firebase.firestore()
    let video = document.getElementById("movie");
    db.collection("room").doc('test2').set({ timestamp: 0 })
    db.collection("room").doc('testroom').set({ isplay:false })
        .then(function () {
            console.log("Object successfully written!")
        })
        .catch(function (error) {
            console.error("Error writing document: ", error)
        })
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
    let lasttime = 0;
    video.ontimeupdate = (e) => {
        let currtime = video.currentTime
        if (currtime < lasttime || (currtime - lasttime) > 10) {
            console.log(currtime / 60)
            db.collection("room").doc('test2').set({ timestamp: Math.round(video.currentTime * 100) / 100 })
                .then(function () {
                    console.log("Object successfully written!")
                })
                .catch(function (error) {
                    console.error("Error writing document: ", error)
                })
        }
        lasttime = currtime
    }
    $('#loadVideo').on('click', () => {
        let address = $('#videoAddress').val()
        address = "file:///" + address
        console.log(address)
        document.getElementById("videoInternal").src = address;
        video.load();
    })

    $(document).click(function (e) {
        if ($('#overlay').is(e.target) && !$('#overlayContainer').is(e.target)) {
            $('#overlay').hide()
        }
    })
    $('#openOverlay').click(() => $('#overlay').show())
    let count = 0;
    db.collection("room").doc('testroom').onSnapshot(function (snapshot) {
        let curr = snapshot.data()

        let play = curr.isplay
        if (play && count) video.play()
        else video.pause()
        count += 1

    })
    db.collection("room").doc('test2').onSnapshot(function (snapshot) {
        let curr = snapshot.data()

        if (video.seekable.length > 0) {
            video.currentTime = curr.timestamp;
        }

    })
})
