using Microsoft.AspNetCore.Mvc;
using NotesApp.Models.Entities;
using System.Text.Json;

/// This Controler is used to Handle the CRUD operations 
/// on the Note Object.

namespace NotesApp.Controllers
{
    [ApiController]             //Indicate no views
    [Route("/notes")]    //specify the route used to reach this conbtroller
    public class Notes : Controller
    {

        private string jsonFilePath;

        public Notes()
        {
            jsonFilePath = "./Data/data.json";
        }

    //Fetch All Notes
        [HttpGet]
        public IActionResult GetAllNotes() ///async Task<IActionResult>
        {
            try
            {

                List<Note> allNotes = ReadJsonData();

                if (allNotes == null)
                {
                    return NotFound("No Notes Created Yet!");
                    
                }
                else
                {
                    return Ok(allNotes);
                }
                

            }
            catch (Exception ex)
            {
                //Console.WriteLine($"Error reading JSON file: {ex.Message}");
                return BadRequest($"Error reading JSON file: {ex.Message}");
            }
        }


    //Fetch a Single Note
        [HttpGet]
        [Route("/notes/{id:Guid}")]
        [ActionName("GetNote")]
        public IActionResult GetNote(Guid id) //id param must match route param
        {
            try
            {

                List<Note> allNotes = ReadJsonData();

                if (allNotes == null)
                {
                    return NotFound("Note Not Found");
                }
                else
                {
                    Note note = allNotes.Find(x => x.Id == id);

                    if(note == null)
                    {
                        return NotFound("Note Not Found");
                    }

                    return Ok(note);
                }


            }
            catch (Exception ex)
            {
                return BadRequest($"Error reading JSON file: {ex.Message}");
            }
        }


    //Post a new Note
        [HttpPost]
        public IActionResult AddNote(Note newNote)
        {

            newNote.Id = Guid.NewGuid();
            newNote.LastUpdated = DateTime.Now;

            try
            {
                List<Note> allNotes = ReadJsonData();

                // Add the new data to the list
                allNotes.Add(newNote);

                WriteDataToFile(allNotes);

                return CreatedAtAction(nameof(GetNote), new { newNote.Id }, newNote);

                
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }


    //Update Existing Note
        [HttpPut]
        [Route("/notes/update/{id:Guid}")]
        public IActionResult UpdateNote(Guid id, Note updatedNote)
        {
            Note oldNote;
            try
            {
                List<Note> allNotes = ReadJsonData();

                // Add the new data to the list
                if(allNotes.Count != 0)
                {
                    oldNote = allNotes.Find(x => x.Id == id);
                }
                else {
                    return NotFound();
                }


                if (oldNote == null)
                {
                    return NotFound();
                }


                oldNote.Title = updatedNote.Title;
                oldNote.Body = updatedNote.Body;
                oldNote.LastUpdated = DateTime.Now;
                oldNote.Colour = updatedNote.Colour;

                WriteDataToFile(allNotes);

                return Ok("Data updated successfully.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }


    //Delete Existing Note
        [HttpDelete]
        [Route("/notes/delete/{id:Guid}")]
        public IActionResult DeleteNote(Guid id)
        {
            try
            {
                List<Note> allNotes = ReadJsonData();

                // Add the new data to the list
                var selectedNote = allNotes.Find(x => x.Id == id);

                if (selectedNote == null)
                {
                    return NotFound();
                }

                allNotes.Remove(selectedNote);

                WriteDataToFile(allNotes);

                return Ok("Data Deleted successfully.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }



    //Read and Write Methods

        private List<Note> ReadJsonData()
        {
            string jsonString = System.IO.File.ReadAllText(jsonFilePath);

            if (string.IsNullOrEmpty(jsonString))
            {
                return new List<Note>(); // Return an empty list if the JSON file is empty or null
            }

            List<Note> dataList = JsonSerializer.Deserialize<List<Note>>(jsonString);

            return dataList;
        }

        private void WriteDataToFile(List<Note> dataList)
        {
            string jsonString = JsonSerializer.Serialize(dataList);
            System.IO.File.WriteAllText(jsonFilePath, jsonString);
        }

    }
}