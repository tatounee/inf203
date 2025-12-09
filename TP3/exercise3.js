"use strict";

let slideShow = {};

function load() {
  fetch("slides.json")
    .then((response) => response.text())
    .then((text) => (slideShow = JSON.parse(text)));
}

function play() {
  const container = document.getElementById("container");

  for (const slide of slideShow.slides) {
    setTimeout(() => {
      container.innerHTML = "";

      const iframe = document.createElement("iframe");
      iframe.src = slide.url;

      container.appendChild(iframe);
    }, slide.time * 1000);
  }
}

load();
