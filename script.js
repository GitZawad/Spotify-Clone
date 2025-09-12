async function getSong() {
    let link = await fetch("http://127.0.0.1:5536/Project%20-%20Spotify/songs/")
    let songs = await link.text()
    // console.log(songs)
    let div = document.createElement("div")
    div.innerHTML = songs

    let a = div.getElementsByTagName("a")

    let songList = []
    for (let index = 0; index < a.length; index++) {
        if (a[index].href.endsWith(".mp3")) {
            songList.push(a[index].href)
        }
    }

    return songList
}

async function main() {

    let songs = await getSong()
    const audio = new Audio(songs[0]);
    // audio.play();
    console.log(songs[0])

    let songName = document.querySelector(".songList").getElementsByTagName("ul")[0] // had to put 0 because it returns a collection where we need to access the first element.
    
    for (const element of songs) {
        let song = element.split("/songs/")[1]
        song = song.split(".")[1]
        let script = `<li>
                        <div class="songCard">
                            <div class="left-side">
                                <img src="song-card.svg" alt="">
                            <span>${song.replaceAll("%20"," ")}</span>
                            </div>

                            <div class="right-side">
                                <span>Play Now</span>
                                <img src="song play.svg" alt="">
                            </div>
                        </div>
                    </li>`
        songName.innerHTML = songName.innerHTML + script
    }

    

    audio.addEventListener("loadeddata", () => {
        let duration = audio.duration;
        let currentTime = audio.currentTime
        let currentSrc = audio.currentSrc
        console.log(duration,currentTime,currentSrc)
        // The duration variable now holds the duration (in seconds) of the audio clip
    });

}

main()

