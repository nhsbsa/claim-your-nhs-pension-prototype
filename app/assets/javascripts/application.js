/* global $ */
/* global GOVUK */

// Warn about using the kit in production
if (
  window.sessionStorage && window.sessionStorage.getItem('prototypeWarning') !== 'false' &&
  window.console && window.console.info
) {
  window.console.info('GOV.UK Prototype Kit - do not use for production')
  window.sessionStorage.setItem('prototypeWarning', true)
}

var relationshipcomplete = document.getElementById("relationshipcomplete");
var employmentcomplete = document.getElementById("employmentcomplete");
var contactcomplete = document.getElementById("contactcomplete");
var paymentcomplete = document.getElementById("paymentcomplete");
var pensioncomplete = document.getElementById("pensioncomplete");
var hmrccomplete = document.getElementById("hmrccomplete");

if (document.location.href == "https://tea-prototype.herokuapp.com/awards/V6/about-you/checkyouranswers") {
  // set a new cookie
  expiry = new Date();
  expiry.setTime(expiry.getTime()+(60*60*1000)); // Sixty minutes

  // Date()'s toGMTSting() method will format the date correctly for a cookie
  document.cookie = "visited1=yes; path=/; expires=" + expiry.toGMTString();
} else if (document.location.href == "https://tea-prototype.herokuapp.com/awards/V6/employment/checkyouranswers") {
  // set a new cookie
  expiry = new Date();
  expiry.setTime(expiry.getTime()+(60*60*1000)); // Sixty minutes

  // Date()'s toGMTSting() method will format the date correctly for a cookie
  document.cookie = "visited2=yes; path=/; expires=" + expiry.toGMTString();
} else if (document.location.href == "https://tea-prototype.herokuapp.com/awards/V6/contact/checkyouranswers") {
  // set a new cookie
  expiry = new Date();
  expiry.setTime(expiry.getTime()+(60*60*1000)); // Sixty minutes

  // Date()'s toGMTSting() method will format the date correctly for a cookie
  document.cookie = "visited3=yes; path=/; expires=" + expiry.toGMTString();
} else if (document.location.href == "https://tea-prototype.herokuapp.com/awards/V6/payment/ddv2-confirm") {
  // set a new cookie
  expiry = new Date();
  expiry.setTime(expiry.getTime()+(60*60*1000)); // Sixty minutes

  // Date()'s toGMTSting() method will format the date correctly for a cookie
  document.cookie = "visited4=yes; path=/; expires=" + expiry.toGMTString();
} else if (document.location.href == "https://tea-prototype.herokuapp.com/awards/V6/about-your-pension/checkyouranswers") {
  // set a new cookie
  expiry = new Date();
  expiry.setTime(expiry.getTime()+(60*60*1000)); // Sixty minutes

  // Date()'s toGMTSting() method will format the date correctly for a cookie
  document.cookie = "visited5=yes; path=/; expires=" + expiry.toGMTString();
} else if (document.location.href == "https://tea-prototype.herokuapp.com/awards/V6/HMRC/checkyouranswers") {
  // set a new cookie
  expiry = new Date();
  expiry.setTime(expiry.getTime()+(60*60*1000)); // Sixty minutes

  // Date()'s toGMTSting() method will format the date correctly for a cookie
  document.cookie = "visited6=yes; path=/; expires=" + expiry.toGMTString();
}

if (document.location.href.includes("/awards/V6/AW8P") && document.cookie.indexOf("visited1=") >= 0) {
  // They've been here before
  document.getElementById("relationshipcomplete").classList.remove("js-hidden");
}

if (document.location.href.includes("/awards/V6/AW8P") && document.cookie.indexOf("visited2=") >= 0) {
  // They've been here before
  document.getElementById("employmentcomplete").classList.remove("js-hidden");
}

if (document.location.href.includes("/awards/V6/AW8P") && document.cookie.indexOf("visited3=") >= 0) {
  // They've been here before
  document.getElementById("contactcomplete").classList.remove("js-hidden");
}

if (document.location.href.includes("/awards/V6/AW8P") && document.cookie.indexOf("visited4=") >= 0) {
  // They've been here before
  document.getElementById("paymentcomplete").classList.remove("js-hidden");
}

