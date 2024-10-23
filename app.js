const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const pdfkit = require('pdfkit');
const sharp = require('sharp');

const app = express();
const port = 3000;

// Set up storage for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Add timestamp to the filename
  },
});

const upload = multer({ storage });

// Serve static files (for the HTML form)
app.use(express.static('public'));

// Convert images to PDF with optimization
const convertImageToPdf = async (imageFiles, outputFile) => {
  const doc = new pdfkit();
  const stream = fs.createWriteStream(outputFile);

  doc.pipe(stream);

  for (const file of imageFiles) {
    const resizedImage = await sharp(file)
      .resize({ width: 800 }) // Resize the image to a maximum width of 800px
      .toBuffer(); // Convert to buffer directly

    doc.image(resizedImage, { fit: [500, 700], align: 'center', valign: 'center' });
    doc.addPage(); // Add a new page for each image
  }

  doc.end();

  return new Promise((resolve, reject) => {
    stream.on('finish', () => resolve());
    stream.on('error', reject);
  });
};

// Endpoint to handle file upload and conversion
app.post('/convert', upload.array('files'), async (req, res) => {
  const { format } = req.body; // Get the selected format from the form
  const inputFiles = req.files.map(file => file.path);

  if (format === 'pdf') {
    const outputFile = `uploads/${Date.now()}.pdf`;
    try {
      await convertImageToPdf(inputFiles, outputFile);
      return res.download(outputFile, (err) => {
        if (err) {
          console.error('Error while downloading:', err);
        }
        // Clean up the uploaded and converted files after download
        inputFiles.forEach(file => fs.unlinkSync(file));
        fs.unlinkSync(outputFile);
      });
    } catch (error) {
      return res.status(500).send('Error during conversion: ' + error.message);
    }
  } else {
    return res.status(400).send('Invalid format or files.');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`File converter app listening at http://localhost:${port}`);
});
