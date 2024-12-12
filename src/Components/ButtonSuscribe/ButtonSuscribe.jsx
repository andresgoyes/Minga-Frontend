import React from 'react'
import './ButtonSuscribe.css'

export default function BotonSeccion1Hero1(props) {
  return (
    <a id="botonHero" href="/mangas">{props.text || props.children}</a>
  )
}