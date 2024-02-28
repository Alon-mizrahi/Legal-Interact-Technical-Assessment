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

window.onload = () => {
    FetchData();
};

async function FetchData() {
    let data = await fetch("https://localhost:7224/Notes", {
        method: "GET",
        headers: {
            "content-type": "application/json",
        },
    });

    let response = await data.json();

    console.log(response);
}

async function CreateNote() {
    const body = {
        id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        title: "string",
        body: "string",
        author: "string",
        lastUpdated: "2024-02-28T15:12:52.257Z",
        colour: "string",
    };

    let data = await fetch("https://localhost:7224/Notes", {
        method: "GET",
        body: JSON.stringify(body),
        headers: {
            "content-type": "application/json",
        },
    });
}
