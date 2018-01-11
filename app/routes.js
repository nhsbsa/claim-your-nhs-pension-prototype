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
applicant.relationship = null ;
applicant.fullName = null ;
applicant.dobDay = null;
applicant.dobMonth = null;
applicant.dobYear = null;
applicant.dob = null;
applicant.hasNhsno = null;
applicant.nhsno = null;
applicant.nino = null;
applicant.postCode = null;
applicant.addresslineone = null;
applicant.addresslinetwo = null;
applicant.town = null;
applicant.hasMobile = false;
applicant.hasEmail = false;
applicant.s1995 = false;
applicant.s2008 = false;
applicant.s2015 = false;
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
  console.log(applicant.fullName)
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
  console.log(applicant.dobDay)
  console.log(applicant.dobMonth)
  console.log(applicant.dobYear)
   res.redirect('gender');
  });

  router.get(/gender-handler/, function (req, res) {
    res.redirect('post-address');
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
  if (req.query.postcode != '') {
    tempAddress = tempAddress + " " + req.query.postcode;
  }
 res.redirect('nino');
 console.log(applicant.address)
});

router.get(/nino-handler/, function (req, res) {
  applicant.nino = req.query.nino;
  console.log(applicant.nino)
  res.redirect('../AW8P');
});

router.get(/AW8P-handler/, function (req, res) {
  res.redirect('file-upload/done');
});



router.get(/relationship-handler/, function (req, res) {
  applicant.relationship = req.query.rcg;
  if (req.query.rcg == "single") {
  res.redirect('children');
} else if (req.query.rcg == "windowed"){
  res.redirect('children');
} else if (req.query.rcg == "divorced"){
  res.redirect('children');
} else {
  res.redirect('spousename');
  console.log(applicant.relationship)
 }
});



router.get(/child-handler/, function (req, res) {
  if (req.query.child == "Yes") {
  res.redirect('childname');
} else {
  res.redirect('allocating');
}
});

router.get(/childn-handler/, function (req, res) {
  res.redirect('childdob');
});

router.get(/childdob-handler/, function (req, res) {
  res.redirect('secondchildren');
});

router.get(/working-handler/, function (req, res) {
  if (req.query.work == "yes") {
  res.redirect('wheredoyouwork');
} else {
  res.redirect('lastnhsemployer');
}
});


router.get(/contact-handler/, function (req, res) {
  if (req.query.text == 'true') {
    applicant.hasMobile = true;
    console.log("applicant.hasMobile = true");
  } else {
    applicant.hasMobile = false;
    console.log("applicant.hasMobile = false");
  }
  if (req.query.email == 'true') {
    applicant.hasEmail = true;
    console.log("applicant.hasEmail = true");
  } else {
    applicant.hasEmail = false;
    console.log("applicant.hasEmail = false");
  }
  if (applicant.hasMobile) {
    res.redirect('mobilenumber');
  } if (applicant.hasEmail) {
       res.redirect('emailaddress');
  } else {
        res.redirect('checkyouranswers');

}

});
router.get(/mobile-handler/, function (req, res) {
  if (applicant.hasEmail) {
       res.redirect('emailaddress');
    }   else {
   res.redirect('checkyouranswers');
 }

});
router.get(/allocating-handler/, function (req, res) {

if (req.query.allocating == 'Yes') {
  res.redirect('allocating/allocatename')
} else {
  res.redirect('checkyouranswers')
}

});

router.get(/scheme-handler/, function (req, res) {
  if (req.query.s1995 == 'true') {
    applicant.s1995 = true;
    console.log("applicant.s1995 = true;");
  } else {
    applicant.s1995 = false;
    console.log("applicant.s1995 = false;");
  }

  if (req.query.s2008 == 'true') {
    applicant.s2008 = true;
    console.log("applicant.s2008 = true");
  } else {
    applicant.s2008 = false;
    console.log("applicant.s2008 = false");
  }

  if (req.query.s2015 == 'true') {
    applicant.s2015  = true;
    console.log("applicant.s2015 = true");
  } else {
    applicant.s2015 = false;
    console.log("applicant.s2015 = false");
  }

  if (applicant.s1995 == true) {
    res.redirect('why1995');
  } if (applicant.s2008  == true) {
       res.redirect('why2008');
  } if (applicant.s2015  == true) {
        res.redirect('why2015');
  }
});



router.get(/1995-handler/, function (req, res) {
      if (req.query.benefit == "early") {
        res.redirect('1995earlypaymentdate')
      } else if (req.query.benefit == "commuted") {
         res.redirect('1995commutedill')
      } else {
        res.redirect('lumpsum1995')
      }
});

router.get(/2008-handler/, function (req, res) {
      if (req.query.benefit == "early") {
        res.redirect('2008earlypaymentdate')
      } else if (req.query.benefit == "commuted") {
         res.redirect('2008commutedill')
      } else {
        res.redirect('lumpsum2008')
      }
});

