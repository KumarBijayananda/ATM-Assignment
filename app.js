const container = document.querySelector(".container");
const screen = document.querySelector(".screen");
const leftPanel = document.querySelector(".leftPanel");
const rightPanel = document.querySelector(".rightPanel");

let isVerifying,
  isVerified,
  isWithdraw,
  pinCheck,
  numPadActive,
  isChangePin,
  isDeposit = false;

let amount = 0.0;

const account = {
  fname: "John",
  lname: "Smith",
  salu: "Mr.",
  pinNumber: "1234",
  checking: 100.0,
};

leftPanel.style.display = "none";
rightPanel.style.display = "none";
screen.textContent = "Insert Card and Click START to begin";

const getValue = (evt) => {
  if (numPadActive) {
    screen.append(evt.target.textContent);
  }
};

//this function should only work when not verified
function verify(e) {
  if (!isVerifying) {
    screen.textContent = "Enter PIN: ";
    isVerifying = true;
    numPadActive = true;
    clearTimeout(setTimeout);
  }
}

function enter() {
  if (isVerifying) {
    verifyPin();
  } else if (isWithdraw) {
    amount = screen.textContent.substring(31);
    withdraw(amount);
  } else if (isDeposit) {
    amount = screen.textContent.substring(39);
    withdraw(-amount);
  } else if (isChangePin) {
    account.pinNumber = screen.textContent.substring(15);
    screen.textContent = "PIN changed. What would you like to do next?";
  }

  isWithdraw = false;
  isDeposit = false;
  isVerifying = false;
  pinCheck = false;
  isChangePin = false;
  numPadActive = false;
}

function verifyPin() {
  pinCheck = true;
  let pin = screen.textContent.substring(11);
  if (pin === account.pinNumber) {
    showBalance();
    isVerified = true;
    isVerifying = false;
  } else {
    screen.textContent = `Invalid PIN, press START to try again or press EXIT to leave.`;
    numPadActive = false;
  }
}

// Functions that should only work when already signed in below
function clearScreen() {
  if (isVerified) {
    screen.textContent = "";
    screen.textContent = "What would you like to do next?";
    numPadActive = false;
  }
}

function showBalance() {
  leftPanel.style.display = "block";
  rightPanel.style.display = "block";
  screen.textContent = `Hello ${account.salu} ${account.lname}. What would you like to do next?`;
}

function exit() {
  if (isVerified) {
    screen.textContent = `Thank you for using Casino Jack's ATM.`;
    leftPanel.style.display = "none";
    rightPanel.style.display = "none";
    isVerifying = false;
    pinCheck = false;
    numPadActive = false;
    isVerified = false;
    setTimeout(reset, 3000);
  } else {
    screen.textContent = `You haven't logged in yet!`;
    setTimeout(reset, 1000);
  }
}

function withdrawOther() {
  numPadActive = true;
  screen.textContent = "Enter Amount and press Enter: $";
  isWithdraw = true;
}
function withdraw(amount) {
  if (amount <= account.checking) {
    account.checking -= amount;
    screen.textContent = `Your new balance is $${account.checking}. What would you like to do next?`;
  } else {
    screen.textContent =
      "You do not have enough money in your account, please try a different amount.";
  }
}
function deposit() {
  isDeposit = true;
  numPadActive = true;
  screen.textContent = "Enter Deposit Amount and press Enter: $";
}
function changePIN() {
  isChangePin = true;
  numPadActive = true;
  screen.textContent = "Enter New PIN: ";
}

function checkBalance() {
  screen.textContent = `Your account balance is: $${account.checking}. What would you like do next?`;
}

function reset() {
  screen.textContent = "Insert Card and Click START to begin";
}

function blackJack() {
  screen.textContent = "Blackjack coming soon...";
}
