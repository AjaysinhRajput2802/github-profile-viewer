import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { API_URL } from "../config";
import Repo from "./Repo";
import "./User.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fab, faGithub, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import Pagination from "./Pagination";
import {
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBTypography,
} from "mdb-react-ui-kit";
import Error404Page from "./Error404Page";
import ErrorAPIPage from "./ErrorAPIPage";
import Loading from "./Loading";

library.add(fab, faHome, faGithub, faTwitter);

const CSS = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
  gridGap: "2rem",
};

const User = () => {
  const { username } = useParams();
  const [loading, setLoading] = useState(false);
  const [Error404, setError404] = useState(false);
  const [ErrorAPI, setErrorAPI] = useState(false);
  const [Repos, setRepos] = useState([]);
  const [User, setUser] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [noPages, setNoPages] = useState(1);
  const navigate = useNavigate();
  const API = `${API_URL}${username}`;

  const goHome = (event) => {
    event.preventDefault();
    navigate("/");
  };

  useEffect(() => {
    const RepoURL = `${API}/repos?page=${currentPage}&per_page=10`;
    setLoading(true);
    fetch(API)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.message);
        if (data.message) {
          if (data.message.substring(0, 9) === "API rate ") setErrorAPI(true);
          else if (data.message.substring(0, 9) === "Not Found")
            setError404(true);
        } else {
          setNoPages(Math.max(1, Math.ceil(data.public_repos / 10)));
          setUser(data);
        }
      });
    fetch(RepoURL)
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          if (data.message.substring(0, 9) === "API rate ") setErrorAPI(true);
          else if (data.message.substring(0, 9) === "Not Found")
            setError404(true);
        } else setRepos(data);
      });
    setLoading(false);
  }, [API, currentPage]);

  if (Error404) return <Error404Page goHome={goHome}/>;
  if (ErrorAPI) return <ErrorAPIPage goHome={goHome}/>;

  return (
    <div>
      {loading ? (
        <Loading loading={loading} />
      ) : (
        <div className="gradient-custom-2">
          <MDBContainer className="py-5 h-100">
            <MDBRow className="justify-content-center align-items-center h-100">
              <MDBCard>
                <div
                  className="rounded-top text-white d-flex flex-row"
                  style={{
                    backgroundColor: "#085454",
                    height: "200px",
                    marginTop: "12px",
                  }}
                >
                  <div
                    className="ms-4 mt-5 d-flex flex-column"
                    style={{ width: "150px" }}
                  >
                    <MDBCardImage
                      src={User.avatar_url}
                      alt="Generic placeholder image"
                      className="mt-4 mb-2 img-thumbnail"
                      fluid
                      style={{ width: "150px", zIndex: "1" }}
                    />
                  </div>
                  <div
                    className="ms-3"
                    style={{ marginTop: "100px", marginBottom: "5px" }}
                  >
                    <MDBTypography tag="h5">{User.name}</MDBTypography>
                    <MDBCardText>{User.location}</MDBCardText>
                  </div>
                  <div
                    style={{
                      marginLeft: "auto",
                      marginRight: "4px",
                      cursor: "pointer",
                    }}
                    className="p-2"
                    onClick={goHome}
                  >
                    <FontAwesomeIcon icon="home" />
                  </div>
                </div>
                <div
                  className="p-4 text-black d-flex flex-row"
                  style={{ backgroundColor: "#f8f9fa", flexWrap: "wrap" }}
                >
                  <div
                    style={{
                      marginRight: "auto",
                      display: "inline",
                    }}
                    className="p-2 d-flex justify-content-center flex-column"
                  >
                    <div className="m-1">
                      <FontAwesomeIcon icon={["fab", "github"]} />
                      <a
                        href={User.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          textDecoration: "none",
                          color: "black",
                          marginLeft: "5px",
                          cursor: "pointer",
                        }}
                      >
                        {User.html_url}
                      </a>
                    </div>
                    {User.twitter_username ? (
                      <div className="m-1">
                        <FontAwesomeIcon icon={["fab", "twitter"]} />{" "}
                        <a
                          href={`https://twitter.com/${User.twitter_username}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            textDecoration: "none",
                            color: "black",
                            cursor: "pointer",
                          }}
                        >
                          @{User.twitter_username}
                        </a>
                      </div>
                    ) : (
                      <div></div>
                    )}
                  </div>
                  <div className="d-flex rounded border border-secondary justify-content-center text-center p-3 m-2">
                    <div>
                      <MDBCardText className="mb-1 h5">
                        {User.public_repos}
                      </MDBCardText>
                      <MDBCardText className="small text-muted mb-0">
                        Repositories
                      </MDBCardText>
                    </div>
                    <div className="px-3">
                      <MDBCardText className="mb-1 h5">
                        {User.followers}
                      </MDBCardText>
                      <MDBCardText className="small text-muted mb-0">
                        Followers
                      </MDBCardText>
                    </div>
                    <div>
                      <MDBCardText className="mb-1 h5">
                        {User.following}
                      </MDBCardText>
                      <MDBCardText className="small text-muted mb-0">
                        Following
                      </MDBCardText>
                    </div>
                  </div>
                </div>
                <MDBCardBody className="text-black p-4">
                  <div className="mb-5">
                    <p className="lead fw-normal mb-1">Bio</p>
                    <div className="p-4" style={{ backgroundColor: "#f8f9fa" }}>
                      <MDBCardText className="font-italic mb-1">
                        {User.bio}
                      </MDBCardText>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <MDBCardText className="lead fw-normal mb-0">
                      Repositories
                    </MDBCardText>
                  </div>
                  {loading ? (
                    <Loading loading={loading} />
                  ) : (
                    <div style={CSS}>
                      {Repos.map((item) => (
                        <Repo
                          project={item}
                          setError404={setError404}
                          setErrorAPI={setErrorAPI}
                          loading={loading}
                          setLoading={setLoading}
                          key={item.name}
                        />
                      ))}
                    </div>
                  )}
                </MDBCardBody>
                <MDBRow>
                  <Pagination
                    noPages={noPages}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                  />
                </MDBRow>
              </MDBCard>
            </MDBRow>
          </MDBContainer>
        </div>
      )}
    </div>
  );
};

export default User;
