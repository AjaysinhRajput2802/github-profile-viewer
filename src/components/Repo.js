import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Loading from "./Loading";

const style = {
  display: "inline-block",
  backgroundColor: "#085454",
  borderRadius: "5px",
  margin: "4px 4px",
  padding: "0px 2px",
  color: "white",
};

const Repo = ({ project, setError404, setErrorAPI, loading, setLoading }) => {
  const [Languages, setLanguages] = useState([]);

  useEffect(() => {
    const LangURL = project.languages_url;
    setLoading(true);
    fetch(LangURL)
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          if (data.message.substring(0, 9) === "API rate ") setErrorAPI(true);
          else if (data.message.substring(0, 9) === "Not Found")
            setError404(true);
        } else {
          const prop = Object.getOwnPropertyNames(data);
          var array = prop;
          if (prop.length > 4) {
            array = prop.slice(0, Math.min(prop.length, 4));
            array.push("Other");
          }
          var list = array.map((item) => (
            <span style={style} key={item}>
              {item}
            </span>
          ));
          //console.log("send API request");
          setLanguages(list);
        }
      });
    setLoading(false);
  }, [project, setError404, setErrorAPI, setLoading]);

  return (
    <div>
      {loading ? (
        <Loading loading={loading}/>
      ) : (
        <Card style={{ maxWidth: "500px" }}>
          <Card.Body>
            <a
              href={project.html_url}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none" }}
            >
              <Card.Title style={{ color: "#085454" }}>
                {project.name}
              </Card.Title>
            </a>
            <Card.Text style={{ minHeight: "50px" }}>
              {project.description}
            </Card.Text>
            <div style={{ minHeight: "30px" }}>
              {Languages.map((item) => (
                <span style={style} key={Languages.indexOf(item)}>
                  {item}
                </span>
              ))}
            </div>
          </Card.Body>
        </Card>
      )}
    </div>
  );
};

export default Repo;
