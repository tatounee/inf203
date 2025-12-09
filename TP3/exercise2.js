"use strict";

function loadChat() {
  fetch("chatlog.txt")
    .then((response) => response.text())
    .then((text) => {
      const div = document.getElementById("tarea");
      div.innerHTML = "";

      const lines = text.trim().split("\n").reverse().slice(0, 11);

      for (let line of lines) {
        const p = document.createElement("p");
        p.textContent = line;

        div.appendChild(p);
      }
    })
    .catch((err) => console.error(err));
}

function send() {
  const message = document.getElementById("textedit").value;

  fetch("chat.php?phrase=" + message)
    .catch((err) => console.error(err));
}

setInterval(loadChat, 1000);
