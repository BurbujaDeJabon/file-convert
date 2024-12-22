const upload = document.getElementById('upload');
const format = document.getElementById('format');
const convert = document.getElementById('convert');
const download = document.getElementById('download');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const preview = document.getElementById('preview');

let uploadedImage;

// Load the uploaded image
upload.addEventListener('change', (event) => {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    uploadedImage = new Image();
    uploadedImage.src = reader.result;
    uploadedImage.onload = () => {
      // Display the image
      preview.src = uploadedImage.src;
    };
  };
  reader.readAsDataURL(file);
});

// Convert and download the image
convert.addEventListener('click', () => {
  if (!uploadedImage) {
    alert('Please upload an image first!');
    return;
  }

  // Set canvas dimensions to match the image
  canvas.width = uploadedImage.width;
  canvas.height = uploadedImage.height;

  // Draw the image onto the canvas
  ctx.drawImage(uploadedImage, 0, 0);

  // Convert canvas content to desired format
  const mimeType = format.value;
  const convertedImage = canvas.toDataURL(mimeType);

  // Create a downloadable link
  download.href = convertedImage;
  download.download = `converted-image.${mimeType.split('/')[1]}`;
  download.style.display = 'block';
  download.textContent = 'Download Converted Image';
});
