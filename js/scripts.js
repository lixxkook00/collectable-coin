const POINT_REWARD = 0.007;
const ENERGY_DECREASE = 0.1;

const BALANCE_DECIMAL = 4;
const ENERGY_DECIMAL = 1;

const ANIMATION_END = 'animationend';

// floating text
const createFloatingDiv = () => {
  const floatingPool = document.querySelector('#collectableCoinFloating');

  floatingDiv = document.createElement('div');
  floatingDiv.textContent = `+ ${POINT_REWARD}`;
  floatingDiv.classList.add('floating-text');
  
  const unitID = 'floating-text' + Date.now();
  floatingDiv.id = unitID;

  floatingPool.appendChild(floatingDiv);
  
  floatingDiv.addEventListener(ANIMATION_END, () => {
    document.querySelector(`#${unitID}`).remove()
  });
}

// update balance
const updateBalance = () => {
  const coinValue = document.querySelector('#collectableCoinValue');

  const currentBalance = Number.parseFloat(coinValue.textContent.trim());
  coinValue.innerText = (currentBalance + POINT_REWARD).toFixed(BALANCE_DECIMAL);
}

// update energy
const updateEnergy = () => {
  const energyValue = document.querySelector('#collectableCoinEnergy');
  const progressBar = document.querySelector('.progress-bar');

  const energyBalance = Number.parseFloat(energyValue.textContent.trim().replace('%', ''));
  const energyLeft = energyBalance - ENERGY_DECREASE;

  console.log({energyLeft});

  energyValue.innerText = `${energyLeft.toFixed(ENERGY_DECIMAL)}%`;
  progressBar.style.width = energyLeft + '%';
  progressBar.setAttribute('aria-valuenow', energyLeft);
}

// coin click handler
const coin = document.querySelector('#collectableCoin');
const audio = document.querySelector('#collectableAudio');
coin.onclick = () => {
  coin.classList.add('collect');

  audio.play();
  createFloatingDiv();
  updateBalance();
  updateEnergy();

  const onAnimationEnd = () => {
    coin.classList.remove('collect');
    coin.removeEventListener(ANIMATION_END, onAnimationEnd);
  }
  coin.addEventListener(ANIMATION_END, () => {
    onAnimationEnd();
  });
}