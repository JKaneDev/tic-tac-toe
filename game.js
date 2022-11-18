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

	const getPlayerAvatar = (() => {
		const _avatars = Array.from(
			document.querySelectorAll('.avatars-player-one')
		);
		_avatars.forEach((avatar) =>
			avatar.addEventListener('click', (e) => {
				_playerOne.character = e.target.src;
                console.log(_playerOne);
			})
		);
	})();

    const getPlayerWeapon = (() => {
        const _weapons = Array.from(
			document.querySelectorAll('.weapons-player-one')
		);
		_weapons.forEach((weapon) =>
			weapon.addEventListener('click', (e) => {
				_playerOne.weapon = e.target.src;
                console.log(_playerOne);
			})
		);
    })();

	// player one object literal
	const _playerOne = {
		character: '',
		weapon: '',
	};

	//clear display
	const _clearDisplay = () => {
		gameContainer.innerHTML = '';
	};

	const _createBoard = () => {
		let _newBoard = new Array(9);
		let _boardContainer = document.createElement('div');
		_boardContainer.classList.add('board-container');
		for (let i = 1; i <= _newBoard.length; i++) {
			let _idx = i;
			let _boardCell = document.createElement('button');
			_boardCell.classList.add('board-cells');
			_boardCell.setAttribute('id', `cell-${i}`);
			_boardCell.textContent = `${_idx}`;
			_boardContainer.appendChild(_boardCell);
			_boardCell.addEventListener('click', markBoard);
		}
		gameContainer.appendChild(_boardContainer);
	};

	// const _createStatContainer = () => {
	// 	//get src for character and weapon imgs
	// 	let _character = getPlayerCharacter();
	// 	let _weapon = getPlayerWeapon();

	// 	let _statContainer = document.createElement('div');
	// 	_statContainer.classList.add('stat-container');

	// 	let _characterBox = document.createElement('div');
	// 	let _characterImg = document.createElement('img');
	// 	_characterImg.setAttribute('src', `${_characterImg}`);
	// 	_characterBox.appendChild(_character);

	// 	let _weaponBox = document.createElement('div');
	// 	let _weaponImg = document.createElement('img');
	// 	_weaponImg.setAttribute('src', `${_weaponImg}`);
	// 	_weaponBox.appendChild(_weapon);

	// 	let _resultSpan = document.createElement('span');
	// 	_resultSpan.classList.add('result-span');

	// 	_statContainer.appendChild(_characterBox);
	// 	_statContainer.appendChild(_weaponBox);
	// 	_statContainer.appendChild(_resultSpan);

	// 	gameContainer.appendChild(_statContainer);
	// };

	const markBoard = (e) => {};

	//change display to active game
	const _changeDisplay = (e) => {
		gameContainer.classList.toggle('new-game-menu');
		gameContainer.classList.toggle('game-active');
	};

	const startGame = () => {
		_clearDisplay();
		_getPlayerOne();
		_createBoard();
		_changeDisplay();
	};

	startGameBtn.addEventListener('click', startGame);

	return {
		startGame: startGame,
	};
})();
