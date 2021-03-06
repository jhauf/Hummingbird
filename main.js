let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
let notes = [];
let images = ["images/orange.png", "images/med-blue.png", "images/purple.gif", "images/red.png", "images/green.svg", "images/gray.png", "images/pink.png", "images/dark-blue.svg"];
let audio = ["sounds/c.wav", "sounds/d.wav", "sounds/e.wav","sounds/f.wav","sounds/g4.wav", "sounds/a.wav", "sounds/b.wav", "sounds/c-high.wav"];
let animation;

let bird = new Image();
let mate = new Image();
let note1 = new Image();
let note2 = new Image();
let note3 = new Image();
let note4 = new Image();
let note5 = new Image();
let note6 = new Image();
let note7 = new Image();
let note8 = new Image();
note1.src = images[0];
note2.src = images[1];
note3.src = images[2];
note4.src = images[3];
note5.src = images[4];
note6.src = images[5];
note7.src = images[6];
note8.src = images[0];


function createNote(note) {
  return {image: note, x: 300, y: 300};
}

function createBird() {
  return {image: bird, x: 0, y: 280};
}

function createMate() {
  return {image: mate, x: 700, y: 0};
}

document.addEventListener("DOMContentLoaded", function(event) {
  loadBird();
  loadMate();
 });

document.addEventListener("keydown", keyDown, false);

function playNote(i) {
  let newNote = new Audio(audio[i]);
  newNote.play();
}

function keyDown(e) {
  let note;
  mate.x -= Math.random() * 10;
  mate.y += Math.random() * 5;
  switch (e.keyCode) {
    case 32:
      document.getElementById("instructions").hidden=true;
      document.getElementById("instructions-words").hidden=true;
      animation = setInterval(animate, 5);
      break;
    case 65:
      note = createNote(note1);
      notes.push(note);
      playNote(0);
      break;
    case 83:
      note = createNote(note2);
      notes.push(note);
      playNote(1);
      break;
    case 68:
      note = createNote(note3);
      notes.push(note);
      playNote(2);
      break;
    case 70:
      note = createNote(note4);
      notes.push(note);
      playNote(3);
      break;
    case 74:
      note = createNote(note5);
      notes.push(note);
      playNote(4);
      break;
    case 75:
      note = createNote(note6);
      notes.push(note);
      playNote(5);
      break;
    case 76:
      note = createNote(note7);
      notes.push(note);
      playNote(6);
      break;
    case 186:
      note = createNote(note8);
      notes.push(note);
      playNote(7);
      break;
  }
}

function loadBird() {
   bird.onload = function() {
     ctx.drawImage(bird.image, 0, 280, 220, 220);
   };
   bird.src = "images/bird.png";
   bird = createBird();
}

function loadMate() {
  mate.onload = function() {
    ctx.drawImage(mate.image, 15000, 10000, 220, 220);
  };
  mate.src = "images/mate2.png";
  mate = createMate();
}

  function animate() {
    let MinusOrPlus = Math.random() < 0.49 ? -1 : 1;
    let newArray = [];
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    let randomMovement = Math.random() * 10;
    let movement = MinusOrPlus * Math.random() * 10;
    bird.x += movement;
    bird.y -= movement;
    mate.x += movement;
    mate.y -= movement;

    if (bird.y < 200) {
      bird.y += randomMovement;
    } else if (bird.y > 300) {
      bird.y -= randomMovement;
    }
    if (bird.x < 10) {
      bird.x += randomMovement;
    } else if (bird.x > 400) {
      bird.x -= randomMovement;
    }

    if (mate.y < 0) {
      mate.y += randomMovement;
    } else if (mate.y > 200) {
      mate.y -= randomMovement;
    }

    if (mate.x > 800) {
      mate.x -= randomMovement;
    }

    ctx.drawImage(bird.image, bird.x, bird.y, 220, 220);
    ctx.closePath();
    for (var i = 0; i < notes.length; i++) {
      var plusOrMinus = Math.random() < 0.05 ? -1 : 1;
      let note = notes[i];
      if (Math.random() < 0.03) {
        if (note.y < 200) {
          note.x += plusOrMinus * Math.random() * 3 + bird.x;
        } else if (note.y < 500) {
          note.x += plusOrMinus * Math.random() * 2 + bird.x;
        } else {
          note.x += plusOrMinus * Math.random() + bird.x;
        }
      }
      note.y -= Math.random() * 3;
      ctx.beginPath();
      ctx.drawImage(note.image, note.x, note.y, 50, 50);
      if (notes.length > 10 && mate.x - bird.x < 380 && bird.y - mate.y < 200) {
        clearInterval(animation);
      }
      if (notes.length > 10) {
        ctx.drawImage(mate.image, mate.x, mate.y, 220, 220);
      }
      ctx.closePath();
      newArray.push(note);
    }
    notes = newArray;
  }
