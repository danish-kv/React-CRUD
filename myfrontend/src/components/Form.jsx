import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import api from "../api";
import '../styles/Form.css'
import LoadingIndicator from "./LoadingIndicator";


const Form = ({ route, method }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [Loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const name = method === "login" ? "Login" : "Register";

  const handleSubmit = async (e) => {
    setLoading(true)
    e.preventDefault();

    try {
      console.log(username,password);
        const res = await api.post(route, {username, password})
        if (method === "login") {
          console.log('jhhihihihi')
          localStorage.setItem(ACCESS_TOKEN, res.data.access);
          localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
          console.log('jhhihihihi')
            navigate("/")
        } else {
            navigate("/login")
        }
    } catch (error) {
      console.log(error);
        alert(error)
    } finally {
        setLoading(false)
    }
};


  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h1>{name}</h1>
      <input
        type="text"
        className="form-input"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <input
        type="password"
        className="form-input"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      {Loading && <LoadingIndicator />}
      <button type="submit" className="form-button" >Submit</button>
    </form>
  );
};

export default Form;
