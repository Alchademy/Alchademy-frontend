import React, { useEffect } from 'react';
import './AboutPage.css';
import './AssignmentDetail.css';
import LinkButton from './AssignmentComponents/LinkButton';
import { Typography } from '@mui/material';
import { useStateContext } from '../StateProvider';
import Spinner from './Spinner';

export default function AboutPage() {
  const { spinner, setSpinner } = useStateContext();
  function fakeLoading() {
    setSpinner(false);
  }
  useEffect(() => {
    setSpinner(true);
    setTimeout(fakeLoading, 200);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="app-page">
      {spinner ? (
        <Spinner />
      ) : (
        <div className="flex-row space-around">
          <div
            className="app-container flex-column space-between"
            style={{ margin: '1vw', padding: '1vw' }}
          >
            <div>
              <div className="avatar">
                <img src="./willHeadshot.png" />
              </div>
              <Typography sx={{ fontSize: 34, textAlign: 'center' }} variant="h3" component="div">
                Will Gunderson
              </Typography>
            </div>
            <div>
              <Typography
                sx={{ fontSize: 16, textAlign: 'center', margin: '5px' }}
                variant="h5"
                component="div"
              >
                Favorite Subject in School...
              </Typography>
              <Typography
                sx={{ fontSize: 24, textAlign: 'center', marginBottom: '5px' }}
                variant="h4"
                component="div"
              >
                English
              </Typography>
            </div>
            <div className="flex-row space-around" style={{ width: '240px', padding: '10px' }}>
              <LinkButton text="Github" link="https://github.com/willgundy" github={true} />
              <LinkButton
                text="LinkedIn"
                link="https://www.linkedin.com/in/will-gunderson/"
                github={false}
              />
            </div>
          </div>
          <div
            className="app-container flex-column space-between"
            style={{ margin: '1vw', padding: '1vw' }}
          >
            <div>
              <div className="avatar">
                <img src="/riley-headshot.jpeg" />{' '}
              </div>
              <Typography sx={{ fontSize: 34, textAlign: 'center' }} variant="h3" component="div">
                Riley Hoffman
              </Typography>
            </div>
            <div>
              <Typography
                sx={{ fontSize: 16, textAlign: 'center', margin: '5px' }}
                variant="h5"
                component="div"
              >
                Favorite Subject in School...
              </Typography>
              <Typography
                sx={{ fontSize: 24, textAlign: 'center', marginBottom: '5px' }}
                variant="h4"
                component="div"
              >
                Math
              </Typography>
            </div>
            <div className="flex-row space-around" style={{ width: '240px', padding: '10px' }}>
              <LinkButton text="Github" link="https://github.com/rileyjhoff" github={true} />
              <LinkButton
                text="LinkedIn"
                link="https://www.linkedin.com/in/riley-j-hoffman/"
                github={false}
              />
            </div>
          </div>
          <div
            className="app-container flex-column space-between"
            style={{ margin: '1vw', padding: '1vw' }}
          >
            <div>
              <div className="avatar">
                <img src={''} />
              </div>
              <Typography sx={{ fontSize: 34, textAlign: 'center' }} variant="h3" component="div">
                Delaney Fogarty
              </Typography>
            </div>
            <div>
              <Typography
                sx={{ fontSize: 16, textAlign: 'center', margin: '5px' }}
                variant="h5"
                component="div"
              >
                Favorite Subject in School...
              </Typography>
              <Typography
                sx={{ fontSize: 24, textAlign: 'center', marginBottom: '5px' }}
                variant="h4"
                component="div"
              >
                Subject
              </Typography>
            </div>
            <div className="flex-row space-around" style={{ width: '240px', padding: '10px' }}>
              <LinkButton text="Github" link="https://github.com/delaneyfogarty" github={true} />
              <LinkButton
                text="LinkedIn"
                link="https://www.linkedin.com/in/delaney-fogarty/"
                github={false}
              />
            </div>
          </div>
          <div
            className="app-container flex-column space-between"
            style={{ margin: '1vw', padding: '1vw' }}
          >
            <div>
              <div className="avatar">
                <img src={''} />
              </div>
              <Typography sx={{ fontSize: 34, textAlign: 'center' }} variant="h3" component="div">
                Beau Elliott
              </Typography>
            </div>
            <div>
              <Typography
                sx={{ fontSize: 16, textAlign: 'center', margin: '5px' }}
                variant="h5"
                component="div"
              >
                Favorite Subject in School...
              </Typography>
              <Typography
                sx={{ fontSize: 24, textAlign: 'center', marginBottom: '5px' }}
                variant="h4"
                component="div"
              >
                Subject
              </Typography>
            </div>
            <div className="flex-row space-around" style={{ width: '240px', padding: '10px' }}>
              <LinkButton text="Github" link="https://github.com/belliott15" github={true} />
              <LinkButton
                text="LinkedIn"
                link="https://www.linkedin.com/in/beau-elliott15/"
                github={false}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
