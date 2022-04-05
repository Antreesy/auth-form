import React, { useState } from 'react';
import Validation from '../../Methods/Validation';

import c from './textinput.module.scss';

interface IProps {
  label?: string;
  onChange: (value: string)=> void;
  value: string;
  type: "text" | "password";
  placeholder?: string;
  validateRules?: string | string[];
}

const TextInput = (props: IProps) => {
  const { label, value, onChange, type, placeholder, validateRules } = props;
  const [inputType, setInputType] = useState(type)
  const [error, setError] = useState('')

  const handleType = () => {
    setInputType(inputType === 'text' ? 'password' : 'text')
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    onChange(value)
    const validation = new Validation(validateRules || '', value);
    setError(validation.checkRules())
  }

  return (
    <label className={c.label}>
      <span className={c.labeltext}>{label}</span>
      {error && <span className={c.errortext}>{error}</span>}
      <div className={c.wrapper}>
        <input
          type={inputType}
          placeholder={placeholder}
          autoComplete="off"
          value={value}
          onChange={handleChange}
        />
        {type === 'password' && <div className={c.seePassword} onClick={handleType}></div>}
      </div>

  </label>
  );
};

export default TextInput;
