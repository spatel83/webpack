/* jshint esversion: 6 */
/* eslint-env browser */
/* eslint-disable global-require */
/* eslint no-plusplus: ["error", { "allowForLoopAfterthoughts": true }] */
/* eslint-disable import/prefer-default-export */
/* eslint no-console: 0 */

/* eslint no-undef: 0 */

/**
 * Check Content Layout
 */
export function checkContentLayout() {
  /**
   * Check Events
   *
   * @return {bool} hideEvents
   *   Returns true if events are hidden.
   */

  function checkEvents() {
    let hideEvents = false;

    if ($('.events-bg .ms-hide').parents().eq(4).hasClass('events-bg')
      || $('.events-bg').children().children().children().is('menu.ms-hide')
      || $('.events-bg').children().children().children().length === 0) {
      hideEvents = true;
      $('.events-bg').hide();
    }

    return hideEvents;
  }

  /**
   * Check People
   *
   * @return {bool} hidePeople
   *   Returns true if people are hidden.
   */
  function checkPeople() {
    let hidePeople = false;

    if ($('.varian-people-bg .ms-hide').parents().eq(4).hasClass('varian-people-bg')
      || $('.varian-people-bg').children().children().children().is('menu.ms-hide')
      || $('.varian-people-bg').children().children().children().length === 0) {
      hidePeople = true;
      $('.varian-people-bg').hide();
    }

    return hidePeople;
  }

  /**
   * Adjust Stocker Ticker
   */
  function adjustWireStories() {
    if ($('#stock_widget_container').length === 0
      && $('.site-stories-cont').children().children().children().length === 0
      && $('.home-stories-cont').children().children().children().length === 0) {
      $('.vmsNet-wire-cont').hide();
    }
  }

  /**
   * Adjust Notices Container.
   */
  function adjustNoticesContainer(pageType) {
    const noticesContainer = document.querySelector('.notices-cont');
    const offset = (pageType === 'business-unit') ? 22 : 0;
    let railHeight = 0;

    if (noticesContainer !== null) {
      noticesContainer.style.height = '400px';

      const border = document.querySelector('.notices-cont .ms-WPBorderBorderOnl');
      const msField = document.querySelector('.notices-cont .ms-rtestate-field');

      if (msField !== null) {
        msField.style.padding = '10px';
        msField.style.paddingTop = '0px';
        msField.style.height = '370px';
        railHeight = 370 + offset;

        if (border !== null) {
          msField.style.height = '382px';
          msField.style.padding = '10px';
          railHeight = 382;
        }

        msField.classList.add('notice-scroll');
        $('.notice-scroll').slimScroll({
          alwaysVisible: false,
          railVisible: true,
          height: railHeight,
          size: '10px',
          borderRadius: '0px',
          railBorderRadius: '0px',
          distance: '0px',
        });
      }
    }
  }

  /**
   * Check Gateway Page.
   */
  function checkGatewayPage() {
    const homepage = document.querySelector('.home-cont');
    const ceoUpdate = document.querySelector('.ceo-update-block');
    const location = document.querySelector('.location-cont');

    if (homepage === null && ceoUpdate === null && location === null) {
      const hidePeople = checkPeople();
      const hideEvents = checkEvents();

      if (hidePeople === true && hideEvents === true) {
        if ($('.notices-cont').next().hasClass('varian-people-bg')
          && $('.notices-cont').next().next().hasClass('events-bg')) {
          adjustNoticesContainer('corporate-services');
        } else if ($('.notices-cont').prev().hasClass('events-bg')
          && $('.notices-cont').prev().prev().hasClass('varian-people-bg')) {
          adjustNoticesContainer('business-unit');
        }
      }
    }
  }

  /**
   * Check Org Chart Zone.
   */
  function checkOrgChartZone() {
    $('.org-char-cont .ms-hide').each(() => {
      if ($(this).parents().eq(4).hasClass('org-char-cont')
        || $(this).parents().eq(5).hasClass('org-char-cont')) {
        $(this).parent().hide();
      }
    });

    if ($('.org-char-cont').children().children().children().children().length === 0
      || ($('.org-char-cont').children().children().children().children().children().length === $('.org-char-cont .ms-hide').length)) {
      $('.org-char-cont').hide();
    }

    $('.org-char-cont .iconPDF')
      .parents()
      .eq(4)
      .css({
        background: 'none',
        padding: 0,
      });

    $('.org-char-cont .iconPPT')
      .parents()
      .eq(4)
      .css({
        background: 'none',
        padding: 0,
      });

    $('.org-char-cont .iconPPT, .org-char-cont .iconPDF')
      .parent()
      .parent()
      .css({
        marginTop: '-10px',
      });
  }

  /**
   * Check Content Types.
   *
   * Iterate through all of the different webpart content types and check to see
   * if the number of hidden web parts is the same as the number of webparts for
   * that particular zone.  If so, then hide the whole zone.
   */
  function checkContentTypes() {
    const contentTypes = [
      '.how-do-i',
      '.referrals',
      '.featured-application',
      '.management-team-cont',
      '.notices-cont',
    ];

    for (let i = 0; i < contentTypes.length; i++) {
      if ($(`${contentTypes[i]} .ms-hide`).length >= 1
        || $(contentTypes[i]).children().children().children().length === 0
        || $(contentTypes[i]).children().children().children().is('menu.ms-hide')) {
        if ($(contentTypes[i]).children().children().children().children().length === $(`${contentTypes[i]} .ms-hide`).length
          || $(contentTypes[i]).children().children().children().length === 0
          || $(contentTypes[i]).children().children().children().is('menu.ms-hide')) {
          $(contentTypes[i]).hide();
        } else {
          $(`${contentTypes[i]} .ms-hide`).each(() => {
            if ($(this).parents().eq(4).hasClass(contentTypes[i])) {
              $(this).parent().hide();
            }
          });
        }
      }
    }
  }

  /**
   * Convert Date.
   *
   * @param {string} publishDate
   *   Article publish date in DD/MM/YYYY format.
   *
   * @return {string}
   *   Converted date in DD Month YY format.
   */
  function dateConversion(publishDate) {
    const convertDate = publishDate.replace(/[\n\t\s ]/g, '');
    let newDate = new Date(convertDate);
    if (publishDate === '') {
      return 'DD MMM YY';
    }
    newDate = newDate.format('dd MMM yy');
    return newDate;
  }

  /**
   * Adjust Article Image Block.
   */
  function adjustArticleImageBlock() {
    const articleImage = document.querySelector('.article-block .article-img-block img');
    const articleImageBlock = document.querySelector('.article-block .article-img-block');
    const articleDate = document.getElementById('dvPublishDate');

    if (articleImage === null && articleImageBlock !== null) {
      $(articleImageBlock).hide();
    }

    if (articleDate !== null) {
      const newDate = dateConversion(articleDate.innerText);
      articleDate.innerText = newDate;
    }
  }

  /**
   * Collapsible List.
   */
  function collapsibleList() {
    const collapsibleToggle = document.querySelectorAll('span.toggle_button');
    if (collapsibleToggle !== null) {
      Array.prototype.forEach.call(collapsibleToggle, (toggleButton) => {
        toggleButton.addEventListener('click', () => {
          toggleButton.parentNode.classList.toggle('collapsed');
        });
      });
    }
  }

  /**
   * Custom Checkboxes.
   */
  function customCheckboxes() {
    const checkBoxes = document.querySelectorAll('.tab_contents input[type="checkbox"]');
    if (checkBoxes !== null) {
      [].forEach.call(checkBoxes, (checkBox) => {
        const spanWrap = document.createElement('span');
        spanWrap.classList.add('custom-checkbox');
        checkBox.parentElement.insertBefore(spanWrap, checkBox);
        spanWrap.append(checkBox);

        if (checkBox.checked) {
          checkBox.parentNode.classList.add('selected');
        }

        checkBox.addEventListener('click', () => {
          checkBox.parentNode.classList.toggle('selected');
        });
      });
    }
  }

  /**
   * Start MyVMSNet.
   */
  function startMyVMSNet() {
    $(document).on('click', '#edit_vms', () => {
      $('.nav-tabs li:first-child a').addClass('edit_mode');
      $('#tab_1_contents').addClass('edit_mode');
    });

    $(document).on('click', '#done_vms', () => {
      $('.nav-tabs li:first-child a').removeClass('edit_mode');
      $('#tab_1_contents').removeClass('edit_mode');
    });

    $(document).on('click', '#add-tab a', () => {
      $(this).addClass('edit_mode');
      $('#tab_4_contents').addClass('edit_mode');
    });

    $(document).on('click', '#tab_4_contents .actions a', () => {
      $('#tab_4_contents').removeClass('edit_mode');
      $('add-tab a').removeClass('edit_mode');
    });
  }

  /**
   * Start User Controls.
   */
  function startUserControls() {
    const userControls = document.querySelector('.user-control');
    if (userControls !== null) {
      userControls.addEventListener('click', () => {
        $('.user-control-panel').toggleClass('open');
        $('.user-control').find('p').toggleClass('arrow-down');
        $('.dropDownCont').toggleClass('user-open');
      });
    }
  }

  /**
   * How Do I
   */
  function howDoI() {
    const questions = document.querySelectorAll('.how-do-i-questions select');
    const answer = document.querySelector('article.answer');

    if (questions !== null) {
      [].forEach.call((questions), (question) => {
        question.addEventListener('change', () => {
          answer.classList.remove('show');
          setTimeout(() => {
            answer.classList.add('show');
          }, 50);
        });
      });
    }
  }

  /**
   * Article Comments.
   */
  function articleComments() {
    const comments = document.querySelector('.comments-section');
    if (comments !== null) {
      $('.show-comments').toggleClass('comments-arrow-down');
      $('.show-comments').on('click', () => {
        $('.comments-section').toggleClass('hide-comments');
        $('.show-comments span').toggleClass('comments-arrow-down');
      });
    }

    /**
     * Show More
     */
    window.Toggle = function toggleText() {
      if ($('#introText').length > 0) {
        $('#introText').slimScroll({
          railVisible: true,
          height: 'auto',
          size: '10px',
          borderRadius: '0px',
          railBorderRadius: '0px',
          distance: '0px',
        });
        $('.slimScrollDiv').css('height', 'auto');
      }

      if ($('#gatewayIntroText').length > 0) {
        $('#gatewayIntroText').slimScroll({
          railVisible: true,
          height: 'auto',
          size: '10px',
          borderRadius: '0px',
          railBorderRadius: '0px',
          distance: '0px',
        });
        $('.slimScrollDiv').css('height', 'auto');
      }

      $('#introAnchor').hide();
    };
  }

  /**
   * Intro Text
   */
  function introText() {
    if ($('#introText').length > 0) {
      if ($('#introText').children('div').height() > 190) {
        $('#intro').append('<a onclick="Toggle()" id="introAnchor">More +</a>');
      } else {
        $('#introAnchor').hide();
      }
    }
    if ($('#gatewayIntroText').length > 0) {
      if ($('#gatewayIntroText').children('div').height() > 190) {
        $('#intro').append('<a onclick="Toggle()" id="introAnchor">More +</a>');
      } else {
        $('#introAnchor').hide();
      }
    }
  }

  /**
   * Wire Stories.
   */
  function wireStories() {
    if ($('.site-stories').length > 0 && $('.home-stories').length > 0) {
      $('.site-stories').on('click', () => {
        $(this).addClass('select');
        $('.home-stories').removeClass('select');
        $('.site-stories-cont').show();
        $('.home-stories-cont').hide();
        $('.site-stories-cont .bx-viewport').css('height', '100px');
      });

      $('.home-stories').on('click', () => {
        $(this).addClass('select');
        $('.site-stories').removeClass('select');
        $('.site-stories-cont').hide();
        $('.home-stories-cont').show();
        $('.home-stories-cont .bx-viewport').css('height', '100px');
      });

      if (!$('.home-stories').hasClass('select')) {
        $('.home-stories').addClass('deafult_unselect');
      } else if (!$('.site-stories').hasClass('select')) {
        $('.site-stories').addClass('deafult_unselect');
      }
    }
  }

  /**
   * Wire Category.
   */
  function wireCatagory() {
    if ($('.site-stories').length > 0 || $('.home-stories').length > 0
      || $('.wire-category .category-expand').length > 0) {
      let tabCounter = 0;
      $(document).on('click', '.home-stories, .site-stories', () => {
        if ($(this).hasClass('deafult_unselect')) {
          tabCounter += 1;
        }
        if (tabCounter === 1) {
          $('.wire-category').each(() => {
            if ($(this).parent('div').height() > 12) {
              $(this).closest('li').width($(this).closest('li').width() + $(this).width());
              $(this).closest('.wire-description').width($(this).closest('.wire-description').width() + $(this).width());
            }
          });
        }
      });
    }
  }

  /**
   * Update More Search Text.
   */
  function updateMoreSearchText() {
    if ($('ms-srch-group-link a') !== null) {
      $('.ms-srch-group-link a').text('Show All People Results');
      $('.ms-srch-group-link a').attr('title', 'Show All People Results...');
    }
  }

  /**
   * Initialize Content.
   *
   * Used to rearrange and adjust templates as needed as well as set up
   * miscellanious event listenrs used throughout the site.
   */
  function initContent() {
    const msHide = document.querySelectorAll('.ms-hide');

    /**
     * Place the Yellow ribbon after the header.
     */
    $('#s4-workspace').prepend($('#DeltaPageStatusBar'));

    if (msHide.length > 0) {
      /**
       * Hide all right section web parts that are marked as "hidden".
       */
      if ($('.ms-hide').closest('.right-section')) {
        $('.right-section .ms-hide').parent().hide();
      }
      checkContentTypes();
      checkOrgChartZone();
      checkGatewayPage();
    }

    adjustArticleImageBlock();
    adjustWireStories();
    collapsibleList();
    customCheckboxes();
    howDoI();
    articleComments();
    startMyVMSNet();
    startUserControls();

    /**
     * Window Load Events.
     */
    window.addEventListener('load', () => {
      introText();
      wireStories();
      wireCatagory();
      updateMoreSearchText();
    });
  }
  initContent();
}
