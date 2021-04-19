import React from "react";
import {
  ConnectionProvider,
  useConnection,
} from "../../context/connection/connectionContext";

interface Props {
  children: React.ReactNode;
}

const CommunicationWrapper = (props: Props) => {
  const { state, dispatch } = useConnection();

  return <ConnectionProvider>{props.children}</ConnectionProvider>;
};
