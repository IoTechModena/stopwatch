import {
  withAuthenticationRequired,
  WithAuthenticationRequiredOptions,
} from "@auth0/auth0-react";
import { ComponentType } from "react";
import { BeatLoader } from "react-spinners";

type AuthenticationGuardProps = {
  component: ComponentType;
};

export const AuthenticationGuard: React.FC<AuthenticationGuardProps> = ({
  component,
}) => {
  const Component = withAuthenticationRequired(component, {
    onRedirecting: () => (
      <>
        <BeatLoader
          className="text-center my-10"
          color="#eab308"
          loading={true}
        />
      </>
    ),
  } as WithAuthenticationRequiredOptions);

  return <Component />;
};
