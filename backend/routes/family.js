const express = require("express");
const router = express.Router();
const FamilyMember = require("../models/FamilyMember");

// Add family member
router.post("/add", async (req, res) => {
  try {
    const newMember = new FamilyMember(req.body);
    await newMember.save();
    res.status(201).json({ message: "Family member added successfully." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all family members
router.get("/", async (req, res) => {
  try {
    const members = await FamilyMember.find().populate("parentId");
    res.status(200).json(members);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update family member
router.put("/update/:id", async (req, res) => {
  try {
    const updatedMember = await FamilyMember.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ message: "Family member updated successfully.", updatedMember });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete family member
router.delete("/delete/:id", async (req, res) => {
  try {
    await FamilyMember.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Family member deleted successfully." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
