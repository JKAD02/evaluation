import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { login, logOut } from "../Redux/actions";

export const Login = () => {
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });
  const [fil, setFil] = useState();
  const dispatch = useDispatch();
  const nav = useNavigate();

  const handleLogin = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    axios.get("http://localhost:8080/users").then((data) => {
      const filterData = data.data.filter((e) => {
        return e.username == loginData.username && e.pass == loginData.password;
      });
      setFil(filterData);
    });
  }, [loginData]);

  const submitData = () => {
    if (fil.length > 0) {
      dispatch(login());
    }
    fil.map((e) => (e.username == "admin" ? nav("/orders") : nav("/neworder")));
  };
  return (
    <div>
      <input
        className='username'
        type='text'
        name='username'
        placeholder='Enter Username'
        onChange={handleLogin}
      />
      <input
        className='password'
        type='password'
        name='password'
        placeholder='Enter password'
        onChange={handleLogin}
      />
      {/* On this button click make network req to find user with same username and password */}
      {/* get his role, if role is `admin` take him to `/orders` page otherwise take him to `/neworder` */}
      <button className='submit' onClick={submitData}>
        Login
      </button>
    </div>
  );
};
