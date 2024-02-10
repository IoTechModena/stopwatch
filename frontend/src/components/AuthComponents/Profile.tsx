import { useAuth0 } from "@auth0/auth0-react";

type user = {
  name: string;
  picture: string;
  email: string;
};

const Profile: React.FC = () => {
  const { user, isAuthenticated, isLoading } = useAuth0<user>();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return isAuthenticated ? (
    <>
      <div className="flex justify-start items-center size-fit">
        <img
          src={user?.picture ?? ""}
          alt={user?.name ?? ""}
          className="h-12 rounded-lg "
        />
        <div className="text-base font-bold text-white">
          {/*<p>{user?.name ?? "Chiunque tu sia"}</p>*/}
          <p>{user?.email ?? "Ue giacconss tutt a posttt"}</p>
        </div>
      </div>
    </>
  ) : (
    <div className="flex justify-start items-center">
      <i className="fa-solid fa-user mr-2" style={{ color: "#fff" }}></i>
      <p className="text-base font-bold text-white">Anonimo</p>
    </div>
  );
};

export default Profile;
