import React from 'react';
import logo from '../imagem/2.jpg';

export default function Header() {
  return (
    <header>
      <img src={ logo } alt="Logo" className="header__logo" />
    </header>
  );
}
