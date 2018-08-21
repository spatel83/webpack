/* eslint no-unused-expressions: 0 */
/* eslint import/prefer-default-export: 0 */
/* eslint no-undef: 0 */
/* eslint prefer-destructuring: 0 */
/* eslint no-console: 0 */
/* eslint no-plusplus: ["error", { "allowForLoopAfterthoughts": true }] */

/**
 * Classification Calculator.
 * Found on page: https://vmsnet.varian.com/corporateservices/VIT/SecVal/InfoSec/Pages/Data-Governance-.aspx
 */
export function classificationCalculator() {
  const classification = {};

  classification.config = {
    jsonData: null,
    secondaryButtons: false,
  };

  /**
   * First Level Buttons.
   */
  classification.firstLevelButtons = () => {
    const firstButtons = document.getElementsByClassName('first-class');
    const firstLevel = document.getElementById('first-classification-selection');
    const jsonData = classification.config.jsonData;
    const secondLevel = document.getElementById('second-classification-selection');
    let secondLevelLinks = '<li class="second-class"><strong>-- Select Use Case --</strong></li>';

    for (let i = 0; i < firstButtons.length; i++) {
      if (i === 0) {
        firstButtons[i].addEventListener('click', (event) => {
          event.preventDefault();
          firstLevel.firstChild.innerHTML = '<strong>-- Select Organization --</strong>';
          firstLevel.classList.toggle('close');
          secondLevel.innerHTML = '';
          classification.resetResults();
        }, false);
      } else {
        firstButtons[i].addEventListener('click', (event) => {
          event.preventDefault();
          let currentButton = firstButtons[i].innerHTML;
          firstLevel.firstChild.innerHTML = `<strong>${currentButton}</strong>`;
          firstLevel.classList.add('close');
          secondLevelLinks = classification.secondLevelLinks(jsonData[currentButton]);
          secondLevel.innerHTML = secondLevelLinks;
          classification.secondaryButtons(currentButton, jsonData);
          classification.resetResults();
        }, false);
      }
    }
  };

  /**
   * Second Level Buttons.
   *
   * @param {object} data
   *   JSON classification data.
   *
   * @return string
   *   Markup string of the second level links.
   */
  classification.secondLevelLinks = (data) => {
    let secondLevelLinks = '<li class="second-class"><strong>-- Select Use Case --</strong></li>';
    Object.keys(data).forEach((link) => {
      secondLevelLinks += `<li class="second-class">${link}</li>`;
    });
    return secondLevelLinks;
  };

  /**
   * Secondary Buttons
   *
   * @param {string} list
   *   List name.
   * @param {object} jsonData
   *   JSON classification data.
   */
  classification.secondaryButtons = (list, jsonData) => {
    const secondaryButtons = document.getElementsByClassName('second-class');
    const secondLevel = document.getElementById('second-classification-selection');
    const resultTitle = document.getElementById('classification-title');
    const resultDescription = document.getElementById('classification-description');
    const results = document.getElementById('classification-result');
    const classResult = document.getElementById('class-result');

    for (let i = 0; i < secondaryButtons.length; i++) {
      if (i === 0) {
        secondaryButtons[i].addEventListener('click', (event) => {
          event.preventDefault();
          secondLevel.firstChild.innerHTML = '<strong>-- Select Use Case --</strong>';
          secondLevel.classList.toggle('close');
          classification.resetResults();
        }, false);
      } else {
        secondaryButtons[i].addEventListener('click', (event) => {
          event.preventDefault();
          let currentButton = secondaryButtons[i].innerHTML;
          secondLevel.firstChild.innerHTML = `<strong>${currentButton}</strong>`;
          secondLevel.classList.add('close');
          resultTitle.innerHTML = jsonData[list][currentButton].classification;
          resultDescription.innerHTML = jsonData[list][currentButton].description;
          classResult.innerHTML = `Data Classification: ${this.innerHTML}`;
          results.classList.remove('hide');
        }, false);
      }
    }
  };

  /**
   * Reset Results.
   */
  classification.resetResults = () => {
    const resultTitle = document.getElementById('classification-title');
    const resultDescription = document.getElementById('classification-description');
    const results = document.getElementById('classification-result');
    const classResult = document.getElementById('class-result');
    resultTitle.innerHTML = '';
    resultDescription.innerHTML = '';
    classResult.innerHTML = '';
    results.classList.add('hide');
  };


  /**
   * Initialize HTTP request to recieve classification JSON data.
   */
  classification.init = () => {
    const classificationJson = 'https://vmsnet.varian.com/corporateservices/VIT/SecVal/InfoSec/Docs/classifications.txt';
    const request = new XMLHttpRequest();

    request.open('GET', classificationJson, true);

    request.onload = () => {
      if (request.status >= 200 && request.status < 400) {
        const data = JSON.parse(request.responseText);
        classification.config.jsonData = data;
        classification.config.secondaryButtons = false;
        classification.firstLevelButtons();
      } else {
        console.warn('Warning: unable to find classification.txt JSON file.');
      }
    };

    request.onerror = () => {
      console.warn('Warning: unable to find classification.txt JSON file.');
    };

    request.send();
  };


  classification.init();
}
