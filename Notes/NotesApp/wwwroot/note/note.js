let noteId;

window.onload = () => {

    //Get URL Params
    const urlParams = new URLSearchParams(window.location.search);
    noteId = urlParams.get('id');


    if (noteId != null) {
        GetNote(noteId);
    }


    let saveButton = document.getElementById("save-button");
    saveButton.addEventListener("click", (e) => {
        //e.preventDefault();
        console.log("SUBMIT TRIGGERED");
        UpdatedNote();
    });

    let deleteButton = document.getElementById("delete-button");
    deleteButton.addEventListener("click", (e) => {
        //e.preventDefault();
        console.log("SUBMIT TRIGGERED");
        DeleteNote();
    });



};


async function DeleteNote() {
    let url = "/notes/delete/" + noteId;

    let sub = await fetch(url, {
        method: "DELETE"
    });


    console.log(sub);


    console.log("Data Submitted");

    window.location.replace("/");
}


async function UpdatedNote() {
    console.log("Submitting Data...");
    let title = document.getElementById("title");
    let body = document.getElementById("body");

    //let colour = document.querySelector('input[name = colour]:checked');

    const data = {
        title: title.value,
        body: body.value.trim()
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

    //location.reload();

}

async function GetNote(id) {

    let url = "/notes/" + id;

    let data = await fetch(url, {
        method: "GET"
    });

    console.log("data",data);

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
    BuildNote(note.title, note.body, note.author, formattedDate, note.colour);
}


function BuildNote(title, body, author, date, colour) {

    const titleElem = document.getElementById("title");
    titleElem.value = title;

    const bodyElem = document.getElementById("body");
    bodyElem.value = body;

    const authorElem = document.getElementById("name");
    authorElem.value = author;

    const dateElem = document.getElementById("date");
    dateElem.value = date;



}
