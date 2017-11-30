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


if (document.location.href == "https://tea-prototype.herokuapp.com/tea/about-you/checkyouranswers") {
  // set a new cookie
  expiry = new Date();
  expiry.setTime(expiry.getTime()+(60*60*1000)); // Sixty minutes

  // Date()'s toGMTSting() method will format the date correctly for a cookie
  document.cookie = "visited1=yes; path=/; expires=" + expiry.toGMTString();
} else if (document.location.href == "https://tea-prototype.herokuapp.com/tea/employment/checkyouranswers") {
  // set a new cookie
  expiry = new Date();
  expiry.setTime(expiry.getTime()+(60*60*1000)); // Sixty minutes

  // Date()'s toGMTSting() method will format the date correctly for a cookie
  document.cookie = "visited2=yes; path=/; expires=" + expiry.toGMTString();
} else if (document.location.href == "https://tea-prototype.herokuapp.com/tea/contact/checkyouranswers") {
  // set a new cookie
  expiry = new Date();
  expiry.setTime(expiry.getTime()+(60*60*1000)); // Sixty minutes

  // Date()'s toGMTSting() method will format the date correctly for a cookie
  document.cookie = "visited3=yes; path=/; expires=" + expiry.toGMTString();
}
else if (document.location.href == "https://tea-prototype.herokuapp.com/tea/payment/ddv2-confirm") {
  // set a new cookie
  expiry = new Date();
  expiry.setTime(expiry.getTime()+(60*60*1000)); // Sixty minutes

  // Date()'s toGMTSting() method will format the date correctly for a cookie
  document.cookie = "visited4=yes; path=/; expires=" + expiry.toGMTString();
}
else if (document.location.href == "https://tea-prototype.herokuapp.com/tea/about-your-pension/checkyouranswers") {
  // set a new cookie
  expiry = new Date();
  expiry.setTime(expiry.getTime()+(60*60*1000)); // Sixty minutes

  // Date()'s toGMTSting() method will format the date correctly for a cookie
  document.cookie = "visited5=yes; path=/; expires=" + expiry.toGMTString();
}

else if (document.location.href == "https://tea-prototype.herokuapp.com/tea/HMRC/checkyouranswers") {
  // set a new cookie
  expiry = new Date();
  expiry.setTime(expiry.getTime()+(60*60*1000)); // Sixty minutes

  // Date()'s toGMTSting() method will format the date correctly for a cookie
  document.cookie = "visited6=yes; path=/; expires=" + expiry.toGMTString();
}

if (document.location.href.includes("/tea/AW8P") && document.cookie.indexOf("visited1=") >= 0) {
  // They've been here before
  document.getElementById("relationshipcomplete").classList.remove("js-hidden");
}

if (document.location.href.includes("/tea/AW8P") && document.cookie.indexOf("visited2=") >= 0) {
  // They've been here before
  document.getElementById("employmentcomplete").classList.remove("js-hidden");
}

if (document.location.href.includes("/tea/AW8P") && document.cookie.indexOf("visited3=") >= 0) {
  // They've been here before
  document.getElementById("contactcomplete").classList.remove("js-hidden");
}

if (document.location.href.includes("/tea/AW8P") && document.cookie.indexOf("visited4=") >= 0) {
  // They've been here before
  document.getElementById("paymentcomplete").classList.remove("js-hidden");
}

if (document.location.href.includes("/tea/AW8P") && document.cookie.indexOf("visited5=") >= 0) {
  // They've been here before
  document.getElementById("pensioncomplete").classList.remove("js-hidden");
}

if (document.location.href.includes("/tea/AW8P") && document.cookie.indexOf("visited6=") >= 0) {
  // They've been here before
  document.getElementById("hmrccomplete").classList.remove("js-hidden");
}

if (document.cookie.indexOf("visited1=") >= 0 &&
    document.cookie.indexOf("visited2=") >= 0 &&
    document.cookie.indexOf("visited3=") >= 0 &&
    document.cookie.indexOf("visited4=") >= 0 &&
    document.cookie.indexOf("visited5=") >= 0 &&
    document.cookie.indexOf("visited6=") >= 0){
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
