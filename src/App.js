import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  NavLink,
  Redirect,
  Link,
} from "react-router-dom";
import Route from "react-router-dom/Route";

import axios from "axios";
import Home from "./Home";

function App() {
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [loggedin, setloggedin] = useState(false);
  const [RegisterNow, setRegisterNow] = useState(false);
  const RegisterNows = () => {
    setRegisterNow(!RegisterNow);
  };

  function Register() {
    const [file, setFile] = useState();
    const [fileName, setFileName] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setpassword] = useState("");

    const saveFile = (e) => {
      setFile(e.target.files[0]);
      setFileName(e.target.files[0].name);
    };

    const Registers = async (e) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("fileName", fileName);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      if (fileName === "") {
        alert("Please Add Image First");
      } else if (name === "" || email === "" || password === "") {
        alert("Please Fill All The Fields");
      } else {
        try {
          const res = await axios.post(
            "http://localhost:3001/userss",
            formData
          );
          console.log(res);
          setloggedin(true);
        } catch (ex) {
          console.log(ex);
          alert("Error While Uploading");
        }
      }
    };

    return (
      <div className="Register">
        <ul>
          <li>
            <h1>Register</h1>
          </li>
          <li>
            {" "}
            <input
              placeholder="username"
              type="text"
              value={name}
              name="name"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </li>{" "}
          <li>
            {" "}
            <input
              placeholder="email"
              type="text"
              value={email}
              name="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </li>
          <li>
            <input
              placeholder="password"
              type="text"
              value={password}
              name="password"
              onChange={(e) => {
                setpassword(e.target.value);
              }}
            />{" "}
          </li>
          <li>
            <label className="upload" htmlFor="file">
              Upload Image
            </label>
            <input
              id="file"
              name="file"
              type="file"
              onChange={saveFile}
              hidden
            />
          </li>
          <li>
            <button class="Button" onClick={Registers}>
              Register
            </button>
          </li>
          <a
            href="#"
            class="Link"
            value={RegisterNow ? "Go To Login" : "Create New Account"}
            onClick={RegisterNows}
          >
            Already User ?
          </a>
        </ul>
      </div>
    );
  }

  const Login = () => {
    return (
      <Router>
        <div className="Login">
          <Route path="/home" exact strict component={Home} />

          <ul>
            <li>
              <h1>Login</h1>
            </li>
            <li>
              {" "}
              <input
                placeholder="email"
                type="text"
                value={email}
                name="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </li>
            <li>
              {" "}
              <input
                placeholder="password"
                type="text"
                value={password}
                name="password"
                onChange={(e) => {
                  setpassword(e.target.value);
                }}
              />
            </li>
            <li>
              {" "}
              <button class="Button" onClick={Logins}>
                SignIn
              </button>
            </li>
            <li>
              {" "}
              <a
                class="Link"
                href="#"
                value={RegisterNow ? "Go To Login" : "Create New Account"}
                onClick={RegisterNows}
              >
                Create New
              </a>
            </li>
          </ul>
        </div>
      </Router>
    );
  };
  const Logins = async (e) => {
    try {
      const res = await axios
        .post("http://localhost:3001/usersd", {
          email: email,
          password: password,
        })
        .then((data) => {
          console.log(data.data.length);
          if (data.data.length === 0) {
            console.log("invalid Data Plz Enter Correct Password/Email");
          } else if (data.data.length >= 1) {
            setloggedin(true);
          }
        });
    } catch (ex) {
      console.log(ex);
    }
  };

  return (
    <div className="Login">
      <Router>
        <Route path="/home" exact strict component={Home} />

        {loggedin ? (
          <Redirect to="/home" exact />
        ) : RegisterNow ? (
          <Register />
        ) : (
          <Login />
        )}
      </Router>
    </div>
  );
}
export default App;
