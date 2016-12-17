let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
let notes = [];
let images = ["images/orange.png", "images/blue.png", "images/purple.gif", "images/red.png", "images/green.svg"];
let audio = ["sounds/c.wav", "sounds/d.wav", "sounds/e.wav","sounds/f.wav","sounds/g.wav", "sounds/a.wav", "sounds/b.wav", "sounds/c-high.wav"];

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


let bird = new Image();
let mate = new Image();

function createNote(note) {
  return {image: note, x: 300, y: 300};
}

function createBird() {
  return {image: bird, x: 0, y: 350};
}

function createMate() {
  return {image: mate, x: 600, y: 0};
}


document.addEventListener("DOMContentLoaded", function(event) {
  loadBird();
  loadMate();
  setInterval(animate, 5);
 });

document.addEventListener("keydown", keyDown, false);

function playNote(i) {
  let newNote = new Audio(audio[i]);
  newNote.play();
}

function keyDown(e) {
  document.getElementById("instructions").hidden=true;
      if (e.keyCode === 65) {
        let note = createNote(note1);
        notes.push(note);
        playNote(0);
      } else if (e.keyCode === 83) {
        let note = createNote(note2);
        notes.push(note);
        playNote(1);
      } else if (e.keyCode === 68) {
        let note = createNote(note3);
        notes.push(note);
        playNote(2);
      } else if (e.keyCode === 70) {
        let note = createNote(note4);
        notes.push(note);
        playNote(3);
      } else if (e.keyCode === 74) {
        let note = createNote(note5);
        notes.push(note);
        playNote(4);
      } else if (e.keyCode === 75) {
        let note = createNote(note6);
        notes.push(note);
        playNote(5);
      } else if (e.keyCode === 76) {
        let note = createNote(note7);
        notes.push(note);
        playNote(6);
      } else if (e.keyCode === 186) {
        let note = createNote(note8);
        notes.push(note);
        playNote(7);
      }
  }

function loadBird() {
   bird.onload = function() {
     ctx.drawImage(bird.image, 0, 350, 250, 250);
   };
   bird.src = "images/bird.png";
   bird = createBird();
 }

 function loadMate() {
    mate.onload = function() {
      ctx.drawImage(mate.image, 0, 350, 250, 250);
    };
    mate.src = "images/mate2.png";
    mate = createMate();
  }

  function animate() {
    let MinusOrPlus = Math.random() < 0.5 ? -1 : 1;
    let newArray = [];
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    bird.x += MinusOrPlus * Math.random() * 10;
    bird.y -= MinusOrPlus * Math.random() * 10;
    mate.x += MinusOrPlus * Math.random() * 10;
    mate.y -= MinusOrPlus * Math.random() * 10;
    ctx.drawImage(bird.image, bird.x, bird.y, 250, 250);
    ctx.closePath();
    for (var i = 0; i < notes.length; i++) {
      var plusOrMinus = Math.random() < 0.05 ? -1 : 1;
      let note = notes[i];
      if (Math.random() < 0.03) {
        if (note.y < 200) {
          note.x += plusOrMinus * Math.random() * 5 + bird.x;
        } else if (note.y < 500) {
          note.x += plusOrMinus * Math.random() * 2 + bird.x;
        } else {
          note.x += plusOrMinus * Math.random() + bird.x;
        }
      }
      note.y -= Math.random() * 3;
      ctx.beginPath();
      ctx.drawImage(note.image, note.x, note.y, 50, 50);
      if (notes.length > 20) {
        ctx.drawImage(mate.image, mate.x, mate.y, 250, 250);
      }
      ctx.closePath();
      newArray.push(note);
    }
    notes = newArray;
  }
