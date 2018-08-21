/* jshint esversion: 6 */
/* eslint-env browser */
/* eslint-disable global-require */
/* eslint no-plusplus: ["error", { "allowForLoopAfterthoughts": true }] */
/* eslint-disable import/prefer-default-export */
/* eslint no-undef: 0 */

export function loadBreadcrumb() {
  /**
   * Breadcrumb reset.
   */
  document.addEventListener('click', () => {
    if ($('.breadcumb-sub-menu').hasClass('open')) {
      $('.breadcumb-sub-menu').removeClass('open');
      $('.breadcumb-main-menu .down-arrow').removeClass('open');
    }
  });

  /**
   * Breadcrumb dropdown functionality.
   */
  $(document).on('click', '.breadcumb-main-menu .down-arrow', function toggleBreadcrumb(event) {
    if ($(this).closest('li').find('.breadcumb-sub-menu').hasClass('open')) {
      $('.breadcumb-main-menu .down-arrow').removeClass('open');
      $('.breadcumb-sub-menu').removeClass('open');
    } else {
      $('.breadcumb-sub-menu').removeClass('open');
      $('.breadcumb-main-menu .down-arrow').removeClass('open');
      $(this).addClass('open');
      $(this).closest('li').find('.breadcumb-sub-menu').addClass('open');
    }
    event.stopPropagation();
  });
}
