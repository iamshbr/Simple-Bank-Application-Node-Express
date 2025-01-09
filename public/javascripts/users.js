const account1 = {
  owner: 'John Cena',
  transactions: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: '$2b$10$3EBCKQamN693WMk9EE5JP.C9rFNXmbR3.AhTp.Tk.aQnDtE4m3jv.',
  username: 'jc',
  transactionDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2020-07-12T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT',
};

const account2 = {
  owner: 'Shawn Michael',
  transactions: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: '$2b$10$uON86ok811/M0sHq/vxcJ.dfzhheSRhtXgZwdfQuLzqql9jBTIRHW',
  username: 'sm',
  transactionDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2020-07-12T10:51:36.790Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const account3 = {
  owner: 'Dwayne Rock Johnson',
  transactions: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: '$2b$10$6FyKDUU9yv58FX7jZLpZvuAitO2IdKfr5GMNyKFoIuFHj7q.B6.r2',
  username: 'drj',
  transactionDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2020-07-12T10:51:36.790Z',
  ],
  currency: 'PKR',
  locale: 'en-PK',
};

const account4 = {
  owner: 'Bill Goldberg',
  transactions: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: '$2b$10$03ZKaZEB8BZIGs58Umyir.3lp5T6AcFwX.y4Y7XbhyF2a8yHyYqfO',
  username: 'bg',
  transactionDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2020-07-12T10:51:36.790Z',
  ],
  currency: 'AUD',
  locale: 'en-AU',
};

const accounts = [account1, account2, account3, account4];

module.exports = accounts;
