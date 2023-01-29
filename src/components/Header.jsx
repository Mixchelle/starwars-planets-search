import React from 'react';
import logo from '../imagem/logo.png';

export default function Header() {
  return (
    <header>
      <img src={ logo } alt="Logo" className="header__logo" />
    </header>
  );
}
