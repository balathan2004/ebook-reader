# PDF to Voice Converter - README  

Live Hosting Link - https://ebook-reader-beta.vercel.app/

## Overview  
The **PDF to Voice Converter** is a web application designed to transform PDF documents into audio files, making them accessible to a wider audience. This tool extracts text from uploaded PDFs, converts it into speech using advanced text-to-speech technology, and provides a downloadable audio file for offline use.  

---

## Purpose  
This project aims to:  
1. **Enhance Accessibility**: Enable users with visual impairments or reading difficulties to access PDF content through audio.  
2. **Improve Convenience**: Allow users to listen to PDFs while multitasking or on the go.  
3. **Promote Efficiency**: Quickly convert lengthy documents into easily digestible audio formats.  

---

## Features  
- **PDF Upload**: Supports PDF file uploads for text extraction.  
- **Text-to-Speech Conversion**: Converts extracted text into clear and natural-sounding audio.  
- **Downloadable MP3**: Provides an option to download the generated audio file.  
- **Responsive Design**: Works seamlessly across desktop and mobile devices.  

---

## Technologies Used  
- **Frontend**:  
  - React.js

- **Backend**:  
  - Next.js with API routes for processing uploads  

- **Text-to-Speech Engine**:  
  - gTTS (Google Text-to-Speech)  

- **File Handling**:  
  - `formidable` for parsing uploaded PDF files  

---

## How It Works  
1. **Upload a PDF**: Users upload a PDF file via the web interface.  
2. **Extract Text**: The app extracts readable text from the PDF.  
3. **Convert to Audio**: The extracted text is processed using a text-to-speech engine to generate audio.  
4. **Download or Play**: The generated audio file is available for download or online playback.  

---

## Use Cases  
- Listening to study materials or reports on the go.  
- Making content accessible for visually impaired users.  
- Consuming lengthy PDF documents more efficiently.  

---

Thank you for exploring the PDF to Voice Converter! If you have any suggestions or feedback, feel free to reach out. 😊
