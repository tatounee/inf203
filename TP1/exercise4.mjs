"use strict";

import {Student, FrStd} from "./exercise3.mjs";
import fs from "fs";

export class Prom {
    constructor() {
        this.students = [];
    }

    add(student) {
        this.students.push(student);
    }

    size() {
        return this.students.length;
    }

    get(i) {
        return this.students[i];
    }

    print() {
        let out = "";
        for (let s of this.students) {
            let line = s.toString();
            console.log(line);
            out += line + "\n";
        }
        return out.trimEnd();
    }

    write() {
        return JSON.stringify(this.students);
    }

    read(str) {
        this.students = [];
        const arr = JSON.parse(str);
        for (let o of arr) {
            if (o.nationality !== undefined) {
                this.students.push(new FrStd(o.lastName, o.firstName, o.id, o.nationality));
            } else {
                this.students.push(new Student(o.lastName, o.firstName, o.id));
            }
        }
    }

    saveTo(fileName) {
        fs.writeFileSync(fileName, this.write(), "utf8");
    }

    readFile(fileName) {
        const data = fs.readFileSync(fileName, "utf8");
        this.read(data);
    }
}
