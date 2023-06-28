import React from "react";
import { UseSelector, useSelector } from "react-redux/es/hooks/useSelector";
import { useDispatch } from "react-redux";
import { setCount } from "../redux/slices/countSlice";

const Input = (): React.JSX.Element => {
  //   const count = useSelector((state: any) => state.count.count);
  const dispatch = useDispatch();

  const handleCount = (e: any) => {
    e.preventDefault();
    dispatch(setCount(e.target.count.value));
  };

  return (
    <>
      <form onSubmit={handleCount}>
        <input type="number" name="count" />
        <input type="submit" />
      </form>
    </>
  );
};

export default Input;
