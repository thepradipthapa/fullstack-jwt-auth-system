function UserProfile() {
  const user = {
    name: "Jane Doe",
    email: "jane@example.com",
    role: "Member"
  };

  return (
    <div className="card bg-dark text-light p-3 mb-4">
      <h5 className="mb-3">User Profile</h5>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Role:</strong> {user.role}</p>
    </div>
  );
}

export default UserProfile;
