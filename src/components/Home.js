import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, InputGroup, Button, Card } from "react-bootstrap";
import API_image from "../images/API_image.webp";

const Home = () => {
  const [Username, setUsername] = useState("");
  const navigate = useNavigate();

  function fetchProfile() {
    navigate(`/${Username}`);
  }

  return (
    <div className="bg-secondary w-100 min-vh-100 d-flex justify-content-center align-items-center flex-column">
      <Card style={{ width: "20rem" }}>
        <Card.Img variant="top" src={API_image} />
        <Card.Body style={{ textAlign: "center" }}>
          <Card.Title style={{ textAlign: "left" }}>
            GitHub Profile Viewer
          </Card.Title>
          <InputGroup className="mt-4 mb-4 w-100">
            <InputGroup.Text id="userInput">@</InputGroup.Text>
            <Form.Control
              placeholder="Username"
              aria-label="Username"
              onChange={(event) => setUsername(event.currentTarget.value)}
              value={Username}
            />
          </InputGroup>
          <Button
            className="mb-3"
            variant="success"
            onClick={(event) => {
              event.preventDefault();
              fetchProfile();
            }}
          >
            Get Profile
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Home;
