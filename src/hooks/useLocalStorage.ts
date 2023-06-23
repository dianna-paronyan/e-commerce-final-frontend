import { decodeToken } from "react-jwt";

interface Decoded {
  id: number | string | undefined;
  email: string;
  role: number;
  is_verified:number
}

function useLocalStorage() {
  const userInStorage = localStorage.getItem("user");
  const decoded: Decoded | null  = userInStorage ? decodeToken(JSON.parse(userInStorage)?.jwt) : null;

  return { decoded, userInStorage };
}

export default useLocalStorage;
