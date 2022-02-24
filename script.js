"use strict";
let allStudents = [];

window.addEventListener("DOMContentLoaded", start);

// ________ START ________
function start() {
  const filterBtn = document.querySelectorAll("[data-action=filter]");

  filterBtn.forEach((btn) => {
    btn.addEventListener("click", buildList);
  });

  getStudentsJSON();
}

// -------- getting all the students by fetching json
async function getStudentsJSON() {
  const studentsUrl = "https://petlatkea.dk/2021/hogwarts/students.json";
  let studentsData = await fetch(studentsUrl);
  let studentsJSON;
  studentsJSON = await studentsData.json();

  createStudentsFromJSON();
}

// -------- getting all the bloodtypes by fetching json
async function getBloodJSON() {
  const bloodUrl = "https://petlatkea.dk/2021/hogwarts/families.json";
  let bloodData = await fetch(bloodUrl);
  let bloodStudents;
  bloodStudents = await bloodData.json();

  // createStudentsFromJSON();
}

// -------- CREATE THE STUDENT OBJECT --------
function createStudentsFromJSON() {
  allStudents.forEach((object) => {
    const Student = {
      firstName: "",
      lastName: "",
      house: "",
    };

    // create a objects from a prototype
    const studentObject = Object.create(Student);
  });
}

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
