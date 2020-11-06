//global vars
const otherTxtInput = $("#other-title");
let colorDropDown = $("#color");
let allColorOptions = $("#color option");
let punsShirt = allColorOptions.slice(0, 3);
let jsShirt = allColorOptions.slice(3, 6);
const defaultColorText = `<option id="defColTxt" selected value='pleaseSelect'>Please select a T-shirt theme</option>`;
const allActivities = $(".activities input");
const tues9to12 = $(
  ".activities input[data-day-and-time*='Tuesday-T09:00:00-T12:00:00']"
);
const jsFrameworks = $(".activities input[name='js-frameworks']");
const express = $(".activities input[name='express']");
const tues1to4 = $(
  ".activities input[data-day-and-time*='Tuesday-T13:00:00-T16:00:00']"
);
const node = $(".activities input[name='node']");
const jsLibraries = $(".activities input[name='js-libs']");
const selectPaymentMet = $("#payment option[value='select method']");
const credCardFields = $("#credit-card");
const paypal = $("#paypal");
const bitcoin = $("#bitcoin");

// adds focus to Name input field
$("#name").focus();

// hides txt input for other selection, until 'other' is selected in the Job Role drop down menu
$("#title")
  .change(function () {
    if (this.value == "other") {
      otherTxtInput.show();
    } else {
      otherTxtInput.hide();
    }
  })
  .change();

//T-SHIRT INFO
// function `showShirtSelection` takes the selected design and only shows shirts related to that design
let showShirtSelection = (shirtDesign) => {
  colorDropDown.removeAttr("disabled");
  allColorOptions.removeAttr("selected").hide();
  $("#defColTxt").remove();
  shirtDesign.show().eq(0).attr({ selected: true });
};

// conditionals that pass selected parameters to `showShirtSelection` on change
// also includes default text for color field
$("#design")
  .change(function () {
    if (this.value === "selectTheme") {
      allColorOptions.hide();
      colorDropDown.prepend(defaultColorText).attr({ disabled: true });
    } else if (this.value === "js puns") {
      showShirtSelection(punsShirt);
    } else if (this.value === "heart js") {
      showShirtSelection(jsShirt);
    }
  })
  .change();

//ACTIVITY SECTION
//`disableCheckbox` adds disabled attribute and strickthrough class
let disableCheckbox = (activity) => {
  activity.attr({ disabled: true });
  activity.parent().addClass("strikethrough");
};

//`resetCheckbox` removes disabled attribute and strikethrough class
let resetCheckbox = (date) => {
  date.removeAttr("disabled").parent().removeClass("strikethrough");
};

//disables/resets conflicting activies for Tuesday 9-12 if selected
tues9to12
  .change(function () {
    resetCheckbox(tues9to12);
    if (jsFrameworks.prop("checked")) {
      disableCheckbox(express);
    } else if (express.prop("checked")) {
      disableCheckbox(jsFrameworks);
    }
  })
  .change();

//disables/resets conflicting activies for Tuesday 1-4 if selected
tues1to4
  .change(function () {
    resetCheckbox(tues1to4);
    if (node.prop("checked")) {
      disableCheckbox(jsLibraries);
    } else if (jsLibraries.prop("checked")) {
      disableCheckbox(node);
    }
  })
  .change();

//bill total calculation
let total = 0;
$(allActivities).each(function () {
  let cost = +$(this).data("cost").substring(1);
  $(this).change(function () {
    $(this).prop("checked") ? (total += cost) : (total -= cost);
    $("#total").text(`$${total}`);
  });
});

//bill total appendage
$(".activities").append(
  `<div class='total'>Total: <span id="total">$0</span></div>`
);

//PAYMENT
//payment info defaults to Credit Card
//payment options show/hide based on payment selection
selectPaymentMet.attr({ disabled: true });
$("#payment")
  .change(function () {
    this.value == "Credit Card"
      ? (credCardFields.show(), bitcoin.hide(), paypal.hide())
      : credCardFields.hide();
    this.value == "PayPal"
      ? (paypal.show(), bitcoin.hide(), credCardFields.hide())
      : paypal.hide();
    this.value == "Bitcoin"
      ? (bitcoin.show(), paypal.hide(), credCardFields.hide())
      : bitcoin.hide();
  })
  .change();

