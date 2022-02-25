"use strict";
let students;
let allStudents = [];
// const filterBtn = document.querySelectorAll("[data-action=filter]");

window.addEventListener("DOMContentLoaded", getJson);

// filterBtn.forEach((btn) => {
//   btn.addEventListener("click", buildList);
// });
// ________ START ________

// -------- getting all the students by fetching json
async function getJson() {
  const url = "https://petlatkea.dk/2021/hogwarts/students.json";
  let data = await fetch(url);
  students = await data.json();

  createStudents();
}

// -------- CREATE THE STUDENT OBJECT --------
function createStudents() {
  students.forEach((object) => {
    const Student = {
      firstName: "",
      lastName: "",
      middleName: "",
      nickName: "",
      image: "",
      house: "",
    };

    // create a objects from a prototype
    const studentInfo = Object.create(Student);

    // ----- First name -----
    // Trim objects for whitespace
    let originalName = object.fullname.trim();
    //Find first name in string
    if (originalName.includes(" ")) {
      studentInfo.firstName = originalName.substring(originalName.indexOf(0), originalName.indexOf(" "));
    } else {
      studentInfo.firstName = originalName.substring(originalName.indexOf(0));
    }
    studentInfo.firstName = studentInfo.firstName.substring(0, 1).toUpperCase() + studentInfo.firstName.substring(1).toLowerCase();

    //----- Middle name -----
    //Find the middle name (if any)
    studentInfo.middleName = originalName.substring(originalName.indexOf(" ") + 1, originalName.lastIndexOf(" "));
    //Change to upper- and lower case
    studentInfo.middleName = studentInfo.middleName.substring(0, 1).toUpperCase() + studentInfo.middleName.substring(1).toLowerCase();

    //----- Nick name -----
    //Find the nick name (if any)
    if (originalName.includes('"')) {
      studentInfo.middleName = undefined;
      studentInfo.nickName = originalName.substring(originalName.indexOf('"') + 1, originalName.lastIndexOf('"'));
    }

    // ----- Last name -----
    //Find last name in string
    if (originalName.includes(" ")) {
      studentInfo.lastName = originalName.substring(originalName.lastIndexOf(" ") + 1);
      //Change to upper- and lower case
      studentInfo.lastName = studentInfo.lastName.substring(0, 1).toUpperCase() + studentInfo.lastName.substring(1).toLowerCase();
    }

    // ----- House -----
    //Trim objects
    let originalHouse = object.house.trim();
    //Find the name of the house
    studentInfo.house = originalHouse;
    //Change to upper- and lower case
    studentInfo.house = studentInfo.house.substring(0, 1).toUpperCase() + studentInfo.house.substring(1).toLowerCase();

    // // ----- Image -----
    //Find the right image
    let studentPicture = new Image();
    studentPicture.scr = "images/" + studentInfo.lastName + ".png";
    studentInfo.image = studentPicture.scr;

    allStudents.push(studentInfo);
  });
  showAllStudents();
}

// -------- DISPLAYING ALL THE STUDENT OBJECTS --------
function showAllStudents() {
  console.table(allStudents);
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
