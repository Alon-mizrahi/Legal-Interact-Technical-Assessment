# Notes Web App


## About

This web application was created for [Legal Interact](https://legalinteract.com/). <br>
The app allows a user to create and store notes for easy access and sharing.


## Features

- Create, Read, Update, Delete (CRUD) Operations: Easily create new notes, view existing notes, update them, and delete them as needed.
- Light and Dark theme selection
- Persistent data storage
- SPA design for faster loading
- Tag notes and search based on tags
- Responsive Design: The web app is built with a responsive design, ensuring an optimal viewing experience across devices of all sizes.
- Simple and intuitive interface: The interface is designed to be user-friendly and straightforward.


## Technologies Used

- Backend: ASP.NET v8.0 Core, C#
- Frontend: HTML5, JavaScript (Vanilla), Bootstrap v5.3.3


## Installation

To run this project locally, follow these steps:

1. To run this project you will need the .Net SDK. If you have the SDK skip to point 5.
2. Visit [Microsoft Download Centre](https://learn.microsoft.com/en-us/dotnet/core/install/windows?tabs=net80)
3. Choose the appropriate download option based on your operating system and architecture.
4. Follow the installation instructions provided.


5. Clone or download and unzip this repository.
6. Open up a terminal.
7. Navigate to ...\Legal Interact Assesment\Legal-Interact-Technical-Assesment\Notes

```shell
cd ...\Legal Interact Assesment\Legal-Interact-Technical-Assesment\Notes
```
8. Restore and build the project.

```shell
dotnet restore

dotnet build
```

9. Run the project.
```shell
dotnet run --project NotesApp
```

10. Open a browser window and enter the localhost URL specified by the response
```shell
info: Microsoft.Hosting.Lifetime[14]
      Now listening on: http://localhost:5071
```

## Future Features

- Add user authentication.
- Frontend to be remade using a web framework, such as React.
- Increase API security with key implementation.


### Created By

Alon Mizrahi
Febuary 2024
