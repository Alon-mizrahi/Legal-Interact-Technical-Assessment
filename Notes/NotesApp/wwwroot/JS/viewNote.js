//JS Dedicated to handeling the View, Update, and Delete
//functions of this app

//Init page
let noteId;


function InitViewNote() {
    let saveButton = document.getElementById("save-button");
    saveButton.addEventListener("click", (e) => {
        console.log("Save Clicked");
        HandleUpdatedNote();
    });

    let deleteButton = document.getElementById("delete-button");
    deleteButton.addEventListener("click", (e) => {
        //e.preventDefault();
        console.log("Delete Clicked");
        HandleDeleteNote();
    });

    let shareButton = document.getElementById("share-button");
    shareButton.addEventListener("click", (e) => {
        //e.preventDefault();
        console.log("SUBMIT TRIGGERED");
        ShareNote();
    });

    //Get URL Params
    const urlParams = new URLSearchParams(window.location.search);
    noteId = urlParams.get('id');

    if (noteId != null) {
        GetNote(noteId);
    }
    window.history.pushState(null, null, "/");
}
    

//Get note data by ID
async function GetNote(id) {

    let url = "/notes/" + id;

    noteId = id;

    console.log("noteId", noteId);

    let data = await fetch(url, {
        method: "GET"
    });

    console.log("data", data);

    let note = await data.json(); //JSON.parse(data.body);    //

    console.log("note", note);


    //Add Error Handeling


    //Formate Date YYYY/MM/DD HH:Mi
    let date = new Date(note.lastUpdated);

    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let dt = date.getDate();
    let time = date.getHours() + ":" + date.getMinutes();

    if (dt < 10) {
        dt = '0' + dt;
    }
    if (month < 10) {
        month = '0' + month;
    }

    let formattedDate = year + "/" + month + "/" + dt + " " + time;

    /*
    console.log("note.title", note.title);
    console.log("note.body", note.body);
    console.log("note.author", note.author);
    console.log("formattedDate", formattedDate);
    console.log("note.colour", note.colour);
    */
    BuildNote(note.title, note.body, note.author, formattedDate, note.colour, note.tags);
}

//Populate View form elements with note data
function BuildNote(title, body, author, date, colour, tags) {

    document.getElementById("view-modal-toggle").click();


    const titleElem = document.getElementById("view-title");
    titleElem.value = title;

    const bodyElem = document.getElementById("view-body");
    bodyElem.value = body;

    const authorElem = document.getElementById("view-name");
    authorElem.value = author;

    const dateElem = document.getElementById("view-date");
    dateElem.value = date;

    const tagElem = document.getElementById("view-tags");
    tagElem.value = tags;

}

//Handle Delete note request
async function HandleDeleteNote() {
    let url = "/notes/delete/" + noteId;

    let sub = await fetch(url, {
        method: "DELETE"
    });


    console.log(sub);


    console.log("Data Submitted");

    ClearViewForm();

}

//Handle Update Note Request
async function HandleUpdatedNote() {
    console.log("Submitting Data...");
    let title = document.getElementById("view-title");
    let body = document.getElementById("view-body");
    let tagList = document.getElementById("view-tags").value.split(',');

    //let colour = document.querySelector('input[name = colour]:checked');

    const data = {
        title: title.value,
        body: body.value.trim(),
        tags: tagList,
        colour: ""
    };


    console.log('data', data);

    //console.log('JSON', JSON.parse(data));

    let url = "/notes/update/" + noteId;

    console.log("URL", url);

    let sub = await fetch(url, {
        method: "PUT",
        body: JSON.stringify(data),//JSON.parse(data),
        headers: {
            "content-type": "application/json",
        },
    });


    console.log(sub);


    console.log("Data Submitted");

    ClearViewForm();

}

// Clear View Form, Close Dialoge, Refresh all notes
function ClearViewForm() {
    let form = document.getElementById("view-form");

    form.reset();

    document.getElementById("view-modal-toggle").click();

    RefreshNotes();
}

//Copy URL that links to note
function ShareNote() {

    let url = window.location.href;

    url = url + "?id=" + noteId;

    console.log("url", url);

    navigator.clipboard.writeText(url);

    ClearViewForm();
}