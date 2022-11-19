const container = document.querySelector('.container');
const gameContainer = document.querySelector('.game-container');
const enemyToggleBtn = document.querySelector('.player-two-button');
const startGameBtn = document.querySelector('#start-game');
const characterOne = document.querySelector('.avatar-one');
const characterTwo = document.querySelector('.avatar-two');
const characterThree = document.querySelector('.avatar-three');
const characterFour = document.querySelector('.avatar-four');
const crossbow = document.querySelector('.crossbow');
const sword = document.querySelector('.sword');
const sabres = document.querySelector('.sabres');
const gun = document.querySelector('.gun');
const restartGameBtn = document.querySelector('#restart');

const preGameMenu = (() => {

    const toggleSelect = (e) => {
        let otherSelections = Array.from(e.target.parentNode.children);
        otherSelections.forEach(selection => {
                if (selection.classList.contains('selected')) {
                    selection.classList.remove('selected');
                }
            });
            e.target.classList.toggle('selected');
    } 

	const getPlayerOneAvatar = (() => {
		let _avatars = Array.from(
			document.querySelectorAll('.avatars-player-one')
		);
		_avatars.forEach((avatar) =>
			avatar.addEventListener('click', (e) => {
                toggleSelect(e);
				_playerOne.character = e.target.src;
			})
		);
	})();

    const getPlayerOneWeapon = (() => {
        let _weapons = Array.from(
			document.querySelectorAll('.weapons-player-one')
		);
		_weapons.forEach((weapon) =>
			weapon.addEventListener('click', (e) => {
                toggleSelect(e);
				_playerOne.weapon = e.target.src;
			})
		);
    })();

    const getOpponentAvatar = (() => {
        let _avatars = Array.from(
			document.querySelectorAll('.avatars-opponent')
		);
		_avatars.forEach((avatar) =>
			avatar.addEventListener('click', (e) => {
                toggleSelect(e);
				_opponent.character = e.target.src;
			})
		);
    })();

    const getOpponentWeapon = (() => {
        let _weapons = Array.from(
			document.querySelectorAll('.weapons-opponent')
		);
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

	const _createPlayerOneStats = () => {
		//get src for character and weapon imgs
        let _character = _playerOne.character;
		let _weapon = _playerOne.weapon;

		let _statContainer = document.createElement('div');
		_statContainer.classList.add('stat-container');

		let _characterBox = document.createElement('div');
		let _characterImg = document.createElement('img');
		_characterImg.setAttribute('src', `${_character}`);
		_characterBox.appendChild(_characterImg);

		let _weaponBox = document.createElement('div');
		let _weaponImg = document.createElement('img');
		_weaponImg.setAttribute('src', `${_weapon}`);
		_weaponBox.appendChild(_weaponImg);

		let _resultSpan = document.createElement('span');
		_resultSpan.classList.add('result-span');
        _resultSpan.innerText = "Result";

		_statContainer.appendChild(_characterBox);
		_statContainer.appendChild(_weaponBox);
		_statContainer.appendChild(_resultSpan);

		gameContainer.appendChild(_statContainer);
	};

    const _createPlayerTwoStats = () => {
        let _character = _opponent.character;
		let _weapon = _opponent.weapon;

		let _statContainer = document.createElement('div');
		_statContainer.classList.add('stat-container');

		let _characterBox = document.createElement('div');
		let _characterImg = document.createElement('img');
		_characterImg.setAttribute('src', `${_character}`);
		_characterBox.appendChild(_characterImg);

		let _weaponBox = document.createElement('div');
		let _weaponImg = document.createElement('img');
		_weaponImg.setAttribute('src', `${_weapon}`);
		_weaponBox.appendChild(_weaponImg);

		let _resultSpan = document.createElement('span');
		_resultSpan.classList.add('result-span');
        _resultSpan.innerText = "Result";

		_statContainer.appendChild(_characterBox);
		_statContainer.appendChild(_weaponBox);
		_statContainer.appendChild(_resultSpan);

		gameContainer.appendChild(_statContainer);
    }


	const _changeDisplay = (e) => {
		gameContainer.classList.toggle('new-game-menu');
		gameContainer.classList.toggle('game-active');
	};

	const startGame = () => {
		_clearDisplay();
		_createPlayerOneStats();
		_createBoard();
        _createPlayerTwoStats();
		_changeDisplay();
	};

    const _playerOne = {
		character: '',
		weapon: '',
	};

    const _opponent = {
        character: '',
        weapon: '',
    }

    const _gameBoardState = {
        currentTurn: true,

        winner: '',
        loser: '',

        gameOver: false,
    }

    const _changeTurn = () => {
        _gameBoardState.currentTurn = !_gameBoardState.currentTurn;
    }

    const _getCurrentTurn = () => {
        let _currentTurn;
        if (_gameBoardState.currentTurn === true) {
            _currentTurn = _playerOne.weapon;
        } else if (_gameBoardState.currentTurn === false) {
            _currentTurn = _opponent.weapon;
        }
        return _currentTurn;
    }


    const _markBoard = (e) => {
        let _currentTurn = _getCurrentTurn();
        if (e.target.classList.contains('marked')) {
            return;
        }

        let _weapon = document.createElement('img');
        _weapon.src = _currentTurn;
        e.target.appendChild(_weapon);
        e.target.classList.add('marked');
        _weapon.classList.add('marked');
        _changeTurn();
        console.log(_gameBoardState);
    };

	startGameBtn.addEventListener('click', startGame);

	return {
		startGame: startGame,
	};
})();
