var express = require('express');
var router = express.Router();

//create the date helper
var dateHelperImport = require('./dateHelper.js');
var dateHelper = dateHelperImport.createDateHelper();
dateHelper.today = new Date();
dateHelper.thisDay = dateHelper.today.getDate();
dateHelper.thisMonth = dateHelper.today.getMonth();
dateHelper.thisYear = dateHelper.today.getFullYear();
dateHelper.firstPaymentDate = dateHelper.createDate(dateHelper.thisDay, dateHelper.thisMonth, dateHelper.thisYear, 12);
dateHelper.lastPaymentDate = "28 January 2018";
dateHelper.showDateHelper();

//create a ppc
var ppc_master = require('./ppc.js');
var ppc = ppc_master.createPPC();
ppc.duration = "test";
ppc.daysold = null;
ppc.monthsold = null;
ppc.yearsold = null;
ppc.startDay = null;
ppc.startMonth = null;
ppc.startYear = null;
ppc.startDate = '29 June 2017';
ppc.dateSold = null;
ppc.endDay = null;
ppc.endYear = null;
ppc.endMonth = dateHelper.today.getMonth();
ppc.endDate = '29 September 2017';
ppc.autoRenew = null;
ppc.plusMonth = null;
ppc.minusMonth = null;

//create applicant
var applicantMaster = require('./applicant.js');
var applicant = applicantMaster.createApplicant();
applicant.title = null;
applicant.firstName = null ;
applicant.lastName = null ;
applicant.fullName = null ;
applicant.dobDay = null;
applicant.dobMonth = null;
applicant.dobYear = null;
applicant.dob = null;
applicant.hasNhsno = null;
applicant.nhsno = null;
applicant.postCode = null;
applicant.addresslineone = null;
applicant.addresslinetwo = null;
applicant.town = null;
applicant.hasMobile = false;
applicant.hasEmail = false;
applicant.reminderEmail = false;
applicant.reminderEmail = false;
applicant.mobile = null;
applicant.contactPref = 'post';
applicant.contactValue = '3 street, Town, NE1 246';
applicant.email = null;
applicant.address = '3 street, Town, NE1 246';
applicant.age = null;
applicant.renewing = false;

//create a text helper
var text_master = require('./textHelper.js');
var textHelper = text_master.createTextHelper();
textHelper.paymentMethod = "Direct debit";
textHelper.cost = "£104";
textHelper.cardPaymentInfo = '12 month prescription prepayment';
textHelper.length = "12 months";
textHelper.format = "account";
textHelper.reminderText  = " ";
textHelper.neitherText = " ";
textHelper.error60 = " ";
textHelper.contactText = "You should make a note of the following:";
textHelper.method = "a letter";

// Route index page
router.get('/', function (req, res) {
  res.render('index');
});

module.exports = router;

//card details
var card = {
  cardNumber : '************7470',
  exMonth : 11,
  exYear : 16,
  exDate : '11/16',
  holderName : 'Mr Smith',
  holderAddress : '3 Street, town',
  holderPostCode : 'NE2 468',
  setExdate : function () {
    this.exDate = this.exMonth + '/' + this.exYear;
  },
  setCardNumber : function () {
    var tempString = this.cardNumber.toString();
    var lastFour = tempString.substr(tempString.length - 4);
    this.cardNumber = "************" + lastFour;
    console.log(this.cardNumber);
  }
};

function capitaliseFirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

