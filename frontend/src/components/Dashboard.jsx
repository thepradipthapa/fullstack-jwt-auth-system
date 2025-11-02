import UserProfile from "./UserProfile";
import ChangePassword from "./ChangePassword";
import { useState, useEffect } from "react";
import axiosInstance from "../axiosInstance";


function Dashboard() {
  const [profile, setProfile] = useState(null);
  useEffect(() => {
    const protectedDashboard = async () => {
      try {
        const response = await axiosInstance.get("/profile/");
        setProfile(response.data);
      } catch (error) {
        console.error("Error fetching protected dashboard:", error);
      }
    };

    protectedDashboard();
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="text-center text-light mb-4">Dashboard</h2>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <UserProfile profile={profile} />
          <ChangePassword />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
