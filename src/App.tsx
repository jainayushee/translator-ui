import React, { useState, useEffect } from 'react';
import './App.css';
import languages from './languages.json'

function App() {

  const [sourceLanguage, setSourceLanguage] = useState('');
  const [targetLanguage, setTargetLanguage] = useState('');
  const [textInput, setTextInput] = useState('');
  const [translatedText, setTransText] = useState('Translated text will appear here')
  let temp: any;

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

    console.log('Source Language:', sourceLanguage);
    console.log('Target Language:', targetLanguage);
    console.log('Text Input:', textInput);

    if (sourceLanguage && targetLanguage && textInput) {
      const apiUrl = 'http://localhost:5000/'
      fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ source_language: sourceLanguage, target_language: targetLanguage, text: textInput }),
      })
        .then(response => response.json())
        .then(data => {

          console.log('API response:', data);
          temp = data
          console.log(translatedText);
        })
        .catch(error => {

          console.error('Error making API call:', error);
        });


    }
    else
      console.log('Can\'t make the call')
  }

  useEffect(() => setTransText(temp), [temp])

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
              <textarea readOnly rows={4}>{translatedText}</textarea>
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
