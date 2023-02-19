const incomeBtn = document.getElementById("income-btn");
const expenseBtn = document.getElementById("expense-btn");
const incomeList = document.getElementById("income-list");
const expenseList = document.getElementById("expense-list");
const finalIncome = document.getElementById("income-total");
const finalExpense = document.getElementById("expense-total");
const totalBalance = document.getElementById("balance");
const clearBtn = document.getElementById("clear");


// Set the totals to 0
let totalIncome = [];
let totalExpense = [];
let finalIncomeInfo = [];
let finalIncomeAmount = []
let finalExpenseInfo = [];
let finalExpenseAmount = [];


// Income Event Listener
incomeBtn.addEventListener("click", function (event) {
    // Prevent form from submitting
    event.preventDefault();

    

    const incomeInformation = document.getElementById("income-info").value;
    const incomeAmount = document.getElementById("income-amount").value;


    // if income input is empty or less than or equals to 0 or is not a number then exit the function
    if(incomeInformation.trim() === '' || incomeAmount <= 0 || isNaN(incomeAmount)) {
        return;
    } 

    const incomeItem = document.createElement('li');
    incomeItem.innerHTML = `
        <div class="flex justify-between">
            ${incomeInformation} <span class="float-right font-weight-bold">${incomeAmount}</span>
    `;

    incomeList.appendChild(incomeItem);


    //Assign the totalIncome to the value inputed in the income amount section then display th
    totalIncome.push(parseInt(incomeAmount, 10));
    // totalIncome = totalIncome.slice(-12);
    // finalIncome.textContent = totalIncome.join(', ');

    if (totalIncome.length > 12) {
        totalIncome = totalIncome.slice(-12);

        // Calculate the difference between the current length and 12
        const difference = totalIncome.length - 12;

        totalIncome[0] = totalIncome[0] - difference;
    }

    finalIncome.textContent = totalIncome.join("")
    updateBalance();

    incomeForm.reset();
});

// Expense Event Listener 
expenseBtn.addEventListener("click", (event) => {
    event.preventDefault();

    const expenseInformation = document.getElementById("expense-info").value;
    const expenseAmount = parseInt(document.getElementById("expense-amount").value);

    if(expenseInformation.trim() === '' || expenseAmount <= 0 || isNaN(expenseAmount)) {
        return;
    }

    const expenseItem = document.createElement("li");
    expenseItem.innerHTML = `
        <div class="flex justify-between">
            ${expenseInformation} <span class="float-right font-weight-bold">${expenseAmount}</span>
        </div>
    `;

    expenseList.appendChild(expenseItem)

    
    totalExpense = [...totalExpense, parseInt(expenseAmount, 10)].slice(-9);
    finalExpense.textContent = totalExpense.join(',');

    updateBalance();

    expenseBtn.reset();

});

// Balance Update
function updateBalance() {

    const currentBalance = parseInt(totalIncome, 10)  - parseInt(totalExpense, 10);
    totalBalance.textContent = `$ ${parseInt(currentBalance, 10)}`;

    if (currentBalance < 0) {
        totalBalance.classList.add('text-red-600');
    } else {
        totalBalance.classList.remove('text-red-600');
    }
    
    totalBalance.textContent = isNaN(totalIncome) || isNaN(totalExpense)
    ? 0 : parseInt(totalIncome, 10) - parseInt(totalExpense, 10) 
    saveData();
}


// Localstorage
function saveData() {
    localStorage.setItem('income', JSON.stringify(totalIncome));
    localStorage.setItem('expense', JSON.stringify(totalExpense));
    localStorage.setItem('balance', JSON.stringify(totalBalance.textContent));
}

function getData() {
    const savedIncome = localStorage.getItem('income');
    const savedExpense = localStorage.getItem('expense');
    const savedBalance = localStorage.getItem('balance');
    
    if(savedIncome) {
        totalIncome = JSON.parse(savedIncome);
        finalIncome.textContent = totalIncome;
    }

    if(savedExpense) {
        totalExpense = JSON.parse(savedExpense);
        finalExpense.textContent = totalExpense;
    }

    if(savedBalance) {
        balance.textContent = savedBalance;
    }
}


// Clear th=e localstorage
function clearStorage() {
    localStorage.clear();
    totalIncome = 0;
    totalExpense = 0;
    finalIncome.textContent = 0;
    finalExpense.textContent = 0;
    balance.textContent = 0;
};

// Erase data from localstorage
clearBtn.addEventListener("click", clearStorage);


getData();