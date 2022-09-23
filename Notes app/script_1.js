//For modal display 
var modal = document.getElementById("modal");
var btn = document.getElementById("add-notes");
var span = document.getElementsByClassName("close")[0];


btn.onclick = function() {
  modal.style.display = "block";
}

span.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {   // When user clicks anywhere outside of the modal, close it
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

// Add note to local storage
let addBtn = document.getElementById("notes-btn");
addBtn.addEventListener("click", function() {

  let addTitle = document.getElementById("title-text");
  let addTxt = document.getElementById("description-text");
  
    if (addTitle.value == "" || addTxt.value == "") {
        return alert("Please add Note Title and Details")
    }

  let notes = localStorage.getItem("notes");
  if (notes == null) { //first notes true
    notesObj = [];
  } 
  else { //second notes true 
    notesObj = JSON.parse(notes);
  }

  let myObj = {
    title: addTitle.value,
    text: addTxt.value
  }
  notesObj.push(myObj);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  addTxt.value = "";
  addTitle.value = "";
//   console.log(notesObj);
  showNotes();
});

// Function to show elements from localStorage
function showNotes() {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  let html = "";
  notesObj.forEach(function(element, index) {
    html += `
        <div class="note" >
            <p class="note-counter">Note ${index + 1}</p>
            <h3 class="note-title"> ${element.title} </h3>
            <p class="note-text"> ${element.text}</p><br>
            <button id="${index}"onclick="deleteNote(this.id)" class="note-btn">Delete </button>          

            <button id="${index}"onclick="editNote(this.id)" class=" edit-btn">Edit </button>
        </div>`;
  });
  let notesElm = document.getElementById("notes");
  if (notesObj.length != 0) {
    notesElm.innerHTML = html;
  } else {
    notesElm.innerHTML = `No Notes Yet! Add a note using the form above.`;
  }
}

// Function to delete a note
function deleteNote(index) {
//   console.log("I am deleting", index);
    let confirmDel = confirm("Delete this note?");
    if (confirmDel == true) {
        let notes = localStorage.getItem("notes");
        if (notes == null) {
            notesObj = [];
        } else {
            notesObj = JSON.parse(notes);
        }

        notesObj.splice(index, 1);
        localStorage.setItem("notes", JSON.stringify(notesObj));
        showNotes();
    }
  
}

function editNote(index) {
  let notes = localStorage.getItem("notes");
  let addTitle = document.getElementById("title-text");
  let addTxt = document.getElementById("description-text");
  //console.log(addTitle);
  if (addTitle.value !== "" || addTxt.value !== "") {
    return alert("Please clear the form before editing a note")
  } 

  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  //console.log(notesObj);

  notesObj.findIndex((element, index) => {
    addTitle.value = element.title;
    addTxt.value = element.text;
  })

  notesObj.splice(index, 1); // removes a note from local storage and screen while editing
      localStorage.setItem("notes", JSON.stringify(notesObj));
      showNotes();
}
showNotes();