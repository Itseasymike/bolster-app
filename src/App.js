
import React, { Fragment, useState, useEffect } from 'react';
import dhlClean from './assets/dhl/dhl-clean.png';
import dhlPhish from './assets/dhl/dhl-phish.png';
import dropboxClean from './assets/dropbox/dropbox-clean.png';
import dropboxPhish from './assets/dropbox/dropbox-phish.png';
import instagramClean from './assets/instagram/instagram-clean.png';
import instagramPhish from './assets/instagram/instagram-phish.png';
import linkedinClean from './assets/linkedin/linkedin-clean.png';
import linkedinPhish from './assets/linkedin/linkedin-phish.png';
import matchClean from './assets/match/match-clean.png';
import matchPhish from './assets/match/match-phish.png';
import microsoftClean from './assets/microsoft/microsoft-clean.png';
import microsoftPhish from './assets/microsoft/microsoft-phish.png';
import netflixClean from './assets/netflix/netflix-clean.png';
import netflixPhish from './assets/netflix/netflix-phish.png';
import paypalClean from './assets/paypal/paypal-clean.png';
import paypalPhish from './assets/paypal/paypal-phish.png';
import wellsfargoClean from './assets/wellsfargo/wellsfargo-clean.png';
import wellsfargoPhish from './assets/wellsfargo/wellsfargo-phish.png';
import './App.css';

let images = [
  { clean : dhlClean, phish : dhlPhish },
  { clean : dropboxClean, phish : dropboxPhish },
  { clean : instagramClean, phish : instagramPhish },
  { clean : linkedinClean, phish : linkedinPhish },
  { clean : matchClean, phish : matchPhish },
  { clean : microsoftClean, phish : microsoftPhish },
  { clean : netflixClean, phish : netflixPhish },
  { clean : paypalClean, phish : paypalPhish },
  { clean : wellsfargoClean, phish : wellsfargoPhish },
];

const App = () => {
  const [counter, setCounter] = useState(15);
  const [imageArray, setImageArray] = useState([]);
  const [imageGroup, setNextImageGroup] = useState(0);
  const [selectedImage, setSelectedImage] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(1);
  const [valid, setValid] = useState('');
  const [clicked, setClicked] = useState(undefined);

  useEffect(() => {
    const sorted = images.sort(() => 0.5 - Math.random());
    setImageArray(sorted);
    setNextImageGroup(sorted[0]);
  }, []); 

  useEffect(() => {
    if (counter > 0) {
      setTimeout(() => {
        setCounter(counter - 1);
        clearTimeout();
      }, 1000);
    } else {
      setCounter(15);
    }
  }, [counter]);

  const onImageClick = (e) => {
    const { target : { src } } = e;
    if (src.includes('phish')) setClicked('phish');
    if (src.includes('clean')) setClicked('clean');
    setSelectedImage(src);
  }

  const onClickNext = (index) => {
    let group = imageArray.find((image, i) => index === i);
    if(selectedImage.includes('phish')) {
      setValid(true);
      setNextImageGroup(group);
      setCurrentIndex(index);
      setCounter(15);
      setScore(score + 1);
      setTimeout(() => {
         setValid('');
        clearTimeout();
      }, 250);
    } else {
      setValid(false);
      setNextImageGroup(group);
      setCurrentIndex(index);
      setCounter(15);
      setTimeout(() => {
         setValid('');
        clearTimeout();
      }, 250);
    }
    setClicked(undefined);
  }

  const reset = () => {
    const sorted = images.sort(() => 0.5 - Math.random());
    setCounter(15);
    setSelectedImage('');
    setCurrentIndex(0);
    setScore(1);
    setValid('');
    setClicked(undefined);
    setNextImageGroup(sorted[0]);
    setImageArray(sorted);
  }

  return (
    <div className="App container">
    {currentIndex === imageArray.length
    ?
      <Fragment>
        <div className="row">
          <h3>{`You caught ${score}/10 phish`}</h3>
          <div>
            <button
              type='button'
              className='btn btn-link text-right'
              onClick={() => reset()}
            >
              Click here to retry!
            </button>
          </div>
        </div>
      </Fragment>
        :
     <Fragment>
      <div className="row">
          <div className="col">
            <h2>Can you find phish?</h2>
            <h4>{`You have ${counter} ${counter <= 1 ? 'second' : 'seconds'} remaining`}</h4>
          </div>
        </div>
        <br />
        <div className='row'>
          <div
            className={`clean-image col ${valid === false && valid !== '' ? 'invalid' : ''} ${clicked === 'clean' ? 'clicked' : ''}`}
            role="button"
            tabIndex="0"
            onClick={(e) => onImageClick(e)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') onImageClick(e)
            }}
          >
            <img src={imageGroup.clean} alt="landing page clean" className='img-fluid' />
          </div>
          <div
            className={`col ${valid === true && valid !== '' ? 'valid' : ''} ${clicked === 'phish' ? 'clicked' : ''}`}
            role="button"
            tabIndex="0"
            onClick={(e) => onImageClick(e)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') onImageClick(e)
            }}
          >
            <img src={imageGroup.phish} alt="landing page phish" className='img-fluid' />
          </div>
        </div>
        <br />
        <br />
        {selectedImage !== '' &&
          <div>
            <button
              type='button'
              className='btn btn-primary text-right'
              onClick={() => onClickNext(currentIndex + 1)}
              disabled={counter === 0}
            >
            Next
            </button>
          </div>
        }
     </Fragment>
    }
    </div>
  );
}

export default App;
