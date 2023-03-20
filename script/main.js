let musicIcons = document.querySelectorAll(".icons img"),
	musicMixer = document.querySelector(".mixer img"),
    theAudioEl = document.querySelector('audio'),
    playButton = document.querySelector('#playButton'),
    pauseButton = document.querySelector('#pauseButton'),
    rewindButton = document.querySelector('#rewindButton'),
    volSlider = document.querySelector('#volume-slider'),


    // store the dragged piece in a global variable
	// because we need it in the handleDrop function
	draggedPiece;

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
  
        // set the src of the audio element to the corresponding audio file
        theAudioEl.src = `audio/${trackref}.mp3`;
        
        // play the audio
        theAudioEl.play();
    }

    

    // --- AUDIO BUTTONS --- 

        // load the new audio source
        function loadAudio() {
        let currentSrc = `audio/${this.dataset.trackref}.mp3`;
        // set the new audio source
        theAudioEl.src = currentSrc;    
        // load the new audio source
        theAudioEl.load();

        // tell the audio element to play
        playAudio();
    }

    
    // tell the audio element to play
    function playAudio() { 
        theAudioEl.play(); 
    }
    function restartAudio() { 
        theAudioEl.currentTime = 0; 
        playAudio(); 
    }

    function pauseAudio() { theAudioEl.pause(); }

    function setVolume() {
        // get the numeric value of the volume slider between 0 (min) and 100 (max)
        // that's what the volume of the audio should be set to
        console.log(this.value);

        // divide the value by 100 to get a floating point number between 0 and 1 -> .5, .85 etc
        // and then set the audio element's volume level to match
        theAudioEl.volume = (this.value/100); 
    }


    // add the drag event handling to the puzzle pieces
    musicIcons.forEach(piece => piece.addEventListener("dragstart", handleStartDrag));
    musicMixer.addEventListener("dragover", handleDragOver);
    musicMixer.addEventListener("drop", handleDrop);

    // dropping icon into mixer 
    musicIcons.forEach(cover => cover.addEventListener('drop', loadAudio));
    musicMixer.addEventListener('drop', handleDrop);


    // add event handling for the custom controls
    playButton.addEventListener('click', playAudio);
    rewindButton.addEventListener('click', restartAudio);
    pauseButton.addEventListener('click', pauseAudio);
    volSlider.addEventListener('change', setVolume);