import React from 'react';
import { useStateContext } from '../StateProvider';
import './AboutPage.css';

export default function AboutPage() {
  const { user } = useStateContext();

  return (
    <div className="about-page">
      <div className="creator-info">
        <div className="avatar">{/* <img src= /> */}</div>

        <p className="username"> Will Gunderson </p>
        <p> github: https://github.com/willgundy </p>
        <p> linkedIn: https://www.linkedin.com/in/will-gunderson/ </p>
      </div>
      <div className="creator-info">
        <div className="avatar">
          <img src="/riley-headshot.jpeg" />
        </div>
        <p className="username"> Riley Hoffman </p>
        <p> github: https://github.com/rileyjhoff </p>
        <p> linkedIn: https://www.linkedin.com/in/riley-j-hoffman/ </p>
      </div>
      <div className="creator-info">
        <div className="avatar">{/* <img src= /> */}</div>
        <p className="username"> Delaney Fogarty </p>
        <p> github: https://github.com/delaneyfogarty </p>
        <p> linkedIn: https://www.linkedin.com/in/delaney-fogarty/ </p>
      </div>
      <div className="creator-info">
        <div className="avatar">{/* <img src= /> */}</div>
        <p className="username"> Beau Elliott </p>
        <p> github: https://github.com/belliott15 </p>
        <p> linkedIn: https://www.linkedin.com/in/beau-elliott15/ </p>
      </div>
    </div>
  );
}
