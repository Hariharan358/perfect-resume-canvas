const express = require('express');
const { jsPDF } = require("jspdf");
const FormData = require('form-data');
const axios = require('axios');
const crypto = require('crypto');

const app = express();
app.use(express.json());

// IPFS Pinata API details
const PINATA_API_KEY = 'bbbe5ea261a462b68c1a';
const PINATA_SECRET_API_KEY = 'b2645d4eacb1eca88b5827ebf36d2351e63954ae3ffa292a3f2992eaaea33b46';

// Encryption details
const ENCRYPTION_KEY = 'your_32_char_encryption_key';  // Should be 32 characters for AES-256
const ENCRYPTION_ALGORITHM = 'aes-256-cbc';
const IV = crypto.randomBytes(16);  // Initialization vector

// Endpoint to generate and store resume
app.post('/generate-resume', async (req, res) => {
  try {
    const { fullName, email, phone, address, linkedin, website, summary } = req.body;

    // 1. Generate PDF
    const doc = new jsPDF();
    doc.text(`Full Name: ${fullName}`, 20, 20);
    doc.text(`Email: ${email}`, 20, 30);
    doc.text(`Phone: ${phone}`, 20, 40);
    doc.text(`Address: ${address}`, 20, 50);
    doc.text(`LinkedIn: ${linkedin}`, 20, 60);
    doc.text(`Website: ${website}`, 20, 70);
    doc.text(`Summary: ${summary}`, 20, 80);

    // Save PDF to file
    const pdfBuffer = doc.output('arraybuffer');

    // 2. Upload PDF to IPFS (Pinata)
    const form = new FormData();
    form.append('file', Buffer.from(pdfBuffer), { filename: 'resume.pdf' });

    const ipfsResponse = await axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS', form, {
      headers: {
        ...form.getHeaders(),
        pinata_api_key: PINATA_API_KEY,
        pinata_secret_api_key: PINATA_SECRET_API_KEY,
      },
    });

    const ipfsHash = ipfsResponse.data.IpfsHash;
    const ipfsLink = `https://gateway.pinata.cloud/ipfs/${ipfsHash}`;

    // 3. Encrypt the IPFS link
    const cipher = crypto.createCipheriv(ENCRYPTION_ALGORITHM, Buffer.from(ENCRYPTION_KEY, 'utf-8'), IV);
    let encrypted = cipher.update(ipfsLink, 'utf-8', 'hex');
    encrypted += cipher.final('hex');

    // 4. Store the encrypted IPFS link
    // Here you can store the encrypted IPFS link in a database or return it as a response.
    res.status(200).json({
      message: 'Resume generated and stored successfully!',
      encryptedIpfsLink: encrypted,
    });

  } catch (error) {
    console.error('Error generating resume:', error);
    res.status(500).json({ error: 'Error generating resume' });
  }
});

// Start the server
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
