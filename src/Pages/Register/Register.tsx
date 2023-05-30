import { useState,FormEvent } from "react"
import { useDispatch } from "react-redux";
import { register,  User} from "../../features/users-slice";
import { AppDispatch } from "../../app/store";


function Register() {
  const [user, setUser] = useState<User>({
    userName:'',
    email:'',
    password:''
  })

  const dispatch: AppDispatch = useDispatch();

  function registerUser(e: FormEvent<HTMLFormElement>){
    e.preventDefault();
    dispatch(register({user}));
  }
  return (
    <div>
      <form
        action=""
        onSubmit={registerUser}
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
            setUser((prev) => ({ ...prev, userName: e.target.value }))
          }
          placeholder="username"
        />
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
        <button>register</button>
      </form>
    </div>
  )
}

export default Register