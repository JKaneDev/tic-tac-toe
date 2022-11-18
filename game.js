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
	//get player ones character
	const getPlayerCharacter = (e) => {
		const _avatars = Array.from(document.querySelectorAll('.avatars'));
		_avatars.forEach((avatar) =>
			avatar.addEventListener('click', () => {
				let _avatarImgs = [];
				_avatarImgs.push(e.target.src);
			})
		);
		return _avatarImgs[0];
	};

	//get player ones weapon
	const getPlayerWeapon = (e) => {
		const weapons = Array.from(document.querySelectorAll('.weapons'));
		weapons.forEach((weapon) =>
			weapon.addEventListener('click', addWeaponSrcToArray)
		);
		return _weaponImgs[0];
	};

	//add weapon src to array
	const addWeaponSrcToArray = (e) => {
		let _weaponImgs = [];
		_weaponImgs.push(e.target.src);
		return _weaponImgs;
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

	const _createStatContainer = () => {
		//get src for character and weapon imgs
		let _character = getPlayerCharacter();
		let _weapon = getPlayerWeapon();

		let _statContainer = document.createElement('div');
		_statContainer.classList.add('stat-container');

		let _characterBox = document.createElement('div');
		let _characterImg = document.createElement('img');
		_characterImg.setAttribute('src', `${_characterImg}`);
		_characterBox.appendChild(_character);

		let _weaponBox = document.createElement('div');
		let _weaponImg = document.createElement('img');
		_weaponImg.setAttribute('src', `${_weaponImg}`);
		_weaponBox.appendChild(_weapon);

		let _resultSpan = document.createElement('span');
		_resultSpan.classList.add('result-span');

		_statContainer.appendChild(_characterBox);
		_statContainer.appendChild(_weaponBox);
		_statContainer.appendChild(_resultSpan);

		gameContainer.appendChild(_statContainer);
	};

	const markBoard = (e) => {};

	//change display to active game
	const _changeDisplay = (e) => {
		gameContainer.classList.toggle('new-game-menu');
		gameContainer.classList.toggle('game-active');
	};

	const startGame = () => {
		_clearDisplay();
		_createStatContainer();
		_createBoard();
		_changeDisplay();
	};

	startGameBtn.addEventListener('click', startGame);

	return {
		startGame: startGame,
	};
})();
