"use strict";

export function wordc(str) {
  const words = str.split(" ");
  const counts = {};

  for (let w of words) {
    if (w === "") continue;
    if (counts[w] === undefined) counts[w] = 1;
    else counts[w]++;
  }

  return counts;
}

export class WrdLst {
  constructor(str) {
    this.text = str;
    this.counts = wordc(str);
    this.wordList = Object.keys(this.counts).sort();
  }

  getWords() {
    return this.wordList;
  }

  maxCountWord() {
    let maxWord = this.wordList[0];
    let maxCount = this.counts[maxWord];

    for (let w of this.wordList) {
      const c = this.counts[w];
      if (c > maxCount) {
        maxCount = c;
        maxWord = w;
      }
    }
    return maxWord;
  }

  minCountWord() {
    let minWord = this.wordList[0];
    let minCount = this.counts[minWord];

    for (let w of this.wordList) {
      const c = this.counts[w];
      if (c < minCount) {
        minCount = c;
        minWord = w;
      }
    }
    return minWord;
  }

  getCount(word) {
    return this.counts[word] ?? 0;
  }

  applyWordFunc(f) {
    const results = [];
    for (let w of this.wordList) {
      results.push(f(w));
    }
    return results;
  }
}
