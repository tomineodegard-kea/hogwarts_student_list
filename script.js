"use strict";
let students;
let studentArray = [];

const Student = {
  firstName: "",
  lastName: "",
  middleName: "",
  nickName: "",
  image: "",
  house: "",
};

window.addEventListener("DOMContentLoaded", start);

// ________ GET JSON ________
function start() {
  getJson();
}

async function getJson() {
  console.log("getJson");
  const url = "https://petlatkea.dk/2021/hogwarts/students.json";
  let data = await fetch(url);
  students = await data.json();

  createStudents();
}
// -------- CREATE THE STUDENT OBJECTS --------
function createStudents() {
  students.forEach((object) => {
    const student = Object.create(Student);

    let originalName = object.fullname.trim();
    let originalHouse = object.house.trim();
    let studentPicture = new Image();

    // ----- FIRST NAME -----
    if (originalName.includes(" ")) {
      student.firstName = originalName.substring(originalName.indexOf(0), originalName.indexOf(" "));
    } else {
      student.firstName = originalName.substring(originalName.indexOf(0));
    }
    student.firstName = student.firstName.substring(0, 1).toUpperCase() + student.firstName.substring(1).toLowerCase();

    //----- MIDDLE NAME -----
    student.middleName = originalName.substring(originalName.indexOf(" ") + 1, originalName.lastIndexOf(" "));
    student.middleName = student.middleName.substring(0, 1).toUpperCase() + student.middleName.substring(1).toLowerCase();

    //----- NICK NAME -----
    if (originalName.includes('"')) {
      student.middleName = undefined;
      student.nickName = originalName.substring(originalName.indexOf('"') + 1, originalName.lastIndexOf('"'));
    }

    // ----- LAST NAME -----
    if (originalName.includes(" ")) {
      student.lastName = originalName.substring(originalName.lastIndexOf(" ") + 1);
      student.lastName = student.lastName.substring(0, 1).toUpperCase() + student.lastName.substring(1).toLowerCase();
    }

    // ----- HOUSE -----
    student.house = originalHouse;
    student.house = student.house.substring(0, 1).toUpperCase() + student.house.substring(1).toLowerCase();

    // // ----- IMAGE -----
    studentPicture.scr = "images/" + student.lastName + ".png";
    student.image = studentPicture.scr;

    studentArray.push(student);
  });

  displayList(studentArray);
}

// -------- DISPLAYING THE STUDENT OBJECTS --------
function displayList(studentArray) {
  console.table(studentArray);
  // clear the current list
  document.querySelector("#student_list tbody").innerHTML = "";

  // build a new list
  studentArray.forEach(displayAllStudents);
}

function displayAllStudents(student) {
  const clone = document.querySelector("template#student").content.cloneNode(true);

  clone.querySelector("[data-field=firstname]").textContent = student.firstName;
  clone.querySelector("[data-field=lastname]").textContent = student.lastName;
  clone.querySelector("[data-field=house]").textContent = student.house;

  document.querySelector("#student_list tbody").appendChild(clone);
}

// -------- BUILDING THE LIST ACCORDING TO THE CHOSEN FILTER --------
function buildList() {
  console.log("building list");
}

// -------- ALL FILTERING FUNCTIONS --------
function filterGriffindor() {}
function filterSlytherin() {}
function filterHufflepuff() {}
function filterRavenclaw() {}

function filterExpelled() {}
function filterNonExpelled() {}
function filterSquad() {}
function filterBoys() {}
function filterGirls() {}
function filterPureblood() {}
function filterHalfblood() {}
function filterMuggle() {}

function removeFilter() {}

// -------- ALL SORTING FUNCTIONS --------
function sortFistName() {}
function sortLastName() {}
function sortHouse() {}
function sortPrefect() {}

// -------- SEARCHFUNCTION --------
function search() {}

// -------- ALL TOGGLE FUNCTIONS --------
function makePrefect() {}
function undoPrefect() {}
function makeSquadMember() {}

// -------- !! NON-REVERSIBLE FUNCTIONS !! --------
function expelStudent() {}
function hackTheSystem() {}

// ________ SINGLE VIEW ________
function showStudentDetails() {}
