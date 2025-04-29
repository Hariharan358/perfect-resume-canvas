const { db } = require("./api");

exports.submitResumeDetails = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      address,
      education,
      experience,
      skills,
      projects,
    } = req.body;

    // Store only the resume data (no files)
    const docRef = await db.collection("resumes").add({
      name,
      email,
      phone,
      address,
      education,
      experience,
      skills,
      projects,
      submittedAt: new Date().toISOString(),
    });

    res.status(200).json({
      message: "Resume details saved successfully",
      documentId: docRef.id,
    });
  } catch (error) {
    console.error("Error saving resume:", error);
    res.status(500).json({ error: "Failed to save resume details" });
  }
};