var resetAll =  function () {
  console.log("Reset all...");
  applicant.renewing = false;
  ppc.duration = null;
  //card reset
  card.cardNumber = '************7470';
  card.exMonth = 11;
  card.exYear = 16;
  card.exDate = '11/16';
  card.holderName = 'Mr Smith';
  card.holderAddress = '3 Street, town';
  applicant.firstName = '';
  applicant.lastName = '';
  applicant.dobDay  = '';
  applicant.dobMonth  = '';
  applicant.dobYear  = '';
  applicant.address  = '';
  ppc.daysold  = '';
  ppc.monthsold  = '';
  ppc.yearsold  = '';
  applicant.mobile  = '';
  textHelper.length  = '';
  ppc.startDate  = '';
  ppc.endDate  = '';
  textHelper.cost  = '';
  textHelper.paymentMethod  = '';
  dateHelper.firstPaymentDate  = '';
  datesold : ppc.dateSold  = '';
  applicant.title  = '';
  applicant.firstName  = '';
  applicant.lastName  = '';
  applicant.dob  = '';
  applicant.dobDay  = '';
  applicant.dobMonth  = '';
  applicant.dobYear  = '';
  applicant.postCode  = '';
  applicant.addresslineone  = '';
  applicant.addresslinetwo  = '';
  applicant.town  = '';
  ppc.startDay = '';
  ppc.startMonth  = '';
  ppc.startYear  = '';
  ppc.daysold  = '';
  ppc.monthsold = '';
  ppc.yearsold  = '';
  applicant.mobile  = '';
  ppc.startDate  = '';
  ppc.endDate  = '';
  textHelper.cost  = '';
  textHelper.paymentMethod  = '';
  dateHelper.firstPaymentDate  = '';
  dateHelper.lastPaymentDate  = '';
  applicant.hasNhsno  = '';
  applicant.nhsno  = '';
}

resetAll();

//bool to text
function boolToText(boo) {
  if (boo === true) {
    return 'Yes';
  } else {
    return 'No';
  }
}

var querystring = require('querystring');
router.get('/', function (req, res) {
  res.render('index');
});

router.get('/index', function (req, res) {
  resetAll();
  res.render('index');
});

router.get('/ppc/index', function (req, res) {
  resetAll();
  res.render('ppc/index');
});

router.get('/privacy', function (req, res) {
  res.render('/privacy');
});

//foogle search
router.get(/go-handler/, function (req, res) {
  var term = req.query.search.toLowerCase();
  if ( term.includes("ppc") ) {
    console.log('result-ppc');
    res.render('google/result-prepayment', {
      term : term
    });
  } else if ( term.includes("prepayment") || term.includes("ppc") ) {
    console.log('result-prepayment');
    res.render('google/result-prepayment', {
      term : term
    });
  } else if ( term.includes("pharmacy") || term.includes("phamacy") ) {
    console.log('result-pharmacy');
    res.render('google/result-pharmacy-web', {
      term : term
    });
  }else {
    console.log('other');
    res.render('google/result-prepayment', {
      term : term
    });
  }
});


////// PPC ///////

function dateToString(monthInt) {
  var monthString;
  switch (monthInt) {
    case 1:
        monthString = "January";
        break;
    case 2:
        monthString = "February";
        break;
    case 3:
        monthString = "March";
        break;
    case 4:
        monthString = "April";
        break;
    case 5:
        monthString = "May";
        break;
    case 6:
        monthString = "June";
        break;
    case 7:
        monthString = "July";
        break;
    case 8:
        monthString = "August";
        break;
    case 9:
        monthString = "September";
        break;
    case 10:
        monthString = "October";
        break;
    case 11:
        monthString = "November";
        break;
    case 12:
        monthString = "December";
  }
  return monthString;
};


//DOB
router.get(/dob/, function (req, res) {
  if (req.query.renew === "true") {
    applicant.renewing = true;
  }
  res.render('ppc/dob');
});

//dob-handler
router.get(/birth-handler/, function (req, res) {
  if (req.query.day != '') {
    applicant.dobDay = req.query.day;
  }
  if (req.query.month != '') {
    applicant.dobMonth = req.query.month;
  }
  if (req.query.year != '') {
    applicant.dobYear = req.query.year;
    applicant.age = (2016 - applicant.dobYear);
  }
  console.log(applicant.age);
  if (applicant.age <= 16 || applicant.age >= 60) {
    res.redirect('60');
  } else if (applicant.age == 59) {
    res.redirect('59');
  } else {
   res.redirect('name');
  }
});

//Name
router.get(/details-handler/, function (req, res) {
  applicant.firstName = req.query.firstname;
  applicant.lastName = req.query.lastname;
  applicant.setFullName();
  res.redirect('post-address');
});

