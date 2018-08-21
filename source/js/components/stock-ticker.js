/* jshint esversion: 6 */
/* eslint-env browser */
/* eslint-disable global-require */
/* eslint no-plusplus: ["error", { "allowForLoopAfterthoughts": true }] */
/* eslint-disable import/prefer-default-export */
/* eslint no-undef: 0 */

export function loadStockTicker() {
  const originalPrice = 'div.wd_quote.wd_quote-show_detail.wd_quote-onecol > div.wd_main-wrapper > div > div.wd_price > span';
  const originalDeviation = 'div.wd_quote.wd_quote-show_detail.wd_quote-onecol > div.wd_values-wrapper > div > div:nth-child(2) > div > div.wd_value';
  const ua = window.navigator.userAgent;
  const msie = ua.indexOf('MSIE ');
  let triggerPrice = false;
  let triggerDeviation = false;

  /**
   * Format Price.
   *
   * @param target
   *   Target DOM element.
   */
  function formatPrice(target) {
    setTimeout(() => {
      if ($(target).find(originalPrice).text() !== '') {
        const price = $(target)
          .find(originalPrice)
          .text()
          .replace('$', '');
        $(target).find(originalPrice).text(price);
      }
    }, 500);
  }

  /**
   * Format Deviation.
   *
   * @param target
   *   Target DOM element.
   */
  function formatDeviation(target) {
    setTimeout(() => {
      if ($(target).find(originalDeviation).text() !== '') {

        const deviation = $(target)
          .find(originalDeviation)
          .text()
          .replace('$', '')
          .replace('(', '<span class="stock_spacer"></span>(');

        $(target)
          .find(originalDeviation)
          .text('')
          .html(deviation)
          .afterTime(200, () => {
            $('div.wd_widget').fadeIn(250);
          });
      }
    }, 500);
  }

  /**
   * Create Stock Observer.
   */
  function createStockObserver() {
    const observer = new MutationObserver(() => {
      /**
       * Find the price and format it correctly
       */
      if ($('.wd_quote-wrapper').length > 0) {
        if ($(document).find(originalPrice)) {
          setTimeout(() => {
            if ($(document).find(originalPrice).text() !== '' && triggerPrice === false) {
              const price = $(document).find(originalPrice).text().replace('$', '');
              $(document).find(originalPrice).text(price);
              triggerPrice = true;
            }
          }, 500);
        }

        /**
         * Find the deviation in price and format it correctly
         */
        if ($(document).find(originalDeviation)) {
          setTimeout(() => {
            if ($(document).find(originalDeviation).text() !== '' && triggerDeviation === false) {

              const deviation = $(document)
                .find(originalDeviation)
                .text()
                .replace('$', '')
                .replace('(', '<span class="stock_spacer"></span>(');

              triggerDeviation = true;

              $(document).find(originalDeviation)
                .text('')
                .html(deviation)
                .afterTime(200, () => {
                  $('div.wd_widget').fadeIn(250);
                });
            }
          }, 500);
        }
      }
    });

    observer.observe(document, {
      childList: true,
      subtree: true,
      attributes: false,
      characterData: false,
    });
  }

  /**
   * Initialize Stock Ticker
   */
  function initStockTicker() {
    /**
     * Check to see if the browser is IE and is 10 or less.
     */
    if (msie > 0 && parseInt(ua.toLowerCase().split('msie')[1]) <= 10) {
      document.addEventListener('DOMNodeInserted', (event) => {
        /**
         * Find the price and format it correctly
         */
        if ($(event.target).find(originalPrice)) {
          formatPrice(event.target);
        }

        /**
         * Find the deviation in price and format it correctly
         */
        if ($(event.target).find(originalDeviation)) {
          formatDeviation(event.target);
        }
      });
    } else {
      createStockObserver();
    }
  }

  initStockTicker();
}
