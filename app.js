const container = document.querySelector(".container");
const screen = document.querySelector(".screen");
const leftPanel = document.querySelector(".leftPanel");
const rightPanel = document.querySelector(".rightPanel");

let isVerifying,
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
  } else {
    // screen.textContent = "Insert Card and Click START to begin";
  }
};

function clearScreen() {
  screen.textContent = "";
  screen.textContent = "What would you like to do next?";
  numPadActive = false;
}

// // container.addEventListener("click", (e) => {
// //   screen.textContent = "";
// //   verify(e);
// //   if (!isVerifying && !verifying) {
// //     screen.textContent = "";
// //     verifying = true;
// //     verify(e);
// //   } else if (!isVerifying) {
// //     verify(e);
// //   }
// // });

function verify(e) {
  screen.textContent = "Enter PIN: ";
  isVerifying = true;
  numPadActive = true;
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
  } else {
    screen.textContent = `Invalid PIN, press START to try again or press EXIT to leave.`;
    numPadActive = false;
  }
}

function showBalance() {
  leftPanel.style.display = "block";
  rightPanel.style.display = "block";
  screen.textContent = `Hello ${account.salu} ${account.lname}. What would you like to do next?`;
}

function exit() {
  screen.textContent = `Thank you for using Casino Jack's ATM.`;
  leftPanel.style.display = "none";
  rightPanel.style.display = "none";
  isVerifying = false;
  pinCheck = false;
  numPadActive = false;
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
