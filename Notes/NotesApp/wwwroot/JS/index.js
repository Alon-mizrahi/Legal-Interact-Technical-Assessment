//Init functions

window.onload = () => {

    let createForm = document.getElementById("CreateForm");
    createForm.addEventListener("submit", (e) => {
        e.preventDefault();
        console.log("SUBMIT TRIGGERED");
        CreateNote();
    });

    console.log(createForm);

    //for testing
    FetchData();

};




async function FetchData() {
    let data = await fetch("https://localhost:7224/Notes", {
        method: "GET"
    });

    let response = await data.json();

    console.log(response);
}

async function CreateNote() {
    console.log("Submitting Data...");
    let title = document.getElementById("title");
    let body = document.getElementById("body");
    let name = document.getElementById("name");
    let colour = document.getElementById("colour");



    const data = {
        title: title.value,
        body: body.value,
        author: name.value,
        colour: colour.value,
    };

    let sub = await fetch("https://localhost:7224/Notes", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "content-type": "application/json",
        },
    });

    console.log(sub.json());


    console.log("Data Submitted");

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