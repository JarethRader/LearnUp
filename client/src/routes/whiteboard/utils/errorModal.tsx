import React from "react";
import { Link } from "react-router-dom";

interface Props {
  error: IError;
  clearErrors: () => { type: string };
}

const ErrorModal = (props: Props) => {
  return (
    <div className="bg-white border-black border-2 rounded-lg shadow-2xl">
      <div className=" bg-red-600 rounded-t-md py-1 font-bold">
        <h1 className="text-center">Error</h1>
      </div>
      <div className="px-4 py-2 flex-col">
        <p className="pb-4">{props.error.msg}</p>
        <Link
          to="/dashboard"
          className="py-1 bg-blue-500 hover:bg-blue-700 rounded-md flex justify-center"
          onClick={props.clearErrors}
        >
          Return to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default ErrorModal;
