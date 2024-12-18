import sharp from 'sharp';

export async function optimizeImage(buffer: Buffer, options: {
  maxWidth?: number;
  maxHeight?: number;
  quality?: number;
  format?: 'jpeg' | 'webp' | 'png';
}) {
  const {
    maxWidth = 800,
    maxHeight = 800,
    quality = 80,
    format = 'webp'
  } = options;

  try {
    let sharpInstance = sharp(buffer);
    
    // Get image metadata
    const metadata = await sharpInstance.metadata();
    const originalWidth = metadata.width || 0;
    const originalHeight = metadata.height || 0;

    // Calculate new dimensions while maintaining aspect ratio
    let width = originalWidth;
    let height = originalHeight;
    
    if (width > maxWidth) {
      height = Math.round((height * maxWidth) / width);
      width = maxWidth;
    }
    
    if (height > maxHeight) {
      width = Math.round((width * maxHeight) / height);
      height = maxHeight;
    }

    // Optimize the image
    sharpInstance = sharpInstance
      .resize(width, height, {
        fit: 'inside',
        withoutEnlargement: true
      });

    // Convert to the specified format with compression
    switch (format) {
      case 'webp':
        return await sharpInstance
          .webp({ quality })
          .toBuffer();
      case 'jpeg':
        return await sharpInstance
          .jpeg({ quality })
          .toBuffer();
      case 'png':
        return await sharpInstance
          .png({ quality })
          .toBuffer();
      default:
        throw new Error(`Unsupported format: ${format}`);
    }
  } catch (error) {
    console.error('Image optimization failed:', error);
    throw error;
  }
}
