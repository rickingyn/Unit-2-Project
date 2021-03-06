/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

// select student items
const listItem = document.querySelectorAll(".student-item");

// create variable to store number of items per page
const itemsPerPage = 10;

// create function to show pages
const showPage = (list, page) => {
  const startIndex = page * itemsPerPage - itemsPerPage;
  const endIndex = page * itemsPerPage - 1;

  // loop through the item list passed in first parameter
  // show item list only if item index is between the start and end index
  for (let i = 0; i < list.length; i++) {
    if (i >= startIndex && i <= endIndex) {
      list[i].style.display = "list-item";
    } else {
      list[i].style.display = "none";
    }
  }
}

//Create function to generate, append, and add functionality to the pagination buttons.
const appendPageLinks = list => {
  // create variable to store number of pages
  const numOfPages = Math.ceil(list.length / itemsPerPage);
  // select div with class name 'page'
  const page = document.querySelector(".page");

  // function to create li element for each page
  const createLi = numOfPages => {
    // loop through number of pages to create and append li element
    for (let i = 1; i <= numOfPages; i++) {
      const li = document.createElement("li");
      ul.appendChild(li);

      // create a element and add attribute and text
      // set text content to page number
      // append a element to li element
      const a = document.createElement("a");
      a.href = "#";
      a.textContent = `${i}`;
      li.appendChild(a);
    }
  }

  // create DOM elements and append to parent node
  const pagination = document.createElement("div");
  pagination.className = "pagination";
  page.appendChild(pagination);
  const ul = document.createElement("ul");
  pagination.appendChild(ul);

  // call the createLi function
  // create li elements based on the number of pages
  createLi(numOfPages);

  // select the first a element; assign 'active' class
  const firstPage = document.querySelector("li a");
  firstPage.className = "active";

  // add click event listener to ul element to select link (event bubbling)
  ul.addEventListener("click", e => {
    const a = document.querySelectorAll("a");
    // store clicked object into const
    const clicked = e.target;

    // if a element is clicked, loop through all a elements and 1 class
    if (clicked.tagName === "A") {
      for (let i = 0; i < a.length; i++) {
        a[i].className = "";
      }

      // add class 'active' to a element tht was clicked
      clicked.className = "active";
    }

    // store page number from clicked element
    // convert string into integer
    const pageNumber = parseInt(clicked.textContent);

    // call showPage function
    showPage(listItem, pageNumber);
  });
}

// create searchComponent function
const createSearchComponent = () => {
  // create search components and append
  const searchDiv = document.createElement("div");
  searchDiv.className = "student-search";

  const searchInput = document.createElement("input");
  searchInput.placeholder = "Search for students...";
  searchDiv.appendChild(searchInput);

  const searchBtn = document.createElement("button");
  searchBtn.textContent = "Search";
  searchDiv.appendChild(searchBtn);

  // append search component to page header1
  document.querySelector(".page-header").appendChild(searchDiv);
}

// create search function
const search = () => {
  // select collection of student names
  const searchStudent = document.querySelectorAll(".student-details h3");
  // select value from search input field
  const searchInput = document.querySelector(".student-search input").value;

  // create empty array to store filtered student items
  let filteredStudentList = [];

  // loop through each student name
  // conditional statement to hide student items if input value is not contained inside student name; indexOf() returns -1 if no matches
  for (let i = 0; i < searchStudent.length; i++) {
    if (searchStudent[i].textContent.indexOf(searchInput) > -1) {
      listItem[i].style.display = "list-item";

      // add filtered student item to filtered array list
      filteredStudentList.push(listItem[i]);
    } else {
      listItem[i].style.display = "none";
    }
  }

  // select elements; pagination and parent node, and noResults message
  const page = document.querySelector(".page");
  const pagination = document.querySelector(".pagination");
  const message = document.querySelector(".noResults");

  // create 'No Results' message if it does not exist
  if (!message) {
    const message = document.createElement("p");
    message.className = "noResults";
    message.textContent = "No results";
    page.append(message);
  }

  // remove pagination div only if it exist
  if (pagination) {
    page.removeChild(pagination);
  }

  // call appendPageLinks function to re-add pagination with filtered list
  if (filteredStudentList.length > 0) {
    appendPageLinks(filteredStudentList);

    // hide 'No Results' message if filered list is not empty
    if (message) {
      message.style.display = "none";
    }
  } else {
    // hide 'No Results' message if filtered list is empty
    message.style.display = "block";
  }
}

// call createSearchComponent function
createSearchComponent();

// call showPage function on load
window.addEventListener('load', showPage(listItem, 1));

// add event listener for the search button added to the page
document
  .querySelector(".student-search button")
  .addEventListener("click", event => {
    search();
  });

// add event listener to search div; using event bubbling to target input
// call search() function if keyup event is triggered on input
document.querySelector(".student-search").addEventListener("keyup", event => {
  if (event.target.tagName === "INPUT") {
    search();
  }
});

// call appendPageLinks function with students list as parameter
appendPageLinks(listItem);
