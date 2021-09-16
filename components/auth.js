import React from "react";
import { useState } from "react";
import { useRouter } from 'next/router'
export default function Login() {
 const router = useRouter();
  const [user, setUser] = useState({
    token: "",
  });
  
  const { token } = user;
  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // Set your token in Local Storage :

  const onSubmit = async (e) => {
    e.preventDefault();
    localStorage.setItem("token", JSON.stringify(token));
    router.push('/write')
      
  };
  return (
    <div className="login-wrapper">
      <form onSubmit={(e) => onSubmit(e)}>
        <input
          type="text"
          name="token"
          value={token}
          onChange={(e) => onInputChange(e)}
        />
        <button type="submit">Validate your Token</button>
      </form>
    </div>
  );
}
