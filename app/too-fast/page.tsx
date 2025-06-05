import React from "react";

const page = () => {
  return (
    <main className="flex flex-col items-center justify-center h-screen bg-gradient-to-r root-container">
      <div className="mx-auto w-full max-w-2xl text-center">
        <h1 className="uppercase font-bebas-neue text-5xl text-light-200">
          whoa, slow down there, flash!!!
        </h1>
        <p className="text-white mt-5">
          Looks like you are trying to access a page too fast. Please wait a
          moment and try again. If you are using a bot, please slow down your
          requests to avoid being blocked.
        </p>
      </div>
    </main>
  );
};

export default page;
