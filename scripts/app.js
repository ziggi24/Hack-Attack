console.log("connected");
const buttonOptions = [];
const checkOptions = [];
const attackOptions = [];
const targetOptions = [];
let currentSelector = "";
let currentCheckbox = "";
let currentButton = "";

$('button.launch').click(function (event) {
    console.log("Launching Attack!");
})
$('div.buttons').click(function (event) {
    //console.log("clicked!");
    if ($(event.target).hasClass('nes-btn')) {
        currentButton = $(event.target)[0].innerText
        console.log("button clicked - " + currentButton);
    }
})
$('div.selectors').click(function (event) {

    console.log("clicked " + $(event.target).selectedIndex);


})
$('input').on('change', function (event) {
    $('input').not(this).prop('checked', false);
    currentCheckbox = $(event.target).next()[0].innerText;
    console.log("checkbox - " + currentCheckbox);
});