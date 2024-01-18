// Autor: Sbenduel
import { Link } from "react-router-dom";
import { useState } from "react";
import axios, { AxiosError } from "axios";
import { useSignIn } from "react-auth-kit";
import { useFormik } from "formik";
axios.defaults.baseURL = "http://localhost/";

export const Login = (/*props: any | undefined*/) => {
  const [, setError] = useState("");
  const signIn = useSignIn();

  const onSubmit = async (values: any) => {
    console.log("Valori inviati: ", values); // Log dei valori inviati
    setError("");

    try {
      console.log("Inizio richiesta di login"); // Prima della richiesta
      const response = await axios.post("api/login", values);
      console.log("Risposta ricevuta: ", response); // Dopo aver ricevuto la risposta

      signIn({
        token: response.data.token,
        expiresIn: 3600,
        tokenType: "Bearer",
        authState: { email: values.email },
      });
      console.log("Login eseguito con successo"); // Dopo il login
    } catch (err) {
      console.log("Errore durante il login: ", err); // In caso di errore
      if (err && err instanceof AxiosError) {
        setError(err.response?.data.message);
        console.log("Dettagli errore Axios: ", err.response?.data);
      } else if (err && err instanceof Error) {
        setError(err.message);
        console.log("Errore generico: ", err.message);
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
        <h1 className="text-zinc-800 text-3xl font-bold text">
          Difenditi dai seccatori
        </h1>
        <p className=" mt-6 text-neutral-600 mb-4">Scegli un opzione</p>
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
            ></input>
          </div>
          <div className="mb-12">
            <input
              name="password"
              type="password"
              onChange={formik.handleChange}
              value={formik.values.password}
              id="password"
              className="w-full px-4 py-5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300"
              required
              placeholder="Password"
            ></input>
            <p className="block text-right text-xs">
              Password dimenticata?
              <Link to="/register" className="text-[#4F709C]">
                Fatti un altro account
              </Link>
            </p>
          </div>
          <button
            disabled={formik.isSubmitting}
            type="submit"
            className="w-[80%] text-white bg-gradient-to-r from-blue-700 to-[#112D4E] py-2 rounded-lg mx-auto block focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 mt-4 mb-6"
          >
            Accedi
          </button>
          <p className=" text-sm text-neutral-800">Non hai un account? </p>
          <Link to="/register">
            <button className="w-[80%] bg-gradient-to-r from-yellow-300 to-yellow-400 py-2 rounded-lg mx-auto block focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 mt-4 mb-6">
              Registrati
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
};
