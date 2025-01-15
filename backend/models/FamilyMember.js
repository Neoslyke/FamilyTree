const mongoose = require("mongoose");

const FamilyMemberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  photo: { type: String, required: true },
  dob: { type: Date, required: true },
  deceased: { type: Boolean, default: false },
  deathDate: { type: Date },
  nationality: { type: String, required: true },
  race: { type: String, required: true },
  parentId: { type: mongoose.Schema.Types.ObjectId, ref: "FamilyMember" }, // Relationship
});

module.exports = mongoose.model("FamilyMember", FamilyMemberSchema);
