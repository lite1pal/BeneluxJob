import React from "react";
import { useSelector } from "react-redux";

const Output = (): React.JSX.Element => {
  const count = useSelector((state: any) => state.count.count);
  return (
    <>
      <p>{count}</p>
    </>
  );
};

export default Output;
