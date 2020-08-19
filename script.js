const image = document.querySelector('img')
const title = document.getElementById('title')
const music = document.querySelector('audio')
const progressContainer = document.getElementById('progress-container')
const progress = document.getElementById('progress')
const currentTimeEl = document.getElementById('current-time')
const durationEl = document.getElementById('duration')
const prevBtn = document.getElementById('prev')
const playBtn = document.getElementById('play')
const nextBtn = document.getElementById('next')

// current song

let songIndex = 0

//is playing bool
let isPLaying = false

//Music

const songs = [
    {
        name: 'jacinto-1',
        displayName: 'Electric Chill Machine',
        artist: 'Jacinto Design',
    },
    {
        name: 'jacinto-2',
        displayName: 'Seven Nation Army (Remix)',
        artist: 'Jacinto Design',
    },
    {
        name: 'jacinto-3',
        displayName: 'Goodnight, Disco Queen',
        artist: 'Jacinto Design',
    },
    {
        name: 'metric-1',
        displayName: 'Front Row (Remix)',
        artist: 'Metric/Jacinto Design',
    },
]

//Update DOM

const loadSong = (song) => {
    title.textContent = song.displayName
    artist.textContent = song.artist
    music.src = `music/${song.name}.mp3`
    image.src = `img/${song.name}.jpg`
}

//play
const playSong = () => {
    isPLaying = true
    playBtn.classList.replace('fa-play', 'fa-pause')
    playBtn.setAttribute('title', 'Pause')
    music.play()
}

// Pause

const pauseSong = () => {
    isPLaying = false
    playBtn.classList.replace('fa-pause', 'fa-play')
    playBtn.setAttribute('title', 'Play')
    music.pause()
}

//prev and next songs

const nextSong = () => {
    songIndex++
    if (songIndex > songs.length - 1) {
        songIndex = 0
    }
    loadSong(songs[songIndex])
    playSong()
}

const prevSong = () => {
    songIndex--
    if (songIndex < 0) {
        songIndex = songs.length - 1
    }
    loadSong(songs[songIndex])
    playSong()
}

//Update progressbar and time

const updateProgressBar = (event) => {
    if (isPLaying) {
        const { duration, currentTime } = event.srcElement
        //update progress bar
        const progressPercent = (currentTime / duration) * 100
        progress.style.width = `${progressPercent}%`
        //calculate duration display
        const durationMinutes = Math.floor(duration / 60)
        let durationSeconds = Math.floor(duration % 60)
        if (durationSeconds < 10) {
            durationSeconds = `0${durationSeconds}`
        }
        // delayduration switch
        if (durationSeconds) {
            durationEl.textContent = `${durationMinutes}:${durationSeconds}`
        }

        //calculate current time
        const currentMinutes = Math.floor(currentTime / 60)
        let currentSeconds = Math.floor(currentTime % 60)
        const actualDurationMinutes = Math.floor((duration - currentTime) / 60)
        let actualDurationSeconds = Math.floor((duration - currentTime) % 60)
        if (currentSeconds < 10) {
            currentSeconds = `0${currentSeconds}`
        }
        if (actualDurationSeconds < 10) {
            actualDurationSeconds = `0${actualDurationSeconds}`
        }
        if (currentSeconds) {
            currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`
            durationEl.textContent = `${actualDurationMinutes}:${actualDurationSeconds}`
        }
    }
}

//setProgressBar

function setProgressBar(event) {
    const width = this.clientWidth
    const clickX = event.offsetX
    const { duration } = music

    music.currentTime = (clickX / width) * duration
}

//Event listeners

playBtn.addEventListener('click', () => (isPLaying ? pauseSong() : playSong()))
prevBtn.addEventListener('click', prevSong)
nextBtn.addEventListener('click', nextSong)
music.addEventListener('timeupdate', updateProgressBar)
music.addEventListener('ended', nextSong)
progressContainer.addEventListener('click', setProgressBar)

// On Load select first song

loadSong(songs[songIndex])
