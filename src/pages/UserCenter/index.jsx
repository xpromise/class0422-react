import React, { useEffect, useState } from "react";

import { reqVerifyLogin } from "@api/login";

export default function UserCenter({ history }) {
  const [user, setUser] = useState({});

  useEffect(() => {
    reqVerifyLogin()
      .then((res) => {
        // console.log(res);
        setUser(res);
      })
      .catch((err) => {
        // console.log(err);
        history.replace("/login");
      });
  }, []);

  return (
    <div>
      UserCenter...
      <p>{user.nickName}</p>
      {user.avatar && <img src={user.avatar} alt="avatar" />}
    </div>
  );
}
