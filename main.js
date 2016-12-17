let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
let notes = [];
let images = ["images/orange.png", "images/blue.png", "images/purple.gif"];


let note1 = new Image();
let note2 = new Image();
let note3 = new Image();
note1.src = images[0];
note2.src = images[1];
note3.src = images[2];

let bird = new Image();


function createNote(note) {
  return {image: note, x: 300, y: 300};
}


document.addEventListener("DOMContentLoaded", function(event) {
  loadBird();
  setInterval(animate, 5);
 });

document.addEventListener("keydown", keyDown, false);

function keyDown(e) {
      if (e.keyCode === 65) {
        let note = createNote(note1);
        notes.push(note);
      } else if (e.keyCode === 83) {
        let note = createNote(note2);
        notes.push(note);
      } else if (e.keyCode === 68) {
        let note = createNote(note3);
        notes.push(note);
      }
  }

function loadBird() {
   bird.onload = function() {
     ctx.drawImage(bird, 0, 350, 250, 250);
   };
   bird.src = "images/bird.png";
 }

  function animate() {
    let newArray = [];
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.drawImage(bird, 0, 350, 250, 250);
    ctx.closePath();
    for (var i = 0; i < notes.length; i++) {
      var plusOrMinus = Math.random() < 0.1 ? -1 : 1;
      let note = notes[i];
      if (Math.random() < 0.03) {
        if (Math.random() > 0.00000001) {
          note.x += plusOrMinus * Math.random() * 50;
        } else if (note.y < 200) {
          note.x += plusOrMinus * Math.random() * 40;
        } else if (note.y < 500) {
          note.x += plusOrMinus * Math.random() * 5;
        } else {
          note.x += plusOrMinus * Math.random();
        }
      }
      note.y -= Math.random() * 3;
      ctx.beginPath();
      ctx.drawImage(note.image, note.x, note.y, 50, 50);
      ctx.closePath();
      newArray.push(note);
    }
    notes = newArray;
  }
