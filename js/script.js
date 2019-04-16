console.log("Hello");

// Audio player //
var music = document.getElementById('music'); // id for audio element
var duration = music.duration; // Duration of audio clip, calculated here for embedding purposes
var pButton = document.getElementById('pButton'); // play button
var playhead = document.getElementById('playhead'); // playhead
var timeline = document.getElementById('timeline'); // timeline

// timeline width adjusted for playhead
var timelineWidth = timeline.offsetWidth - playhead.offsetWidth;

// play button event listenter
pButton.addEventListener("click", play);

// timeupdate event listener
music.addEventListener("timeupdate", timeUpdate, false);

// makes timeline clickable
timeline.addEventListener("click", function(event) {
    moveplayhead(event);
    music.currentTime = duration * clickPercent(event);
}, false);

// returns click as decimal (.77) of the total timelineWidth
function clickPercent(event) {
    return (event.clientX - getPosition(timeline)) / timelineWidth;
}

// makes playhead draggable
playhead.addEventListener('mousedown', mouseDown, false);
window.addEventListener('mouseup', mouseUp, false);

// Boolean value so that audio position is updated only when the playhead is released
var onplayhead = false;

// mouseDown EventListener
function mouseDown() {
    onplayhead = true;
    window.addEventListener('mousemove', moveplayhead, true);
    music.removeEventListener('timeupdate', timeUpdate, false);
}

// mouseUp EventListener
// getting input from all mouse clicks
function mouseUp(event) {
    if (onplayhead == true) {
        moveplayhead(event);
        window.removeEventListener('mousemove', moveplayhead, true);
        // change current time
        music.currentTime = duration * clickPercent(event);
        music.addEventListener('timeupdate', timeUpdate, false);
    }
    onplayhead = false;
}
// mousemove EventListener
// Moves playhead as user drags
function moveplayhead(event) {
    var newMargLeft = event.clientX - getPosition(timeline);

    if (newMargLeft >= 0 && newMargLeft <= timelineWidth) {
        playhead.style.marginLeft = newMargLeft + "px";
    }
    if (newMargLeft < 0) {
        playhead.style.marginLeft = "0px";
    }
    if (newMargLeft > timelineWidth) {
        playhead.style.marginLeft = timelineWidth + "px";
    }
}

// timeUpdate
// Synchronizes playhead position with current point in audio
function timeUpdate() {
    var playPercent = timelineWidth * (music.currentTime / duration);
    playhead.style.marginLeft = playPercent + "px";
    if (music.currentTime == duration) {
        pButton.className = "";
        pButton.className = "play";
    }
}

//Play and Pause
function play() {
    // start music
    if (music.paused) {
        music.play();
        // remove play, add pause
        pButton.className = "";
        pButton.className = "pause";
    } else { // pause music
        music.pause();
        // remove pause, add play
        pButton.className = "";
        pButton.className = "play";
    }
}

// Gets audio file duration
music.addEventListener("canplaythrough", function() {
    duration = music.duration;
}, false);

// getPosition

// Returns elements left position relative to top-left of viewport
function getPosition(el) {
    return el.getBoundingClientRect().left;
}




// Animate Pictures //––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
$(document).ready(function() {
  // Check if element is scrolled into view
  function isScrolledIntoView(elem) {
  var docViewTop = $(window).scrollTop();
  var docViewBottom = docViewTop + $(window).height();

  var elemTop = $(elem).offset().top;
  var elemBottom = elemTop + $(elem).height();

    return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
}
  // If element is scrolled into view, fade it in
  $(window).scroll(function() {
  $('.scroll-animations .animated').each(function() {
    if (isScrolledIntoView(this) === true) {
        $(this).addClass('fadeIn');
      }
    });
  });
});



// Animate blockQuote //––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––