//NHS Number
router.get(/nhs-handler/, function (req, res) {
  applicant.hasNhsno = req.query.hasnhsno;
  applicant.nhsno = req.query.nhsno;
  if (applicant.renewing === true) {
    res.redirect('duration');
  } else {
    res.redirect('duration');
  }
});

//address
router.get(/address-c-handler/, function (req, res) {
  applicant.postCode = req.query.postcode;
  //applicant.createAddress(req.query.lineone, req.query.linetwo );
  // address = LINEONE LINETWO TOWN COUNTY POSTCODE
  var tempAddress = req.query.lineone;
  if (req.query.linetwo != '') {
    tempAddress = tempAddress + " " + req.query.linetwo;
  }
  if (req.query.town != '') {
    tempAddress = tempAddress + " " + req.query.town;
  }
//  if (req.query.county != '') {
//    tempAddress = tempAddress + " " + req.query.county;
//  }
  if (req.query.postcode != '') {
    tempAddress = tempAddress + " " + req.query.postcode;
  }
  applicant.address = tempAddress;
  console.log(applicant.address);
  textHelper.setContactText(applicant.contactPref, applicant.contactValue);
  if (applicant.check() === true) {
    res.redirect('nhsno');
  } else {
    res.redirect('nhsno');
  }
});

//Duration and payment
router.get(/duration/, function (req, res) {
  res.render('ppc/duration', {
    dddate : dateHelper.firstPaymentDate
  });
});

//Duration and payment
router.get(/dur-handler/, function (req, res) {
  ppc.duration = req.query.duration;
  textHelper.setPaymentText(ppc.duration);
  console.log(ppc.duration);
  res.redirect('cover_date');
});

//start-date
router.get(/start-date/, function (req, res) {
  console.log(dateHelper.thisDay);
  res.render('ppc/start-date', {
    todayday : dateHelper.thisDay,
    todaymonth : dateHelper.thisMonth + 1,
    todayyear : dateHelper.thisYear,
    minusmonth : dateHelper.plusMonth,
    plusmonth : dateHelper.minusMonth
  });
});

//start-date
router.get(/cover_date/, function (req, res) {
  console.log(dateHelper.thisDay);
  res.render('ppc/cover_date', {
    minusmonth : dateHelper.plusMonth,
    plusmonth : dateHelper.minusMonth
  });
});

//Start date handler
  router.get(/start-handler/, function (req, res) {
    if (req.query.rcg == "today") {
      ppc.startDay = dateHelper.thisDay;
      ppc.startMonth = dateHelper.thisMonth+1;
      ppc.startYear = dateHelper.thisYear;
    } else if (req.query.rcg == "future") {
      ppc.startDay = req.query.futureday;
      ppc.startMonth = req.query.futuremonth;
      ppc.startYear = req.query.futureyear;
    } else {
      ppc.startDay = req.query.pastday;
      ppc.startMonth = req.query.pastmonth;
      ppc.startYear = req.query.pastyear;
    }
    //issue!
    ppc.startDate = dateHelper.dateStringCreator(ppc.startDay, ppc.startMonth, ppc.startYear);
    console.log("ppc.startDate = " + ppc.startDate);
    ppc.endDate = dateHelper.createEnd(ppc.startDate, ppc.startMonth, ppc.startYear, ppc.duration);
    console.log("ppc.endDate = " + ppc.endDate);
    res.redirect('copy');
  });

//Contact handler
router.get(/contact-handler/, function (req, res) {

  if (req.query.text === 'true') {
    applicant.hasMobile = true;
    console.log("applicant.hasMobile = true");
  } else {
    applicant.hasMobile = false;
    console.log("applicant.hasMobile = false");
  }
  if (req.query.email === 'true') {
    applicant.hasEmail = true;
    console.log("applicant.hasEmail = true");
  } else {
    applicant.hasEmail = false;
    console.log("applicant.hasEmail = false");
  }
  if (applicant.hasMobile) {
    res.redirect('mobile-number');
  } else if (applicant.hasEmail) {
    res.redirect('email-address');
  } else {
    res.redirect('check');
  }

});


