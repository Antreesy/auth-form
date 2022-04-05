import React, { useEffect, useState } from "react";

import c from "./toast.module.scss"

interface IProps {
  message: string;
}

const Toast = (props: IProps) => {
  const [open, setOpen] = useState(false)

  useEffect(()=>{
    setOpen(true);
    setTimeout(()=>{
      setOpen(false);
    },2000)
  }, [props.message])

  return (
    <div className={c.wrapper}>
      {open && <p className={c.message}>
          {props.message}
      </p>}
    </div>
  );
}

export default Toast