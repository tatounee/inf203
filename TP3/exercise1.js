"use strict";

function loadDoc(docUrl) {
  fetch(docUrl)
    .then((response) => response.text())
    .then((text) => {
      const area = document.getElementById("tarea");
      area.value = text;
    })
    .catch((err) => console.error(err));
}

function loadDoc2(docUrl) {
  fetch(docUrl)
    .then((response) => response.text())
    .then((text) => {
      const div = document.getElementById("tarea2");
      div.innerHTML = "";

      const lines = text.trim().split("\n");

      for (const line of lines) {
        const p = document.createElement("p");
        p.textContent = line;

        p.style.color = getRandomColor();

        div.appendChild(p);
      }
    })
    .catch((err) => console.error(err));
}

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
