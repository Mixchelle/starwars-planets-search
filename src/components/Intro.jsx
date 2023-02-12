import React from 'react';
import projectIntro from '../imagem/projectIntro.gif';

export default function Intro() {
  return (
    <div className="intro">
      <img src={ projectIntro } alt="Logo" className="introimg" />
    </div>
  );
}
