//Dedicated to handeling the Fetching of all notes, and
//The creation of new notes.



window.onload = () => {

    let createForm = document.getElementById("CreateForm");
    createForm.addEventListener("submit", (e) => {
        e.preventDefault();
        console.log("SUBMIT TRIGGERED");
        CreateNote();
    });

    let searchButton = document.getElementById("button-search");
    searchButton.addEventListener("click", (e) => {
        let tags = document.getElementById("search-tags").value;
        RefreshNotes(tags);
    });

    let searchForm = document.getElementById("SearchForm");
    searchForm.addEventListener("keydown", (e) => {
        if (e.key == "Enter") {
            e.preventDefault();
            let tags = document.getElementById("search-tags").value;
            RefreshNotes(tags);
        }

    });
        
    //Check for theme coockie
    CheckTheme();

    //Populate Notes
    FetchAllNotes();

    Init();

    window.history.pushState(null, null, "/");
};

//GET /notes
async function FetchAllNotes() {
    try {
        const data = await fetch("/notes", {
            method: "GET"
        });

        if (!data.ok) {
            throw new Error(`${data.status} ${data.statusText}`);
        }

        let response = await data.json();


        let date
        let formattedDate;

        let year;
        let month;
        let dt;
        let time;

        //Fallback for no notes created
        if (response.length == 0) {

            const noData = document.createElement('h4');
            noData.classList.add("col-12");
            noData.classList.add("mt-5");
            noData.innerHTML = "No Notes Created Yet...<br/> Add a New Note!";
            const container = document.getElementById('notes-container');
            container.classList.add("text-center");
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

    } catch (error) {
        console.log(error);
    }

}

// POST /notes
async function CreateNote() {
    console.log("Submitting Data...");
    let title = document.getElementById("title");
    let body = document.getElementById("body");
    let name = document.getElementById("name");
    //let colour = document.querySelector('input[name = colour]:checked');
    let tagList = document.getElementById("tags").value.split(',');

    const data = {
        title: title.value,
        body: body.value.trim(),
        author: name.value,
        //colour: colour.value,
        tags: tagList
    };

    console.log("DATA", data);

    let sub = await fetch("/notes", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "content-type": "application/json",
        },
    });

    console.log(sub.json());


    console.log("Data Submitted");

    //location.reload();

    RefreshNotes();
    ClearForms();
}



//Create Note DOM elements
function CreateNoteElement(title, body, author, date, colour, id) {

    //console.log(date);

    // Create elements and set their content
    const colDiv = document.createElement('div');
    colDiv.classList.add('col');
    colDiv.onclick = function () { GetNote(id); };

    //const cardLink = document.createElement('a');
    //cardLink.href = "/note?id=" + id;

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


    //cardLink.appendChild(cardDiv);
    colDiv.appendChild(cardDiv);
    //colDiv.appendChild(cardLink);

    // Get a reference to the container element
    const container = document.getElementById('notes-container');

    // Append the constructed elements to the container
    container.appendChild(colDiv);
}



//Handle Theme Selecetion Cookie
const setCookie = (name, value, days = 7, path = '/') => {
    const expires = new Date(Date.now() + days * 864e5).toUTCString()
    document.cookie = name + '=' + encodeURIComponent(value) + '; expires=' + expires + '; path=' + path
}

const getCookie = (name) => {
    return document.cookie.split('; ').reduce((r, v) => {
        const parts = v.split('=')
        return parts[0] === name ? decodeURIComponent(parts[1]) : r
    }, '')
}

function handleChangeTheme() {
    //console.log("CLICK");
    let page = document.getElementsByTagName("html");

    let theme = page[0].getAttribute("data-bs-theme");

    if (theme == "light") {
        page[0].setAttribute("data-bs-theme", "dark");
        setCookie("c_theme", "dark");
    } else {
        page[0].setAttribute("data-bs-theme", "light");
        setCookie("c_theme", "light");
    }
}

function CheckTheme() {
    let page = document.getElementsByTagName("html");
    let coockie = getCookie("c_theme");
    page[0].setAttribute("data-bs-theme", coockie);

    if (coockie == "dark") {
        let toggle = document.getElementById("theme-switch");
        toggle.setAttribute("checked", true);
    }
}



//Refresh notes when data changes
function RefreshNotes(tags = null) {
    console.log("tag"+tags);
    //Clear Notes
    const container = document.getElementById('notes-container');
    container.replaceChildren();

    if (tags == null || tags.length == 0) {
        //Re fetch notes
        FetchAllNotes();
    }
    else {
        FetchNotesByTag(tags);
    }
}


function ClearForms() {
    let forms = document.getElementsByTagName("form");

    for (let i = 0; i < forms.length; i++) {
        forms[i].reset();
    }

    document.getElementById("create-modal-toggle").click();
}




async function FetchNotesByTag(tag) {

    tag = tag.trim();
    tag = tag.toLowerCase();
    console.log("Tag", tag);


    let url = "/notes/tag/" + tag;

    try {
        const data = await fetch(url, {
            method: "GET",
        });

        console.log("DATA " + JSON.stringify(data) );

        if (!data.ok) {
            throw new Error(`${data.status} ${data.statusText}`);
        }

        let response = await data.json();


        let date
        let formattedDate;

        let year;
        let month;
        let dt;
        let time;

        //Fallback for no notes created
        if (response.length == 0) {

            const noData = document.createElement('h4');
            noData.classList.add("col-12");
            noData.classList.add("mt-5");
            noData.innerHTML = "No Notes with this Tag Were Found...<br/> Try Search for another Tag!";
            const container = document.getElementById('notes-container');
            container.classList.add("text-center");
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

    } catch (error) {
        console.log(error);
        const noData = document.createElement('h4');
        noData.classList.add("col-12");
        noData.classList.add("mt-5");
        noData.innerHTML = "No Notes with this Tag Were Found...<br/> Try Search for another Tag!";
        const container = document.getElementById('notes-container');
        container.classList.add("text-center");
        container.appendChild(noData);
    }
}