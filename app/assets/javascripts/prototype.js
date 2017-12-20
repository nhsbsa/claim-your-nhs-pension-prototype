/* global $ */

function toTitleCase(str) {
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

$(document).ready(function() {
    $("input").on("change", function() {
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
                    futureDay = $("input[name=futureday]")[0].value || "01";
                    futureMonth = $("input[name=futuremonth]")[0].value || "01";
                    futureYear = $("input[name=futureyear]")[0].value || "1970";

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

                    pastDay = $("input[name=pastday]")[rsValue].value || "01";
                    pastMonth = $("input[name=pastmonth]")[rsValue].value || "01";
                    pastYear = $("input[name=pastyear]")[rsValue].value || "1970";

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
            var firstName = toTitleCase(document.getElementById("firstname").value);
            var lastName = toTitleCase(document.getElementById("lastname").value);
            var childrenVal = sessionStorage.getItem("childName");

            if (childrenVal === null && firstName !== "" && lastName !== "") {
                sessionStorage.childName = `${firstName} ${lastName}`; // only-child
            } else if (firstName !== "" && lastName !== "") {
                sessionStorage.childName = sessionStorage.childName + ", " + `${firstName} ${lastName}`;
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
            var firstName = toTitleCase(document.getElementById("firstname").value) || "Firstname";
            var lastName = toTitleCase(document.getElementById("lastname").value) || "Lastname";

            // what is your spouse's or civil partners name?
            sessionStorage.spouseName = `${firstName} ${lastName}`;
        }

        if (document.location.href.includes("/spousedob", true)) {
            var day = document.getElementById("day").value || "01";
            var month = document.getElementById("month").value || "01";
            var year = document.getElementById("year").value || "1970";

            // what is your spouse's or civil partners date of birth?
            sessionStorage.spouseDOB = `${day}/${month}/${year}`;
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
            sessionStorage.lastNHSEmployer = document.getElementById("town").value || "NHS-BSA";
        }

        if (document.location.href.includes("/date-leave", true)) {
            var day = document.getElementById("day").value || "01";
            var month = document.getElementById("month").value || "01";
            var year = document.getElementById("year").value || "1970";

            // what date did you leave?
            sessionStorage.dateLeave = `${day}/${month}/${year}`;
        }

        if (document.location.href.includes("/doyouintend", true)) {
            var workNHS = $("input[name=hasnhsno]:checked")[0];
            var day,
                month,
                year;

            // do you intend to work in the NHS after you get your pension?
            if (workNHS !== undefined) {
                sessionStorage.doYouIntend = workNHS.value;

                if (workNHS.value == "Yes") {
                    day = document.getElementById("day").value || "01";
                    month = document.getElementById("month").value || "01";
                    year = document.getElementById("year").value || "1970";

                    sessionStorage.returnToWork = `${day}/${month}/${year}`;
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
            sessionStorage.emailaddress = document.getElementById("lineone").value || "email@nhs.net";
        }

        if (document.location.href.includes("/mobilenumber", true)) {
            // mobile telephone number
            sessionStorage.mobilenumber = document.getElementById("lineone").value || "+44 7890 123456";
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
            sessionStorage.nameofbank = document.getElementById("exyear").value || "Bankname";
        }

        if (document.location.href.includes("/bankaddress", true)) {
            var lineone = document.getElementById("lineone").value || "Building and Street";
            var linetwo;
            var town = document.getElementById("town").value || "Town or City";
            var postcode = document.getElementById("postcode").value || "Postcode";

            if (document.getElementById("linetwo").value !== "") {
                linetwo = document.getElementById("linetwo").value;
            }

            // account holders address (yes-route)
            sessionStorage.holderaddress = linetwo !== undefined ? `${lineone}, ${linetwo}, ${town}, ${postcode}` : `${lineone}, ${town}, ${postcode}`;
        }

        if (document.location.href.includes("/ddpay", true)) {
            // account holder's name (no-route)
            sessionStorage.holdername = document.getElementById("holdername").value || "Accountname";
        }
        // end of #4 payment details - about you //


        // #1 pension details - about your pension //
        if (document.location.href.includes("/whichscheme", true)) {
            var schemeChecked = $("input[name=scheme]:checked");
            var whichScheme = {};

            // which pension scheme or section?
            for(var j = 0; j < schemeChecked.length; j++) {
                whichScheme[j] = schemeChecked[j].value;

                if (whichScheme[j] == "1995" || whichScheme[j] == "2008") {
                    whichScheme[j] = `${whichScheme[j]} Section`;
                } else {
                    whichScheme[j] = `${whichScheme[j]} Scheme`;
                }
            }

            sessionStorage.whichScheme = Object.keys(whichScheme).map(function(k){return whichScheme[k]}).join(", ");
        }

        if (document.location.href.includes("/why", true)) {
            var benefitsChecked = $("input[name=benefit]:checked");
            var whyBenefits = {};

            // why are you claiming your deferred benefits?
            for(var k = 0; k < benefitsChecked.length; k++) {
                whyBenefits[k] = benefitsChecked[k].value;
            }

            sessionStorage.whyBenefits = toTitleCase(Object.keys(whyBenefits).map(function(l){return whyBenefits[l]}).join(", "));
        }

        if (document.location.href.includes("/lumpsum", true)) {
            var wantLumpSum = $("input[name=lumpsum]:checked")[0];

            // do you want an lump sum by giving up part of your pension?
            if (wantLumpSum !== undefined) {
                sessionStorage.lumpSum = wantLumpSum.value;
            }
        }

        if (document.location.href.includes("/typeoflumpsum", true)) {
            var getLumpSum = $("input[name=scheme]:checked")[0];
            var getLumpSumVal;

            // how would you like your lump sum?
            if (getLumpSum !== undefined) {
                if (getLumpSum.value == "1995") {
                    getLumpSumVal = "Maximum tax free amount";
                } else if (getLumpSum.value == "2008") {
                    getLumpSumVal = "Amount less than the maximum amount permitted";

                    var getLumpSumAmount = document.getElementById("employer-contributions").value;
                    if (getLumpSumAmount !== "") {
                        getLumpSumVal = `${getLumpSumVal} - £${getLumpSumAmount}`;
                    }
                } else {
                    getLumpSumVal = "Maximum lump sum which may have a tax charge";
                }

                sessionStorage.typeOfLumpSum = `${getLumpSumVal}`;
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

        if (document.location.href.includes("/excludingpension", true)) {
            var excludingPensionChecked = $("input[name=hasnhsno]:checked")[0];

            // excluding your main NHS pension benefits were any of your separate pension benefits in payment on or after 6 April 2006?
            if (excludingPensionChecked !== undefined) {
                if (excludingPensionChecked.value == "Yes") {
                    var totalCombinedPercentage = document.getElementById("employer-contributions").value || "100";
                    var day = document.getElementById("day").value || "06";
                    var month = document.getElementById("month").value || "04";
                    var year = document.getElementById("year").value || "2006";

                    sessionStorage.excludingPension = excludingPensionChecked.value;
                    sessionStorage.totalCombinedPercentageLTA = `${totalCombinedPercentage}%`;
                    sessionStorage.dateFirstBenefitCrystallisation = `${day}/${month}/${year}`;
                } else {
                    sessionStorage.excludingPension = excludingPensionChecked.value;
                }
            }
        }

        if (document.location.href.includes("/beforeapril06", true)) {
            var beforeAprilChecked = $("input[name=hasnhsno]:checked")[0];

            // excluding your main NHS pension benefits were any of your separate pension benefits in payment before 6 April 2006?
            if (beforeAprilChecked !== undefined) {
                if (beforeAprilChecked.value == "Yes") {
                    var grossAnnualRate = document.getElementById("employer-contributions").value || "100";

                    sessionStorage.beforeApril = beforeAprilChecked.value;
                    sessionStorage.grossAnnualRateSeparatePension = `£${grossAnnualRate}`;
                } else {
                    sessionStorage.beforeApril = beforeAprilChecked.value;
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
                    var certificateOrReference = document.getElementById("employer-contributions").value || "1234567890";

                    sessionStorage.validProtection = validProtectionChecked.value;
                    sessionStorage.certOrRefNumber = certificateOrReference;
                } else {
                    sessionStorage.vaildProtection = validProtectionChecked.value;
                }
            }
        }
        // end of #2 HM Revenue and Customs - about your pension //
    });

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
    };

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
        $("td#has-mobile")[0].innerHTML = sessionStorage.getItem("whichScheme");
        $("td#has-mobile")[1].innerHTML = sessionStorage.getItem("whyBenefits");
        $("td#has-mobile")[2].innerHTML = sessionStorage.getItem("lumpSum");
        $("td#has-mobile")[3].innerHTML = sessionStorage.getItem("typeOfLumpSum");
    }

    if (document.location.href.includes("/about-your-pension/why", true)) {
        $("h1.heading-large")[0].innerHTML = `Why are you claiming your deferred benefits for ${sessionStorage.getItem("whichScheme")}?`;
    }

    if (document.location.href.includes("/HMRC/checkyouranswers", true)) {
        $("td#has-mobile")[0].innerHTML = sessionStorage.getItem("pensionArrangement");
        $("td#has-mobile")[1].innerHTML = sessionStorage.getItem("annualPension");
        $("td#has-mobile")[2].innerHTML = sessionStorage.getItem("annualPension");
        $("td#has-mobile")[3].innerHTML = sessionStorage.getItem("excludingPension");
        $("td#has-mobile")[4].innerHTML = sessionStorage.getItem("beforeApril");
        $("td#has-mobile")[5].innerHTML = sessionStorage.getItem("vaildProtection");
    }
});
