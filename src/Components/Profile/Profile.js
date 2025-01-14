import React, { useEffect, useState } from "react";
import "./Profile.css";
import axios from "axios";
import { URL } from "../../utils/Constant"; // Import Base URL
import customPlaceholder from "../../assets/custom.png";
const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("User not logged in.");
          setLoading(false);
          return;
        }

        // Axios request with base URL
        const response = await axios.get(`${URL}/user/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUserData(response.data.data); // Adjust as per your API response structure
      } catch (err) {
        setError("Failed to fetch user data.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="profile-container">
      <h1>Profile Page</h1>
      <div className="profile-card">
        <img
          src={userData?.profilePhoto || customPlaceholder}
          alt="Profile"
          className="profile-photo"
        />

        <h2>{userData?.name}</h2>
        <p>
          <strong>Email:</strong> {userData?.email}
        </p>
        <p>
          <strong>Phone Number:</strong> {userData?.number}
        </p>
        <p>
          <strong>Date of Birth:</strong>{" "}
          {new Date(userData?.dob).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

export default Profile;
