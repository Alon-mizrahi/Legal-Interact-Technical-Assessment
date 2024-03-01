//Init functions

window.onload = () => {

    let createForm = document.getElementById("CreateForm");
    createForm.addEventListener("submit", (e) => {
        e.preventDefault();
        console.log("SUBMIT TRIGGERED");
        CreateNote();
    });

    //Populate Notes
    FetchAllNotes();
};




async function FetchAllNotes() {

    let data = await fetch("/notes", {
        method: "GET"
    });

    let response = await data.json();

    let date
    let formattedDate;

    let year;
    let month;
    let dt;
    let time;

    


    if (response.length == 0) {

    const noData = document.createElement('h2');
    noData.innerText = "No Notes Created Yet. Add a New Note!";
    const container = document.getElementById('notes-container');
    container.appendChild(noData);

    } else {
        response.forEach((note) => {

            //Formate Date YYYY/MM/DD HH:Mi
            date = new Date(note.lastUpdated);

            year = date.getFullYear();
            month = date.getMonth() + 1;
            dt = date.getDate();
            time = date.getHours() + ":" + date.getMinutes();

            if (dt < 10) {
                dt = '0' + dt;
            }
            if (month < 10) {
                month = '0' + month;
            }

            formattedDate = year + "/" + month + "/" + dt + " " + time;

            //Create html Card Element for each Note
            CreateNoteElement(note.title, note.body, note.author, formattedDate, note.colour, note.id);
        });

    }

}

async function CreateNote() {
    console.log("Submitting Data...");
    let title = document.getElementById("title");
    let body = document.getElementById("body");
    let name = document.getElementById("name");
    let colour = document.querySelector('input[name = colour]:checked');


    const data = {
        title: title.value,
        body: body.value.trim(),
        author: name.value,
        colour: colour.value,
    };

    let sub = await fetch("/Notes", { //https://localhost:7224/Notes
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "content-type": "application/json",
        },
    });

    console.log(sub.json());


    console.log("Data Submitted");

    location.reload();

}




//Other functions

function clicked() {
    //console.log("CLICK");
    let page = document.getElementsByTagName("html");

    let theme = page[0].getAttribute("data-bs-theme");

    if (theme == "light") {
        page[0].setAttribute("data-bs-theme", "dark");
    } else {
        page[0].setAttribute("data-bs-theme", "light");
    }
}



function CreateNoteElement(title, body, author, date, colour, id) {

    //console.log(date);

    // Create elements and set their content
    const colDiv = document.createElement('div');
    colDiv.classList.add('col');


    const cardLink = document.createElement('a');
    cardLink.href = "/note?id=" + id;

    const cardDiv = document.createElement('div');
    cardDiv.classList.add('card');
    //cardDiv.classList.add('colour1');

    const cardBodyDiv = document.createElement('div');
    cardBodyDiv.classList.add('card-body');

    const titleElement = document.createElement('h5');
    titleElement.classList.add('card-title');
    titleElement.textContent = title;

    const bodyElement = document.createElement('p');
    bodyElement.classList.add('card-text', 'text-start');
    body = body.replace("\n", "<br/>");
    //bodyElement.textContent = body;
    bodyElement.innerHTML = body;

    const footerElement = document.createElement('footer');
    footerElement.classList.add('blockquote-footer');
    footerElement.textContent = `${author} ${date}`;

    //const linkElement = document.createElement('a');
    //linkElement.href = "#";
    //linkElement.classList.add('btn', 'btn-primary');
    //linkElement.textContent = "Go somewhere";

    // Append elements to the appropriate parent elements
    cardBodyDiv.appendChild(titleElement);
    cardBodyDiv.appendChild(bodyElement);
    cardBodyDiv.appendChild(footerElement);
    //cardBodyDiv.appendChild(linkElement);

    cardDiv.appendChild(cardBodyDiv);


    cardLink.appendChild(cardDiv);

    colDiv.appendChild(cardLink);

    // Get a reference to the container element
    const container = document.getElementById('notes-container');

    // Append the constructed elements to the container
    container.appendChild(colDiv);
}