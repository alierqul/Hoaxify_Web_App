import React from "react";

const Input = (props)=>{
    const {label,error,name,onChange,type,defaultValue} = props
    const className=error ? 'form-control is-invalid' : 'form-control' ;
    
    return (
    <div className="form-group">
        <label className="form-label">{label}</label>
        <input  className={className}  name={name} type={type} onChange={onChange} defaultValue={defaultValue}/>   
        <div className="invalid-feedback">{error} </div>              
    </div>

    )
}

export default Input;
