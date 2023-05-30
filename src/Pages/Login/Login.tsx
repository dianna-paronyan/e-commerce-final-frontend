import { useState,FormEvent } from "react"
import { useDispatch } from "react-redux";
import { login, LoginPayload } from "../../features/users-slice";
import { AppDispatch } from "../../app/store";


function Login() {
  const [user, setUser] = useState<LoginPayload>({
    email:'',
    password:''
  })

  const dispatch: AppDispatch = useDispatch();

  function loginUser(e: FormEvent<HTMLFormElement>){
    e.preventDefault();
    dispatch(login({user}));
  }
  return (
    <div>
      <form
        action=""
        onSubmit={loginUser}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "5px",
        }}
      >
        <input
          type="text"
          onChange={(e) =>
            setUser((prev) => ({ ...prev, email: e.target.value }))
          }
          placeholder="email"
        />
        <input
          type="password"
          onChange={(e) =>
            setUser((prev) => ({ ...prev, password: e.target.value }))
          }
          placeholder="password"
        />
        <button>login</button>
      </form>
    </div>
  )
}

export default Login