import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { login } from "../features/user/user";

export const useCheckToken = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      dispatch(login(JSON.parse(user)));
    }
  }, [dispatch]);
};
