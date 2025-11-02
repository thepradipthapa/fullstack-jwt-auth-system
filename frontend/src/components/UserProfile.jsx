function UserProfile({profile}) {

  return (
    <div className="card bg-dark text-light p-3 mb-4">
      <h5 className="mb-3">User Profile</h5>
      <p><strong>Id:</strong> {profile?.id}</p>
      <p><strong>Name:</strong> {profile?.name}</p>
      <p><strong>Email:</strong> {profile?.email}</p>
    </div>
  );
}

export default UserProfile;