if (document.location.href.includes("/awards/V6/AW8P") && document.cookie.indexOf("visited5=") >= 0) {
  // They've been here before
  document.getElementById("pensioncomplete").classList.remove("js-hidden");
}

if (document.location.href.includes("/awards/V6/AW8P") && document.cookie.indexOf("visited6=") >= 0) {
  // They've been here before
  document.getElementById("hmrccomplete").classList.remove("js-hidden");
}

if (document.cookie.indexOf("visited1=") >= 0 &&
    document.cookie.indexOf("visited2=") >= 0 &&
    document.cookie.indexOf("visited3=") >= 0 &&
    document.cookie.indexOf("visited4=") >= 0 &&
    document.cookie.indexOf("visited5=") >= 0 &&
    document.cookie.indexOf("visited6=") >= 0) {
      document.getElementById("application").removeAttribute("disabled");
}

var del_cookies = function() {
  document.cookie = "visited1=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  document.cookie = "visited2=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  document.cookie = "visited3=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  document.cookie = "visited4=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  document.cookie = "visited5=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  document.cookie = "visited6=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  location.reload();
};

if(document.getElementById("review-table-one")) {
  var runout = document.getElementById("runout");
  var hasNhsno = document.getElementById("has-nhsno");
  var nhsno = document.getElementById("nhsno");
  var codeRow = document.getElementById("postcode-row");
  var contactRow = document.getElementById("contact-row");
  var hasMobile = document.getElementById("has-mobile");
  var hasEmail = document.getElementById("has-email");
  var mobileValue = document.getElementById("mobile-value");
  var emailValue = document.getElementById("email-value");
  // payments
  var method = document.getElementById("method");
  var paymentRow = document.getElementById("payments");
  var amountRow = document.getElementById("amount");
  var firstPayRow = document.getElementById("fp");
  var lastPayRow = document.getElementById("lp");

  var changemobile = document.getElementById("changemobile");
  var addorchange = document.getElementById("addorchange");

  //hide contact where none given
  if (hasMobile && hasMobile.innerHTML === 'No') {
    mobileValue.className += " hidden";
  }
  if (hasNhsno && hasNhsno.innerHTML === 'No') {
    nhsno.className += " hidden";
  }
  if (hasEmail && hasEmail.innerHTML === 'No') {
    emailValue.className += " hidden";
  }
  if (changemobile && changemobile.innerHTML === '') {
    addorchange += "Add";
  }

  //if card payment hide dd details
  if(method && method.innerHTML === 'Card payment') {
    paymentRow.className += " hidden";
    amountRow.className += " hidden";
    firstPayRow.className += " hidden";
    lastPayRow.className += " hidden";
  }
}

if (document.getElementById("has_dd")) {
  var ddContent = document.getElementById("dd_content");
  var hasDD = document.getElementById("has_dd").innerHTML;

  if (hasDD != "dd") {
    ddContent.className += " hidden";
  }
}

$(document).ready(function () {
  // Use GOV.UK shim-links-with-button-role.js to trigger a link styled to look like a button,
  // with role="button" when the space key is pressed.
  GOVUK.shimLinksWithButtonRole.init()

  // Show and hide toggled content
  // Where .multiple-choice uses the data-target attribute
  // to toggle hidden content
  var showHideContent = new GOVUK.ShowHideContent()
  showHideContent.init()

  //checkbox contact
  if (document.getElementById("contact-boxes")) {
    var textBox = document.getElementById("text");
    var emailBox = document.getElementById("email");
    var postBox = document.getElementById("post");
    postBox.addEventListener('change', cancelPrefs);
    function cancelPrefs() {
      emailBox.checked = false;
      textBox.checked = false;
    }
    emailBox.addEventListener('change', changePrefs);
    textBox.addEventListener('change', changePrefs);
    function changePrefs() {
      postBox.checked = false;
    }
  }

  if(document.getElementById("runout")) {
    var edate = document.getElementById("Edate").innerHTML.trim();

    if (edate == "29 September 2017") {

      document.getElementById('runout').classList.remove("hidden");
    } else {
      console.log("no");
    };
  }
});
