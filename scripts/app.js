console.log("connected");
const buttonOptions = ["Hack", "Spoof",
    "Crack", "Inject", "DDoS", "Bypass",
    "Ping", "Sniff", "Capture", "Block",
    "Encrypt"];
const checkOptions = ["Single", "Double", "Swarm"];
const attackOptions = ["botnet", "salted hashes", "metasploit"];
const targetOptions = ["servers", "load balancer", "internal network"];
let currentSeq = ["botnet", "servers", "Swarm", "DDoS"];
let currentAttack = "";
let currentTarget = "";
let currentCheckbox = "";
let currentButton = "";

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
        return true;
    }
}

$('button.launch').click(function (event) {
    console.log("Launching Attack!");
    console.log(`player selected ${currentAttack}, ${currentTarget}, ${currentCheckbox}, ${currentButton}`);
    let playerSeq = [currentAttack, currentTarget, currentCheckbox, currentButton];
    checkSeq(playerSeq, currentSeq);
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