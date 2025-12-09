"use strict";

let slides = [];
let currentIdx = -1;
let pause = false;

function load() {
  fetch("slides.json")
    .then((response) => response.text())
    .then((text) => {
      slides = JSON.parse(text).slides.sort((s1, s2) => s1.time - s2.time);
      for (let i = slides.length - 1; i > 0; i--) {
        slides[i].time = (slides[i].time - slides[i - 1].time) * 1000;
      }
    });
}

function displayCurrentSlide() {
  const container = document.getElementById("container");
  container.innerHTML = "";

  const iframe = document.createElement("iframe");
  iframe.src = slides[currentIdx].url;

  container.appendChild(iframe);
}

function play() {
  if (currentIdx + 1 == slides.length) {
    return;
  }

  next();
  setTimeout(
    () => {
      if (!pause) {
        play();
      }
    },
    slides[currentIdx + 1].time,
  );
}

function next() {
  currentIdx = Math.min(currentIdx + 1, slides.length - 1);
  displayCurrentSlide();
}

function prev() {
  currentIdx = Math.max(currentIdx - 1, 0);
  displayCurrentSlide();
}

function togglePause() {
  const button = document.getElementById("pauseButton");
  pause = !pause;

  if (pause) {
    button.textContent = "Continue";
  } else {
    button.textContent = "Pause";
    play();
  }
}

load();
