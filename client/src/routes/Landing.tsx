import React from "react";

interface Props {
  Navbar: (props: any) => JSX.Element;
}

const Home = (props: Props) => {
  return (
    <div className="min-h-screen">
      <div className="flex justify-center flex-col">
        <props.Navbar />
        <div className="flex justify-center text-center py-20 flex-col">
          <h1 className="text-4xl font-bold text-yellow-500">Welcome!</h1>
          <p className="text-xl font-semibold">
            Teaching Struggling Readers to Read at Grade Level and Beyond
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
