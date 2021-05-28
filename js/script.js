let previous = document.querySelector('#pre');
let play = document.querySelector('#play');
let next = document.querySelector('#next');
let title = document.querySelector('#title');
let recent_volume = document.querySelector('#volume');
let volume_show = document.querySelector('#volume_show');
let slider = document.querySelector('#duration_slider');
let show_duration = document.querySelector('#show_duration');
let track_image = document.querySelector('#track_image');
let auto_play = document.querySelector('#auto');
let present = document.querySelector('#present');
let total = document.querySelector('#total');
// let artist = document.querySelector('#artist');


let timer;

let autoplay = 0;

let index_no = 0;
let playing_song = false;

let track = document.createElement('audio');

let All_song = [
    {
        name: 'Duncan Laurence - Arcade',
        path: "./music/Duncan Laurence - Arcade (Lyrics) ft. FLETCHER_160k.mp3",
        img: "https://img.discogs.com/K6TkxhXQSXPARcTYPuQz9Af_TIc=/fit-in/550x550/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/R-13860866-1564509068-6096.jpeg.jpg",
        singer: "first singer"
    },
    {
        name: 'Billie Eilish, Khalid - lovely',
        path: "music/Billie Eilish, Khalid - lovely.mp3",
        img: "https://studiosol-a.akamaihd.net/uploadfile/letras/albuns/1/7/9/e/800761571260222.jpg",
        singer: "second singer"
    },
    {
        name: 'Demon Slayer - Homura',
        path: "music/Demon Slayer_ Mugen Train Tema do Filme em Português - Homura (PT-BR)_160k.mp3",
        img: "https://steamuserimages-a.akamaihd.net/ugc/1667979623996374708/95B132ACCA1233EF0DF9618BCC7539E567FE7D19/?imw=512&&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false",
        singer: "third singer"
    },
    {
        name: 'AURORA - Runaway',
        path: "music/AURORA - Runaway.mp3",
        img: "https://www.vagalume.com.br/aurora/images/aurora.jpg",
        singer: "fourth singer"
    },
    {
        name: 'Meu Mel - Zé Vaqueiro',
        path: "music/Meu Mel - Zé Vaqueiro (Vídeo Oficial)_50k.mp3",
        img: "https://i.scdn.co/image/ab67616d0000b273ab441d7003afe2d716698906",
        singer: "fifth singer"
    }
];




function load_track(index_no){
    clearInterval(timer);
    reset_slider();
    track.src = All_song[index_no].path;
    title.innerHTML = All_song[index_no].name;
    track_image.src = All_song[index_no].img;
    track.load();

    total.innerHTML = All_song.length;
    present.innerHTML = index_no + 1;
    timer = setInterval(range_slider , 1000);
}
load_track(index_no);

function mute_sound(){
    track.volume = 0;
    volume.value = 0;
    volume_show.innerHTML = 0;
}

function reset_slider(){
    slider.value = 0;
}

function justplay(){
    if(playing_song==false){
        playsong();
    }else{
        pausesong();
    }
}

function playsong(){
    track.play();
    playing_song = true;
    play.innerHTML = '<i class="fa fa-pause" aria-hidden="true"></i>';
}

function pausesong() {
    track.pause();
    playing_song = false;
    play.innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>';
}

function next_song() {
    if (index_no < All_song.length - 1){
        index_no += 1
        load_track(index_no);
        playsong();
    }else{
        index_no = 0;
        load_track(index_no);
        playsong();
    }
}
function previous_song(){
    if (index_no > 0){
        index_no -= 1
        load_track(index_no);
        playsong();
    }else{
        index_no = All_song.length;
        load_track(index_no);
        playsong();
    }
}

function volume_change(){
    volume_show.innerHTML = recent_volume.value;
    track.volume = recent_volume.value / 100;
}

function change_duration(){
    slider_position = track.duration * (slider.value / 100);
    track.currentTime = slider_position;
}

function autoplay_switch(){
    if (autoplay == 1){
        autoplay = 0;
        auto_play.style.background = "rgba(255,255,255,0.2)";
    }else{
        autoplay = 1;
        auto_play.style.background = "#ff215a";
    }
}

function range_slider(){
    let position = 0;

    if(!isNaN(track.duration)){
        position = track.currentTime * (100 / track.duration)
        slider.value = position;
    }

 if (track.ended) {
     play.innerHTML = '<i class="fa fa-play"></i>';
     if (autoplay==1){
         index_no += 1;
         load_track(index_no);
         playsong();
     }
 }

}