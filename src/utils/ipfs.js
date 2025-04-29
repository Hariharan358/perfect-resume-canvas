// utils/ipfs.js (or .ts)
import axios from "axios";

// Function to upload file to IPFS
export const pinFileToIPFS = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        pinata_api_key: "bbbe5ea261a462b68c1a",
        pinata_secret_api_key: "b2645d4eacb1eca88b5827ebf36d2351e63954ae3ffa292a3f2992eaaea33b46",
      },
    });

    return `https://gateway.pinata.cloud/ipfs/${res.data.IpfsHash}`;
  } catch (error) {
    console.error("Error uploading file to IPFS:", error);
    throw error;
  }
};
