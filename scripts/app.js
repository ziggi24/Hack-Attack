console.log("connected");

/* GLOBAL VARIABLES */
const buttonOptions = ["Hack", "Spoof",
    "Crack", "Inject", "DDoS", "Bypass",
    "Ping", "Sniff", "Capture", "Block",
    "Encrypt"];
const checkOptions = ["Single", "Double", "Swarm"];
const attackOptions = ["botnet", "salted hash", "metasploit"];
const targetOptions = ["servers", "load balancer", "internal network"];
let currentSeq = ["botnet", "servers", "Swarm", "DDoS"];
let currentAttack = "";
let currentTarget = "";
let currentCheckbox = "";
let currentButton = "";
let roundsWon = 0;

/* FUNCTIONS */
const checkSeq = function (seq1, seq2) {
    if (seq1.length != seq2.length) {
        console.log("Not the same");
        return false;
    } else {
        for (i = 0; i < seq1.length; i++) {
            if (seq1[i] != seq2[i]) {
                console.log("Not the same");
                return false;
            }
        }
        console.log("The same");
        roundsWon++;
        $('.rounds').text(`Rounds: ${roundsWon}`)
        return true;
    }
}
const randomSeq = function () {
    currentSeq = [attackOptions[Math.floor(Math.random() * attackOptions.length)], targetOptions[Math.floor(Math.random() * targetOptions.length)], checkOptions[Math.floor(Math.random() * checkOptions.length)], buttonOptions[Math.floor(Math.random() * buttonOptions.length)]]
    $('h3.prompt').text(`You must use a ${currentSeq[0]} on the ${currentSeq[1]} to perform a ${currentSeq[2]} ${currentSeq[3]}`)
}

/* BUTTON HANDLERS */
$('button.start').click(function (event) {
    console.log("Start Button Pressed!");
    randomSeq();
})
$('button.launch').click(function (event) {
    console.log("Launching Attack!");
    console.log(`player selected ${currentAttack}, ${currentTarget}, ${currentCheckbox}, ${currentButton}`);
    let playerSeq = [currentAttack, currentTarget, currentCheckbox, currentButton];
    if (checkSeq(playerSeq, currentSeq)) {
        randomSeq();
    }

})
$('div.buttons').click(function (event) {
    if ($(event.target).hasClass('nes-btn')) {
        currentButton = $(event.target)[0].innerText
        console.log("button clicked - " + currentButton);
    }
})
$('select.attack-select').change(function (event) {
    console.log("clicked " + $(this).children("option:selected").val());
    currentAttack = attackOptions[$(this).children("option:selected").val()];
})
$('select.target-select').change(function (event) {
    console.log("clicked " + $(this).children("option:selected").val());
    currentTarget = targetOptions[$(this).children("option:selected").val()];
})
$('input').on('change', function (event) {
    $('input').not(this).prop('checked', false);
    currentCheckbox = $(event.target).next()[0].innerText;
    console.log("checkbox - " + currentCheckbox);
});