router.get(/reminder/ , function (req, res) {
       console.log(ppc.duration);
    if (ppc.duration == 'dd') {
       textHelper.neitherText  = 'You will get a postal reminder about the auto-renewal of your prescription prepayment. You will get this a month before your prepayment ends.'
    } else {
        textHelper.neitherText  = 'You will not receive a reminder to renew your prescription prepayment. Make a note of your prepayment expiry date.'
    }

    res.render('ppc/reminder', {
      neithertext : textHelper.neitherText
    });
  });


//Mobile capture
router.get(/mobile-c-handler/, function (req, res) {
  applicant.mobile = req.query.mobile;
  if (applicant.hasEmail || applicant.reminderEmail) {
    res.redirect('email-address');
  } else {
    res.redirect('check');
  }
});

//Email capture
router.get(/email-c-handler/, function (req, res) {
  applicant.email = req.query.email;
  console.log(applicant.email);
  res.redirect('check');
});

//Check your answers
router.get(/check/, function (req, res) {
  console.log("nhsno" + applicant.hasNhsno);
  var myDobMonth;
  if (applicant.dobMonth === null) {
    myDobMonth = 'May';
  } else {
    myDobMonth = dateHelper.monthToText(applicant.dobMonth);
  }
  textHelper.setContactText(applicant.mobile, applicant.email);
  textHelper.setReminderText(applicant.mobile, applicant.email);
  textHelper.setMethod(applicant.email);
  res.render('ppc/check', {
  name : applicant.firstName + ' ' + applicant.lastName,
  dobday : applicant.dobDay,
  dobmonth : myDobMonth,
  dobyear : applicant.dobYear,
  address : applicant.address,
  hasmobile : boolToText(applicant.hasMobile),
  mobilenumber : applicant.mobile,
  hasemail :  boolToText(applicant.hasEmail),
  reminderEmail :  boolToText(applicant.reminderEmail),
  reminderMobile :  boolToText(applicant.reminderMobile),
  emailaddress : applicant.email,
  length : textHelper.length,
  startdate : ppc.startDate,
  enddate : ppc.endDate,
  cost : textHelper.cost,
  method : textHelper.paymentMethod,
  firstdddate : dateHelper.firstPaymentDate,
  lastdddate : dateHelper.lastPaymentDate,
  hasnhsno : applicant.hasNhsno,
  nhsno : applicant.nhsno
  });
});

//card holder address holder
router.get(/holder-handler/, function (req, res) {
  card.postCode = req.query.postcode;
  if (req.query.linetwo != '') {
    card.holderAddress = req.query.lineone + ', ' + req.query.linetwo + ', ' + card.postCode;
  } else {
    card.holderAddress = req.query.lineone + ', ' + card.postCode;
  }
  res.redirect('dd-confirm');
});

//dd-handler
router.get(/dd-handler/, function (req, res) {
    res.redirect('ddv2-confirm');
});

//pay-handler
router.get(/payment-add/, function (req, res) {
  res.render('ppc/payment-add', {
    format : capitaliseFirst(textHelper.format)
  });
});

//pay-handler
router.get(/pay-handler/, function (req, res) {
  res.redirect('dd-confirm');
});

//pay-handler
router.get(/c-handler/, function (req, res) {
  if (ppc.duration === 'dd') {
    res.redirect('ddpay');
  } else {
    res.redirect('ppcprivacy');
  }
});

router.get(/privacy-handler/,  function (req, res) {
  console.log(ppc.duration);
  if (ppc.duration === 'dd') {
    res.redirect('dddec');
  } else {
    res.redirect('payment-details');
  }
});

router.get(/dddec/,  function (req, res) {
  res.render('ppc/dddec')
});

