import React, { useState } from 'react';
import './App.css';
import languages from './languages.json'

function App() {


  const [sourceLanguage, setSourceLanguage] = useState('');
  const [targetLanguage, setTargetLanguage] = useState('');
  const [textInput, setTextInput] = useState('');
  const [translatedText, setTransText] = useState('Translated text will appear here')

  const handleSourceLanguageChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setSourceLanguage(event.target.value);
  };

  const handleTargetLanguageChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setTargetLanguage(event.target.value);
  };

  const handleTextInputChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setTextInput(event.target.value);
  };

  const handleTranslateButtonClick = () => {

    if (sourceLanguage && targetLanguage && textInput) {
      const apiUrl = 'http://locahost:5000/'
      fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ source_language: sourceLanguage, target_language: targetLanguage, text: textInput }),
      })
        .then(response => response.json())
        .then(data => {
          setTransText(data)
        })
        .catch(error => {
          console.error('Error making API call:', error);
          setTransText('Sorry, we can\'t connect to the API at the moment, please try again in some time')
        });
    }
    else
      console.log('Can\'t make the call')
  }

  return (
    <div className="container">
      <h2>Translator</h2>
      <div className="translator-app">
        <div className="row">
          <div className="left">
            <div className="language-selector">
              <label>Select Source Language</label>
              <select id="sourceLanguageSelect" value={sourceLanguage} onChange={handleSourceLanguageChange}>
                <option value="">Select</option>
                {languages.map(language => (
                  <option key={language.name} value={language.name}>
                    {language.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="text-input">
              <label>Enter Text</label>
              <textarea rows={4} id="textInput" value={textInput} onChange={handleTextInputChange}></textarea>
            </div>
          </div>

          <div className="right">
            <div className="language-selector">
              <label>Select Target Language</label>
              <select id="targetLanguageSelect" value={targetLanguage} onChange={handleTargetLanguageChange}>
                <option value="">Select</option>
                {languages.map(language => (
                  <option key={language.name} value={language.name}>
                    {language.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="output-area">
              <label>Translated Text</label>
              <textarea readOnly rows={4} value={translatedText} />
            </div>
          </div>
        </div>
        <div className="translate-button">
          <button id="translateButton" onClick={handleTranslateButtonClick}>Translate</button>
        </div>
      </div>
    </div>
  );
}

export default App;
