const express = require('express');
const dotenv = require('dotenv').config({ path: '.env' });
const bcrypt = require('bcrypt');
let users = require('./public/javascripts/users');
let userTransactionSorted;

const app = express();

app.use('/public', express.static(__dirname + '/public/'));
app.use(express.json());

app.get('/', async (req, res) => {
  securePassword();
  userTransactionSorted = false;
  res.sendFile(__dirname + '/index.html');
});

app.post('/login', function (req, res) {
  const currentUser = users.find(user => user.username === req.body.userName);
  bcrypt.compare(String(req.body.pin), currentUser.pin, function (err, result) {
    res.json(result ? currentUser : {});
  });
});

app.post('/transfer', function (req, res) {
  const { transferTo, receiverAmount, currentUsername } = req.body;
  const currentUser = users.find(user => user.username === currentUsername);
  const receiverAccount = users.find(
    user => user.username === transferTo && user.username !== currentUser.username
  );
  if (
    receiverAccount &&
    receiverAccount.balance > 0 &&
    currentUser.balance >= Number(receiverAmount)
  ) {
    receiverAccount.transactions.push(Number(receiverAmount));
    receiverAccount.transactionDates.push(new Date().toISOString());
    currentUser.transactions.push(-Number(receiverAmount));
    currentUser.transactionDates.push(new Date().toISOString());
    calculateBalanceAndStore();
    res.json(currentUser);
  }
});

app.post('/loan', function (req, res) {
  const { loanAmount, currentUsername } = req.body;
  const currentUser = users.find(user => user.username === currentUsername);
  if (
    loanAmount > 0 &&
    currentUser.transactions.some(trans => trans >= loanAmount * currentUser.interestRate)
  ) {
    currentUser.transactions.push(Number(loanAmount));
    currentUser.transactionDates.push(new Date().toISOString());
    calculateBalanceAndStore();
    res.json(currentUser);
  }
});

app.post('/sort', function (req, res) {
  const { sort, currentUsername } = req.body;
  userTransactionSorted = sort;
  const currentUser = users.find(user => user.username === currentUsername);

  const arr = currentUser.transactions
    .map((trans, index) => [trans, currentUser.transactionDates[index]])
    .sort((a, b) => b[0] - a[0]);

  currentUser.transactions = arr.map(val => val[0]);
  currentUser.transactionDates = arr.map(val => val[1]);
  currentUser.sorted = userTransactionSorted;
  res.json(currentUser);
});

app.post('/accountClose', function (req, res) {
  const accountClosingUser = users.find(user => user.username === req.body.userName);
  if (accountClosingUser) {
    bcrypt.compare(String(req.body.pin), currentUser.pin, function (err, result) {
      if (result) {
        const index = accounts.findIndex(acc => acc.username === accountClosingUser.username);
        accounts.splice(index, 1);
      }
      res.json(accountClosingUser);
    });
  } else {
    res.json({});
  }
});

app.get('/calculateBalance', function (req, res) {
  calculateBalanceAndStore();
  res.status(200).send('Balance successfully save');
});

app.listen(process.env.PORT, function () {
  console.log(`Server is listening on port ${process.env.PORT || 3000}. `);
});

// Salt and Hash Password
const securePassword = async function () {
  const saltRounds = 10;
  bcrypt.genSalt(saltRounds, function (err, salt) {
    if (!err) {
      bcrypt.hash('user_password', salt, function (err, hash) {
        if (!err) return;
      });
    }
  });
};

const calculateBalanceAndStore = function () {
  users = users.map(user => {
    user.balance = user.transactions.reduce((acc, cur) => acc + cur, 0);
    return user;
  });
};
