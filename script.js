
// ============================================
// SPENDWISE - WEEK 6 INTERACTIVE BUDGET APP
// ============================================

// 1. MONTHLY BUDGET
const monthlyBudget = 30000;

// 2. EXPENSE ARRAY
let expenses = [];

// 3. SELECT HTML ELEMENTS
const expenseForm = document.getElementById("expenseForm");
const expenseName = document.getElementById("expenseName");
const expenseAmount = document.getElementById("expenseAmount");

const transactionList = document.getElementById("transactionList");

const monthlyExpenses = document.getElementById("monthlyExpenses");
const spentAmount = document.getElementById("spentAmount");
const remainingAmount = document.getElementById("remainingAmount");

const budgetPercentage = document.getElementById("budgetPercentage");
const budgetMessage = document.getElementById("budgetMessage");
const formMessage = document.getElementById("formMessage");

const clearExpensesButton = document.getElementById("clearExpenses");

// ============================================
// 4. ADD NEW EXPENSE - EVENT LISTENER
// ============================================

expenseForm.addEventListener("submit", function(event) {

    // Prevent page refresh
    event.preventDefault();

    const name = expenseName.value.trim();
    const amount = Number(expenseAmount.value);

    // Validate user input using conditionals
    if (name === "" || !Number.isFinite(amount) || amount <= 0) {

        formMessage.textContent =
            "Please enter a valid expense name and amount.";

        return;
    }

    // Create expense object
    const expense = {
        id: Date.now() + Math.random(),
        name: name,
        amount: amount
    };

    // Store expense in array
    expenses.push(expense);

    // Clear input fields
    expenseForm.reset();

    // Update dashboard
    updateDashboard();

    formMessage.textContent = "Expense added successfully!";
});

// ============================================
// 5. UPDATE DASHBOARD
// ============================================

function updateDashboard() {

    let total = 0;

    // Clear existing transactions
    transactionList.innerHTML = "";

    // Loop through expense array
    for (let i = 0; i < expenses.length; i++) {

        total += expenses[i].amount;

        // Create transaction container
        const transaction = document.createElement("div");
        transaction.classList.add("transaction");

        // Create icon
        const icon = document.createElement("div");
        icon.classList.add("transaction-icon");
        icon.textContent = "💸";

        // Create expense details
        const details = document.createElement("div");
        details.classList.add("transaction-details");

        const name = document.createElement("strong");
        name.textContent = expenses[i].name;

        const description = document.createElement("span");
        description.textContent = "Expense recorded";

        details.appendChild(name);
        details.appendChild(description);

        // Create amount
        const amount = document.createElement("strong");
        amount.classList.add("expense");
        amount.textContent =
            "- KSh " + expenses[i].amount.toLocaleString();

        // Create delete button
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.classList.add("delete-expense");

        // Capture the current expense ID
const expenseId = expenses[i].id;

// Delete individual expense
deleteButton.addEventListener("click", function() {

    expenses = expenses.filter(function(item) {
        return item.id !== expenseId;
    });

    formMessage.textContent =
        "Expense deleted successfully.";

    updateDashboard();
});

        // Assemble transaction
        transaction.appendChild(icon);
        transaction.appendChild(details);
        transaction.appendChild(amount);
        transaction.appendChild(deleteButton);

        // Display transaction
        transactionList.appendChild(transaction);
    }

    // ========================================
    // 6. CALCULATE BUDGET
    // ========================================

    const remaining = monthlyBudget - total;

    let percentage = (total / monthlyBudget) * 100;

    // Prevent negative progress percentage
    percentage = Math.max(0, Math.min(percentage, 100));

    // ========================================
    // 7. UPDATE DASHBOARD USING DOM
    // ========================================

    monthlyExpenses.textContent =
        "KSh " + total.toLocaleString();

    spentAmount.textContent =
        "KSh " + total.toLocaleString();

    remainingAmount.textContent =
        "KSh " + remaining.toLocaleString();

    budgetPercentage.textContent =
        Math.round(percentage) + "%";

    // ========================================
    // 8. CONDITIONAL BUDGET FEEDBACK
    // ========================================

    if (total === 0) {

        budgetMessage.textContent =
            "Add expenses to begin managing your budget.";

    } else if (total < monthlyBudget * 0.5) {

        budgetMessage.textContent =
            "Great! You are within a healthy budget.";

    } else if (total <= monthlyBudget * 0.8) {

        budgetMessage.textContent =
            "Good progress. Monitor your spending.";

    } else if (total <= monthlyBudget) {

        budgetMessage.textContent =
            "Warning! You are approaching your budget limit.";

    } else {

        budgetMessage.textContent =
            "Alert! You have exceeded your monthly budget.";
    }
}

// ============================================
// 9. CLEAR ALL EXPENSES
// ============================================

clearExpensesButton.addEventListener("click", function() {

    if (expenses.length === 0) {

        formMessage.textContent = "There are no expenses to clear.";

        return;
    }

    // Empty the array
    expenses = [];

    // Update dashboard
    updateDashboard();

    formMessage.textContent =
        "All expenses have been cleared.";
});

// ============================================
// 10. INITIAL DASHBOARD DISPLAY
// ============================================

updateDashboard();
