// Layout.js
import React, { useState, useRef, useEffect } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Footer from "./Footer";
import { useOutsideClick } from "../../hooks/useOutsideClick";

const Layout = ({ children, title }) => {
  const [check, setCheck] = useState(false);
  const [loading, setLoading] = useState(true);
  const ref = useRef();

  useOutsideClick(ref?.current, () => {
    if (check) {
      setCheck(false);
    }
  });

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000); // 1 second delay
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col min-h-screen overflow-hidden h-full">
      <div className="flex flex-grow">
        <Sidebar check={check} setCheck={setCheck} forwardRef={ref} />
        <div className="flex flex-col w-full xl:ml-[18rem] lg:ml-[14rem]">
          <Header check={check} setCheck={setCheck} />

          {loading ? (
            <div className="flex justify-center items-center h-screen">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
            </div>
          ) : (
            <div className="flex-grow">
              <h1 className="text-2xl font-bold my-4">{title}</h1>{" "}
              {/* Dynamic page title */}
              {children}
            </div>
          )}

          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Layout;
