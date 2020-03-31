import React, { Component } from "react";
import Sidebar from "./component/siderbar";
import Maps from "./component/maps";
class App extends Component {
  render() {
    return (
      <div>
        <div className="App">
          <Sidebar />
          <Maps />
        </div>
      </div>
    );
  }
}

export default App;
