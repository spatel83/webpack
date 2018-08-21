/* jshint esversion: 6 */
/* eslint-env browser */
/* eslint-disable global-require */
/* eslint no-plusplus: ["error", { "allowForLoopAfterthoughts": true }] */
/* eslint-disable import/prefer-default-export */
/* eslint no-console: 0 */
/* eslint no-undef: 0 */

/**
 * Start Featured Story Slider
 */
function startFeaturedStorySlider() {
  $('.featured-story-slider').bxSlider({
    auto: true,
    pause: 9000,
    infiniteLoop: true,
    hideControlOnEnd: true,
    autoHover: true,
    autoStart: true,
    onSliderLoad: function sliderLoad() {
      $('.featured-stories .featured-story-slider li:nth-child(2)').addClass('activeSlide');
    },
    onSlideBefore: function slideBefore(slide) {
      $('li.slide.activeSlide.topSlide').removeClass('topSlide activeSlide');
      $(slide).addClass('topSlide');
      setTimeout(() => {
        $(slide).addClass('activeSlide');
      }, 0);
    },
  });
}

/**
 * Load Featured Story Slider.
 */
export function loadFeaturedStorySlider() {
  const homeStories = document.querySelector('.home-features-stories-cont');
  if (homeStories !== null) {
    let featuredStoriesLoaded = false;
    const featuredStoryCheck = setInterval(() => {
      if (featuredStoriesLoaded === false) {
        const featuredStoryContainer = document.querySelector('.featured-story-slider');
        if (featuredStoryContainer !== null) {
          startFeaturedStorySlider();
          featuredStoriesLoaded = true;
          clearTimeout(featuredStoryCheck);
        }
      }
    }, 100);
  }
}

/**
 * Load Miscellaneous Sliders.
 */
export function loadSliders() {
  $('.cbs-List li').addClass('clearfix');

  /**
   * VMS Wire Slider.
   */
  if ($('.home-VMS-slider').length > 0) {
    $('.home-VMS-slider').bxSlider({
      pager: false,
      infiniteLoop: false,
      hideControlOnEnd: true,
    });
  }

  /**
   * Featured Application Slider.
   */
  if ($('.featured-app-slider').length > 0) {
    $('.featured-app-slider').bxSlider({
      pager: false,
      infiniteLoop: false,
      hideControlOnEnd: true,
    });
  }

  /**
   * Item Slider.
   */
  if ($('.slides').length > 0) {
    $('.slides').bxSlider({
      pause: 7000,
      pager: false,
      infiniteLoop: false,
      auto: true,
    });
  }
}
