import React from "react";

function Alerts(props) {
    const {type,msg}=props;
  return (
    <>
      <div className={type} role="alert">
        {msg}
      </div>
    </>
  );
}

export default Alerts;