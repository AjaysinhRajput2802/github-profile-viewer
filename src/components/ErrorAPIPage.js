import React from "react";

const ErrorAPIPage = () => {
    return (
        <div className="d-flex flex-column align-items-center justify-content-center p-3" style={{backgroundColor:"#CACACA",width:"100vw",height:"100vh"}}>
          <h1>Oh! No, you have reached daily API rate Limit... </h1>
          <h1>Try after 1 hour :&#41;</h1>
        </div>
    );
};

export default ErrorAPIPage; 