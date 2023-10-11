console.log('Tune Fow');
let songIndex = 0;
let audioElement = new Audio('songs/1.MP3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('bar');
let masterSongName = document.getElementById('masterSongName');
let gif = document.getElementById('gif');
let sidegif = document.getElementById('sidegif');


let songItems = Array.from(document.getElementsByClassName('songItem'));
let songs = [
  { songName: "Whenever, Wherever.mp3", filePath: "songs/1.MP3", coverPath: "covers/1.JPG" },
  { songName: "Waka Waka.mp3", filePath: "songs/2.MP3", coverPath: "covers/2.JPG" },
  { songName: "Chantaje.mp3", filePath: "songs/3.MP3", coverPath: "covers/3.JPG" },
  { songName: "Loca.mp3", filePath: "songs/4.MP3", coverPath: "covers/4.JPG" },
  { songName: "Ojos Así.mp3", filePath: "songs/5.MP3", coverPath: "covers/5.JPG" },
  { songName: "Nunca Me Acuerdo de.mp3", filePath: "songs/6.MP3", coverPath: "covers/6.JPG" },
  { songName: "I Am Here.mp3", filePath: "songs/7.MP3", coverPath: "covers/7.JPG" },
  { songName: "Hips don't lie.mp3", filePath: "songs/8.MP3", coverPath: "covers/8.JPG" },
  { songName: "Chantaje.mp3", filePath: "songs/9.MP3", coverPath: "covers/9.JPG" },
  { songName: " La La La.mp3", filePath: "songs/10.MP3", coverPath: "covers/10.JPG" },
  { songName: "When a Woman.mp3", filePath: "songs/11.MP3", coverPath: "covers/11.JPG" },
  { songName: "Black Eyed Peas.mp3", filePath: "songs/12.MP3", coverPath: "covers/12.PNG" },
  { songName: "Rabiosa.mp3", filePath: "songs/13.MP3", coverPath: "covers/13.PNG" },
];


///




//adding song location and cover locotion 
songItems.forEach((element, i)=>{ 
    element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName; 
})

masterPlay.addEventListener('click', ()=>{
   
    if(audioElement.paused||audioElement.currenttime<=0){
        audioElement.play();   
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');           
        gif.style.opacity = 1;
        sidegif.style.opacity=1;
        
       
    }
    else{
        audioElement.pause();   
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');        
        gif.style.opacity=0;
        sidegif.style.opacity=0;
    }   
    })

audioElement.addEventListener('timeupdate', ()=>{
    console.log('timeupdate');
    //update seekbar
    progress= parseInt((audioElement.currentTime/audioElement.duration)*100);
    console.log(progress);
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value*audioElement.duration/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

const makeAlltagPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        const isPlaying = e.target.classList.contains('fa-pause-circle');
    
        makeAllPlays();
        
        if (isPlaying) {
          e.target.classList.remove('fa-pause-circle');
          e.target.classList.add('fa-play-circle'); 

          audioElement.pause();
        } else {
          songIndex = parseInt(e.target.id);
          e.target.classList.remove('fa-play-circle');
          e.target.classList.add('fa-pause-circle');
          audioElement.src = `songs/${songIndex + 1}.MP3`;
          masterSongName.innerText = songs[songIndex].songName;
          audioElement.currentTime = 0;
          audioElement.play();
        }
    
        gif.style.opacity = isPlaying ? 0 : 1;
        sidegif.style.opacity=isPlaying ? 0 : 1;
        masterPlay.classList.toggle('fa-play-circle', isPlaying);
        masterPlay.classList.toggle('fa-pause-circle', !isPlaying);
    })
  })

  document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=12){
        songIndex = 0
    }
    else{
        songIndex += 1;
    }   
      
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    gif.style.opacity = 1;
    gif.style.opacity =  1;
    const currentSongIcon = document.getElementById(songIndex.toString());
    makeAlltagPlays();
  if (currentSongIcon) {
    currentSongIcon.classList.remove('fa-play-circle');
    currentSongIcon.classList.add('fa-pause-circle');
  }

})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 12;
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    makeAlltagPlays();
    const currentSongIcon = document.getElementById(songIndex.toString());
    if (currentSongIcon) {
      currentSongIcon.classList.remove('fa-play-circle');
      currentSongIcon.classList.add('fa-pause-circle');
    }

})

///play next song automatically
audioElement.addEventListener('ended', playNextSong);

function playNextSong() {
  makeAllPlays();
  
  if (songIndex >= songs.length - 1) {
    songIndex = 0;
  } else {
    songIndex += 1;
  }
  
  const nextSongIcon = document.getElementById(songIndex.toString());
  
  nextSongIcon.classList.remove('fa-play-circle');
  nextSongIcon.classList.add('fa-pause-circle');
  
  audioElement.src = `songs/${songIndex + 1}.MP3`;
  masterSongName.innerText = songs[songIndex].songName;
  audioElement.currentTime = 0;
  audioElement.play();
  
  gif.style.opacity = 1;
  masterPlay.classList.remove('fa-play-circle');
  masterPlay.classList.add('fa-pause-circle');
}


const searchInput = document.querySelector('.search');
const container = document.querySelector('container');
const searchButton = document.querySelector('.fa-search');
const notFoundMessage = document.querySelector('.not-found-message');
const songIte = Array.from(document.querySelectorAll('.songItem'));

// Highlight the song item when it is clicked
songIte.forEach((songItem) => {
  songItem.addEventListener('click', () => {
    songItem.classList.remove('highlight');
  });
});

searchButton.addEventListener('click', () => {
  const searchTerm = searchInput.value.trim().toLowerCase();

  let isSongFound = false;

  songItems.forEach((songItem) => {
    const songName = songItem.querySelector('.songName').innerText.toLowerCase();

    if (songName.startsWith(searchTerm)) {
      songItem.classList.add('highlight');
      isSongFound = true;
    } else {
      songItem.classList.remove('highlight');
    }
  });

  if (isSongFound) {
    notFoundMessage.style.display = 'none';
  } else {
    notFoundMessage.style.display = 'block';    
    setTimeout(() => {
      notFoundMessage.style.display = 'none';
    }, 1000);
  }
});

/**************BACK GROUND IMAGE OF HOME PAGE********** */

/************************RE DIRECTING TO SONG PAGE****************************** */
// const list = document.getElementById('maincontainer');
function smallbox() {
 
  window.location.href = "index.html";
}

