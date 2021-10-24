console.log('welcome to to spotify');

// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio('../songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItem = Array.from(document.getElementsByClassName('songItem'))


let songs = [
    { songName: "Let-let", filePath: "../songs/1.mp3", coverPath: "../covers/1.jpg" },
    { songName: "Let-me", filePath: "../songs/2.mp3", coverPath: "../covers/2.jpg" },
    { songName: "Let-love", filePath: "../songs/3.mp3", coverPath: "../covers/3.jpg" },
    { songName: "Let-you", filePath: "../songs/4.mp3", coverPath: "../covers/4.jpg" },
    { songName: "Let-usamili", filePath: "../songs/5.mp3", coverPath: "../covers/5.jpg" },
    { songName: "Let-wtho", filePath: "../songs/6.mp3", coverPath: "../covers/6.jpg" },
]


songItem.forEach((element, i) => {


    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;

})

// audioElement.play();

//Handle play/pause click
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-play');
        masterPlay.classList.add('fa-pause');
        gif.style.opacity = 1;
    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause');
        masterPlay.classList.add('fa-play');
        gif.style.opacity = 0;

    }
})

//Listen to Events
audioElement.addEventListener('timeupdate', () => {
    // console.log('timeupdate');
    //Update Seekbar
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    // console.log(progress);
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = (myProgressBar.value * audioElement.duration) / 100;

})


const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');

    })

}


Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        gif.style.opacity = 1;
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `../songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove('fa-play');
        masterPlay.classList.add('fa-pause');

    })

})

document.getElementById('next').addEventListener('click', () => {
    if (songIndex >= 9) {
        songIndex = 0;
    } else {
        songIndex += 1;
    }
    audioElement.src = `../songs/${songIndex+1}.mp3`;
    audioElement.currentTime = 0;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.play();
    masterPlay.classList.remove('fa-play');
    masterPlay.classList.add('fa-pause');

})

document.getElementById('pervious').addEventListener('click', () => {
    if (songIndex <= 0) {
        songIndex = 9;
    } else {
        songIndex -= 1;
    }
    audioElement.src = `../songs/${songIndex+1}.mp3`;
    audioElement.currentTime = 0;
    masterSongName.innerText = songs[songIndex].songName;

    audioElement.play();
    masterPlay.classList.remove('fa-play');
    masterPlay.classList.add('fa-pause');

})