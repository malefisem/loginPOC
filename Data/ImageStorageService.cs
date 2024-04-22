// Data/ImageStorageService.cs
using Microsoft.EntityFrameworkCore;
using loginPOC.Data; // should match namespace of applicationDBContext
using System;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using YourImageModelNamespace; // Replace with the actual namespace of your Image Model

namespace loginPOC.Data //update to the correct namespace if needed
{
    public class ImageStorageService
    {
        private readonly ApplicationDbContext _context;

        public ImageStorageService(ApplicationDbContext context)
        {
            _context = context;
        }6y7trfd

        public async Task SaveImageAsync(string imagePath)
        {
            byte[] imageBytes = await File.ReadAllBytesAsync(imagePath);
            var image = new Image { ImageData = imageBytes };
            _context.Images.Add(image);
            await _context.SaveChangesAsync();
        }

        public async Task<byte[]> GetImageAsync(int id)
        {
            var image = await _context.Images
                                    .Where(i => i.Id == id)
                                    .Select(i => i.ImageData)
                                    .FirstOrDefaultAsync();

            if (image == null)
                throw new InvalidOperationException("Image not found.");

            return image;
        }
    }
}