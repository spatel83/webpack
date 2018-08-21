/* eslint no-undef: 0 */
/* eslint no-unused-vars: 0 */
/* eslint global-require: 0 */
/* esversion: 6 */

const vmsnetScripts = {};

/**
 * DOM content loaded events.
 */
vmsnetScripts.domLoaded = () => {
  /**
   * Google Analytics.
   */
  const googleAnalytics = require('./components/google-analytics');
  googleAnalytics.loadGoogleAnalytics();

  /**
   * Spadeworx Scripts.
   */
  const spadeworxScripts = require('./components/spadeworx');
  spadeworxScripts.loadSpadeworxScripts();

  /**
   * Breadcrumb.
   */
  const breadcrumbScript = require('./components/breadcrumb');
  const breadcrumb = document.querySelector('.breadcumb-sub-menu');
  if (breadcrumb !== null) {
    breadcrumbScript.loadBreadcrumb();
  }

  /**
   * Menu.
   */
  const menuScripts = require('./components/menu');
  const megaMenu = document.querySelector('.mega-menu-content');
  if (megaMenu !== null) {
    menuScripts.buildMenus();
  }

  /**
   *  Arrange Content.
   */
  const arrangeContentScripts = require('./components/arrange-content');
  arrangeContentScripts.checkContentLayout();

  /**
   *  Featured Story Slider
   */
  const sliderScripts = require('./components/slider-scripts');
  sliderScripts.loadFeaturedStorySlider();

  /**
   * Varian Evacuation App.
   * Found on page: https://vmsnet.varian.com/corporateservices/global_workplace_solutions/Pages/Varian%20Evacuation%20Protocol.aspx
   */
  const safetyScript = require('./components/safety-app');
  const safetyDiv = document.getElementById('safety-app');
  if (safetyDiv !== null) {
    safetyScript.loadSafetyApp();
    console.log('safety app found.');
  }
};

/**
 * Window load events.
 */
vmsnetScripts.windowLoaded = () => {
  /**
   * Classification Calculator.
   * Found on page: https://vmsnet.varian.com/corporateservices/VIT/SecVal/InfoSec/Pages/Data-Governance-.aspx
   */
  const calculatorScript = require('./components/classification-calculator');
  const calculatorDiv = document.getElementById('classification-calculator');
  if (calculatorDiv !== null) {
    calculatorScript.classificationCalculator();
  }

  /**
   * Stock Ticker.
   */
  const stockScript = require('./components/stock-ticker');
  const stockTickerDiv = document.querySelector('.wd_widget');
  if (stockTickerDiv !== null) {
    stockScript.loadStockTicker();
  }

  /**
   * Clock
   */
  const clockScript = require('./components/clock-timing');
  clockScript.startClock();

  /**
   * Additional Sliders.
   */
  const sliderScripts = require('./components/slider-scripts');
  sliderScripts.loadSliders();

  /**
   * Scroll Events.
   */
  const scrollScripts = require('./components/scroll-scripts');
  scrollScripts.loadScrollEvents();
};

document.addEventListener('DOMContentLoaded', () => {
  vmsnetScripts.domLoaded();
});

window.addEventListener('load', () => {
  vmsnetScripts.windowLoaded();
});
