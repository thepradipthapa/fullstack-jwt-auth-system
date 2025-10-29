import UserProfile from "./UserProfile";
import ChangePassword from "./ChangePassword";

function Dashboard() {
  return (
    <div className="container mt-5">
      <h2 className="text-center text-light mb-4">Dashboard</h2>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <UserProfile />
          <ChangePassword />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
