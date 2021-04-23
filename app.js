// Selectors
let depositAmount = document.querySelector('.deposit-amount');
let withdrawAmount = document.querySelector('.withdraw-amount');
let currentAmount = document.querySelector('.current-amount');
let historyUl = document.querySelector('.history ul');

let depositInput = document.querySelector('.deposit-input');
let withdrawInput = document.querySelector('.withdraw-input');
let submitDeposit = document.querySelector('.deposit-form');
let submitWithdraw = document.querySelector('.withdraw-form');

let historyFilter = document.querySelector('.history-filter');

// Dummy Transation
let dummyTrans = [
  { trxid: randomTrxId(), text: 'Deposit', amount: 1000 },
  { trxid: randomTrxId(), text: 'Withdraw', amount: -500 },
];

// Main Transactions
let transactions = dummyTrans;

// Deposit Money
function depositMoney(e) {
  e.preventDefault();

  if (depositInput.value.trim() === '') {
    alert('Please set a amount');
  } else if (Number(depositInput.value) <= 0) {
    alert('Negative number or 0 is not allowed');
  } else {
    let transaction = {
      trxid: randomTrxId(),
      text: 'Deposit',
      amount: Number(depositInput.value),
    };
    transactions.push(transaction);
    // Update DOM
    addHistoryItem(transaction);
    updateBalance(transaction);
    depositInput.value = '';
  }
}

// Withdraw Money
function withdrawMoney(e) {
  e.preventDefault();

  if (withdrawInput.value.trim() === '') {
    alert('Please set a amount');
  } else if (Number(withdrawInput.value) <= 0) {
    alert('Negative number or 0 is not allowed');
  } else {
    let transaction = {
      trxid: randomTrxId(),
      text: 'Withdraw',
      amount: Number('-' + withdrawInput.value),
    };
    transactions.push(transaction);
    // Update DOM
    addHistoryItem(transaction);
    updateBalance(transaction);
    withdrawInput.value = '';
  }
}

// Random Trx ID
function randomTrxId() {
  return `TrxID${Math.floor(Math.random() * 10000000000)}`;
}

// Number With Commas Function
function numberWithCommas(num) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}

// Add History Item
function addHistoryItem(transaction) {
  let sign = transaction.amount < 0 ? '-' : '+';

  let historyItem = document.createElement('li');
  historyItem.classList.add(
    'history-item',
    'text-white',
    'p-2',
    'my-3',
    'rounded'
  );
  historyItem.classList.add(transaction.amount < 0 ? 'minus' : 'plus');
  historyItem.innerHTML = `
  <span>${transaction.text}</span>
  <span class="float-end">$${numberWithCommas(
    Number(Math.abs(transaction.amount)).toFixed(2)
  )}</span>
  <span class="d-block w-100 trxid">${transaction.trxid}</span>`;
  historyUl.appendChild(historyItem);
}

// Update Balance
function updateBalance() {
  let amounts = transactions.map((transaction) => transaction.amount);
  // Get Current Amount
  currentAmountVal = amounts.reduce((acc, item) => acc + item, 0);
  currentAmount.innerHTML = `$${Number(currentAmountVal).toFixed(2)}`;
  // Get Deposit Amount
  let depositAmountVal = amounts
    .filter((amount) => amount > 0)
    .reduce((acc, item) => acc + item, 0);
  depositAmount.innerHTML = `$${Number(depositAmountVal).toFixed(2)}`;
  // Get Withdraw Amount
  let withdrawAmountVal = amounts
    .filter((amount) => amount < 0)
    .reduce((acc, item) => acc + item, 0);
  withdrawAmount.innerHTML = `$${Number(Math.abs(withdrawAmountVal)).toFixed(
    2
  )}`;
}

// Init
function init() {
  historyUl.innerHTML = '';
  transactions.forEach(addHistoryItem);
  updateBalance();
}

init();

// Deposit Money
submitDeposit.addEventListener('submit', depositMoney);

// Withdraw Money
submitWithdraw.addEventListener('submit', withdrawMoney);

// Hoistory Filter
historyFilter.addEventListener('keyup', historyFilterFunc);
function historyFilterFunc(e) {
  let filterText = historyFilter.value.trim().toLowerCase();
  let items = historyUl.getElementsByTagName('li');
  Array.from(items).forEach(function (item) {
    let itemText = item.textContent.toLowerCase();
    if (itemText.indexOf(filterText) != -1) {
      item.style = 'display: block !important';
    } else {
      item.style = 'display: none !important';
    }
  });
}
