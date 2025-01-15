import React, { useState } from "react";
import axios from "axios";
import "./Admin.css";

function Admin() {
  const [formData, setFormData] = useState({
    name: "",
    photo: "",
    dob: "",
    nationality: "",
    race: "",
    deceased: false,
    deathDate: "",
    parentId: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/family/add", formData);
      alert(res.data.message);
      setFormData({
        name: "",
        photo: "",
        dob: "",
        nationality: "",
        race: "",
        deceased: false,
        deathDate: "",
        parentId: "",
      });
    } catch (error) {
      console.error("Error adding family member:", error);
    }
  };

  return (
    <div className="admin">
      <h1>Add Family Member</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>Photo URL</label>
          <input
            type="text"
            name="photo"
            value={formData.photo}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>Date of Birth</label>
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>Nationality</label>
          <input
            type="text"
            name="nationality"
            value={formData.nationality}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>Race</label>
          <input
            type="text"
            name="race"
            value={formData.race}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>Deceased</label>
          <input
            type="checkbox"
            name="deceased"
            checked={formData.deceased}
            onChange={handleChange}
          />
        </div>
        {formData.deceased && (
          <div className="form-group">
            <label>Date of Death</label>
            <input
              type="date"
              name="deathDate"
              value={formData.deathDate}
              onChange={handleChange}
              className="form-control"
            />
          </div>
        )}
        <div className="form-group">
          <label>Parent ID (Optional)</label>
          <input
            type="text"
            name="parentId"
            value={formData.parentId}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-success">
          Add Member
        </button>
      </form>
    </div>
  );
}

export default Admin;