router.get(/2015-handler/, function (req, res) {
      if (req.query.benefit == "early") {
        res.redirect('2015earlypaymentdate')
      } else if (req.query.benefit == "commuted") {
         res.redirect('2015commutedill')
      } else {
        res.redirect('lumpsum2015')
      }
});






router.get(/1995lumpsum-handler/, function (req, res) {
  console.log("1995" + applicant.s1995)
  console.log("2008" + applicant.s2008)
  if (req.query.lumpsum == "Yes") {
     res.redirect('1995typeoflumpsum')
   } else if (applicant.s2008 == true && applicant.s2015 == false) {
     res.redirect('2008')
   } else if (applicant.s2008 == false && applicant.s2015 == true ) {
     res.redirect('2015')
  } else {
      res.redirect('checkyouranswers')
   }
});

router.get(/2008lumpsum-handler/, function (req, res) {
  console.log("1995" + applicant.s1995)
  console.log("2008" + applicant.s2008)
  if (req.query.lumpsum == "Yes") {
     res.redirect('2008typeoflumpsum')
   }
  else if (applicant.s2015 == true ) {
     res.redirect('2015')
   }
  else {
      res.redirect('checkyouranswers')
   }
});

router.get(/2015lumpsum-handler/, function (req, res) {
  console.log("1995" + applicant.s1995)
  console.log("2008" + applicant.s2008)
  console.log("2015" + applicant.s2015)
  if (req.query.lumpsum == "Yes") {
     res.redirect('2015typeoflumpsum')
   }
  else {
     res.redirect('checkyouranswers')
  }
});


router.get(/1995typeoflumpsum-handler/, function (req, res) {
  console.log("1995" + applicant.s1995)
  console.log("2008" + applicant.s2008)
   if (applicant.s2008 == true && applicant.s2015 == false) {
     res.redirect('why2008')
   } else if (applicant.s2008 == false && applicant.s2015 == true ) {
     res.redirect('why2015')
  } else {
      res.redirect('checkyouranswers')
   }
});

router.get(/2008typeoflumpsum-handler/, function (req, res) {
  console.log("1995" + applicant.s1995)
  console.log("2008" + applicant.s2008)
   if (applicant.s2008 == false && applicant.s2015 == true ) {
     res.redirect('why2015')
  } else {
      res.redirect('checkyouranswers')
   }
});

router.get(/2015typeoflumpsum-handler/, function (req, res) {
  console.log("1995" + applicant.s1995)
  console.log("2008" + applicant.s2008)
   if (applicant.s2015 == true ) {
     res.redirect('checkyouranswers')
  } else {
      res.redirect('checkyouranswers')
   }
});


router.get(/1995commutedill-handler/,function (req, res) {
  if (applicant.s2008 == true && applicant.s2015 == false) {
    res.redirect('why2008')
  } else if (applicant.s2008 == false && applicant.s2015 == true ) {
    res.redirect('why2015')
 } else {
     res.redirect('checkyouranswers')
  }
});

router.get(/2008commutedill-handler/,function (req, res) {
  if (applicant.s2008 == false && applicant.s2015 == true ) {
    res.redirect('why2015')
 } else {
     res.redirect('checkyouranswers')
  }
});

router.get(/2015commutedill-handler/,function (req, res) {
  if (applicant.s2008 == false && applicant.s2015 == true ) {
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
     res.redirect('beforeapril06')
   } else {
        res.redirect('vaild')
   }
});

router.get(/isthisfile-handler/, function (req, res) {
  if (req.query.file == "Yes") {
     res.redirect('uploadfile')
   } else {
        res.redirect('done')
   }
});

router.get(/accounttype-handler/, function (req, res) {

if (req.query.bank == 'current') {
  res.redirect('ddpay')
} else {
  res.redirect('ddroll')
}

});



router.get(/LTA-handler/, function (req, res) {

if (req.query.excesslta == 'Yes') {
  res.redirect('vaild')
} else {
  res.redirect('checkyouranswers')
}

});


//ESTIMATES//


router.get(/TRS-handler/, function (req, res) {

if (req.query.TRS == 'Yes') {
  res.redirect('https://www.totalrewardstatements.nhs.uk/login')
} else {
  res.redirect('behalf')
}

});

router.get(/behalf-handler/, function (req, res) {

if (req.query.behalf == 'Yes') {
  res.redirect('typeofactingbody')
} else {
  res.redirect('your-details/name')
}

});

router.get(/type-handler/, function (req, res) {

if (req.query.type == 'adviser') {
  res.redirect('actingbody-name')
} else {
  res.redirect('actingbody-company')
}

});


router.get(/bank-handler/, function (req, res) {

if (req.query.bank == 'banktransfer') {
  res.redirect('../checkyouranswersbank')
} else {
  res.redirect('../checkyouranswerscheque')
}

});

router.get(/april-handler/, function (req, res) {
  if (req.query.arethey == 'true') {
    res.redirect('excessLTA')
  } else if (req.query.arethey == 'true') {
      res.redirect('excessLTA')

  } else {
      res.redirect('checkyouranswers')
  }
});