//done
router.get(/done-v3/, function (req, res) {
  console.log(applicant.hasMobile);
  console.log(applicant.hasEmail);
  if (applicant.hasMobile == false || applicant.reminderMobile == false && applicant.hasEmail == false || applicant.reminderEmail == false) {
     textHelper.reminderText  = 'You will not receive a reminder to renew your prescription prepayment. Make a note of your prepayment expiry date.'
  } else {
      textHelper.reminderText  = 'We will send you a reminder when your prepayment is due to end.'
  }

  res.render('ppc/done-v3', {
    contacttext : textHelper.contactText,
    duration : textHelper.length,
    name : applicant.fullName,
    startdate : ppc.startDate,
    enddate : ppc.endDate,
    reminder : dateHelper.monthToText(ppc.endMonth -1) + ppc.endYear,
    remindertext : textHelper.reminderText,
    dd : ppc.duration,
    method : textHelper.method,
  });



});



//done
router.get(/done-v4/, function (req, res) {
  res.render('ppc/done-v4', {
    contacttext : textHelper.contactText,
    duration : textHelper.length,
    name : applicant.fullName,
    startdate : ppc.startDate,
    enddate : ppc.endDate,
    reminder : dateHelper.monthToText(ppc.endMonth -1) + ppc.endYear
  });
});

router.get(/prepayment-copy/, function (req, res) {
  res.render('ppc/prepayment-copy', {
    contacttext : textHelper.contactText,
    duration : textHelper.length,
    name : applicant.fullName,
    startdate : ppc.startDate,
    enddate : ppc.endDate,
    reminder : dateHelper.monthToText(ppc.endMonth -1) + ppc.endYear
  });
});

router.get(/prepayment-details/, function (req, res) {
  res.render('ppc/prepayment-details', {
    contacttext : textHelper.contactText,
    duration : textHelper.length,
    name : applicant.fullName,
    startdate : ppc.startDate,
    enddate : ppc.endDate,
    reminder : dateHelper.monthToText(ppc.endMonth -1) + ppc.endYear
  });
});

//payment
router.get(/payment-details/, function (req, res) {
  res.render('ppc/payment-details', {
  cardpaymentinfo : textHelper.cardPaymentInfo,
  cost : textHelper.cost
  });
});

//confirm direct debit details
router.get(/dd-confirm/, function (req, res) {
  res.render('ppc/dd-confirm', {
    cardnumber : card.cardNumber,
    exdate : card.exDate,
    holdername : card.holderName,
    holderaddress : card.holderAddress,
    cardpaymentinfo : textHelper.cardPaymentInfo,
    cost : textHelper.cost,
    startdate : ppc.startDate,
    enddate : ppc.endDate,
    autorenew : boolToText(ppc.autoRenew)
  });
});

router.get(/ddv2-confirm/, function (req, res) {
  res.render('ppc/ddv2-confirm', {
    cardnumber : card.cardNumber,
    exdate : card.exDate,
    holdername : card.holderName,
    holderaddress : card.holderAddress,
    cardpaymentinfo : textHelper.cardPaymentInfo,
    cost : textHelper.cost,
    startdate : ppc.startDate,
    enddate : ppc.endDate,
    autorenew : boolToText(ppc.autoRenew)

  });
});

router.get(/dd-dec/, function (req, res) {
  res.redirect('ppcprivacy')
});
//confirm card details
router.get(/cp-confirm/, function (req, res) {
  res.render('ppc/cp-confirm', {
    cardnumber : card.cardNumber,
    exdate : card.exDate,
    holdername : card.holderName,
    holderaddress : card.holderAddress,
    cardpaymentinfo : textHelper.cardPaymentInfo,
    cost : textHelper.cost
  });
});

//card handler
router.get(/card-handler/, function (req, res) {
  if (req.query.cardnumber != '') {
    card.cardNumber = req.query.cardnumber;
    card.setCardNumber();
  }
  if (req.query.exmonth != '') {
    card.exMonth = req.query.exmonth;
  }
  if (req.query.exyear != '') {
    card.exYear = req.query.exyear;
    card.setExdate();
  }
  if (req.query.holdername != '') {
    card.holderName = req.query.holdername;
  }
  res.redirect('cp-confirm');
});

//Card / account holders address the same
router.get(/payment-prompt/, function (req, res) {
  res.render('ppc/payment-prompt', {
    format : textHelper.format
  });
});
