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

  return (
    isAuthenticated && (
      <>
        <img src={user?.picture ?? ""} alt={user?.name ?? ""} />
        <h2>{user?.name}</h2>
        <p>{user?.email}</p>
      </>
    )
  );
};

export default Profile;
