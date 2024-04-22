//this is the model
// Data/Image.cs

namespace loginPOC.Models //Changes namespace to Models
{
    public class Image
    {
        // properties and methods
        public int Id { get; set; } //Primary Key
        public byte[] ImageData { get; set; } //Binary Large Object (BLOB) data
        // You can add more properties for the image here as needed
    }
}