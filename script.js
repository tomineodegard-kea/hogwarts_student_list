"use strict";

window.addEventListener("DOMContentLoaded", start);

let allStudents = [];
let filter = "*";

// creating the  prototype for all animals:
const Student = {
  name: "",
  //   desc: "-unknown animal-",
  //   type: "",
  //   age: 0,
  // TO DO: Add the star to the prototype, setting the star to default false
  prefect: false,
};

function start() {
  console.log("ready");
  const filterBtn = document.querySelectorAll("[data-action=filter]");

  filterBtn.forEach((btn) => {
    btn.addEventListener("click", chooseFilter);
  });

  loadJSON();
}

function prepareData(filter) {
  let filteredStudents = allStudents.filter(filter);
  return filteredStudents;
}

// ------- JSON LINKS -------
// https://petlatkea.dk/2021/hogwarts/students.json
// https://petlatkea.dk/2021/hogwarts/families.json

// ------- LOAD JSON FILE -------
// async function loadJSON() {
//   const response = await fetch("animals.json");
//   const jsonData = await response.json();

// when loaded, prepare data objects
//   prepareObjects(jsonData);
// }

function prepareObjects(jsonData) {
  allStudents = jsonData.map(prepareStudentObject);

  displayList(allStudents);
}

// ------- FILTERING OPTIONS -------
// function chooseFilter() {
//   filter = this.dataset.filter;
//   buildList();
// }

// function isFilter1(student) {
//   if (animal.type === "filter_1") {
//     return true;
//   } else {
//     return false;
//   }
// }

// function isFilter2(student) {
//   if (student.type === "filter_2") {
//     return true;
//   } else {
//     return false;
//   }
// }

function all() {
  return true;
}

function prepareStudentObject(jsonObject) {
  const student = Object.create(Student);

  const texts = jsonObject.fullname.split(" ");
  animal.name = texts[0];
  animal.desc = texts[2];
  animal.type = texts[3];
  animal.age = jsonObject.age;

  return animal;
}

function buildList() {
  let filteredAnimals;

  //filter = this.dataset.filter;

  if (filter === "cat") {
    filteredAnimals = prepareData(isCat);
  } else if (filter === "dog") {
    filteredAnimals = prepareData(isDog);
  } else if (filter === "*") {
    filteredAnimals = prepareData(all);
  }

  displayList(filteredAnimals);
}

function displayList(student) {
  // clear the list
  document.querySelector("#list tbody").innerHTML = "";

  // build a new list
  student.forEach(displayStudent);
}

function displayStudent(student) {
  // create clone
  const clone = document.querySelector("template#student").content.cloneNode(true);

  // set clone data
  clone.querySelector("[data-field=name]").textContent = student.name;
  //   clone.querySelector("[data-field=desc]").textContent = animal.desc;
  //   clone.querySelector("[data-field=type]").textContent = animal.type;
  //   clone.querySelector("[data-field=age]").textContent = animal.age;

  // TO DO: Show ⭐ or ☆
  if (student.prefect) {
    clone.querySelector("[data-field=prefect]").textContent = "⭐";
  } else {
    clone.querySelector("[data-field=prefect]").textContent = "☆";
  }

  // TO DO: Add eventlistner to click on star
  clone.querySelector("[data-field=prefect]").addEventListener("click", togglePrefect);

  function togglePrefect() {
    console.log("togglePrefect");
    if (student.prefect) {
      student.prefect = false;
    } else {
      student.prefect = true;
    }
    console.log(student);
    buildList();
  }

  // append clone to list
  document.querySelector("#list tbody").appendChild(clone);
}
