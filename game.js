const container = document.querySelector('.container');
const gameContainer = document.querySelector('.game-container');
const enemyToggleBtn = document.querySelector('.player-two-button');
const startGameBtn = document.querySelector('#start-game');
const restartGameBtn = document.querySelector('#restart');

const preGameMenu = (() => {
	const toggleSelect = (e) => {
		let otherSelections = Array.from(e.target.parentNode.children);
		otherSelections.forEach((selection) => {
			if (selection.classList.contains('selected')) {
				selection.classList.remove('selected');
			}
		});
		e.target.classList.toggle('selected');
	};

	const getPlayerOneAvatar = (() => {
		let _avatars = Array.from(document.querySelectorAll('.avatars-player-one'));
		_avatars.forEach((avatar) =>
			avatar.addEventListener('click', (e) => {
				toggleSelect(e);
				_playerOne.character = e.target.src;
			})
		);
	})();

	const getPlayerOneWeapon = (() => {
		let _weapons = Array.from(document.querySelectorAll('.weapons-player-one'));
		_weapons.forEach((weapon) =>
			weapon.addEventListener('click', (e) => {
				toggleSelect(e);
				_playerOne.weapon = e.target.src;
			})
		);
	})();

	const getOpponentAvatar = (() => {
		let _avatars = Array.from(document.querySelectorAll('.avatars-opponent'));
		_avatars.forEach((avatar) =>
			avatar.addEventListener('click', (e) => {
				toggleSelect(e);
				_opponent.character = e.target.src;
			})
		);
	})();

	const getOpponentWeapon = (() => {
		let _weapons = Array.from(document.querySelectorAll('.weapons-opponent'));
		_weapons.forEach((weapon) =>
			weapon.addEventListener('click', (e) => {
				toggleSelect(e);
				_opponent.weapon = e.target.src;
			})
		);
	})();

	const _clearDisplay = () => {
		gameContainer.innerHTML = '';
	};

	const _createBoard = () => {
		let _newBoard = new Array(9);
		let _boardContainer = document.createElement('div');
		_boardContainer.classList.add('board-container');
		for (let i = 1; i <= _newBoard.length; i++) {
			let _idx = i;
			let _boardCell = document.createElement('div');
			_boardCell.classList.add('board-cells');
			_boardCell.setAttribute('id', `cell-${i}`);
			_boardContainer.appendChild(_boardCell);
			_boardCell.addEventListener('click', _markBoard);
		}
		gameContainer.appendChild(_boardContainer);
	};

    const _createActiveGameButtons = () => {

        const btnContainer = document.createElement('div');
        btnContainer.classList.add('game-button-container');

        const restartRoundBtn = document.createElement('button');
        restartRoundBtn.classList.add('active-game-buttons', 'restart-round');
        restartRoundBtn.innerText = 'Restart Round';
        btnContainer.appendChild(restartRoundBtn);

        restartRoundBtn.addEventListener('click', () => {

        });

        const newGameBtn = document.createElement('button');
        newGameBtn.classList.add('active-game-buttons', 'new-game');
        newGameBtn.innerText = 'New Game';
        btnContainer.appendChild(newGameBtn);
        newGameBtn.addEventListener('click', () => {
            location.reload();
        });

        container.appendChild(btnContainer);
    }

	const _createPlayerOneStats = () => {
		//get src for character and weapon imgs
		let _character = _playerOne.character;
		let _weapon = _playerOne.weapon;

		let _statContainer = document.createElement('div');
		_statContainer.classList.add('stat-container', 'player-one');

		let _characterBox = document.createElement('div');
		let _characterImg = document.createElement('img');
		_characterImg.setAttribute('src', `${_character}`);
		_characterBox.appendChild(_characterImg);

		let _weaponBox = document.createElement('div');
		let _weaponImg = document.createElement('img');
		_weaponImg.setAttribute('src', `${_weapon}`);
		_weaponBox.appendChild(_weaponImg);

		let _resultSpan = document.createElement('span');
		_resultSpan.classList.add('result-span', 'player-one');

		_statContainer.appendChild(_characterBox);
		_statContainer.appendChild(_weaponBox);
		_statContainer.appendChild(_resultSpan);

		gameContainer.appendChild(_statContainer);
	};

	const _createPlayerTwoStats = () => {
		let _character = _opponent.character;
		let _weapon = _opponent.weapon;

		let _statContainer = document.createElement('div');
		_statContainer.classList.add('stat-container', 'player-two');

		let _characterBox = document.createElement('div');
		let _characterImg = document.createElement('img');
		_characterImg.setAttribute('src', `${_character}`);
		_characterBox.appendChild(_characterImg);

		let _weaponBox = document.createElement('div');
		let _weaponImg = document.createElement('img');
		_weaponImg.setAttribute('src', `${_weapon}`);
		_weaponBox.appendChild(_weaponImg);

		let _resultSpan = document.createElement('span');
		_resultSpan.classList.add('result-span', 'player-two');

		_statContainer.appendChild(_characterBox);
		_statContainer.appendChild(_weaponBox);
		_statContainer.appendChild(_resultSpan);

		gameContainer.appendChild(_statContainer);
	};

	const _changeDisplay = (e) => {
		gameContainer.classList.toggle('new-game-menu');
		gameContainer.classList.toggle('game-active');
	};

	const startGame = () => {
		_clearDisplay();
		_createPlayerOneStats();
		_createBoard();
		_createPlayerTwoStats();
        _createActiveGameButtons();
		_changeDisplay();
		_indicateTurn();
	};

	const _playerOne = {
		character: '',
		weapon: '',

		cellsMarked: [],
	};

	const _opponent = {
		character: '',
		weapon: '',

		cellsMarked: [],
	};

	const _gameBoardState = {
		// true = _playerOne, false = _opponent
		currentTurn: true,

		winner: '',
		loser: '',

		winningCombinations: [
			[1, 2, 3],
			[1, 4, 7],
			[1, 5, 9],
			[4, 5, 6],
			[7, 8, 9],
			[2, 5, 8],
			[3, 6, 9],
			[3, 5, 7],
		],

		gameOver: false,
	};

	const _changeTurn = () => {
		_gameBoardState.currentTurn = !_gameBoardState.currentTurn;
	};

	const _indicateTurn = () => {
		let p1Stats = document.querySelector('.stat-container.player-one');
		let p2Stats = document.querySelector('.stat-container.player-two');

		if (_gameBoardState.currentTurn === true) {
			p1Stats.classList.add('active');
			p2Stats.classList.remove('active');
		} else if (_gameBoardState.currentTurn === false) {
			p2Stats.classList.add('active');
			p1Stats.classList.remove('active');
		}
	};

	const _getCurrentMark = () => {
		let _currentMark;
		if (_gameBoardState.currentTurn === true) {
			_currentMark = _playerOne.weapon;
		} else if (_gameBoardState.currentTurn === false) {
			_currentMark = _opponent.weapon;
		}
		return _currentMark;
	};

	const _getCurrentController = () => {
		let _currentTurn;
		if (_gameBoardState.currentTurn === true) {
			_currentTurn = _playerOne;
		} else if (_gameBoardState.currentTurn === false) {
			_currentTurn = _opponent;
		}
		return _currentTurn;
	};

	const _markBoard = (e) => {
		let _currentMark = _getCurrentMark();
		let _currentTurn = _getCurrentController();

		if (e.target.classList.contains('marked')) {
			return;
		}

		let _weapon = document.createElement('img');
		_weapon.src = _currentMark;
		_currentTurn.cellsMarked.push(parseInt(e.target.id.replace('cell-', '')));
		e.target.appendChild(_weapon);

		e.target.classList.add('marked');
		_weapon.classList.add('marked');

		if (_checkForWinningCombo()) {
			_endGame();
        }

		_changeTurn();
		_indicateTurn();
		console.log(_gameBoardState);
	};


	const _checkForWinningCombo = () => {
		let _p1Cells = _playerOne.cellsMarked;
		let _opponentCells = _opponent.cellsMarked;
		let _winningCombos = _gameBoardState.winningCombinations;

        //Compare cells marked by each player against all winning combinations
		for (let i = 0; i < _winningCombos.length; i++) {
            let win = _winningCombos[i];
			let _playerOneWins = win.every((cell) => _p1Cells.includes(cell)); 
			let _opponentWins =  win.every((cell) => _opponentCells.includes(cell));
        
            if (_playerOneWins) {
                _gameBoardState.winner = 'Player One';
                _gameBoardState.loser = 'Opponent';
                return true;
            }
            if (_opponentWins) {
                _gameBoardState.winner = 'Opponent';
                _gameBoardState.loser = 'Player One';
                return true;
            }
		}
        return false
	};


	const _endGame = () => {
		let _boardCells = Array.from(document.querySelectorAll('.board-cells'));
        _boardCells.forEach(cell => cell.classList.add('marked'));
        _gameBoardState.gameOver = true;
        _returnWinner();
	};


    const _returnWinner = () => {
        let p1ResultDisplay = document.querySelector('.result-span.player-one');
        let p1StatContainer = document.querySelector('.stat-container.player-one');
        let oppResultDisplay = document.querySelector('.result-span.player-two');
        let oppStatContainer = document.querySelector('.stat-container.player-two');
        
        if (_gameBoardState.gameOver === true){
            
            if (_gameBoardState.winner == 'Player One') {
                p1ResultDisplay.innerText = 'Winner!';
                oppResultDisplay.innerText = 'Loser!';
                p1StatContainer.style.borderBottom = '.2rem solid var(--font-color-secondary)';
                oppStatContainer.style.borderBottom = '.2rem solid var(--font-color-main)';
            }
            else if (_gameBoardState.winner == 'Opponent') {
                oppResultDisplay.innerText = 'Winner!';
                p1ResultDisplay.innerText = 'Loser!';
                oppStatContainer.style.borderBottom = '.2rem solid var(--font-color-secondary)';
                p1StatContainer.style.borderBottom = '.2rem solid var(--font-color-main)';
            }

        }
    }

	startGameBtn.addEventListener('click', startGame);

	return {
		startGame: startGame,
	};
})();
