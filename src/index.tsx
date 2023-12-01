import React from "react";
import ReactDOM from "react-dom";
import "./index.less";
import "./index.scss";

const App = () => {
  const apple: number = 1;

  return <div className="wrap">hello word {apple}</div>;
};

ReactDOM.render(<App />, document.getElementById("root"));
