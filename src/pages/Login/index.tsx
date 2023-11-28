import { FC, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
// import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from 'react-redux'
// import { login } from "../../store/slices/auth";
// import Spinner from "../../components/Spinner";
// import styles from "./Login.module.scss";

type LoginProps = {
  username: string
  password: string
}

const Login: FC = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch<any>()
  // const { data, status } = useSelector((state: any) => state.auth)

  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm<LoginProps>();

  useEffect(() => {
    if (localStorage.getItem('auth-token')) {
      navigate('/')
    }
  }, [])

  // const onSubmit = async (val: LoginProps) => {
  //   const res = await dispatch(login(val));
  //   if (res?.payload?.accessToken) {
  //     localStorage.setItem("auth-token", res?.payload?.accessToken);
  //     localStorage.setItem("refresh-token", res?.payload?.refreshToken);
  //     localStorage.setItem("display-name", res?.payload?.displayName);
  //     navigate("/");
  //   }
  // };

  const required = 'Поле обязательно для заполнения'

  return <div>Login</div>
}

export default Login
