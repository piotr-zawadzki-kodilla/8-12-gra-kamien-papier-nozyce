var gameTextElem = document.getElementById('js-gameText');
	newGameBtn = document.getElementById('js-newGameButton'),
    newGameElem = document.getElementById('js-newGameElement'),
    pickElem = document.getElementById('js-playerPickElement'),
    resultsElem = document.getElementById('js-resultsTableElement'),
	playerNameElem = document.getElementById('js-playerName'),

	pickRock = document.getElementById('js-playerPick_rock'),
    pickPaper = document.getElementById('js-playerPick_paper'),
    pickScissors = document.getElementById('js-playerPick_scissors'),

	playerPickElem = document.getElementById('js-playerPick'),
	computerPickElem = document.getElementById('js-computerPick'),
	playerResultElem = document.getElementById('js-playerResult'),
	computerResultElem = document.getElementById('js-computerResult');
	playerPointsElem = document.getElementById('js-playerPoints');
	computerPointsElem = document.getElementById('js-computerPoints');

var gameWinner = '',
	gameState = 'notStarted',
    player = {
        name: '',
        score: 0
    },
    computer = {
        score: 0
    };

function setGameElements() {
	switch(gameState) {
		case 'started':
			newGameElem.style.display = 'none';
        	pickElem.style.display = 'block';
        	resultsElem.style.display = 'block';
    	break;
    	case 'ended':
			gameTextElem.innerHTML = "<h3>" + gameWinner + "</h3>";
        	newGameBtn.innerText ="Zagrajmy jeszcze raz!";
			player.score = computer.score = 0;
    	case 'notStarted':
    	default:
			newGameElem.style.display = 'block';
        	pickElem.style.display = 'none';
        	resultsElem.style.display = 'none';
	}
}

function newGame() {
	player.name = prompt('Graczu, wpisz swoje imię', player.name);
	if (player.name == null) player.name = '';
	if (player.name) {
		player.score = computer.score = 0;
		playerPointsElem.innerHTML = player.score;
		computerPointsElem.innerHTML = computer.score;
		playerResultElem.innerHTML = "Wynik gry";
        computerResultElem.innerHTML = "Wynik gry";
		playerPickElem.innerHTML = "Wybór Gracza";
	    computerPickElem.innerHTML = "Wybór Komputera";
    	gameState = 'started';
    	setGameElements();
    	playerNameElem.innerHTML = player.name;
	}
}

function getComputerPick() {
    var possiblePicks = ['rock', 'paper', 'scissors'];
    return possiblePicks[Math.floor(Math.random()*3)];
}

function checkRoundWinner(playerPick, computerPick) {
	playerResultElem.innerHTML = computerResultElem.innerHTML = '';
	var winnerIs = 'player';
	if (playerPick == computerPick) {
        winnerIs = 'noone';
		playerResultElem.innerHTML = "Remis";
        computerResultElem.innerHTML = "Remis";
    } else if (
        (computerPick == 'rock' &&  playerPick == 'scissors') ||
        (computerPick == 'scissors' &&  playerPick == 'paper') ||
        (computerPick == 'paper' &&  playerPick == 'rock') ) {
        winnerIs = 'computer';
    }
    if (winnerIs == 'player') {
        playerResultElem.innerHTML = "<span style = 'color: green'>Wygrana!</span>";
		computerResultElem.innerHTML = "<span style = 'color: red'>Przegrana :(</span>";
        player.score++;
		playerPointsElem.innerHTML = player.score;
    } else if (winnerIs == 'computer') {
		playerResultElem.innerHTML = "<span style = 'color: red'>Przegrana :(</span>";
        computerResultElem.innerHTML = "<span style = 'color: green'>Wygrana!</span>";
        computer.score++;
		computerPointsElem.innerHTML = computer.score;
    }
}

function playerPick(playerPick) {
    var computerPick = getComputerPick();
	switch(playerPick) {
    case 'rock':
        playerPickElem.innerHTML = '<span class="label label-default">Kamień</span>';
        break;
    case 'paper':
        playerPickElem.innerHTML = '<span class="label label-info">Papier</span>';
        break;
    case 'scissors':
        playerPickElem.innerHTML = '<span class="label label-danger">Nożyce</span>';
	}
	switch(computerPick) {
    case 'rock':
        computerPickElem.innerHTML = '<span class="label label-default">Kamień</span>';
        break;
    case 'paper':
        computerPickElem.innerHTML = '<span class="label label-info">Papier</span>';
        break;
    case 'scissors':
        computerPickElem.innerHTML = '<span class="label label-danger">Nożyce</span>';
	}
    checkRoundWinner(playerPick, computerPick);
	if (player.score == 10) {
		gameWinner = "Wygrałeś " + player.score + " : " + computer.score + "!";
		gameState = 'ended';
	};
	if (computer.score == 10) {
		gameWinner = "Wygrał Komputer " + computer.score + " : " + player.score + "!";
		gameState = 'ended';
	};
	setGameElements();
}

newGameBtn.addEventListener('click', newGame);
pickRock.addEventListener('click', function() { playerPick('rock') });
pickPaper.addEventListener('click', function() { playerPick('paper') });
pickScissors.addEventListener('click', function() { playerPick('scissors') });

setGameElements();
