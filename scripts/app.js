console.log("Oh, hello there...");

/* GLOBAL VARIABLES */
const themeAudio = new Audio("assets/music/theme.mp3");
const button1Audio = new Audio("assets/soundFX/button1.wav");
const button2Audio = new Audio("assets/soundFX/button2.wav");
const button3Audio = new Audio("assets/soundFX/button3.wav");
const button4Audio = new Audio("assets/soundFX/button4.wav");
const button5Audio = new Audio("assets/soundFX/button5.wav");
const selectorAudio = new Audio("assets/soundFX/selector.wav");
const checkboxAudio = new Audio("assets/soundFX/check.wav");
const buttonOptions = ["Hack", "Spoof",
    "Crack", "Inject", "DDoS", "Bypass",
    "Ping", "Sniff", "Capture", "Block",
    "Encrypt"];
const checkOptions = ["Single", "Double", "Swarm", "Isolated", "Loopback"];
const attackOptions = ["botnet", "salted hash", "metasploit", "ransomware", "trojan horse"];
const targetOptions = ["DNS servers", "load balancer", "internal network", "local host", "cloud backups", "CEO's laptop"];
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
const randomButtonSound = function () {
    const randSeed = Math.floor(Math.random() * 5)
    if (randSeed === 0) {
        button1Audio.play();
    } else if (randSeed === 1) {
        button2Audio.play();
    } else if (randSeed === 2) {
        button3Audio.play();
    } else if (randSeed === 3) {
        button4Audio.play();
    } else {
        button5Audio.play();
    }
}
const checkSeq = function (seq1, seq2) {
    if (seq1.length != seq2.length) {
        return false;
    } else {
        for (i = 0; i < seq1.length; i++) {
            if (seq1[i] != seq2[i]) {
                return false;
            }
        }
        roundsWon++;
        $('.rounds').text(`Rounds: ${roundsWon}`)
        return true;
    }
}
const randomSeq = function () {
    currentSeq = [attackOptions[Math.floor(Math.random() * attackOptions.length)], targetOptions[Math.floor(Math.random() * targetOptions.length)], checkOptions[Math.floor(Math.random() * checkOptions.length)], buttonOptions[Math.floor(Math.random() * buttonOptions.length)]]
    if (roundsWon >= 1) {
        let randSeed = Math.floor(Math.random() * 5);
        if (randSeed === 0) {
            $('h3.prompt').text(`You must use a ${currentSeq[0]} on the ${currentSeq[1]} to perform a ${currentSeq[2]} ${currentSeq[3]}`)
        } else if (randSeed === 1) {
            $('h3.prompt').text(`Good good, now a ${currentSeq[0]} on the ${currentSeq[1]} to perform a ${currentSeq[2]} ${currentSeq[3]}`)
        } else if (randSeed === 2) {
            $('h3.prompt').text(`Activate a ${currentSeq[2]} ${currentSeq[3]} using a ${currentSeq[0]} on the ${currentSeq[1]}`)
        } else if (randSeed === 3) {
            $('h3.prompt').text(`Quick, perform a ${currentSeq[2]} ${currentSeq[3]} using a ${currentSeq[0]} on the ${currentSeq[1]}`)
        } else if (randSeed === 4) {
            $('h3.prompt').text(`Now it's time for a ${currentSeq[0]} on the ${currentSeq[1]} to perform a ${currentSeq[2]} ${currentSeq[3]}`)
        }
    } else {
        $('h3.prompt').text(`You must use a ${currentSeq[0]} on the ${currentSeq[1]} to perform a ${currentSeq[2]} ${currentSeq[3]}`)
    }
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
        if (!timeLeft && gameActive) {
            clearInterval(timer);
            updateTime();
            gameActive = false;
            if (roundsWon > 0) {
                $('.game-over').text(`Game Over - Score ${roundsWon}`);
            } else {
                $('.game-over').text(`Game Over`);
            }
            document.getElementById('dialog-end-screen').showModal();
            roundsWon = 0;
        } else {
            timeLeft--;
            updateTime();
        }
    }, 1000)
}

/* EVENT HANDLERS */
$('button.start').click(function (event) {
    if (!gameActive) {
        gameActive = true;
        timeLeft = 60;
        startGame();
        setTimer();
    }
})
$('button.reset').click(function (event) {
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
    let playerSeq = [currentAttack, currentTarget, currentCheckbox, currentButton];
    if (checkSeq(playerSeq, currentSeq)) {
        randomSeq();
        if (hardMode) {
            let randShift = Math.floor(Math.random() * 6)
            if (randShift === 0) {
                $('div.buttons').before($('div.launch'));
                $('div.selectors').before($('div.screen-outer'));
            } else if (randShift === 1) {
                $('div.screen-outer').before($('div.checkboxes'));
                $('div.selectors').before($('div.screen-outer'));
            } else if (randShift === 2) {
                $('div.launch').before($('div.buttons'));
                $('div.screen-outer').before($('div.selectors'));
                $('div.checkboxes').before($('div.screen-outer'));
            } else if (randShift === 3) {
                $('div.buttons').before($('div.launch'));
            } else if (randShift === 4) {
                $('div.selectors').before($('div.screen-outer'));
                $('div.checkboxes').before($('div.screen-outer'));
            } else if (randShift === 5) {
                resetMods();

            }
        }
    }
})
$('div.buttons').click(function (event) {
    if ($(event.target).hasClass('nes-btn')) {
        currentButton = $(event.target)[0].innerText
    }
})
$('select.attack-select').change(function (event) {
    selectorAudio.play();
    currentAttack = attackOptions[$(this).children("option:selected").val()];
})
$('select.target-select').change(function (event) {
    selectorAudio.play();
    currentTarget = targetOptions[$(this).children("option:selected").val()];
})
$('input').on('change', function (event) {
    checkboxAudio.play();
    $('input').not(this).prop('checked', false);
    currentCheckbox = $(event.target).next()[0].innerText;
});
$('.nes-btn').click(function () {
    randomButtonSound();
});
$('span.about').click(function () {
    document.getElementById('dialog-about').showModal();
});