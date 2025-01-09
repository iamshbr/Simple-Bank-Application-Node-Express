'use-strict';

const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

let time;

const loginUser = function (currentAccount, inputLoginUsername, inputLoginPin) {
  if (inputLoginUsername && inputLoginPin) {
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginUsername.disabled = inputLoginPin.disabled = true;
  }
  if (currentAccount) {
    labelWelcome.textContent = `Welcome Back, ${currentAccount.owner.split(' ')[0]}`;
    containerApp.style.opacity = 100;
    updateUI(currentAccount);
    sessionStorage.setItem('login', true);
    startLogoutTime();
    displayDate(currentAccount.locale);
    setInterval(() => {
      displayDate();
    }, 60 * 1000);
  }
};

const displayDate = function (locale) {
  const now = new Date();
  const options = {
    hour: 'numeric',
    minute: 'numeric',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    weekday: 'long',
  };
  const newTime = new Intl.DateTimeFormat(locale, options).format();
  labelDate.innerHTML = `${newTime}`;
};

const transferAmount = function (currentAccount, inputTransferTo, inputTransferAmount) {
  inputTransferTo.value = inputTransferAmount.value = '';
  updateUI(currentAccount);
};

const loanSuccessful = function (currentAccount, inputLoanAmount) {
  inputLoanAmount.value = '';
  setTimeout(() => updateUI(currentAccount), 2500);
};

const sort = function (currentAccount, sorted) {
  displayMovements(
    currentAccount.transactions,
    currentAccount.transactionDates,
    currentAccount.locale,
    currentAccount.currency,
    sorted
  );
};

const closeAccount = function (inputCloseUsername, inputClosePin) {
  inputCloseUsername.value = inputClosePin.value = '';
  labelWelcome.textContent = `Log in to get started`;
  containerApp.style.opacity = 0;
};

const updateUI = function (acc) {
  time = 60 * 5;
  displayMovements(acc.transactions, acc.transactionDates, acc.locale, acc.currency);
  calculateAndPrintBalance(acc);
  calculateAndDisplaySummary(acc);
  sessionStorage.setItem('currentAccount', JSON.stringify(acc));
};

const displayMovements = function (
  transactions,
  transactionDates,
  locale,
  currencyType,
  sort = false
) {
  containerMovements.innerHTML = '';

  const trans = sort ? [...transactions].sort((a, b) => a - b) : transactions;
  trans.forEach((tran, index) => {
    const type = tran > 0 ? 'deposit' : 'withdrawal';
    const formattedDate = formatMovementDate(transactionDates[index], locale);
    const formattedValue = currencyFormatter(currencyType, locale, tran);

    const html =
      /* HTML */
      `<div class="movements__row">
        <div class="movements__type movements__type--${type}">
          ${index + 1} ${type.toUpperCase()}
        </div>
        <div class="movements__date">${formattedDate}</div>
        <div class="movements__value">${formattedValue}</div>
      </div>`;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calculateAndPrintBalance = function (account) {
  account.balance = account.transactions.reduce((acc, cur) => acc + cur, 0);
  labelBalance.textContent = `${currencyFormatter(
    account.currency,
    account.locale,
    account.balance
  )}`;
};

const calculateAndDisplaySummary = function (account) {
  const deposits = account.transactions.filter(mov => mov > 0);

  const incomes = deposits.reduce((acc, cur) => acc + cur, 0);

  const out = account.transactions.filter(mov => mov < 0).reduce((acc, cur) => acc + cur, 0);

  const interest = deposits
    .map(dep => (dep * account.interestRate) / 100)
    .filter((int, i, arr) => int > 1)
    .reduce((acc, cur) => acc + cur, 0);

  labelSumIn.textContent = `${currencyFormatter(account.currency, account.locale, incomes)}`;
  labelSumOut.textContent = `${currencyFormatter(account.currency, account.locale, out)}`;
  labelSumInterest.textContent = `${currencyFormatter(account.currency, account.locale, interest)}`;
};

const startLogoutTime = function () {
  const timerFunction = () => {
    const min = String(Math.floor(time / 60)).padStart(2, '0');
    const sec = String(Math.floor(time % 60)).padStart(2, '0');

    labelTimer.innerHTML = `${min}:${sec}`;
    if (time === 0) {
      clearInterval(timeInterval);
      logout();
    }
    time--;
  };

  timerFunction();
  const timeInterval = setInterval(timerFunction, 1000);
};

const logout = function () {
  sessionStorage.setItem('login', false);
  sessionStorage.removeItem('currentAccount');
  labelWelcome.textContent = `Log in to get started`;
  containerApp.style.opacity = 0;
};

const formatMovementDate = function (date, locale) {
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

  const daysPassed = calcDaysPassed(new Date(), new Date(date));
  if (daysPassed === 0) return 'Today';
  if (daysPassed === 1) return 'Yesterday';
  if (daysPassed <= 7) return `${daysPassed} days ago`;

  return new Intl.DateTimeFormat(locale).format(new Date(date));
};

const currencyFormatter = (currencyType, locale, amount) =>
  new Intl.NumberFormat(locale, { style: 'currency', currency: currencyType }).format(amount);

export { loginUser, transferAmount, loanSuccessful, sort, closeAccount };
