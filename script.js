// ========================================
// SpendWise - JavaScript Foundation
// ========================================

// 1. Store application data

let monthlyBudget = 30000;
let totalExpenses = 16550;
let remainingBalance = 0;


// 2. Function to calculate remaining balance

function calculateRemainingBalance(budget, expenses) {
    return budget - expenses;
}


// 3. Function to display budget information

function displayBudgetSummary(budget, expenses) {
    let remaining = calculateRemainingBalance(budget, expenses);

    console.log("========== SpendWise Budget Summary ==========");
    console.log("Monthly Budget: KSh " + budget);
    console.log("Total Expenses: KSh " + expenses);
    console.log("Remaining Balance: KSh " + remaining);
    console.log("==============================================");
}


// 4. Collect user input

let userBudget = prompt("Enter your monthly budget:");

if (userBudget !== null && userBudget !== "") {
    let budgetInput = Number(userBudget);

    if (!isNaN(budgetInput) && budgetInput >= 0) {
        monthlyBudget = budgetInput;
    }
}


let userExpenses = prompt("Enter your total expenses:");

if (userExpenses !== null && userExpenses !== "") {
    let expenseInput = Number(userExpenses);

    if (!isNaN(expenseInput) && expenseInput >= 0) {
        totalExpenses = expenseInput;
    }
}


// 5. Perform budget calculation

remainingBalance = calculateRemainingBalance(
    monthlyBudget,
    totalExpenses
);


// 6. Display results in the browser console

displayBudgetSummary(monthlyBudget, totalExpenses);

console.log(
    "Calculated Remaining Balance: KSh " + remainingBalance
);

// 7. Update the dashboard

document.getElementById("spentAmount").textContent =
    "KSh " + totalExpenses;

document.getElementById("remainingAmount").textContent =
    "KSh " + remainingBalance;

    // 8. Calculate and display budget percentage

let budgetPercentage = 0;

if (monthlyBudget > 0) {
    budgetPercentage = (totalExpenses / monthlyBudget) * 100;
}

document.getElementById("budgetPercentage").textContent =
    Math.round(budgetPercentage) + "%";