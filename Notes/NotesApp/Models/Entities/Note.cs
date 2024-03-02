namespace NotesApp.Models.Entities
{
    public class Note
    {
        public Guid? Id { get; set; }
        public string Title { get; set; }
        public string Body { get; set; }
        public string? Author { get; set; }

        public DateTime? LastUpdated { get; set; }

        public string? Colour { get; set; }

        public List<string>? Tags { get; set; }
    }
}
