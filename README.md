# File Converter

A simple online file converter that allows users to upload files and convert them between different formats.

## Features

- **File Upload**: Users can upload multiple files at once.
- **Format Selection**: Choose the desired output format:
  - Convert PDF files to DOCX.
  - Convert images (JPEG, PNG, etc.) to PDF.
- **Conversion Process**: The application processes the uploaded files and converts them to the selected format.
- **Download**: Once the conversion is complete, users can download the converted files.

## How It Works

1. **Upload Files**: Click on the "Upload Files" button to select the files you want to convert. You can upload multiple images or a single PDF file.
  
2. **Select Format**: From the dropdown menu, select the format you want to convert your files to:
   - **PDF to DOCX**: Converts uploaded PDF files into DOCX format.
   - **Image to PDF**: Converts the uploaded images into a single PDF file.

3. **Conversion**: After selecting the format, click the "Convert" button. The application will process your files and perform the necessary conversions.

4. **Download**: Once the conversion is complete, a download link will be provided for the converted file. Click the link to download your file to your device.

## Technologies Used

- **Node.js**: Server-side runtime environment for building the application.
- **Express**: Web framework for handling HTTP requests.
- **Multer**: Middleware for handling file uploads.
- **Fluent-FFmpeg**: For handling file format conversions (PDF and images).


live at https://file-converter-ejhs.onrender.com/


