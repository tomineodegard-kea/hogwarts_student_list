"use strict";
let students;
let studentArray = [];
let filteredStudents;

const settings = {
  filterBy: "all",
};

window.addEventListener("DOMContentLoaded", start);

// ________ START FUNCTIONS WITH ALL EVENT LISTENERS ________
function start() {
  console.log("The script is being read");
  registerButtons();
  getJson();
}
// -------- GET JSON --------
async function getJson() {
  console.log("getJson");
  const url = "https://petlatkea.dk/2021/hogwarts/students.json";
  let data = await fetch(url);
  studentArray = await data.json();

  createStudents(studentArray);
}

// -------- REGISTRER BUTTONS --------
function registerButtons() {
  document.querySelectorAll("[data-action='filter']").forEach((button) => button.addEventListener("click", selectFilter));
}

function createStudents(data) {
  studentArray = data.map(prepareObject);
  displayList(studentArray);
}

// -------- CREATE THE STUDENT OBJECTS WITH CLEANED/PREPARED DATA --------
function prepareObject(object) {
  // Define a template for the data objects
  const Student = {
    firstName: "",
    lastName: "",
    middleName: "",
    nickName: "",
    image: "",
    house: "",
    gender: "",
    bloodStatus: "",
    inquisitorial: false,
    expelled: false,
  };

  const student = Object.create(Student);

  // trim all the objects
  let originalName = object.fullname.trim();
  let originalHouse = object.house.trim();
  let originalGender = object.gender.trim();

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

  // ----- GENDER -----
  student.gender = originalGender;
  student.gender = student.gender.substring(0, 1).toUpperCase() + student.gender.substring(1).toLowerCase();

  // ----- IMAGE -----
  let studentPicture = new Image();
  studentPicture.scr = "images/" + student.lastName + ".png";
  student.image = studentPicture.scr;

  // console.table(student);
  return student;
}

// -------- DISPLAYING THE STUDENT LIST --------
function displayList(list) {
  document.querySelector("#student_list tbody").innerHTML = "";
  list.forEach((student) => displayStudent(student));
}

// -------- DEFINE THE STUDENTS --------
function displayStudent(student) {
  const clone = document.querySelector("template#student").content.cloneNode(true);

  clone.querySelector("[data-field=firstname]").textContent = student.firstName;
  clone.querySelector("[data-field=lastname]").textContent = student.lastName;
  clone.querySelector("[data-field=house]").textContent = student.house;

  // -------- TO DO: prefects
  document.querySelector("#student_list tbody").appendChild(clone);
}

// -------- BUILDING NEW LIST ACCORDING TO THE CHOSEN FILTER --------
function buildList() {
  const currentList = filterList(studentArray);
  displayList(currentList);
}

// Filtering function which takes a filtering function as an argument
function prepareData(filter) {
  filteredStudents = studentArray.filter(filter);
  return filteredStudents;
}

//------------------- ALL FILTER OPTIONS -------------------
function filterList(filteredList) {
  if (settings.filterBy === "gryffindor") {
    filteredList = studentArray.filter(filterGryffindor);
  } else if (settings.filterBy === "slytherin") {
    filteredList = studentArray.filter(filterSlytherin);
  } else if (settings.filterBy === "hufflepuff") {
    filteredList = studentArray.filter(filterHufflepuff);
  } else if (settings.filterBy === "ravenclaw") {
    filteredList = studentArray.filter(filterRavenclaw);
  } else if (settings.filterBy === "boys") {
    filteredList = studentArray.filter(filterBoys);
  } else if (settings.filterBy === "girls") {
    filteredList = studentArray.filter(filterGirls);
  }
  return filteredList;
}

function selectFilter(event) {
  const filter = event.target.dataset.filter;
  setFilter(filter);
}
function setFilter(filter) {
  settings.filterBy = filter;
  buildList();
  console.log(`Filter: ${filter}`);
}

// -------- ALL FILTERING FUNCTIONS --------
function filterGryffindor(student) {
  return student.house === "Gryffindor";
}
function filterSlytherin(student) {
  return student.house === "Slytherin";
}
function filterHufflepuff(student) {
  return student.house === "Hufflepuff";
}
function filterRavenclaw(student) {
  return student.house === "Ravenclaw";
}
function filterBoys(student) {
  return student.gender === "Boy";
}
function filterGirls(student) {
  return student.gender === "Girl";
}

function filterExpelled() {}
function filterNonExpelled() {}
function filterSquad() {}
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
