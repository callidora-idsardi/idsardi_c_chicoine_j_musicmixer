let musicIcons = document.querySelectorAll(".icons img"),
    musicMixer = document.querySelector(".mixer img"),
    audioPlayers = [], // an array to store all the audio players
    playButton = document.querySelector('#playButton'),
    pauseButton = document.querySelector('#pauseButton'),
    rewindButton = document.querySelector('#rewindButton'),
    volSlider = document.querySelector('#volume-slider');
    introDiv = document.getElementById("intro");
    closeButton = document.getElementById("closeButton");



// --- DRAG & DROP FUNCTIONS ---    

function handleStartDrag() { 
    console.log('started dragging this piece:', this);

    // store a reference to the puzzle piece image that we're dragging
    // so we can use it later and move it to a drop zone
    draggedPiece = this;
}

function handleDragOver(e) { 
    e.preventDefault(); // e is shorthand for event
    // this overrides the default dragover behaviour
    console.log('dragged over me'); 
}

// --- DRAGGING + DROPPING AUDIO --- 
function handleDrop(e) { 
    e.preventDefault();
    console.log('dropped something on me');

    // get the data-trackref attribute of the dragged icon
    let trackref = draggedPiece.dataset.trackref;

    // create a new audio element
    let newAudioEl = document.createElement('audio');
    newAudioEl.src = `audio/${trackref}.mp3`;
    newAudioEl.volume = volSlider.value/100;

    // add the new audio element to the mixer
    musicMixer.appendChild(newAudioEl);

    // add the new audio element to the array of audio players
    audioPlayers.push(newAudioEl);

    // play all the audio elements
    audioPlayers.forEach(function(player) {
        player.play();
    });
}

// --- AUDIO BUTTONS --- 


// tell the audio element to play
function playAudio() { 
    audioPlayers.forEach(function(player) {
        player.play();
    });
}
function restartAudio() { 
    audioPlayers.forEach(function(player) {
        player.currentTime = 0;
        player.play();
    });
}

function pauseAudio() { 
    audioPlayers.forEach(function(player) {
        player.pause();
    });
}


function setVolume() {
    // get the numeric value of the volume slider between 0 (min) and 100 (max)
    // that's what the volume of the audio should be set to
    console.log(this.value);

    // divide the value by 100 to get a floating point number between 0 and 1 -> .5, .85 etc
    // and then set the audio element's volume level to match
    audioPlayers.forEach(function(player) {
        player.volume = (volSlider.value/100);
    });
}

// Exit Instructions Button 

closeButton.addEventListener("click", function() {
    introDiv.style.display = "none";
});



// add the drag event handling to the puzzle pieces
musicIcons.forEach(piece => piece.addEventListener("dragstart", handleStartDrag));
musicMixer.addEventListener("dragover", handleDragOver);
musicMixer.addEventListener("drop", handleDrop);

// add event handling for the custom controls
playButton.addEventListener('click', playAudio);
rewindButton.addEventListener('click', restartAudio);
pauseButton.addEventListener('click', pauseAudio);
volSlider.addEventListener('change', setVolume);

