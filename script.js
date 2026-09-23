const music =
    document.getElementById("music");

const playButton =
    document.getElementById("play-button");

const prevButton =
    document.getElementById("prev-button");

const nextButton =
    document.getElementById("next-button");

const progress =
    document.getElementById("progress");

const progressBar =
    document.getElementById("progress-bar");

const currentTime =
    document.getElementById("current-time");

const duration =
    document.getElementById("duration");

const albumCover =
    document.getElementById("album-cover");

const songTitle =
    document.getElementById("song-title");

const songArtist =
    document.getElementById("song-artist");

const songNumber =
    document.getElementById("song-number");

const songTotal =
    document.getElementById("song-total");

const musicPlayer =
    document.querySelector(".music-player");


/* =========================
   PLAYLIST
========================= */

const playlist = [

    {
        title: "About You",
        artist: "The 1975",
        audio: "abtu.mp3",
        cover: "abtu.jpg"
    },

    {
        title: "The Subway",
        artist: "Chappell Roan",
        audio: "sbwy.mp3",
        cover: "pwo.jpg"
    },

/*    {
        title: "Song Three",
        artist: "Artist Name",
        audio: "song3.mp3",
        cover: "cover3.jpg"
    }
*/
];


let currentSong = 0;


/* =========================
   ICONS
========================= */

const playIcon = `

<svg viewBox="0 0 24 24">

    <path d="M8 5L19 12L8 19V5Z"></path>

</svg>

`;


const pauseIcon = `

<svg viewBox="0 0 24 24">

    <rect
        x="7"
        y="5"
        width="3"
        height="14"
        rx="1"
    ></rect>

    <rect
        x="14"
        y="5"
        width="3"
        height="14"
        rx="1"
    ></rect>

</svg>

`;


/* =========================
   LOAD SONG
========================= */

function loadSong(index) {

    const song =
        playlist[index];


    music.src =
        song.audio;


    albumCover.src =
        song.cover;


    songTitle.textContent =
        song.title;


    songArtist.textContent =
        song.artist;


    songNumber.textContent =
        String(index + 1).padStart(2, "0");


    songTotal.textContent =
        String(playlist.length).padStart(2, "0");


    progress.style.width =
        "0%";


    currentTime.textContent =
        "0:00";


    duration.textContent =
        "0:00";

}


/* =========================
   PLAY
========================= */

function playSong() {

    music.play();

    musicPlayer.classList.add("is-playing");

    playButton.innerHTML =
        pauseIcon;

}


/* =========================
   PAUSE
========================= */

function pauseSong() {

    music.pause();

    musicPlayer.classList.remove("is-playing");

    playButton.innerHTML =
        playIcon;

}


/* =========================
   PLAY BUTTON
========================= */

playButton.addEventListener(
    "click",
    function () {

        if (music.paused) {

            playSong();

        }

        else {

            pauseSong();

        }

    }
);


/* =========================
   NEXT SONG
========================= */

function nextSong() {

    currentSong++;


    if (
        currentSong >=
        playlist.length
    ) {

        currentSong = 0;

    }


    loadSong(currentSong);

    playSong();

}


nextButton.addEventListener(
    "click",
    nextSong
);


/* =========================
   PREVIOUS SONG
========================= */

function previousSong() {

    currentSong--;


    if (currentSong < 0) {

        currentSong =
            playlist.length - 1;

    }


    loadSong(currentSong);

    playSong();

}


prevButton.addEventListener(
    "click",
    previousSong
);


/* =========================
   FORMAT TIME
========================= */

function formatTime(seconds) {

    if (isNaN(seconds)) {

        return "0:00";

    }


    const minutes =
        Math.floor(seconds / 60);


    const secs =
        Math.floor(seconds % 60);


    return (
        minutes +
        ":" +
        String(secs).padStart(2, "0")
    );

}


/* =========================
   METADATA LOADED
========================= */

music.addEventListener(
    "loadedmetadata",
    function () {

        duration.textContent =
            formatTime(
                music.duration
            );

    }
);


/* =========================
   UPDATE PROGRESS
========================= */

music.addEventListener(
    "timeupdate",
    function () {

        if (!music.duration) {

            return;

        }


        const percent =
            (
                music.currentTime /
                music.duration
            ) * 100;


        progress.style.width =
            percent + "%";


        currentTime.textContent =
            formatTime(
                music.currentTime
            );

    }
);


/* =========================
   CLICK PROGRESS BAR
========================= */

progressBar.addEventListener(
    "click",
    function (event) {

        if (!music.duration) {

            return;

        }


        const rectangle =
            progressBar.getBoundingClientRect();


        const clickPosition =
            event.clientX -
            rectangle.left;


        const percentage =
            clickPosition /
            rectangle.width;


        music.currentTime =
            percentage *
            music.duration;

    }
);


/* =========================
   AUTO NEXT
========================= */

music.addEventListener(
    "ended",
    function () {

        musicPlayer.classList.remove("is-playing");

        nextSong();

    }
);


/* =========================
   ABOUT KITTEN POP-UP
========================= */

const aboutKitten =
    document.querySelector(".about-kitten");


if (aboutKitten) {

    const kittenObserver =
        new IntersectionObserver(
            function (entries, observer) {

                if (!entries[0].isIntersecting) {

                    return;

                }


                aboutKitten.classList.add("is-visible");

                observer.unobserve(aboutKitten);

            },
            {
                threshold: 0.3
            }
        );


    kittenObserver.observe(aboutKitten);

}


/* =========================
   LOAD FIRST SONG
========================= */

loadSong(currentSong);
