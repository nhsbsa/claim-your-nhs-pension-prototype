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



//create applicant
var applicantMaster = require('./applicant.js');
var applicant = applicantMaster.createApplicant();
applicant.title = null;
applicant.firstName = null ;
applicant.lastName = null ;
applicant.schemenumber = null ;
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


router.get(/schemenumber-handler/, function (req, res) {
  applicant.schemenumber= req.query.schemenumber;
  res.redirect('../AW8P');
});


//About you//

router.get(/name-handler/, function (req, res) {
  applicant.firstName = req.query.firstname;
  applicant.lastName = req.query.lastname;
  applicant.setFullName();
  res.redirect('dob');
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
   res.redirect('post-address');
  });


  router.get(/nino-handler/, function (req, res) {
    applicant.nino = req.query.nino;
    res.redirect('../AW8P');
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

 res.redirect('nino');
});


router.get(/relationship-handler/, function (req, res) {
  if (req.query.rcg == "single") {
  res.redirect('children');
} else {
  res.redirect('spousename');
}
});



router.get(/child-handler/, function (req, res) {
  if (req.query.child == "Yes") {
  res.redirect('list-children');
} else {
  res.redirect('checkyouranswers');
}
});

router.get(/working-handler/, function (req, res) {
  if (req.query.work == "Yes") {
  res.redirect('wheredoyouwork');
} else {
  res.redirect('lastnhsemployer');
}
});


router.get(/contact-handler/, function (req, res) {

if (req.query.emailntext == 'Yes') {
  res.redirect('emailaddress')
} else {
  res.redirect('checkyouranswers')
}

});

router.get(/scheme-handler/, function (req, res) {
  if (req.query.scheme == "1995") {
    res.redirect('why')
  } else if (req.query.scheme == "2008") {
      res.redirect('why')
    } else {
      res.redirect('why')
    }
});

router.get(/benefits-handler/, function (req, res) {
  if (req.query.benefit == "early") {
     res.redirect('earlypaymentdate')
   } else {
        res.redirect('lumpsum')
   }
});


router.get(/lumpsum-handler/, function (req, res) {
  if (req.query.lumpsum == "Yes") {
     res.redirect('typeoflumpsum')
   } else {
        res.redirect('checkyouranswers')
   }
});



router.get(/pensionarrangement-handler/, function (req, res) {
  if (req.query.pensionarrangement == "Yes") {
     res.redirect('annualpension')
   } else {
        res.redirect('vaild')
   }
});

router.get(/flex-handler/, function (req, res) {
  if (req.query.flex == "Yes") {
     res.redirect('excludingpension')
   } else {
        res.redirect('vaild')
   }
});
