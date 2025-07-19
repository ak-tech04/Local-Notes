let note = [];
document.addEventListener("DOMContentLoaded", main);
const themeToggleBtn = document.querySelector(".theme-toggle-btn");

function main(event) {
  theme();
  let temp = JSON.parse(localStorage.getItem("myNotes"));
  // console.log(temp);
  if (!temp) {
    renderNull();
  } else {
    // note.push(temp)
    console.log(temp);
    for (const element of temp) {
      renderNotes(element);
      note.push(element);
    }
  }
  closeBtn.addEventListener("click", closeNoteDialog);
  cancelBtn.addEventListener("click", closeNoteDialog);
  addNoteBtn.addEventListener("click", openNoteDialog);
  saveBtn.addEventListener("click", saveNoteDialog);
}

const saveBtn = document.querySelector(".save-btn");
const addNoteBtn = document.querySelector(".add-note-btn");
const closeBtn = document.querySelector(".close-btn");
const cancelBtn = document.querySelector(".cancel-btn");
const form = document.querySelector("form");

function theme() {
  let html = document.querySelector("html");
  let theme = localStorage.getItem("theme");
  if (!theme) {
    localStorage.setItem("theme", "light");
    themeToggleBtn.innerHTML = "🌞";
  }
  html.setAttribute("data-theme", theme);
  
  themeToggleBtn.addEventListener("click", (e) => {
    let theme = localStorage.getItem("theme");
    let html = document.querySelector("html");
    if (theme === "light") {
      html.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
      themeToggleBtn.innerHTML = "🌞";
    } else {
      html.setAttribute("data-theme", "light");
      localStorage.setItem("theme", "light");
      themeToggleBtn.innerHTML = "🌙";
    }
  });
}

function openNoteDialog() {
  const dialog = document.querySelector(".note-dialog");
  const titleInput = document.querySelector("#noteTitle");
  const contentInput = document.querySelector("#noteContent");
  dialog.showModal();
  titleInput.focus();
}

function closeNoteDialog() {
  const dialog = document.querySelector(".note-dialog");
  dialog.close();
}

function saveNoteDialog(e) {
  e.preventDefault();
  let noteTitle = document.querySelector(".form-input");
  let noteText = document.querySelector(".form-textarea");
  let title = noteTitle.value.trim();
  let text = noteText.value.trim();
  // console.log(noteTitle, noteText);
  if (title.length === 0 || text.length === 0) {
    alert("Note Title and note is required");
  } else {
    saveNote(title, text);
    noteTitle.value = "";
    noteText.value = "";
    closeNoteDialog();
  }
}

function saveNote(noteTitle, noteText) {
  let id = crypto.randomUUID();
  let noteObj = {
    id: id,
    title: noteTitle,
    text: noteText,
  };
  
  note.push(noteObj);
  localStorage.setItem("myNotes", JSON.stringify(note));
  renderNotes(noteObj);
}
// Requires note obj to render
function renderNotes(note) {
  let notesContainer = document.querySelector(".notes-container");
  
  let noteCard = document.createElement("div");
  noteCard.classList.add("note-card");
  noteCard.innerHTML = `
  <h2 class='note-card-title'> ${note.title}</h2>
  <p class='note-card-desc'> ${note.text}</p>
  `;
  notesContainer.appendChild(noteCard);
  return;
}

function renderNull() {
  let notesContainer = document.querySelector(".notes-container");
  let noteCard = document.createElement("div");
  noteCard.classList.add("noteCard");
  noteCard.innerHTML = `
        <h2>Empty </h2>
        <p>Add your notes here </p>
        `;
  notesContainer.appendChild(noteCard);
  return;
}