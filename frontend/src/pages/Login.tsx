// Autor: Sbenduel
import { Link } from "react-router-dom";

export const Login = () => {
  return (
    <div className="flex items-center justify-center pt-8">
      <div className="max-w-[34rem] w-full p-[4rem] bg-white rounded-lg shadow-lg">
        <h1 className="text-zinc-800 text-3xl font-bold text">
          Difenditi dai seccatori
        </h1>
        <p className=" mt-6 text-neutral-600 mb-4">Scegli un opzione</p>
        <form>
          <div className="mb-4">
            <input
              type="email"
              name="email"
              className="w-full px-4 py-5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300"
              required
              placeholder="Email"
            ></input>
          </div>
          <div className="mb-12">
            <input
              type="password"
              id="password"
              name="password"
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
