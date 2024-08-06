import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const Home = () => {
  const { logout } = useAuth();
  const handleLogout = async () => {
    logout();
  };

  return (
    <>
      <div>Welcome Users, Please select one option</div>
      <span>
        You can go <Link to="/users">manage users menu</Link>{" "}
      </span>
      <span className="d-block">
        Or you can{" "}
        <Button
          type="button"
          variant="primary"
          className="btn-sm"
          onClick={() => handleLogout()}
        >
          Logout
        </Button>
      </span>
    </>
  );
};

export default Home;
