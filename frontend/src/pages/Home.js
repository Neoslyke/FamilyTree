import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Home.css";

function Home() {
  const [familyMembers, setFamilyMembers] = useState([]);
  const [currentMember, setCurrentMember] = useState(null);

  useEffect(() => {
    fetchFamilyTree();
  }, []);

  const fetchFamilyTree = async (parentId = null) => {
    try {
      const res = await axios.get(`/api/family`);
      const members = parentId
        ? res.data.filter((member) => member.parentId === parentId)
        : res.data.filter((member) => !member.parentId);
      setFamilyMembers(members);
    } catch (error) {
      console.error("Error fetching family tree:", error);
    }
  };

  const handleMemberClick = (memberId) => {
    setCurrentMember(memberId);
    fetchFamilyTree(memberId);
  };

  const goBack = () => {
    setCurrentMember(null);
    fetchFamilyTree();
  };

  return (
    <div className="home">
      <h1 className="text-center">Family Tree</h1>
      {currentMember && (
        <button className="btn btn-primary mb-3" onClick={goBack}>
          Go Back
        </button>
      )}
      <div className="family-grid">
        {familyMembers.map((member) => (
          <div
            key={member._id}
            className={`family-card ${member.deceased ? "grayscale" : ""}`}
            onClick={() => handleMemberClick(member._id)}
          >
            <img src={member.photo} alt={member.name} />
            <h3>{member.name}</h3>
            <p>{member.nationality} ({member.race})</p>
            {!member.deceased && (
              <p>Age: {Math.floor((new Date() - new Date(member.dob)) / (1000 * 60 * 60 * 24 * 365.25))}</p>
            )}
            {member.deceased && <p>Deceased: {new Date(member.deathDate).toLocaleDateString()}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
