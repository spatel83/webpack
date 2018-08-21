/* jshint esversion: 6 */
/* eslint-env browser */
/* eslint-disable global-require */
/* eslint no-plusplus: ["error", { "allowForLoopAfterthoughts": true }] */
/* eslint-disable import/prefer-default-export */
/* eslint no-console: 0 */
/* eslint no-undef: 0 */

/**
 * Scroll Scripts.
 */
export function loadScrollEvents() {
  /**
   * Remove Unnecessary Scroll Windows.
   */
  function removeUnnecessaryScrollWindows() {
    if ($('.home-features-stories-cont .custom-scroll').length > 0) {
      $('.home-features-stories-cont .custom-scroll').removeClass('custom-scroll');
    }

    if ($('.todays-varian-item.referrals.auto-section .custom-scroll').length > 0) {
      $('.todays-varian-item.referrals.auto-section .custom-scroll').removeClass('custom-scroll');
    }

    if ($('.todays-varian-item.our-people-bg.auto-section .custom-scroll').length > 0) {
      $('.todays-varian-item.our-people-bg.auto-section .custom-scroll').removeClass('custom-scroll');
    }

    if ($('.todays-varian-item.our-location-bg.auto-section .custom-scroll').length > 0) {
      $('.todays-varian-item.our-location-bg.auto-section .custom-scroll').removeClass('custom-scroll');
    }

    if ($('.todays-varian-item.how-do-i.auto-section .custom-scroll').length > 0) {
      $('.todays-varian-item.how-do-i.auto-section .custom-scroll').removeClass('custom-scroll');
    }

    if ($('.Emergency-bg .custom-scroll').length > 0) {
      $('.Emergency-bg .custom-scroll').removeClass('custom-scroll');
    }
  }

  /**
   * Add Gallery Scroll.
   */
  function addGalleryScroll() {
    const gallery = $('.notices-cont div.gallery.business-unit');
    const noticeBox = $('.notices-cont');

    if (gallery !== null && noticeBox !== null) {
      if (gallery.height() > noticeBox.height()) {
        gallery.addClass('gallery-scroll');
        $('.gallery-scroll').slimScroll({
          alwaysVisible: false,
          railVisible: true,
          height: '400px',
          size: '10px',
          borderRadius: '0px',
          railBorderRadius: '0px',
          distance: '0px',
        });
      }
    }
  }

  /**
   * Scroll Resize Events.
   */
  function scrollResizeEvents() {
    let resizeTimeout;
    function resizeThrottler() {
      if (!resizeTimeout) {
        resizeTimeout = setTimeout(() => {
          resizeTimeout = null;
          addGalleryScroll();
        }, 66);
      }
    }
    window.addEventListener('resize', resizeThrottler, false);
  }

  /**
   * Initialize Scroll Scripts.
   */
  function initScrollScripts() {
    removeUnnecessaryScrollWindows();
    addGalleryScroll();
    scrollResizeEvents();
    if ($('.custom-scroll').length > 0) {
      $('.custom-scroll').slimScroll({
        alwaysVisible: false,
        railVisible: true,
        height: 'auto',
        size: '10px',
        borderRadius: '0px',
        railBorderRadius: '0px',
        distance: '0px',
      });
      $('.slimScrollDiv').css('height', 'auto');
    }
  }

  initScrollScripts();
}
