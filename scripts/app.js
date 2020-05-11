console.log("connected");
$('button.launch').click(function (event) {
    console.log("Clicked!" + event.target);
})
$('div.buttons').click(function (event) {
    //console.log("clicked!");
    if ($(event.target).hasClass('nes-btn')) {
        console.log("clicked a button!");
        console.log($(event));
    }
})
$('div.selectors').click(function (event) {
    console.log("clicked " + event);
})