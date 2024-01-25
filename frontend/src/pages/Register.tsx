// Author: Sbenduel

import axios, { AxiosError } from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { useSignIn } from "react-auth-kit";
import { Link, useNavigate } from "react-router-dom";

type FormValues = {
  email: string;
  password: string;
};

export const Register: React.FC = () => {
  const navigate = useNavigate();
  const signIn = useSignIn();
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<boolean>(false);
  const onSubmit = async (values: FormValues) => {
    console.log("Valori inviati: ", values); // Log dei valori inviati

    try {
      console.log("Inizio richiesta di register"); // Prima della richiesta
      const response = await axios.post("http://localhost/api/register", values);
      console.log("Risposta ricevuta: ", response); // Dopo aver ricevuto la risposta

      signIn({
        token: response.data.token,
        expiresIn: 3600,
        tokenType: "Bearer",
        authState: { email: values.email },
      });
      console.log("Registrazione eseguita con successo");
      navigate("/");
    } catch (err) {
      console.log("Errore durante il register: ", err); // In caso di errore
      // Questa if dice che se c'è un errore di Axios e se questo errore non è dovuto ad una mancata risposta da parte del server fai:
      if (err && err instanceof AxiosError && err.response?.data.errors) {
        if ("DuplicateUserName" in err.response.data.errors)
          setEmailError(true);
        else setPasswordError(true);
      } else if (err && err instanceof Error) {
        console.log("Errore: ", err.message);
      }
    }
  };
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit,
  });

  return (
    <div className="flex items-center justify-center pt-8">
      <div className="max-w-[34rem] w-full p-[4rem] bg-white rounded-lg shadow-lg">
        <h1 className="text-zinc-800 text-3xl font-bold text text-center">
          Martinator
        </h1>
        <p className="mt-6 text-neutral-600">Registrati subito</p>
        <p className="mb-6 text-neutral-600">
          Se non vuoi avere brutte sorprese
        </p>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <input
              name="email"
              value={formik.values.email}
              type="email"
              onChange={formik.handleChange}
              className="w-full px-4 py-5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300"
              required
              placeholder="Email"
            />
            {emailError && (
              <p className="text-red-600 mt-2 Gelion">Email già in uso</p>
            )}
          </div>
          <div className="mb-12">
            <input
              name="password"
              type="password"
              onChange={formik.handleChange}
              value={formik.values.password}
              className="w-full px-4 py-5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300"
              required
              placeholder="Password"
            />
            {passwordError && (
              <>
                <h6 className="text-red-600 mt-2 Gelion">
                  Attenzione! La password deve avere:
                </h6>
                <ul className="text-red-600  Gelion">
                  <li>Almeno 6 caratteri</li>
                  <li>Un lettera minuscola 'a'-'z'</li>
                  <li>Una lettera maiscola 'A'-'Z'</li>
                  <li>Un numero '0'-'9'</li>
                  <li>Un carattere speciale '!' '?' '#'</li>
                </ul>
              </>
            )}
          </div>
          <button
            disabled={formik.isSubmitting}
            type="submit"
            className="w-[80%] bg-gradient-to-r from-yellow-300 to-yellow-500 py-2 rounded-lg mx-auto block focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 mt-4 mb-6"
          >
            Registrati
          </button>
        </form>
        <div className="text-center">
          <p className="text-sm text-neutral-600">
            Hai già un account?
            <Link to="/login" className="text-[#4F709C] pl-1">
              Vai al login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