//VALIDATIONS
//flash error message function
let flashErrorMessage = (form, message) => {
  $(".req-form").remove();
  form.after(message);
};

//remove error message function
let removeErrorMessage = (form) => {
  $(".req-form").remove();
};

//REGEX FUNCTIONS
// email regex function
let emailValidation = (email) => {
  let emailTest = new RegExp(
    /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
  );
  return emailTest.test(email);
};

//credit card regex function
let ccNumValidation = (ccNum) => {
  let ccTest = new RegExp(/^[0-9]{13,16}$/);
  return ccTest.test(ccNum);
};

//zip regex function
let zipValidation = (zip) => {
  let zipTest = new RegExp(/^[0-9]{5}$/);
  return zipTest.test(zip);
};

//cvv regex function
let cvvValidation = (cvv) => {
  let cvvTest = new RegExp(/^[0-9]{3}$/);
  return cvvTest.test(cvv);
};

//FEILD VALIDATIONS
let fieldValidate = () => {
  $("form")
    .find("input[type=text], input[type=email]")
    .each((i, v) => {
      let that = $(v);
      let id = that.attr("id");

      //using switch statements to check field validity and provide error messages on click out of input field.
      that.blur(() => {
        let val = that.val();
        let error, valid;
        switch (id) {
          case "name":
            error = "This form field is required.";
            valid = val.length > 0 ? true : false;
            break;
          case "mail":
            error = "Email address is not valid.";
            valid = emailValidation(val);
            break;
          case "other-title":
            error = "This form field is required.";
            valid = val.length > 0 ? true : false;
            break;
          case "cc-num":
            error = "Credit card number is not valid.";
            valid = ccNumValidation(val);
            break;
          case "zip":
            error = "Zip code is not valid.";
            valid = zipValidation(val);
            break;
          case "cvv":
            error = "CVV is not valid.";
            valid = cvvValidation(val);
            break;
          default:
            error = "This form field is required.";
        }

        // dynamically show and hide error messages based on added/removed class
        const message = `<span class='req-form'>${error}</span>`;
        valid
          ? (that.removeClass("invalid").addClass("valid"),
            removeErrorMessage(that))
          : (that.removeClass("valid").addClass("invalid"),
            flashErrorMessage(that, message));
      });
    });
};
fieldValidate();

//adds class of invalid to offending input forms
let invalidateOnSubmit = (form) => {
  form.addClass("invalid");
};

// form submission
$("form").submit((e) => {
  e.preventDefault();
  let valid = true;

  // check name not empty
  $("#name").val().length
    ? true
    : ((valid = false), invalidateOnSubmit($("#name")));

  // check valid email
  emailValidation($("#mail").val())
    ? console.log("mail pass")
    : ((valid = false), invalidateOnSubmit($("#mail")));

  //checks if 'other' job role is selected and has a value
  if ($("#title").val().toLowerCase() === "other") {
    otherTxtInput.val()
      ? true
      : ((valid = false), invalidateOnSubmit($("#other-title")));
  }
  // check that at least one activity is checked
  $(".activities").find("input:checked").length
    ? true
    : ((valid = false),
      $("#reviewFormActivity").remove(),
      $("#activityLegend").after(
        `<span id='reviewFormActivity'>Please select at least one activity</span>`
      ));

  // if credit card option selected, user enters cc num, zip, and cvv
  if ($("#payment").val().toLowerCase() === "credit card") {
    ccNumValidation($("#cc-num").val())
      ? true
      : ((valid = false), invalidateOnSubmit($("#cc-num")));
    zipValidation($("#zip").val())
      ? true
      : ((valid = false), invalidateOnSubmit($("#zip")));
    cvvValidation($("#cvv").val())
      ? true
      : ((valid = false), invalidateOnSubmit($("#cvv")));
  }

  // a valid submission triggers an alert notification and refreshes the page, while a failed submit highlights required fields in red and jumps to top of page.
  valid
    ? (alert("Successful Submit!"), location.reload())
    : ($(window).scrollTop(0, 0),
      $("#revFormDiv").remove(),
      $("header").after(
        `<div id='revFormDiv'><span id='reviewForm'>Please provide missing information</span></div>`
      ));
});
