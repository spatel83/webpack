/* jshint esversion: 6 */
/* eslint-env browser */
/* eslint-disable global-require */
/* eslint no-plusplus: ["error", { "allowForLoopAfterthoughts": true }] */
/* eslint-disable import/prefer-default-export */
/* eslint no-console: 0 */
/* eslint no-undef: 0 */

/**
 * Mega Menu
 */
export function megaMenu() {
  /**
   * Remove Transition Class.
   *
   * @param {string} item
   *   Current menu item being hovered.
   */
  function removeTransitionClass(item) {
    setTimeout(() => {
      item.removeClass('transitioning');
    }, 300);
  }

  const hoverConfig = {
    sensitivity: 3,
    intervale: 500,
    timeout: 0,
    over: function hoverOver() {
      if ($(window).width() > 719) {
        if ($(this).attr('class') !== 'home') {
          $(this).addClass('open');
          $(this).children('a').addClass('active');
        }
      }
    },
    out: function hoverOut() {
      if ($(window).width() > 719) {
        removeTransitionClass($(this));
        $(this).addClass('transitioning');
        $(this).removeClass('open');
        $(this).children('a').removeClass('active');
      }
    },
  };

  $('.mega-menu-content ul#main-nav li').hoverIntent(hoverConfig);
}


/**
 * Sticky Mega Menu.
 */
export function stickyMegaMenu() {
  let deltaStatusHeight = 0;
  let menuPosition = null;
  let workspaceTop = null;
  let resizing = false;
  let scrolling = false;


  /**
   * Check Dimensions
   */
  function checkDimensions() {
    /**
     * Get the height of the ribbon.
     */
    if ($('#ms-designer-ribbon').length > 0
      && $('#ms-designer-ribbon').css('display') !== 'none') {
      $('section.mega-menu-cont').addClass('ribbon-active');
    }

    /**
     * Get the height of the status bar (Checked in/Checked out/etc).
     */
    if ($('#DeltaPageStatusBar').length > 0) {
      deltaStatusHeight = $('#DeltaPageStatusBar').height();
    }
  }

  /**
   * Sticky Check.
   */
  function stickyCheck() {
    menuPosition = $('section.mega-menu-cont').position().top;
    if (menuPosition + deltaStatusHeight < workspaceTop && $(window).width() > 719) {
      $('section.mega-menu-cont, section.main-search-cont').addClass('sticky');
    } else {
      $('section.mega-menu-cont, section.main-search-cont').removeClass('sticky');
    }
  }

  /**
   * Sticky Scroll Events.
   */
  function stickyScrollEvents() {
    const workspace = document.getElementById('s4-workspace');
    let scrollTimeout;

    function scrollThrottler() {
      if (!scrollTimeout) {
        scrollTimeout = setTimeout(() => {
          scrollTimeout = null;
          if (workspace !== null) {
            workspaceTop = workspace.scrollTop;
            stickyCheck();
          }
        }, 20);
      }
    }

    workspace.addEventListener('scroll', scrollThrottler, false);
  }


  /**
   * Sticky Window Resize Events.
   */
  function stickyResizeEvents() {
    let resizeTimeout;
    function resizeThrottler() {
      if (!resizeTimeout) {
        resizeTimeout = setTimeout(() => {
          resizeTimeout = null;
          if ($(window).width() > 719) {
            checkDimensions();
            setTimeout(() => {
              stickyCheck();
            }, 10);
          }
        }, 66);
      }
    }
    window.addEventListener('resize', resizeThrottler, false);
  }


  /**
   * Initialize Sticky Menu.
   */
  function initStickyMenu() {
    checkDimensions();
    stickyCheck();
    stickyScrollEvents();
    stickyResizeEvents();

    /**
     * Check to see if the user is on the search page.
     */
    if ($('.search-result-cont').length > 0) {
      $('section.mega-menu-cont').addClass('search-page');
    }
  }

  initStickyMenu();
}


/**
 * Responsive Menu.
 */
export function responsiveMenu() {
  let overlayOpen = false;
  let currentMenu = 'none';

  /**
   * Close Everything
   */
  function closeEverything() {
    $('.user-control-panel').removeClass('open');
    $('.dropDownCont').removeClass('user-open');
    $('.main-search-cont').removeClass('open');
    $('.menu-overlay').removeClass('open');
    $('.mega-menu-cont').removeClass('open');
    $('.mega-menu-content ul#main-nav li').removeClass('open');
    overlayOpen = false;
  }

  /**
   * Toggle Menu
   *
   * @param menuItem
   *  The current menu item.
   */
  function toggleMenu(menuItem) {
    console.log(menuItem);
    if (overlayOpen === false) {
      $(`.${menuItem}`).toggleClass('open');
      $('.menu-overlay').toggleClass('open');
      overlayOpen = true;
      currentMenu = menuItem;
    } else if (currentMenu === menuItem) {
      closeEverything();
    } else {
      $(`.${currentMenu}`).removeClass('open');
      setTimeout(() => {
        $(`.${menuItem}`).toggleClass('open');
        currentMenu = menuItem;
      }, 300);
    }
  }

  /**
   * Responsive Window Resize Events.
   */
  function responsiveResizeEvents() {
    let resizeTimeout;
    function resizeThrottler() {
      if (!resizeTimeout) {
        resizeTimeout = setTimeout(() => {
          resizeTimeout = null;
          if ($(window).width() > 719) {
            closeEverything();
          }
        }, 66);
      }
    }
    window.addEventListener('resize', resizeThrottler, false);
  }

  /**
   * Initialize Responsive Menu.
   */
  function initResponsiveMenu() {
    const menuNavigationButtons = document.querySelectorAll('.mega-menu-content > ul#main-nav > li > a');

    if (menuNavigationButtons !== null) {
      [].forEach.call(menuNavigationButtons, (menuButton) => {
        menuButton.addEventListener('click', () => {
          menuButton.parentNode.classList.toggle('open');
        }, false);
        menuButton.addEventListener('touchstart', () => {
          menuButton.parentNode.classList.toggle('open');
        }, false);
      });
    }

    $('.menu-overlay').on('click touchstart', () => {
      closeEverything();
    });

    $('.header .top-buttons .user').on('click touchstart', () => {
      toggleMenu('user-control-panel');
    });

    $('.header .top-buttons .search').on('click touchstart', () => {
      toggleMenu('main-search-cont');
    });

    $('.header .top-buttons .menu').on('click touchstart', () => {
      toggleMenu('mega-menu-cont');
    });

    closeEverything();
    responsiveResizeEvents();
  }

  initResponsiveMenu();
}


/**
 * Build Menus
 */
export function buildMenus() {
  const megaMenuContainer = document.querySelector('.mega-menu-cont');

  if (megaMenuContainer !== null) {
    let hoverIntentLoaded = false;
    const hoverIntentCheck = setInterval(() => {
      if (hoverIntentLoaded === false) {
        const hoverIntentScript = $('script[src*="jquery.hoverIntent.minified.js"]');
        if (hoverIntentScript.length > 0) {
          megaMenu();
          hoverIntentLoaded = true;
          clearTimeout(hoverIntentCheck);
        }
      }
    }, 50);
  }

  window.addEventListener('load', () => {
    if (megaMenuContainer !== null) {
      stickyMegaMenu();
      responsiveMenu();
      megaMenu();
    }
  });
}
