/* jshint esversion: 6 */
/* eslint-env browser */
/* eslint-disable global-require */
/* eslint no-plusplus: ["error", { "allowForLoopAfterthoughts": true }] */
/* eslint-disable import/prefer-default-export */
/* eslint no-console: 0 */

export function loadSafetyApp() {
  /**
   * Build Map Markup
   *
   * @param string mapsData
   *   JSON representation of the safety map data.
   *
   * @return string
   *   Returns markup used for maps.
   */
  function buildMapMarkup(mapsData) {
    let mapsMarkup = '';
    if (typeof mapsData !== 'undefined') {
      for (let i = 0; i < mapsData.length; i++) {
        if (typeof mapsData[i].mapURL !== 'undefined' &&
            typeof mapsData[i].name !== 'undefined' &&
            typeof mapsData[i].googleMapURL !== 'undefined') {
          mapsMarkup += `<li><a href="${mapsData[i].mapURL}"><img src="${mapsData[i].icon}" alt="${mapsData[i].name}" /></a><br /><a class="googleCampusMap" href="${mapsData[i].googleMapURL}">View on Google Maps</a></li>`;
        }
      }
    }
    return mapsMarkup;
  }

  /**
   * Build Non-Emergency Phone Markup
   *
   * @param string phoneData
   *   JSON representation of the safety map data.
   *
   * @return string
   *   Returns markup used for non-emergency phone numbers.
   */
  function buildPhoneMarkup(phoneData) {
    let phoneMarkup = '';
    let telLink = null;
    if (typeof phoneData !== 'undefined') {
      if (phoneData.length > 1) {
        for (let i = 0; i < phoneData.length; i++) {
          if (typeof phoneData[i].phone !== 'undefined' &&
            typeof phoneData[i].name !== 'undefined') {
            telLink = phoneData[i].phone.replace('(', '1-').replace(') ', '-');
            phoneMarkup += `<li><a href="tel:${telLink}">${phoneData[i].name} - ${phoneData[i].phone}</a></li>`;
          }
        }
      }
    }
    return phoneMarkup;
  }

  /**
   * Generate Safety Markup
   *
   * @param object parsedSafetyData
   *   Object of the safety map data.
   */
  function generateSafetyMarkup(parsedSafetyData) {
    const emergencyContact = document.querySelector('#emergency-contact .phone-number');
    const nonEmergencyContact = document.querySelector('#non-emergency-contact .phone-number');
    const evacuationMaps = document.getElementById('maps');
    const additionalContacts = document.getElementById('additional-numbers');
    const safetyApp = document.getElementById('safety-app');

    /**
     * Emergency Contact
     */
    if (emergencyContact !== null) {
      emergencyContact.innerHTML = parsedSafetyData.emergencyContact;
    }

    /**
     * Non-emergency Contact
     */
    if (nonEmergencyContact !== null) {
      nonEmergencyContact.innerHTML = parsedSafetyData.nonEmergencyContact;
    }

    /**
     * Additional Cotacts
     */
    if (additionalContacts !== null) {
      additionalContacts.innerHTML = `<div id="additional-contact-title">Additional Contacts</div><div id="additional-phone-numbers"><ul>${parsedSafetyData.phoneMarkup}</ul></div>`;

      const addContactButton = document.getElementById('additional-contact-title');
      const additionalPhoneNumbers = document.getElementById('additional-phone-numbers');
      const additionalPhoneNumbersList = document.querySelector('#additional-phone-numbers ul');
      if (addContactButton !== null) {
        addContactButton.addEventListener('click', () => {
          addContactButton.classList.toggle('open');
          additionalPhoneNumbers.classList.toggle('show');
          setTimeout(() => {
            additionalPhoneNumbersList.classList.toggle('show');
          }, 50);
        }, false);
      }
    }

    /**
     * Maps
     */
    if (evacuationMaps !== null) {
      evacuationMaps.innerHTML = `<ul>${parsedSafetyData.mapsMarkup}</ul>`;
    }

    setTimeout(() => {
      safetyApp.classList.remove('loading');
    }, 50);
  }

  /**
   * Parse Safety JSON.
   *
   * @param string safetyData
   *   JSON representation of safety data.
   * @param string location
   *   Current location to parse. Hardcoded for now until more locations are added.
   *
   * @return bool
   *   Returns boolean based off if it's valid safety app JSON
   */
  function parseSafetyJson(safetyData, location) {
    if (typeof safetyData !== 'undefined' && typeof location !== 'undefined') {
      const parsedSafetyData = {};
      for (let i = 0; i < safetyData.length; i++) {
        if (safetyData[i].id === location) {
          if (safetyData[i].emergencyContact === null ||
            safetyData[i].nonEmergency[0].phone === null ||
            safetyData[i].maps === null) {
            return false;
          }

          parsedSafetyData.emergencyContact = safetyData[i].emergencyContact;
          parsedSafetyData.nonEmergencyContact = safetyData[i].nonEmergency[0].phone;
          parsedSafetyData.phoneMarkup = buildPhoneMarkup(safetyData[i].nonEmergency);
          parsedSafetyData.mapsMarkup = buildMapMarkup(safetyData[i].maps);
          break;
        }
      }

      generateSafetyMarkup(parsedSafetyData);
      return true;
    }
    return false;
  }

  /**
   * Safety Script Initialize.
   */
  function safetyScriptInit() {
    const request = new XMLHttpRequest();
    const location = 'PA';
    request.onload = () => {
      if (request.status >= 200 && request.status < 400) {
        parseSafetyJson(JSON.parse(request.responseText), location);
      } else {
        console.error('ERROR: could not reach safety.txt JSON file.');
      }
    };
    request.open('GET', '/corporateservices/global_workplace_solutions/Shared%20Documents/VMS-Evac-Protocol/safety.txt', true);
    request.send();
  }

  safetyScriptInit();
}
