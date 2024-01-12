import { Link } from "react-router-dom";

// Autor: Smanuel
export const Register = (/*props: any*/) => {
  return (
    <div className="flex items-center justify-center pt-8">
      <div className="max-w-[34rem] w-full p-[4rem] bg-white rounded-lg shadow-lg">
        <h1 className="text-zinc-800 text-3xl font-bold text text-center">
          Martinator
        </h1>
        <p className=" mt-6 text-neutral-600">Un tool aziendale</p>
        <p className="mb-6 text-neutral-600">Una sicurezza essenziale</p>
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
          </div>
          <button
            type="submit"
            className="w-32 bg-gradient-to-r from-yellow-300 to-yellow-400 py-2 rounded-lg mx-auto block focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 mt-4 mb-6"
          >
            Registrati
          </button>
        </form>
        <div className="text-center">
          <p className="text-sm text-neutral-600">
            Hai già un account?
            <Link to="/login" className="text-[#4F709C]">
              Vai al login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
