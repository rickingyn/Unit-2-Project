/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/
   
// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing


/*** 
   Add your global variables that store the DOM elements you will 
   need to reference and/or manipulate. 
   
   But be mindful of which variables should be global and which 
   should be locally scoped to one of the two main functions you're 
   going to create. A good general rule of thumb is if the variable 
   will only be used inside of a function, then it can be locally 
   scoped to that function.
***/
// select student items 
const listItem = document.querySelectorAll('.student-item');

// variable to store number of items per page
const itemsPerPage = 10;


/*** 
   Create the `showPage` function to hide all of the items in the 
   list except for the ten you want to show.

   Pro Tips: 
     - Keep in mind that with a list of 54 students, the last page 
       will only display four.
     - Remember that the first student has an index of 0.
     - Remember that a function `parameter` goes in the parens when 
       you initially define the function, and it acts as a variable 
       or a placeholder to represent the actual function `argument` 
       that will be passed into the parens later when you call or 
       "invoke" the function 
***/
function showPage(list, page) {
  // create variable to store dynamic start index and end index 
  const startIndex = (page * itemsPerPage) - itemsPerPage;
  const endIndex = (page * itemsPerPage) - 1;

  // loop through item list passed in first parameter
  for(let i = 0; i < list.length; i++) {
    // conditional statement to show list item only if it is between the index
    if(i >= startIndex && i <= endIndex) {
      list[i].style.display = 'list-item';
    } else {
      list[i].style.display = 'none';
    }
  }
}

/*** 
   Create the `appendPageLinks function` to generate, append, and add 
   functionality to the pagination buttons.
***/
function appendPageLinks(list) {
  // create const to dynamically calculate the number of pages
  const numOfPages = list.length / itemsPerPage;
  // select div with class name 'page'
  const page = document.querySelector('.page');

  // function to create Li element for each page
  function createLi(numOfPages) {
    // loop through number of pages
    for(let i = 1; i <= numOfPages; i++) {
      // create 'li' element for each page
      const li = document.createElement('li');
      // append 'li' element to 'ul' element
      ul.appendChild(li);

      // create 'a' element for each 'li' element
      const a = document.createElement('a');
      // add 'href' attribute
      a.href = '#';
      // set text content to page number
      a.textContent = `${i}`;
      // append 'a' element to 'li' element
      li.appendChild(a);
    }
  }

  // create elements and append to parent node
  const pagination = document.createElement('div');
  page.className = 'pagination';
  page.appendChild(pagination);
  const ul = document.createElement('ul');
  pagination.appendChild(ul);

  // call the createLi function to create 'li' elements based on the number of pages
  createLi(numOfPages);

  // select the first 'a' element and assign 'active' class
  const firstPage = document.querySelector('li a');
  firstPage.className = 'active';

  // add click event listener to 'ul' element to select link (event bubbling)
  ul.addEventListener('click', (e) => {
    // select collection of 'a' elements
    const a = document.querySelectorAll('a');

    // store clicked object into const
    const clicked = e.target;

    // check if clicked item is an 'a' element
    if(clicked.tagName === 'A') {
      // loop through collection of 'a' elements 
      for(let i = 0; i < a.length; i++) {
        // remove class name for all 'a' elements
        a[i].className = '';
      }
    // add class 'active' to 'a' element tht was clicked
    clicked.className = 'active';
    }

    // store page number from clicked element and convert into integer
    const pageNumber = parseInt(clicked.textContent);

    // call showPage function
    showPage(listItem, pageNumber);
  });

}

// call appendPageLinks function with students list as parameter
appendPageLinks(listItem);


// Remember to delete the comments that came with this file, and replace them with your own code comments.