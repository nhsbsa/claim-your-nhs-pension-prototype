/* global $ */

function toTitleCase(str) {
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

$(document).ready(function() {
    $("input").on("change", function() {
        // #0 personal details - about you //
        if (document.location.href.includes("/start/name", true)) {
            var yourFirstName = toTitleCase(document.getElementById("firstname").value);
            var yourLastName = toTitleCase(document.getElementById("lastname").value);

            // full name
            sessionStorage.yourName = `${yourFirstName} ${yourLastName}`;
        }

        if (document.location.href.includes("/start/dob", true)) {
            var day1 = document.getElementById("day").value;
            var month1 = document.getElementById("month").value;
            var year1 = document.getElementById("year").value;

            // date of birth
            sessionStorage.yourDOB = `${day1}/${month1}/${year1}`;
        }

        if (document.location.href.includes("/start/gender", true)) {
            var gender = $("input[name=rcg]:checked")[0];

            // gender
            if (gender !== undefined) {
                sessionStorage.yourGender = gender.value;
            }
        }

        if (document.location.href.includes("/start/post-address", true)) {
            var lineone = document.getElementById("lineone").value;
            var linetwo;
            var town = document.getElementById("town").value;
            var postcode = document.getElementById("postcode").value;
            var country = document.getElementById("country").value;

            if (document.getElementById("linetwo").value !== "") {
                linetwo = document.getElementById("linetwo").value;
            }

            // address
            sessionStorage.yourAddress = linetwo !== undefined ? `${lineone}, ${linetwo}, ${town}, ${postcode}, ${country}` : `${lineone}, ${town}, ${postcode}, ${country}`;
        }

        if (document.location.href.includes("/start/nino", true)) {
             // national insurance number
             sessionStorage.yourNINO = document.getElementById("firstname").value;
        }
        // end of #0 personal details - about you //


        // #1 relationship details - about you //
        if (document.location.href.includes("/relationshipstatus", true)) {
            var elementChecked = $("input[name=rcg]:checked");
            var relationshipStatus,
                rsValue,
                futureDay,
                futureMonth,
                futureYear,
                pastDay,
                pastMonth,
                pastYear;

            // what is your status?
            for(var i = 0; i < elementChecked.length; i++) {
                relationshipStatus = elementChecked[i].value;

                if (relationshipStatus == "single") {
                    sessionStorage.relationshipStatus = toTitleCase(relationshipStatus);
                } else if (relationshipStatus == "married") {
                    futureDay = $("input[name=futureday]")[0].value;
                    futureMonth = $("input[name=futuremonth]")[0].value;
                    futureYear = $("input[name=futureyear]")[0].value;

                    sessionStorage.relationshipStatus = toTitleCase(relationshipStatus);
                    sessionStorage.relationshipStatusDate = `${futureDay}/${futureMonth}/${futureYear}`;
                } else {
                    if (relationshipStatus == "civil") {
                        rsValue = 0;
                    } else if (relationshipStatus == "windowed") {
                        rsValue = 1;
                    } else {
                        rsValue = 2;
                    }

                    pastDay = $("input[name=pastday]")[rsValue].value;
                    pastMonth = $("input[name=pastmonth]")[rsValue].value;
                    pastYear = $("input[name=pastyear]")[rsValue].value;

                    sessionStorage.relationshipStatus = toTitleCase(relationshipStatus);
                    sessionStorage.relationshipStatusDate = `${pastDay}/${pastMonth}/${pastYear}`;
                }
            }
        }

        if (document.location.href.includes("/children", true)) {
            var dependantChildren = $("input[name=child]:checked")[0];

            // do you have any depenant children?
            if (dependantChildren !== undefined) {
                sessionStorage.children = dependantChildren.value;
            }
        }

        if (document.location.href.includes("/childname", true)) {
            var firstName1 = toTitleCase(document.getElementById("firstname").value);
            var lastName1 = toTitleCase(document.getElementById("lastname").value);
            var childrenVal = sessionStorage.getItem("childName");

            if (childrenVal === null && firstName1 !== "" && lastName1 !== "") {
                sessionStorage.childName = `${firstName1} ${lastName1}`; // only-child
            } else if (firstName1 !== "" && lastName1 !== "") {
                sessionStorage.childName = sessionStorage.childName + ", " + `${firstName1} ${lastName1}`;
            } else {
                return;
            }
        }

        if (document.location.href.includes("/allocating", true)) {
            var allocatePension = $("input[name=allocating]:checked")[0];

            // do you want to allocate part of your pension?
            if (allocatePension !== undefined) {
                sessionStorage.allocating = allocatePension.value;
            }
        }

        if (document.location.href.includes("/spousename", true)) {
            var firstName2 = toTitleCase(document.getElementById("firstname").value);
            var lastName2 = toTitleCase(document.getElementById("lastname").value);

            // what is your spouse's or civil partners name?
            sessionStorage.spouseName = `${firstName2} ${lastName2}`;
        }

        if (document.location.href.includes("/spousedob", true)) {
            var day = document.getElementById("day").value;
            var month = document.getElementById("month").value;
            var year = document.getElementById("year").value;

            // what is your spouse's or civil partners date of birth?
            sessionStorage.spouseDOB = `${day}/${month}/${year}`;
        }

        if (document.location.href.includes("/allocatename", true)) {
            var firstName3 = toTitleCase(document.getElementById("firstname").value);
            var lastName3 = toTitleCase(document.getElementById("lastname").value);

            sessionStorage.allocatedName = `${firstName3} ${lastName3}`;
        }
        // end of #1 relationship details - about you //


        // #2 employment details - about you //
        if (document.location.href.includes("/details", true)) {
            var employmentNHS = $("input[name=work]:checked")[0];

            // are you working in the NHS now?
            if (employmentNHS !== undefined) {
                sessionStorage.employment = employmentNHS.value;
            }
        }

        if (document.location.href.includes("/lastnhsemployer", true)) {
            // what was the name of your last NHS employer?
            sessionStorage.lastNHSEmployer = document.getElementById("town").value;
        }

        if (document.location.href.includes("/date-leave", true)) {
            var day2 = document.getElementById("day").value;
            var month2 = document.getElementById("month").value;
            var year2 = document.getElementById("year").value;

            // what date did you leave?
            sessionStorage.dateLeave = `${day2}/${month2}/${year2}`;
        }

        if (document.location.href.includes("/doyouintend", true)) {
            var workNHS = $("input[name=hasnhsno]:checked")[0];
            var day3,
                month3,
                year3;

            // do you intend to work in the NHS after you get your pension?
            if (workNHS !== undefined) {
                sessionStorage.doYouIntend = workNHS.value;

                if (workNHS.value == "Yes") {
                    day3 = document.getElementById("day").value;
                    month3 = document.getElementById("month").value;
                    year3 = document.getElementById("year").value;

                    sessionStorage.returnToWork = `${day3}/${month3}/${year3}`;
                }
            }
        }
        // end of #2 employment details - about you //


        // #3 contact details - about you //
        if (document.location.href.includes("/contactpref", true)) {
            var emailntext = $("input[name=emailntext]:checked")[0];

            // do you want to be contact about your pension by text and email?
            if (emailntext !== undefined) {
                sessionStorage.contactpref = emailntext.value;
            }
        }

        if (document.location.href.includes("/emailaddress", true)) {
            // email address
            sessionStorage.emailaddress = document.getElementById("lineone").value;
        }

        if (document.location.href.includes("/mobilenumber", true)) {
            // mobile telephone number
            sessionStorage.mobilenumber = document.getElementById("lineone").value;
        }
        // end of #3 contact details - about you //


        // #4 payment details - about you //
        if (document.location.href.includes("/outsideUK", true)) {
            var outside = $("input[name=outside]:checked")[0];

            if (outside !== undefined) {
                sessionStorage.outsideUK = outside.value;
            }
        }

        if (document.location.href.includes("/nameofbank", true)) {
            // account holders name (yes-route)
            sessionStorage.nameofbank = document.getElementById("exyear").value;
        }

        if (document.location.href.includes("/bankaddress", true)) {
            var lineone1 = document.getElementById("lineone").value;
            var linetwo1;
            var town1 = document.getElementById("town").value;
            var postcode1 = document.getElementById("postcode").value;

            if (document.getElementById("linetwo").value !== "") {
                linetwo1 = document.getElementById("linetwo").value;
            }

            // account holders address (yes-route)
            sessionStorage.holderaddress = linetwo1 !== undefined ? `${lineone1}, ${linetwo1}, ${town1}, ${postcode1}` : `${lineone1}, ${town1}, ${postcode1}`;
        }

        if (document.location.href.includes("/ddpay", true)) {
            // account holder's name (no-route)
            sessionStorage.holdername = document.getElementById("holdername").value;
        }
        // end of #4 payment details - about you //


        // #1 pension details - about your pension //
        if (document.location.href.includes("/moreinfo", true)) {
            var trivialCommutation = $("input[name=moreInfo]:checked")[0];

            // do you want to apply for trivial commutation?
            if (trivialCommutation !== undefined) {
                sessionStorage.trivComm = trivialCommutation.value;
            }
        }

        if (document.location.href.includes("/whichscheme", true)) {
            var schemeChecked = $("input[class=scheme]:checked");
            var whichScheme = {};

            // which pension scheme or section?
            for(var j = 0; j < schemeChecked.length; j++) {
                whichScheme[j] = schemeChecked[j].id;

                if (whichScheme[j] == "1995" || whichScheme[j] == "2008") {
                    whichScheme[j] = `${whichScheme[j]} Section`;
                } else {
                    whichScheme[j] = `${whichScheme[j]} Scheme`;
                }
            }

            sessionStorage.whichScheme = Object.keys(whichScheme).map(function(k){return whichScheme[k]}).join(", ");
        }

        if (document.location.href.includes("/why1995", true)) {
            var benefitsChecked1995 = $("input[name=benefit]:checked");
            var whyBenefits1995 = {};

            // why are you claiming your deferred benefits?
            for(var k = 0; k < benefitsChecked1995.length; k++) {
                whyBenefits1995[k] = benefitsChecked1995[k].value;
            }

            sessionStorage.whyBenefits1995 = Object.keys(whyBenefits1995).map(function(l){return whyBenefits1995[l]}).join(", ");
        }

        if (document.location.href.includes("/why2008", true)) {
            var benefitsChecked2008 = $("input[name=benefit]:checked");
            var whyBenefits2008 = {};

            // why are you claiming your deferred benefits?
            for(var l = 0; l < benefitsChecked2008.length; l++) {
                whyBenefits2008[l] = benefitsChecked2008[l].value;
            }

            sessionStorage.whyBenefits2008 = Object.keys(whyBenefits2008).map(function(l){return whyBenefits2008[l]}).join(", ");
        }

        if (document.location.href.includes("/why2015", true)) {
            var benefitsChecked2015 = $("input[name=benefit]:checked");
            var whyBenefits2015 = {};

            // why are you claiming your deferred benefits?
            for(var m = 0; m < benefitsChecked2015.length; m++) {
                whyBenefits2015[m] = benefitsChecked2015[m].value;
            }

            sessionStorage.whyBenefits2015 = Object.keys(whyBenefits2015).map(function(l){return whyBenefits2015[l]}).join(", ");
        }

        if (document.location.href.includes("/lumpsum1995", true)) {
            var wantLumpSum1995 = $("input[name=lumpsum]:checked")[0];

            // do you want an lump sum by giving up part of your pension?
            if (wantLumpSum1995 !== undefined) {
                sessionStorage.lumpSum1995 = wantLumpSum1995.value;
            }
        }

        if (document.location.href.includes("/lumpsum2008", true)) {
            var wantLumpSum2008 = $("input[name=lumpsum]:checked")[0];

            // do you want an lump sum by giving up part of your pension?
            if (wantLumpSum2008 !== undefined) {
                sessionStorage.lumpSum2008 = wantLumpSum2008.value;
            }
        }

        if (document.location.href.includes("/lumpsum2015", true)) {
            var wantLumpSum2015 = $("input[name=lumpsum]:checked")[0];

            // do you want an lump sum by giving up part of your pension?
            if (wantLumpSum2015 !== undefined) {
                sessionStorage.lumpSum2015 = wantLumpSum2015.value;
            }
        }

        if (document.location.href.includes("/1995typeoflumpsum", true)) {
            var getLumpSum1995 = $("input[name=scheme]:checked")[0];
            var getLumpSumVal1995;

            // how would you like your lump sum?
            if (getLumpSum1995 !== undefined) {
                if (getLumpSum1995.value == "1995") {
                    getLumpSumVal1995 = "Maximum tax free amount";
                } else if (getLumpSum1995.value == "2008") {
                    getLumpSumVal1995 = "Amount less than the maximum amount permitted";

                    var getLumpSumAmount1995 = document.getElementById("employer-contributions").value;
                    if (getLumpSumAmount1995 !== "") {
                        getLumpSumVal1995 = `${getLumpSumVal1995} - £${getLumpSumAmount1995}`;
                    }
                } else {
                    getLumpSumVal1995 = "Maximum lump sum which may have a tax charge";
                }

                sessionStorage.typeOfLumpSum1995 = `${getLumpSumVal1995}`;
            }
        }

        if (document.location.href.includes("/2008typeoflumpsum", true)) {
            var getLumpSum2008 = $("input[name=scheme]:checked")[0];
            var getLumpSumVal2008;

            // how would you like your lump sum?
            if (getLumpSum2008 !== undefined) {
                if (getLumpSum2008.value == "1995") {
                    getLumpSumVal2008 = "Maximum tax free amount";
                } else if (getLumpSum2008.value == "2008") {
                    getLumpSumVal2008 = "Amount less than the maximum amount permitted";

                    var getLumpSumAmount2008 = document.getElementById("employer-contributions").value;
                    if (getLumpSumAmount2008 !== "") {
                        getLumpSumVal2008 = `${getLumpSumVal2008} - £${getLumpSumAmount2008}`;
                    }
                } else {
                    getLumpSumVal2008 = "Maximum lump sum which may have a tax charge";
                }

                sessionStorage.typeOfLumpSum2008 = `${getLumpSumVal2008}`;
            }
        }

        if (document.location.href.includes("/2015typeoflumpsum", true)) {
            var getLumpSum2015 = $("input[name=scheme]:checked")[0];
            var getLumpSumVal2015;

            // how would you like your lump sum?
            if (getLumpSum2015 !== undefined) {
                if (getLumpSum2015.value == "1995") {
                    getLumpSumVal2015 = "Maximum tax free amount";
                } else if (getLumpSum2015.value == "2008") {
                    getLumpSumVal2015 = "Amount less than the maximum amount permitted";

                    var getLumpSumAmount2015 = document.getElementById("employer-contributions").value;
                    if (getLumpSumAmount2015 !== "") {
                        getLumpSumVal2015 = `${getLumpSumVal2015} - £${getLumpSumAmount2015}`;
                    }
                } else {
                    getLumpSumVal2015 = "Maximum lump sum which may have a tax charge";
                }

                sessionStorage.typeOfLumpSum2015 = `${getLumpSumVal2015}`;
            }
        }
        // end of #1 pension details - about your pension //


        // #2 HM Revenue and Customs - about your pension //
        if (document.location.href.includes("/pensionarrangement", true)) {
            var pensionArrangementChecked = $("input[name=pensionarrangement]:checked")[0];

            // do you have any pension arrangements which includes money purchase Additional Voluntary Contributions
            // which are not part of your NHS Pension?
            if (pensionArrangementChecked !== undefined) {
                sessionStorage.pensionArrangement = pensionArrangementChecked.value;
            }
        }

        if (document.location.href.includes("/annualpension", true)) {
            var flexChecked = $("input[name=flex]:checked")[0];

            // will your annual pension be more than £30,000?
            // have you accessed your benefits with another pension scheme using pension flexibilities?
            if (flexChecked !== undefined) {
                sessionStorage.annualPension = flexChecked.value;
            }
        }

        // if (document.location.href.includes("/excludingpension", true)) {
        //     var excludingPensionChecked = $("input[name=hasnhsno]:checked")[0];

        //     // excluding your main NHS pension benefits were any of your separate pension benefits in payment on or after 6 April 2006?
        //     if (excludingPensionChecked !== undefined) {
        //         if (excludingPensionChecked.value == "Yes") {
        //             var totalCombinedPercentage = document.getElementById("employer-contributions").value;
        //             var day4 = document.getElementById("day").value;
        //             var month4 = document.getElementById("month").value;
        //             var year4 = document.getElementById("year").value;

        //             sessionStorage.excludingPension = excludingPensionChecked.value;
        //             sessionStorage.totalCombinedPercentageLTA = `${totalCombinedPercentage}%`;
        //             sessionStorage.dateFirstBenefitCrystallisation = `${day4}/${month4}/${year4}`;
        //         } else {
        //             sessionStorage.excludingPension = excludingPensionChecked.value;
        //         }
        //     }
        // }

        if (document.location.href.includes("/beforeapril06", true)) {
            var aprilChecked = $("input[class=april]:checked")[0];

            if (aprilChecked !== undefined) {
                // excluding your main NHS pension benefits were any of your separate pension benefits in payment on or after 6 April 2006?
                if (aprilChecked.id == "1995") {
                    var grossAnnualRate = document.getElementById("employer-contributions").value;

                    sessionStorage.onOrAfterApril = "Yes";
                    sessionStorage.grossAnnualRateSeparatePension = `${grossAnnualRate}`;
                }
                // excluding your main NHS pension benefits were any of your separate pension benefits in payment before 6 April 2006?
                if (aprilChecked.id == "2008") {
                    var totalCombinedPercentage = document.getElementById("employer-contributions").value;
                    var day4 = document.getElementById("day").value;
                    var month4 = document.getElementById("month").value;
                    var year4 = document.getElementById("year").value;

                    sessionStorage.excludingPension = "Yes";
                    sessionStorage.totalCombinedPercentageLTA = `${totalCombinedPercentage}%`;
                    sessionStorage.dateFirstBenefitCrystallisation = `${day4}/${month4}/${year4}`;
                }
            }
        }

        if (document.location.href.includes("/excessLTA", true)) {
            var ltaChecked = $("input[name=LTA]:checked")[0];

            if (ltaChecked !== undefined) {
                sessionStorage.excessLTA = ltaChecked.value;
            }
        }

        if (document.location.href.includes("/vaild", true)) {
            var validProtectionChecked = $("input[name=hasnhsno]:checked")[0];

            // do you have any valid HMRC Lifetime Allowance Charge protection?
            if (validProtectionChecked !== undefined) {
                if (validProtectionChecked.value == "Yes") {
                    var certificateOrReference = document.getElementById("employer-contributions").value;

                    sessionStorage.validProtection = validProtectionChecked.value;
                    sessionStorage.certOrRefNumber = certificateOrReference;
                } else {
                    sessionStorage.vaildProtection = validProtectionChecked.value;
                }
            }
        }
        // end of #2 HM Revenue and Customs - about your pension //
    });

    if (sessionStorage.getItem("spouseName") !== null) {
        var splitSpouseName = sessionStorage.getItem("spouseName").split(" ");

        if (document.location.href.includes("/about-you/spousedob", true)) {
            $("h1.heading-large")[0].innerHTML = `What is ${splitSpouseName[0]}'s date of birth?`;
        }
        if (document.location.href.includes("/about-you/spousegender", true)) {
            $("h1.heading-large")[0].innerHTML = `What is ${splitSpouseName[0]}'s gender?`;
        }
        if (document.location.href.includes("/about-you/spousenino", true)) {
            $("h1.heading-large")[0].innerHTML = `What is ${splitSpouseName[0]}'s National Insurance number?`;
        }
    }

    if (sessionStorage.getItem("childName") !== null) {
        if (!sessionStorage.getItem("childName").includes(",", true)) {
            var splitOnlyChildsName = sessionStorage.getItem("childName").split(" "); // only-child

            if (document.location.href.includes("/about-you/childdob", true)) {
                $("h1.heading-large")[0].innerHTML = `What is ${splitOnlyChildsName[0]}'s date of birth?`;
            }
            if (document.location.href.includes("/about-you/childgender", true)) {
                $("h1.heading-large")[0].innerHTML = `What is ${splitOnlyChildsName[0]}'s gender?`;
            }
        } else {
            var splitChildrensNames = sessionStorage.getItem("childName").split(", ");
            splitChildrensNames = splitChildrensNames.splice(-1, splitChildrensNames.length - 1);
            splitChildrensNames = splitChildrensNames[0].split(" ");

            if (document.location.href.includes("/about-you/childdob", true)) {
                $("h1.heading-large")[0].innerHTML = `What is ${splitChildrensNames[0]}'s date of birth?`;
            }
            if (document.location.href.includes("/about-you/childgender", true)) {
                $("h1.heading-large")[0].innerHTML = `What is ${splitChildrensNames[0]}'s gender?`;
            }
        }
    }

    if (sessionStorage.getItem("allocatedName") !== null) {
        var splitAllocatedName = sessionStorage.getItem("allocatedName").split(" ");

        if (document.location.href.includes("/allocating/allocatedob", true)) {
            $("h1.heading-large")[0].innerHTML = `What is ${splitAllocatedName[0]}'s date of birth?`;
        }
        if (document.location.href.includes("/allocating/allocategender", true)) {
            $("h1.heading-large")[0].innerHTML = `What is ${splitAllocatedName[0]}'s gender?`;
        }
        if (document.location.href.includes("/allocating/relationshiptoyou", true)) {
            $("h1.heading-large")[0].innerHTML = `What is ${splitAllocatedName[0]}'s relationship to you?`;
        }
    }

    if (document.location.href.includes("/about-you/secondchildren", true)) {
        var sessionStorageChildren = sessionStorage.getItem("childName");

        if (sessionStorageChildren !== null && sessionStorageChildren.includes(",")) {
            sessionStorageChildren = sessionStorageChildren.split(", ");
            for(var l = 0; l < sessionStorageChildren.length; l++) {
                $("ul#children")[0].append(sessionStorageChildren[l]);
                $("<br>").appendTo("ul#children");
            }
        } else if (sessionStorageChildren !== null) {
            $("ul#children")[0].innerHTML = sessionStorageChildren; // only-child
        } else {
            return;
        }
    }


    if (document.location.href.includes('/start/checkyouranswers', true)) {
        $("td#has-mobile")[0].innerHTML = sessionStorage.getItem("yourName");
        $("td#has-mobile")[1].innerHTML = sessionStorage.getItem("yourDOB");
        $("td#has-mobile")[2].innerHTML = sessionStorage.getItem("yourGender");
        $("td#has-mobile")[3].innerHTML = sessionStorage.getItem("yourAddress");
        $("td#has-mobile")[4].innerHTML = sessionStorage.getItem("yourNINO");
    }

    if (document.location.href.includes("/about-you/checkyouranswers", true)) {
        $("td#has-mobile")[0].innerHTML = sessionStorage.getItem("relationshipStatus");
        $("td#has-mobile")[1].innerHTML = sessionStorage.getItem("spouseName");
        $("td#has-mobile")[2].innerHTML = sessionStorage.getItem("spouseDOB");
        $("td#has-mobile")[3].innerHTML = sessionStorage.getItem("children");
        $("td#has-mobile")[4].innerHTML = sessionStorage.getItem("allocating");
    }

    if (document.location.href.includes("/employment/checkyouranswers", true)) {
        $("td#has-mobile")[0].innerHTML = sessionStorage.getItem("employment");
        $("td#has-mobile")[1].innerHTML = sessionStorage.getItem("lastNHSEmployer");
        $("td#has-mobile")[2].innerHTML = sessionStorage.getItem("dateLeave");
        $("td#has-mobile")[3].innerHTML = sessionStorage.getItem("doYouIntend");
    }

    if (document.location.href.includes("/contact/checkyouranswers", true)) {
        $("td#has-mobile")[0].innerHTML = sessionStorage.getItem("contactpref");
        $("td#has-mobile")[1].innerHTML = sessionStorage.getItem("emailaddress");
        $("td#has-mobile")[2].innerHTML = sessionStorage.getItem("mobilenumber");
    }

    if (document.location.href.includes("/payment/ddv2-confirm", true)) {
        $("td#has-mobile")[0].innerHTML = sessionStorage.getItem("nameofbank");
        $("td#has-mobile")[1].innerHTML = sessionStorage.getItem("holderaddress");
    }

    if (document.location.href.includes("/about-your-pension/checkyouranswers", true)) {
        $("td#has-mobile")[0].innerHTML = sessionStorage.getItem("trivComm");
        $("td#has-mobile")[1].innerHTML = sessionStorage.getItem("whichScheme");
        // 1995 //
        if (!sessionStorage.getItem("whichScheme").includes("1995")) {
            $("h2#for1995").addClass("js-hidden");
            $("hr#for1995").addClass("js-hidden");
            $("#review-table-one-1995").addClass("js-hidden");
        }
        $("td#has-mobile-1995")[0].innerHTML = sessionStorage.getItem("whyBenefits1995");
        $("td#has-mobile-1995")[1].innerHTML = sessionStorage.getItem("lumpSum1995");
        $("td#has-mobile-1995")[2].innerHTML = sessionStorage.getItem("typeOfLumpSum1995");
        // 2008 //
        if (!sessionStorage.getItem("whichScheme").includes("2008")) {
            $("h2#for2008").addClass("js-hidden");
            $("hr#for2008").addClass("js-hidden");
            $("#review-table-one-2008").addClass("js-hidden");
        }
        $("td#has-mobile-2008")[0].innerHTML = sessionStorage.getItem("whyBenefits2008");
        $("td#has-mobile-2008")[1].innerHTML = sessionStorage.getItem("lumpSum2008");
        $("td#has-mobile-2008")[2].innerHTML = sessionStorage.getItem("typeOfLumpSum2008");
        // 2015 //
        if (!sessionStorage.getItem("whichScheme").includes("2015")) {
            $("h2#for2015").addClass("js-hidden");
            $("hr#for2015").addClass("js-hidden");
            $("#review-table-one-2015").addClass("js-hidden");
        }
        $("td#has-mobile-2015")[0].innerHTML = sessionStorage.getItem("whyBenefits2015");
        $("td#has-mobile-2015")[1].innerHTML = sessionStorage.getItem("lumpSum2015");
        $("td#has-mobile-2015")[2].innerHTML = sessionStorage.getItem("typeOfLumpSum2015");
    }

    // if (document.location.href.includes("/about-your-pension/why", true)) {
    //     $("h1.heading-large")[0].innerHTML = `Why are you claiming your deferred benefits for ${sessionStorage.getItem("whichScheme")}?`;
    // }

    if (document.location.href.includes("/HMRC/checkyouranswers", true)) {
        $("td#has-mobile")[0].innerHTML = sessionStorage.getItem("pensionArrangement");
        $("td#has-mobile")[1].innerHTML = sessionStorage.getItem("annualPension");
        $("td#has-mobile")[2].innerHTML = sessionStorage.getItem("annualPension");
        $("td#has-mobile")[3].innerHTML = sessionStorage.getItem("onOrAfterApril");
        $("td#has-mobile")[4].innerHTML = sessionStorage.getItem("excludingPension");
        $("td#has-mobile")[5].innerHTML = sessionStorage.getItem("vaildProtection");
    }

    // Non uk Bank - Store the inputs to be shown on the checkyouranswers page.
    // Content on the checkyouranswers to change depending on the route taken from UK Bank or Non UK Bank

    // Store user input into sessionStorage to help change content on checkyouranswers
    if (document.location.href.includes('/payment/uk-bank-account', true)) {
        $('input[name="payukbank"]').change(function(){
            var ukBank = document.querySelector('input[name="payukbank"]:checked').value;
            sessionStorage.ukBank = ukBank;
        })
    }

    // Store user input into sessionStorage for to be displayed on check your answers page
    if (document.location.href.includes('/payment/what-type-of-account', true)) {
        $('input[name="bank"]').change(function(){
            sessionStorage.accountType = document.querySelector('input[name="bank"]:checked').value;
        })
    }

    // Store user inputs into sessionStorage for to be used to populate the data table on checkyouranswers
    if (document.location.href.includes('/payment/non-uk-account-details', true)) {
        $('input.ibanSwiftData').change(function(){
            // What are your bank account details?
            sessionStorage.accountName = document.querySelector('input[name="account-holder"]').value;
            sessionStorage.iban = document.querySelector('input[name="iban-code"]').value;
            sessionStorage.swift = document.querySelector('input[name="swift-code"]').value;
        })
        // Store user input into sessionStorage to populate checkyouranswers with correct data
        $('input[name="hasnhsno"]').change(function(){
            var ibanSwiftKnown = document.querySelector('input[name="hasnhsno"]:checked').value;
            sessionStorage.ibanSwiftKnown = ibanSwiftKnown;
        })
    }

    // Change the content in the data table depending on the route the user has taken and which data that have entered.
    if (document.location.href.includes('/payment/ddv2-confirm', true)) {
        if (sessionStorage.getItem('ukBank') == 'No') {

            // Use the sessionStorage from a previous page which is holding the value from the selected input chosen for "Do you know your IBAN and SWIFT(BIC) code?" This then decides which data to populate into checkyouranswers
            document.getElementById('check-uk-bank').innerHTML = '<td>Do you want your NHS Pension paid into a UK bank account?</td><td id="has-mobile" class="input-ukBank">'+ sessionStorage.getItem('ukBank') + '</td><td><a href="uk-bank-account">Change <span class="visually-hidden">if you have a UK bank account.</span></a></td>';
            document.getElementById('account-type').style.display = 'none';
            document.getElementById('account-holder-name').innerHTML = "<td>Account holder's name</td><td id='has-mobile'>" + sessionStorage.getItem('accountName') + "</td><td><a href='/awards/V6/payment/non-uk-account-details'>Change <span class='visually-hidden'>your bank details.</span></a></td>";
            document.getElementById('if-iban').innerHTML = '<td>IBAN</td><td>'+ sessionStorage.getItem('iban') + '</td><td><a href="/awards/V6/payment/non-uk-account-details">Change <span class="visually-hidden">your bank details.</span></a></td>';
            document.getElementById('if-swift').innerHTML = '<td>SWIFT code</td><td>'+ sessionStorage.getItem('swift') + '</td><td><a href="/awards/V6/payment/non-uk-account-details">Change <span class="visually-hidden">your bank details.</span></a></td>';
            document.getElementById('non-uk').style.display = "none";

            } else if (sessionStorage.getItem('ukBank') == 'Yes') {
                document.getElementById('check-uk-bank').innerHTML = '<td>Do you want your NHS Pension paid into a UK bank account?</td><td id="has-mobile" class="input-ukBank">'+ sessionStorage.getItem('ukBank') + '</td><td><a href="uk-bank-account">Change <span class="visually-hidden">if you have a UK bank account.</span></a></td>';
                document.getElementById('account-type').innerHTML = '<td>What type of account are we making the payment to?</td><td id="has-mobile">' + sessionStorage.getItem('accountType') + ' Account</td><td><a href="what-type-of-account">Change <span class="visually-hidden">if you have a UK bank account.</span></a></td>';
            } else {

            }
    }

    // End Non Uk Bank
});
