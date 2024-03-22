let head = document.querySelector("header");
let dateFormat = document.querySelector("#date");
dateFormat.textContent = new Date().toLocaleDateString("en-us", {
  weekday: "long",
  year: "numeric",
  month: "short",
  day: "numeric",
});
head.append(dateFormat);

head.setAttribute("style", "text-align : center");

let mainContent = document.querySelector("main");
mainContent.style.width = "90%";

// taking input and getting on the display.
// finding the form for addEventListener.
let arrayOfData = [];
let arrayObject = {};
let input = document.querySelector("#todo_form");
input.addEventListener("submit", (e) => {
  e.preventDefault();
  const { todo_input } = input.elements;
  let id = arrayOfData.length;
  let mark = false;
  if (todo_input.value) {
    addingElement(todo_input.value, id, mark);
    //storing each data to the locale storage in a form of array.
    arrayObject = {
      id: id,
      value: todo_input.value,
      doneMark: false,
    };
    arrayOfData.push(arrayObject);
    localStorage.setItem("data", JSON.stringify(arrayOfData));
    todo_input.value = "";
    todo_input.autofocus = true;
  } else alert("Todo can't be empty, Please add Some Task!");
});

//lets add a fucntion to add the new check box form the given input.
const list = document.querySelector("#todo-list");
let addingElement = (input_value, id, mark) => {
  let list_li = document.createElement("li");
  list_li.className = "list-group-item p-3 storeData";
  let list_input = document.createElement("input");
  list_input.className = "form-check-input me-1";
  list_input.type = "checkbox";
  list_input.id = `todo-${id}`;
  let list_lable = document.createElement("label");
  list_lable.className = "form-check-label";
  list_lable.setAttribute("for", list_input.id);
  if (!mark) list_lable.textContent = input_value;
  if (mark) {
    list_lable.innerHTML = `<strike> ${input_value} </strike>`;
    list_input.checked = true;
  }
  list_li.append(list_input, list_lable);
  list.append(list_li);
};
// on the clear of the todo i want to clear the array also.
document.querySelector("#clear_button").addEventListener("click", () => {
  list.innerHTML = "";
  arrayOfData = [];
  localStorage.removeItem("data");
});

// checking the work was done or not;
list.addEventListener("click", (e) => {
  let id = e.target.id;
  let findId = document.getElementById(id);
  for (const label of findId.labels) {
    if (e.target.checked)
      label.innerHTML = `<strike> ${label.textContent} </strike>`;
    if (!e.target.checked) label.innerHTML = label.textContent;
  }
  let index = parseInt(id.substr(5));
  checkedTodo(e.target.checked, index);
});

//modifying the data in the local storage
let checkedTodo = (mark, id) => {
  let dataArray = JSON.parse(localStorage.getItem("data"));
  if (mark) dataArray[id].doneMark = true;
  if (!mark) dataArray[id].doneMark = false;
  localStorage.setItem("data", JSON.stringify(dataArray));
};

//saving the items in the locale storage;
document.addEventListener("DOMContentLoaded", () => {
  let dataArray = JSON.parse(localStorage.getItem("data"));
  if (dataArray)
    dataArray.forEach((element) => {
      addingElement(element.value, element.id, element.doneMark);
    });
});
