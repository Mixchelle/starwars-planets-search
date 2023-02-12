import React from 'react';
import logo from '../imagem/1.gif.crdownload';

export default function Header() {
  return (
    <header>
      <img src={ logo } alt="Logo" className="header__logo" />
    </header>
  );
}
