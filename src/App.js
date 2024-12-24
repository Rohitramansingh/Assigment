import logo from "./logo.svg";
import "./App.css";
import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./components/storage/store";
import Home from "./components/Home";
import Form from "./components/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navbar";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div style={{ background: "#e5e7eb47", width: "100vw" }}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Router>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/form" element={<Form />} />
              <Route path="/form/:id" element={<Form />} />
            </Routes>
          </Router>
        </PersistGate>
      </Provider>
      <ToastContainer />
    </div>
  );
}

export default App;
