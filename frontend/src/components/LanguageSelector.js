import React from 'react';
import { useTranslation } from 'react-i18next';
import { changeLanguage } from '../api/apiCalls';

const LanguageSelector = props => {
const { i18n } = useTranslation();

  const onChangeLanguage = language => {
    i18n.changeLanguage(language);
    changeLanguage(language);
  };

  return (
    <div className="container">
      <img 
      className="img-fluid d-sm-flex"
        src="https://flagcdn.com/32x24/tr.png"
        alt="Turkish Flag"
        onClick={() => onChangeLanguage('tr')}
        style={{ cursor: 'pointer' }}
      ></img>
      <img  className="img-fluid d-sm-flex" src="https://flagcdn.com/32x24/gb.png" alt="United Kingdom" onClick={() => onChangeLanguage('en')} style={{ cursor: 'pointer' }}></img>
    </div>
  );
};

export default LanguageSelector;