'use strict';

import { loginUser, transferAmount, loanSuccessful, sort, closeAccount } from './functions.js';

// Elements

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

let currentAccount;
let sorted = false;

/////////////////////////////////////////////////
////////////////////////////////////////////////
/////////////////////////////////////////////////

// Login Event Listener
btnLogin.addEventListener('click', async function (e) {
  e.preventDefault();

  const userName = inputLoginUsername.value;
  const pin = Number(inputLoginPin.value);

  fetch('/login', {
    method: 'POST',
    body: JSON.stringify({ userName, pin }),
    headers: { 'Content-Type': 'application/json' },
  })
    .then(async data => {
      currentAccount = await data.json();
      loginUser(currentAccount, inputLoginUsername, inputLoginPin);
    })
    .catch(err => {
      console.log(err);
    });
});

// Transfer Event Listener
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();

  const transferTo = inputTransferTo.value;
  const receiverAmount = inputTransferAmount.value;

  console.log(currentAccount);

  fetch('/transfer', {
    method: 'POST',
    body: JSON.stringify({
      transferTo,
      receiverAmount,
      currentUsername: currentAccount.username,
    }),
    headers: { 'Content-Type': 'application/json' },
  })
    .then(async data => {
      currentAccount = await data.json();
      transferAmount(currentAccount, inputTransferTo, inputTransferAmount);
    })
    .catch(err => {
      console.log(err);
    });
});

// Loan Event Listener
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const loanAmount = Math.floor(inputLoanAmount.value);
  fetch('/loan', {
    method: 'POST',
    body: JSON.stringify({
      loanAmount,
      currentUsername: currentAccount.username,
    }),
    headers: { 'Content-Type': 'application/json' },
  })
    .then(async data => {
      currentAccount = await data.json();
      loanSuccessful(currentAccount, inputLoanAmount);
    })
    .catch(err => {
      console.log(err);
    });
});

//Sort Event Listener
btnSort.addEventListener('click', function (e) {
  e.preventDefault();

  sorted = !sorted;

  fetch('/sort', {
    method: 'POST',
    body: JSON.stringify({
      sort: sorted,
      currentUsername: currentAccount.username,
    }),
    headers: { 'Content-Type': 'application/json' },
  })
    .then(async data => {
      currentAccount = await data.json();
      console.log(currentAccount, currentAccount.sorted);
      sort(currentAccount, currentAccount.sorted);
    })
    .catch(err => {
      console.log(err);
    });
});

// Close Account Event Listener
btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  const username = inputCloseUsername.value;
  const pin = Number(inputClosePin.value);

  fetch('/accountClose', {
    method: 'POST',
    body: JSON.stringify({
      username,
      pin,
    }),
    headers: { 'Content-Type': 'application/json' },
  })
    .then(async data => {
      currentAccount = await data.json();
      closeAccount(inputCloseUsername, inputClosePin);
    })
    .catch(err => {
      console.log(err);
    });
});

document.addEventListener('DOMContentLoaded', function () {
  if (sessionStorage.getItem('login') !== 'true') {
    fetch('/calculateBalance', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
  } else {
    currentAccount = JSON.parse(sessionStorage.getItem('currentAccount'));
    loginUser(currentAccount, inputLoginUsername, inputLoginPin);
  }
});
