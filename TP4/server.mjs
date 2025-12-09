"use strict";

import { createServer } from "http";
import { normalize, resolve, extname } from "path/posix";
import { accessSync, constants, readFileSync } from "fs";

const db = [];

// handle requests
function webserver(request, response) {
  console.log("[URL]", request.url);

  const requestUrl = request.url.split("?");
  const pathname = decodeURIComponent(requestUrl[0]);
  const query = parseQuery(decodeURIComponent((requestUrl[1] || "").replace("+", " ")));

  if (pathname === "/end") {
    response.setHeader("Content-Type", "text/html; charset=utf-8");
    response.end("The server will stop now.");
    process.exit(0);

  } else if (pathname.startsWith("/www")) {
    serverFile(response, pathname.substring(4));

  } else if (pathname == "/hi") {
    response.setHeader("Content-Type", "text/html; charset=utf-8");
    response.end(`hi ${query.name || ""}`);

  } else if (pathname == "/exercise1c.html") {
    serverFile(response, "exercise1c.html");

  } else if (pathname === "/salut") {
    const user = decodeURIComponent(query.user).replace(/[<>]/g, "_");
    const db = pushDB(user);

    response.setHeader("Content-Type", "text/html; charset=utf-8");
    response.end(`salut ${user}, the following users have already visited this page: ${db.join(", ")}`.trim());

  } else if (pathname === "/clear") {
    clearDB();
    response.end();

  } else {
    response.setHeader("Content-Type", "text/html; charset=utf-8");
    response.end("<!doctype html><html><body>Server works.</body></html>");
  }
}

function serverFile(response, path) {
  path = "." + normalize(resolve("/", path));
  console.log("[Server file]", path);

  try {
    accessSync(path, constants.F_OK | constants.R_OK);
    console.info("mime:", getMimeType(path));

    const data = readFileSync(path, "utf8");

    response.setHeader("Content-Type", `${getMimeType(path)}; charset=utf-8`);
    response.end(data);
  } catch (err) {
    response.statusCode = 404;
    response.end(`Unable to read file: ${path}`);
  }
}

function parseQuery(query = "") {
  const out = {};

  query.split("&").forEach((keyValue) => {
    keyValue = keyValue.split("=");
    out[keyValue[0]] = keyValue[1];
  });

  return out;
}

function pushDB(name) {
  const prev = db.slice();
  db.push(name);

  return prev;
}

function clearDB() {
  db.length = 0;
}

function getMimeType(filename) {
  const mimeTypes = {
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    png: "image/png",
    gif: "image/gif",
    webp: "image/webp",

    pdf: "application/pdf",
    json: "application/json",
    txt: "text/plain",
    html: "text/html",
    css: "text/css",
    js: "application/javascript",
    mjs: "application/javascript",

    mp3: "audio/mpeg",
    mp4: "video/mp4",

    zip: "application/zip",
  };

  let ext = extname(filename).toLowerCase().replace(/^\./, "");
  return mimeTypes[ext] || "application/octet-stream";
}

const port = parseInt(process.argv[2]) || 8000;

const server = createServer(webserver);
server.listen(port, () => {});