const resolver = {
  resolve: function resolve(options, callback) {
    // The string to resolve
    const resolveString = options.resolveString || options.element.getAttribute('data-target-resolver');
    const combinedOptions = Object.assign({}, options, {resolveString: resolveString});

    function getRandomInteger(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    function randomCharacter(characters) {
      return characters[getRandomInteger(0, characters.length - 1)];
    };

    function doRandomiserEffect(options, callback) {
      const characters = options.characters;
      const timeout = options.timeout;
      const element = options.element;
      const partialString = options.partialString;

      let iterations = options.iterations;

      setTimeout(() => {
        if (iterations >= 0) {
          const nextOptions = Object.assign({}, options, {iterations: iterations - 1});

          // Ensures partialString without the random character as the final state.
          if (iterations === 0) {
            element.textContent = partialString;
          } else {
            // Replaces the last character of partialString with a random character
            element.textContent = partialString.substring(0, partialString.length - 1) + randomCharacter(characters);
          }

          doRandomiserEffect(nextOptions, callback)
        } else if (typeof callback === "function") {
          callback();
        }
      }, options.timeout);
    };

    function doResolverEffect(options, callback) {
      const resolveString = options.resolveString;
      const characters = options.characters;
      const offset = options.offset;
      const partialString = resolveString.substring(0, offset);
      const combinedOptions = Object.assign({}, options, {partialString: partialString});

      doRandomiserEffect(combinedOptions, () => {
        const nextOptions = Object.assign({}, options, {offset: offset + 1});

        if (offset <= resolveString.length) {
          doResolverEffect(nextOptions, callback);
        } else if (typeof callback === "function") {
          callback();
        }
      });
    };

    doResolverEffect(combinedOptions, callback);
  }
}

//Insert Quote
const strings = [
  'I was running on 0-2 hours of sleep each night',
  'having auditory hallucinations where I hear people call my name when I was home alone',
  'and hear screams that sounded like they were right next to me',
  ' and I was even having false memories that oftentimes made no sense at all.”',
];

let counter = 0;

const options = {
  // Initial position
  offset: 0,
  // Timeout between each random character
  timeout: 25,
  // Number of random characters to show
  iterations: 2,
  // Random characters to pick from
  characters: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'x', 'y', 'x', 'z'],
  // String to resolve
  resolveString: strings[counter],
  // The element
  element: document.querySelector('[data-target-resolver]')
}

// Callback function when resolve completes
function callback() {
  setTimeout(() => {
    counter ++;

    if (counter >= strings.length) {
      counter = 0;
    }

    let nextOptions = Object.assign({}, options, {resolveString: strings[counter]});
    resolver.resolve(nextOptions, callback);
  }, 1500);
}

resolver.resolve(options, callback);


// SCROLLMAGIC Car Bottom ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––

// STEP 1: initiate the controller first
$(function() {
  // Init ScrollMagic Controller
  var controller = new ScrollMagic.Controller();

  /* STEP 2: Create animation if desired*/
  var fadeInBg = new TimelineMax()
          .from(".trigger", 1, {
                  autoAlpha:0
          });

  //STEP 3: build the SCENE
            new ScrollMagic.Scene({
                    triggerElement: ".trigger",
                    triggerHook: 0.5,
                    duration: "30%"
                })
                .setTween(fadeInBg)
                //.addIndicators()
                .addTo(controller);

            new ScrollMagic.Scene({
                    triggerElement: ".trigger",
                    triggerHook: "onLeave",
                    duration: "190%"
                    })
                .setPin(".pinned-cont", {pushFollowers: false})
                //.addIndicators()
                .addTo(controller);

});

// SCROLLMAGIC Flag Picture ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––

// STEP 1: initiate the controller first
$(function() {
  // Init ScrollMagic Controller
  var controller = new ScrollMagic.Controller();

  /* STEP 2: Create animation if desired*/
  var fadeInBg = new TimelineMax()
          .from(".trigger2", 1, {
                  autoAlpha:0
          });

  //STEP 3: build the SCENE
            new ScrollMagic.Scene({
                    triggerElement: ".trigger2",
                    triggerHook: 0.5,
                    duration: "50%"
                })
                .setTween(fadeInBg)
                //.addIndicators()
                .addTo(controller);

            new ScrollMagic.Scene({
                    triggerElement: ".trigger2",
                    triggerHook: "onLeave",
                    duration: "170%"
                    })
                .setPin(".pinned-cont2", {pushFollowers: false})
                //.addIndicators()
                .addTo(controller);

});

// SCROLLMAGIC landscape ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––

// STEP 1: initiate the controller first
$(function() {
  // Init ScrollMagic Controller
  var controller = new ScrollMagic.Controller();

  /* STEP 2: Create animation if desired*/
  var fadeInBg = new TimelineMax()
          .from(".trigger3", 1, {
                  autoAlpha:0
          });

  //STEP 3: build the SCENE
            new ScrollMagic.Scene({
                    triggerElement: ".trigger3",
                    triggerHook: 0.5,
                    duration: "50%"
                })
                .setTween(fadeInBg)
                //.addIndicators()
                .addTo(controller);

            new ScrollMagic.Scene({
                    triggerElement: ".trigger3",
                    triggerHook: "onLeave",
                    duration: "170%"
                    })
                .setPin(".pinned-cont3", {pushFollowers: false})
                //.addIndicators()
                .addTo(controller);

});
