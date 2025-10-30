import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="text-center text-light bg-dark vh-100 d-flex flex-column justify-content-center align-items-center">
      <h1 className="display-1">404</h1>
      <p className="lead">Oops! The page you’re looking for doesn’t exist.</p>
      <Link to="/" className="btn btn-danger mt-3">
        Go Back Home
      </Link>
    </div>
  );
}
