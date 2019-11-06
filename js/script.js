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
  .change(function() {
    if (this.value == "other") {
      otherTxtInput.show();
    } else {
      otherTxtInput.hide();
    }
  })
  .change();

// function `showShirtSelection` takes the selected design and only shows shirts related to that design
let showShirtSelection = shirtDesign => {
  colorDropDown.removeAttr("disabled");
  allColorOptions.removeAttr("selected").hide();
  $("#defColTxt").remove();
  shirtDesign
    .show()
    .eq(0)
    .attr({ selected: true });
};

// conditionals that pass selected parameters to `showShirtSelection` on change
// also includes default text for color field
$("#design")
  .change(function() {
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

//checkbox strikethrough and disable
let disableCheckbox = activity => {
  activity.attr({ disabled: true });
  activity.parent().addClass("strikethrough");
};

let resetCheckbox = date => {
  date
    .removeAttr("disabled")
    .parent()
    .removeClass("strikethrough");
};

tues9to12
  .change(function() {
    tues9to12;
    resetCheckbox(tues9to12);
    if (jsFrameworks.prop("checked")) {
      disableCheckbox(express);
    } else if (express.prop("checked")) {
      disableCheckbox(jsFrameworks);
    }
  })
  .change();

tues1to4
  .change(function() {
    tues1to4;
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
$(allActivities).each(function() {
  let cost = +$(this)
    .data("cost")
    .substring(1);
  $(this).change(function() {
    $(this).prop("checked") ? (total += cost) : (total -= cost);
    $("#total").text(`$${total}`);
  });
});

//bill total appendage
$(".activities").append(`<div>Total: <span id="total">$0</span></div>`);

//only shows credit card inputs if credit card method is chosen
selectPaymentMet.attr({ disabled: true });
$("#payment").change(function() {
  this.value == "Credit Card"
    ? (credCardFields.show(), bitcoin.hide(), paypal.hide())
    : credCardFields.hide();
  this.value == "PayPal"
    ? (paypal.show(), bitcoin.hide(), credCardFields.hide())
    : paypal.hide();
  this.value == "Bitcoin"
    ? (bitcoin.show(), paypal.hide(), credCardFields.hide())
    : bitcoin.hide();
});

//flash error message function
let flashErrorMessage = (form, message) => {
  $(".reqForm").remove();
  form.after(message);
  $(".reqForm").fadeOut(6000);
};

//REGEX FUNCTIONS
// email regex function
let emailValidation = email => {
  let emailTest = new RegExp(
    /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
  );
  return emailTest.test(email);
};

//credit card regex function
let ccNumValidation = ccNum => {
  let ccTest = new RegExp(/^[0-9]{13,16}$/);
  return ccTest.test(ccNum);
};

//zip regex function
let zipValidation = zip => {
  let zipTest = new RegExp(/^[0-9]{5}$/);
  return zipTest.test(zip);
};

//cvv regex function
let cvvValidation = cvv => {
  let cvvTest = new RegExp(/^[0-9]{3}$/);
  return cvvTest.test(cvv);
};

//FEILD VALIDATIONS
// name validation
$("#name").blur(function() {
  let name = $("#name").val();
  const errorMessage = "<span class='reqForm'>This form is required</span>";
  name.length > 0
    ? $(this)
        .removeClass("invalid")
        .addClass("valid")
    : ($(this)
        .removeClass("valid")
        .addClass("invalid"),
      flashErrorMessage($(this), errorMessage));
});

// email validation
$("#mail").blur(function() {
  let email = $("#mail").val();
  const errorMessage = "<span class='reqForm'>Email is not valid</span>";
  emailValidation(email)
    ? $(this)
        .removeClass("invalid")
        .addClass("valid")
    : ($(this)
        .removeClass("valid")
        .addClass("invalid"),
      flashErrorMessage($(this), errorMessage));
});

//credit card validation
$("#cc-num").blur(function() {
  let ccNum = $("#cc-num").val();
  const errorMessage =
    "<span class='reqForm'>Credit Card number is not valid</span>";
  ccNumValidation(ccNum)
    ? $(this)
        .removeClass("invalid")
        .addClass("valid")
    : ($(this)
        .removeClass("valid")
        .addClass("invalid"),
      flashErrorMessage($(this), errorMessage));
});

//zip code validation
$("#zip").blur(function() {
  let zipVal = $("#zip").val();
  const errorMessage = "<span class='reqForm'>Zip Code is not valid</span>";
  zipValidation(zipVal)
    ? $(this)
        .removeClass("invalid")
        .addClass("valid")
    : ($(this)
        .removeClass("valid")
        .addClass("invalid"),
      flashErrorMessage($(this), errorMessage));
});

//cvv code validation
$("#cvv").blur(function() {
  let cvvVal = $("#cvv").val();
  const errorMessage = "<span class='reqForm'>CVV is not valid</span>";
  cvvValidation(cvvVal)
    ? $(this)
        .removeClass("invalid")
        .addClass("valid")
    : ($(this)
        .removeClass("valid")
        .addClass("invalid"),
      flashErrorMessage($(this), errorMessage));
});

//VALIDATION CONDITIONAL TEST
let validationConditionalTEST = x => {
  x
    ? $(this)
        .removeClass("invalid")
        .addClass("valid")
    : ($(this)
        .removeClass("valid")
        .addClass("invalid"),
      flashErrorMessage($(this), errorMessage));
};
