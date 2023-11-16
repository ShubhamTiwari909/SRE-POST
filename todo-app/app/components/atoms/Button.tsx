import React from 'react'

type Button = {
    type?:"button" | "submit" | "reset" | undefined;
    children:string | React.JSX.Element;
    className?:string,
    onClick?:(event:React.MouseEvent<HTMLButtonElement>) => any
}

const defaultStyle = "px-4 py-2 rounded-full"

const Button = ({type="button",children,className=defaultStyle,onClick}:Button) => {
  return (
    <button type={type} className={className} onClick={onClick}>{children}</button>
  )
}

export default Button