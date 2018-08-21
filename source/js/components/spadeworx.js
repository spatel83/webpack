/* jshint esversion: 6 */
/* eslint no-unused-expressions: 0 */
/* eslint import/prefer-default-export: 0 */
/* eslint no-undef: 0 */
/* eslint no-plusplus: ["error", { "allowForLoopAfterthoughts": true }] */
/* eslint no-underscore-dangle: 0 */
/* eslint max-len: 0 */
/* eslint func-names: 0 */
/* eslint no-console: 0 */
/* Sanjay Patel */

/**
 * Spadeworx Scripts.
 *
 * Cleaned up a bit to be easier to read, more reusable and ES6-ish compliant,
 * but left most of the original comments, particularly the "searchOverride"
 * method.
 */

export function loadSpadeworxScripts() {
  /**
   * The search suggestions functionality in SharePoint 2013 is provided by
   * ajaxtoolkit.js. In order to extend the existing functionality I had to
   * override the _update function of the
   * AjaxControlToolkit.AutoCompleteBehavior.prototype which is responsible for
   * the search as you type functionality of the search box.
   */
  function searchOverride() {
    /**
     * Keep a copy of the original function
     */
    AjaxControlToolkit.AutoCompleteBehavior.prototype._update2 = AjaxControlToolkit.AutoCompleteBehavior.prototype._update;


    /**
     * Highlight Search Term.
     *
     * @param {string} picUrl
     *   Picture URL used for autocomplete search results.
     * @param {string} fullName
     *   Full name of the person found for autocomplete search results.
     * @param {string} prefixText
     *   Prefix text.
     *
     * @return {string} divElement
     *   HTML for the particular autocomplete search result.
     */
    function buildSearchResult(picUrl, fullName, prefixText) {
      /**
       * Add highlighting of the search term.
       */
      const index = fullName.toLowerCase().indexOf(prefixText.toLowerCase());
      let userName = '';
      let divElement = '';

      if (index >= 0) {
        userName = `${fullName.substr(0, index)}<b>${fullName.substr(index, prefixText.length)}</b>${fullName.substr(index + prefixText.length)}`;
      } else {
        userName = fullName;
      }

      divElement = `<div class="item">
        <div class="id">
          <div class="ms-tableCell ms-verticalAlignTop">
            <div class="ms-peopleux-userImgDiv">
              <div class="ms-imnSpan">
                <div style="width: 36px; height: 30px;" id="ImgPicSpan1" class="ms-peopleux-userImgWrapper ms-subtleLink ms-peopleux-imgUserLink"><img style="cliptop: 0px; clipright: 36px; clipbottom: 36px; clipleft: 0px; min-height: 30px; max-height:30px; min-width: 30px; max-width: 30px;" id="PictureDiv1" class="ms-peopleux-userImg" src="${picUrl}"/></div>
              </div>
            </div>
          </div>
          <div id="PersonNameDiv" class="ms-tableCell ms-verticalAlignTop" >
            <div>${userName}</div>
          </div>
        </div>
      </div>`;

      return divElement;
    }

    /**
     * Format Autocomplete Results.
     *
     * @param {object} results
     *   Autocomplete results object.
     *
     * @return {array} names
     *   Array of all of the people found for autocomplete results.
     */
    function formatAutocompleteResults(results, prefixText) {
      const names = [];
      let fullName = null;
      let picUrl = null;
      let divElement = null;

      for (let i = 0; i < results.length; i++) {
        picUrl = '/Style%20Library/VMSNet/images/Anniversaries/person.gif';
        if (results[i].Cells.results[2].Value !== null) {
          picUrl = results[i].Cells.results[2].Value;
        }
        fullName = results[i].Cells.results[3].Value;
        divElement = buildSearchResult(picUrl, fullName, prefixText);
        names.push(divElement);
      }
      return names;
    }

    /**
     * Format Autocomplete Results With Pictures.
     *
     * @param {object} results
     *   Autocomplete results object.
     *
     * @return {array} names
     *   Array of all of the people found for autocomplete results.
     */
    function formatAutocompleteResutlsWithPictures(results, prefixText) {
      const names = [];
      let fullName = null;
      let userName = null;
      let index = null;
      let picUrl = null;
      let divElement = null;

      for (let i = 0; i < results.length; i++) {
        fullName = results[i].Cells.results[3].Value;
        index = fullName.toLowerCase().indexOf(prefixText.toLowerCase());

        if (index >= 0) {
          userName = `${fullName.substr(0, index)}<b>${fullName.substr(index, prefixText.length)}</b>${fullName.substr(index + prefixText.length)}`;
        }

        if (results[i].Cells.results[4].Value.indexOf('Person.aspx?accountname') > -1) {
          picUrl = '/Style%20Library/VMSNet/images/Anniversaries/person.gif';
          if (results[i].Cells.results[2].Value !== null) {
            picUrl = results[i].Cells.results[2].Value;
          }
          divElement = buildSearchResult(picUrl, fullName, prefixText);
          names.push(divElement);
        } else {
          names.push(userName);
        }
      }
      return names;
    }

    /**
     * Register the searchOnSuccess on the same prototype object in order for
     * the update2 function to keep the context with all variables.
     */
    AjaxControlToolkit.AutoCompleteBehavior.prototype.searchOnSuccess = function (data, prefixText, completionItems, cacheResults) {
      let results = null;
      let names = null;

      if (data.d) {
        if ($('a[id$="csr_NavButton"]').text() === 'People') {
          if (data.d.query) {
            results = data.d.query.PrimaryQueryResult.RelevantResults.Table.Rows.results;
          }
          names = formatAutocompleteResults(results, prefixText);
        } else {
          results = data.d.query.PrimaryQueryResult.RelevantResults.Table.Rows.results;
          names = formatAutocompleteResutlsWithPictures(results, prefixText);
        }
      } else if (data.d.postquery) {
        results = data.d.postquery.PrimaryQueryResult.RelevantResults.Table.Rows.results;
      } else {
        throw 'Results not found';
      }

      /**
       * Put our results in the people name container as we're not using it on our page
       */
      completionItems.set_peopleNames(names);
      /**
       * Call the original update function which renders out the results.
       */
      this._update2(prefixText, completionItems, cacheResults);
    };

    /**
     * Register an overload update function which executes a real search.
     */
    AjaxControlToolkit.AutoCompleteBehavior.prototype._update = function (prefixText, completionItems, cacheResults) {
      const context = this;
      const prefixTextWithAll = `${prefixText}*`;
      const queryUrl = `/_api/search/query?rowlimit=15&querytext='${prefixTextWithAll}'&sourceid='2e49acca-b037-413c-a140-f62c5938e7d8'&refinementfilters='title:phrase(%22${prefixTextWithAll}%22)'&fprequerysuggestions=true&selectproperties='PictureURL, Title, Path'`;

      $.ajax({
        /**
         * Get top 5 results searching only on title field. Other paramaters can
         * be added as well query term is what the user has entered with a
         * wildcard appended.
         */
        url: queryUrl,
        method: 'GET',
        headers: {
          accept: 'application/json;odata=verbose;charset=utf-8',
        },
        success: (data) => {
          context.searchOnSuccess(data, prefixText, completionItems, cacheResults);
        },
        error: (error) => {
          console.warn(`Warning: ${error}`);
        },
      });
    };
  }

  /**
   * Override Share Point OOB Autopopulate Search.
   * Make sure ajaxtoolkit is loaded before registering the functions.
   */
  ExecuteOrDelayUntilScriptLoaded(searchOverride, 'ajaxtoolkit.js');

  /**
   * PDF Preview.
   */
  function pdfPreview() {
    SP.SOD.executeOrDelayUntilScriptLoaded(() => {
      filePreviewManager.previewers.extensionToPreviewerMap.pdf = [embeddedWACPreview, WACImagePreview];
      embeddedWACPreview.dimensions.pdf = {
        width: 379,
        height: 252,
      };
    }, 'filepreview.js');
    notifyScriptsLoadedAndExecuteWaitingJobs('VMSNet.pdfpreviews/previews.js');
  }

  const searchContainer = document.querySelector('.search-result-cont');
  if (searchContainer !== null) {
    pdfPreview();
  }

  /**
   * Check Refinement Panel
   */
  function checkRefinementPanel() {
    if ($(window).width() <= 567 && $('.search-result-cont .refinement-btn').length > 0) {
      $('#refinementPanel').addClass('fastTransition closed');
      $('.contact-details').toggleClass('wide');
      setTimeout(() => {
        $('#refinementPanel').removeClass('fastTransition');
      }, 300);
    }
  }

  const refinementPanel = document.getElementById('refinementPanel');
  if (refinementPanel !== null) {
    checkRefinementPanel();
  }


  /**
   * Check Contact Lists.
   */
  function checkContactLists() {
    $('body').on('click', '#longContactList .ms-ref-refinername', () => {
      $(this).parents('#longContactList').siblings('#LessLinkContact').toggle();
    });
    $('body').on('click', '#shortContactList .ms-ref-refinername', () => {
      $(this).parents('#shortContactList').siblings('#MoreLinkContact').toggle();
    });
  }

  const contactList = document.getElementById('#longContactList');
  if (contactList !== null) {
    checkContactLists();
  }

  /**
   * Hide Refinement Panel.
   */
  window.HideRefinementPanel = () => {
    $('#refinementPanel').toggleClass('closed');
    $('.contact-details').toggleClass('wide');
    $('#refinementLink p').toggleClass('closed');
  };

  /**
   * Show Less Contact.
   */
  window.ShowLessContact = (parentNode) => {
    $('#longContactList').css('display', 'none');
    $('#shortContactList').css('display', 'block');
    $('#shortContactList').find('#UnselectedSection').css('display', 'block');
    $('#shortContactList').find('#refinerExpandCollapseArrow').attr('class', 'ms-ref-uparrow');
    $('#MoreLinkContact').css('display', 'block');
    $('#LessLinkContact').css('display', 'none');
  };

  /**
   * Show More Contact.
   */
  window.ShowMoreContact = (parentNode) => {
    $('#shortContactList').css('display', 'none');
    $('#longContactList').css('display', 'block');
    $('#longContactList').find('#UnselectedSection').css('display', 'block');
    $('#longContactList').find('#refinerExpandCollapseArrow').attr('class', 'ms-ref-uparrow');
    $('#MoreLinkContact').css('display', 'none');
    $('#LessLinkContact').css('display', 'block');
  };

  /**
   * Get Category.
   */
  window.GetCategory = (elem, categories) => {
    const categoriesList = categories.split(';');
    const wireDescription = $(elem).closest('.wire-description');
    const wireListItem = $(elem).closest('li');
    const initWidth = wireDescription.width();
    let aTag = '';
    let url = '';
    let addedWidth = $(elem).prev().width() + 5;

    for (let index = 1; index < categoriesList.length && index <= 5; index++) {
      aTag = document.createElement('a');
      url = `/News/Pages/ArticleArchive.aspx?Category=${categoriesList[index]}&#k=${categoriesList[index]}`;
      aTag.href = url;
      $(elem).parent().append(', ');
      elem.parentNode.appendChild(aTag);
      aTag.innerHTML = categoriesList[index];
      addedWidth += $(aTag).width() + 5;
      $(aTag).css({
        opacity: 0,
      }).delay(100 + (index * 50)).animate({
        opacity: 1,
      }, 150);
    }

    /**
     * Check to make sure the initial width is less than the new width. If new
     * width is larger, expand wire stories.  If not, keep the same size.
     */
    if (initWidth < addedWidth + 100) {
      wireDescription.animate({
        width: addedWidth + 100,
      }, 200);
      wireListItem.animate({
        width: addedWidth + 267,
      }, 200);
    }
    $(elem).remove();
  };

  /**
   * Set the SearchBox to dynamic width if category is not present.
   */
  if ($('header #SearchBox').find('.ms-srch-sb-navLink').length === 0) {
    $('header #SearchBox').addClass('no_category');
  }
}
