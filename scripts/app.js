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
let timeLeft = 60;
let hardMode = false;
let gameActive = false;

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
const resetMods = function () {
    $('div.launch').before($('div.buttons'));
    $('div.screen-outer').before($('div.selectors'));
    $('div.checkboxes').before($('div.screen-outer'));
}
const updateTime = function () {
    $('.timer').text(`Time: ${timeLeft}s`);
}
const startGame = function () {
    randomSeq();
}
const setTimer = function () {
    const timer = setInterval(() => {
        console.log(timeLeft);
        if (!timeLeft && gameActive) {
            clearInterval(timer);
            updateTime();
            gameActive = false;
            $('.game-over').text(`Game Over - Score ${roundsWon}`);
            document.getElementById('dialog-end-screen').showModal();
        } else {
            timeLeft--;
            updateTime();
        }
    }, 1000)
}

/* EVENT HANDLERS */
$('button.start').click(function (event) {
    console.log("Start Button Pressed!");

    if (!gameActive) {
        gameActive = true;
        timeLeft = 60;
        startGame();
        setTimer();
    }
})
$('button.reset').click(function (event) {
    console.log("reset Button Pressed!");
    roundsWon = 0;
    timeLeft = 0;
    updateTime();
    $('.timer').text(`Time: ${timeLeft}s`);
    currentAttack = "";
    currentTarget = "";
    currentCheckbox = "";
    currentButton = "";
    $('.rounds').text(`Rounds: ${roundsWon}`)
    $('select.attack-select').val('');
    $('select.target-select').val('');
    $('input').prop('checked', false);
    $('h3.prompt').text(`Press Start!`);
    resetMods();
})
$('button.launch').click(function (event) {
    console.log("Launching Attack!");
    console.log(`player selected ${currentAttack}, ${currentTarget}, ${currentCheckbox}, ${currentButton}`);
    let playerSeq = [currentAttack, currentTarget, currentCheckbox, currentButton];
    if (checkSeq(playerSeq, currentSeq)) {
        randomSeq();
        if (hardMode) {
            let randShift = Math.floor(Math.random() * 4)
            if (randShift === 0) {
                $('div.buttons').before($('div.launch'));
                $('div.selectors').before($('div.screen-outer'));
            } else if (randShift === 1) {
                $('div.screen-outer').before($('div.checkboxes'));
                $('div.selectors').before($('div.screen-outer'));
            } else if (randShift === 2) {
                $('div.launch').before($('div.buttons'));
                $('div.selectors').before($('div.screen-outer'));
                $('div.checkboxes').before($('div.screen-outer'));
            } else if (randShift === 3) {
                $('div.buttons').before($('div.launch'));
            }
        }
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