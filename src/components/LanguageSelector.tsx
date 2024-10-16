import React from 'react';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';
import ukFlag from '../ukflag.png';
import alFlag from '../alflag.png'
import itFlag from '../itflag.png'
const LanguageSelector: React.FC = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => { 
    if (lng) {
      i18n.changeLanguage(lng)
        .then(() => {
          console.log(`Language changed to ${lng}`);
        })
        .catch((error) => {
          console.error(`Error changing language to ${lng}:`, error);
        });
    }
  };

  return (
    <div className='flag'>
    <button  onClick={() => changeLanguage('en')}>
      <img src={ukFlag} alt="English" width={30} />
    </button>
    {/* {/* <button onClick={() => changeLanguage('es')}>
      <img src={esFlag} alt="Español" width={30} />
    </button> */}
    <button onClick={() => changeLanguage('it')}>
      <img src={itFlag} alt="Italian" width={30} />
    </button>
    <button onClick={() => changeLanguage('sq')}>
      <img src={alFlag} alt="Albanian" width={30} />
    </button> 
  </div>
  );
};

export default LanguageSelector;
