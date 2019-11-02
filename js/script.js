//global vars
const otherTxtInput = $("#other-title");
let colorDropDown = $("#color");
let allColorOptions = $("#color option");
let punsShirt = allColorOptions.slice(0, 3);
let jsShirt = allColorOptions.slice(3, 6);
const defaultColorText = `<option id="defColTxt" selected value='pleaseSelect'>Please select a T-shirt theme</option>`;
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
//also includes default text for color field
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
