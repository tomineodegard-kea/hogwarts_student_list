"use strict";
let students;
let studentArray = [];
let filteredStudents;

// ----- the setting is making sure the filter and sort functions have a default
const settings = {
  filterBy: "all",
  sortBy: "firstName",
  sortDir: "asc",
};

window.addEventListener("DOMContentLoaded", start);

// ________________ START FUNCTION ________________
function start() {
  console.log("The script is being read");
  registerButtons();
  getJson();
}

// ________________ GET JSON ________________
async function getJson() {
  console.log("getJson");
  const url = "https://petlatkea.dk/2021/hogwarts/students.json";
  let data = await fetch(url);
  studentArray = await data.json();

  createStudents(studentArray);
}

// ________________ REGISTRER BUTTONS ________________
function registerButtons() {
  document.querySelectorAll("[data-action='filter']").forEach((button) => button.addEventListener("click", selectFilter));
  document.querySelectorAll("[data-action='sort']").forEach((button) => button.addEventListener("click", selectSort));
}

function createStudents(data) {
  studentArray = data.map(prepareObject);
  buildList();
}

// ________________ CREATE THE STUDENT OBJECT, WITH CLEANED/PREPARED DATA ________________
function prepareObject(object) {
  const Student = {
    prefect: false,
    firstName: "",
    lastName: "",
    middleName: "",
    nickName: "",
    image: "",
    house: "",
    gender: "",
    star: false,
    bloodStatus: "",
    inquisitorial: false,
    expelled: false,
  };

  const student = Object.create(Student);

  // ----- trim all the objects
  let originalName = object.fullname.trim();
  let originalHouse = object.house.trim();
  let originalGender = object.gender.trim();

  // ----- cleaning first name
  if (originalName.includes(" ")) {
    student.firstName = originalName.substring(originalName.indexOf(0), originalName.indexOf(" "));
  } else {
    student.firstName = originalName.substring(originalName.indexOf(0));
  }
  student.firstName = student.firstName.substring(0, 1).toUpperCase() + student.firstName.substring(1).toLowerCase();

  // ----- cleaning middle name
  student.middleName = originalName.substring(originalName.indexOf(" ") + 1, originalName.lastIndexOf(" "));
  student.middleName = student.middleName.substring(0, 1).toUpperCase() + student.middleName.substring(1).toLowerCase();

  //----- cleaning nickname
  if (originalName.includes('"')) {
    student.middleName = undefined;
    student.nickName = originalName.substring(originalName.indexOf('"') + 1, originalName.lastIndexOf('"'));
  }

  // ----- cleaning last name
  if (originalName.includes(" ")) {
    student.lastName = originalName.substring(originalName.lastIndexOf(" ") + 1);
    student.lastName = student.lastName.substring(0, 1).toUpperCase() + student.lastName.substring(1).toLowerCase();
  }

  // ----- cleaning house
  student.house = originalHouse;
  student.house = student.house.substring(0, 1).toUpperCase() + student.house.substring(1).toLowerCase();

  // ----- cleaning gender
  student.gender = originalGender;
  student.gender = student.gender.substring(0, 1).toUpperCase() + student.gender.substring(1).toLowerCase();

  // ----- cleaning images
  let studentPicture = new Image();
  studentPicture.scr = "images/" + student.lastName + ".png";
  student.image = studentPicture.scr;

  // console.table(student);
  return student;
}

// ________________ DISPLAYING THE STUDENT LIST ________________
function displayList(list) {
  document.querySelector("#student_list tbody").innerHTML = "";
  list.forEach((student) => displayStudent(student));
}

// ________________ DEFINE AND APPEND THE STUDENT-OBJECTS ________________

function displayStudent(student) {
  const clone = document.querySelector("template#student").content.cloneNode(true);

  clone.querySelector("[data-field=firstName]").textContent = student.firstName;
  clone.querySelector("[data-field=lastName]").textContent = student.lastName;
  clone.querySelector("[data-field=house]").textContent = student.house;

  // ----- stars
  if (student.star === true) {
    clone.querySelector("[data-field=star]").textContent = "🎖";
  } else {
    clone.querySelector("[data-field=star]").textContent = "☆";
  }

  clone.querySelector("[data-field=star]").addEventListener("click", clickStar);
  function clickStar() {
    console.log(student);
    if (student.star === true) {
      student.star = false;
    } else {
      student.star = true;
    }
    buildList();
  }

  // ----- prefects
  clone.querySelector("[data-field=prefect]").dataset.prefect = student.prefect;
  clone.querySelector("[data-field=prefect]").addEventListener("click", clickPrefect);
  function clickPrefect() {
    if (student.prefect === true) {
      student.prefect = false;
    } else {
      student.prefect = true;
    }
    buildList();
  }

  document.querySelector("#student_list tbody").appendChild(clone);
}
// ________________ BUILDING A NEW LIST  ________________
//  ----- this function takes care of both filtering and sorting
function buildList() {
  const currentList = filterList(studentArray);
  const sortedList = sortList(currentList);
  displayList(sortedList);
}

// ________________ FILTERING ________________
// ----- Filtering function which takes a filtering function as an argument
function prepareData(filter) {
  filteredStudents = studentArray.filter(filter);
  return filteredStudents;
}

// ----- list of filter options
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

// ----- the user picks a filter, and this is stored in the filter-variable, then sending this as a parameter to call setFilter function
function selectFilter(userEvent) {
  const filter = userEvent.target.dataset.filter;
  setFilter(filter);
}

// ----- refering to the settings variable, and using the filter argument from selectFilter
function setFilter(filter) {
  settings.filterBy = filter;
  buildList();
  console.log(`Chosen filter: ${filter}`);
}

// -------- all filter functions
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

// ________________ ALL SORTING FUNCTIONS ________________
// -------- sorting options
function selectSort(event) {
  const sortBy = event.target.dataset.sort;
  const sortDir = event.target.dataset.sortDirection;
  console.log("Sorting by:", sortBy, "- in the sort direction:", sortDir);

  setSorting(sortBy, sortDir);
}

function setSorting(sortBy, sortDir) {
  settings.sortBy = sortBy;
  settings.sortDir = sortDir;
  buildList();
}

function sortList(sortedList) {
  let direction = 1;
  if (settings.sortDir === "desc") {
    direction = -1;
  } else {
  }

  sortedList = sortedList.sort(compareSortOption);
  console.log("User chose to sort by:", settings.sortBy);

  // the compare function compares two elements and return its opinion on which element should be first when sorted
  function compareSortOption(a, b) {
    if (a[settings.sortBy] < b[settings.sortBy]) {
      return -1 * direction;
    } else {
      return 1 * direction;
    }
  }
  return sortedList;
}

// ________________ SEARCH ________________
//  -------- TO DO: search
// function search() {}

function filterExpelled() {}
function filterNonExpelled() {}
function filterSquad() {}
function filterPureblood() {}
function filterHalfblood() {}
function filterMuggle() {}

// -------- ALL TOGGLE FUNCTIONS --------
function makePrefect() {}
function undoPrefect() {}
function makeSquadMember() {}

// -------- !! NON-REVERSIBLE FUNCTIONS !! --------
function expelStudent() {}
function hackTheSystem() {}

// ________ SINGLE VIEW ________
function showStudentDetails() {}
