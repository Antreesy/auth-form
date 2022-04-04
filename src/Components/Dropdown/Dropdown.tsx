import React, { useEffect, useState } from 'react';
import c from './dropdown.module.scss'

interface IProps {
  button: React.ReactNode;
  children: React.ReactNode;
  isOpen?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
}

// eslint-disable-next-line @typescript-eslint/no-empty-function
const NOOP = () => {};

export function Dropdown(props: IProps) {
  const {button, children, isOpen, onOpen = NOOP, onClose = NOOP} = props;

  const [isDropdownOpen, setIsDropdownOpen] = useState(isOpen)

  useEffect(() => setIsDropdownOpen(isOpen), [isOpen])

  useEffect(() => isDropdownOpen ? onOpen() : onClose(), [isDropdownOpen])

  const handleOpen = () => {
    if (isOpen === undefined) setIsDropdownOpen(!isDropdownOpen)
  }

  return (
    <div className={c.container}>
      <div onClick = {handleOpen}>
        {button}
      </div>
      {isDropdownOpen && (
        <div className={c.listContainer}>
          <div className={c.list} onClick={() => setIsDropdownOpen(false)}>
            {children}
          </div>
        </div>
      )}
    </div>
  );
}
