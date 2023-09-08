import { Button, ThemeProvider } from "@mui/material";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import TextInput from "../../common/components/text-input";
import { theme } from "../../common/utils/theme-for-provider";
import { login } from "./login.api";
import Snackbar from "../../common/components/snackbar";

type FormValues = {
  login: string;
  password: string;
};

type ApiError = {
  message: string;
  response: {
    data: {
      message: string;
      statusCode: number;
    };
  };
};

const Login = () => {
  const [openErrorSnackbar, setOpenErrorSnackbar] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const navigate = useNavigate();
  const { control, handleSubmit } = useForm<FormValues>();
  const { mutate, isSuccess } = useMutation(login, {
    onSuccess: data => {
      const token = data.token;
      localStorage.setItem("token", token);
    },
    onError: (error: ApiError) => {
      if (error.response.data.statusCode === 401) {
        setErrorMessage("Niepoprawne dane logowania");
      } else {
        setErrorMessage(error.message);
      }
      setOpenErrorSnackbar(true);
    },
  });

  const onSubmit = (body: FormValues) => {
    if (isSuccess) {
      navigate("/");
    }
    mutate(body);
  };

  return (
    <div className='bg-[url("../public/img/login-bg.png")] bg-cover bg-center h-screen w-screen'>
      <div className='container h-screen flex items-center justify-center '>
        <div className='bg-white w-full max-w-[500px] h-auto flex flex-col items-center justify-center bg-red-200 rounded-2xl shadow-2xl shadow-gray-700 p-5'>
          <h1 className='text-primary600 text-6xl font-bold font-qwitcher pb-4'>
            My Recipes
          </h1>
          <h2 className='text-2xl font-montserrat pb-2'>Zaloguj się</h2>
          <p className='text-black text-sm pb-2'>
            Pomysły kulinarne bez końca?
          </p>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className='flex flex-col w-full'>
            <ThemeProvider theme={theme}>
              <div className='my-3'>
                <TextInput
                  name='login'
                  control={control}
                  rules={{ required: true }}
                  label='Nazwa użytkownika'
                  color='primary'
                />
              </div>
              <div className='my-3'>
                <TextInput
                  name='password'
                  color='primary'
                  type='password'
                  label='Hasło'
                  control={control}
                  rules={{ required: true }}
                />
              </div>
              <Button
                type='submit'
                sx={{ mt: 2 }}
                color='primary'
                variant='contained'>
                Zaloguj się
              </Button>
            </ThemeProvider>
          </form>
        </div>
      </div>
      <Snackbar
        open={openErrorSnackbar}
        message={errorMessage}
        handleClose={() => setOpenErrorSnackbar(false)}
      />
    </div>
  );
};

export default Login;
