import React from 'react'

type Input = {
    placeholder:string;
    className?:string;
    value:string,
    onChange:(e:React.ChangeEvent<HTMLInputElement>) => void
}

const defaultStyle = "px-4 py-2 rounded-xl text-slate-900 border border-2 border-current"

const InputText = ({placeholder,className=defaultStyle,value,onChange}:Input) => {
    return (
        <input
            type="text"
            placeholder={placeholder}
            className={className}
            value={value}
            onChange={onChange}
        />
    )
}

export default InputText