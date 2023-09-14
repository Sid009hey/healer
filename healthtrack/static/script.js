let expenses = [];
let totalAmount = 0;

const categorySelect = document.getElementById('category-select');
const amountInput = document.getElementById('amount-input');
const dateInput = document.getElementById('date-input');
const addBtn = document.getElementById('add-btn');
const expensesTableBody = document.getElementById('expnese-table-body');
const totalAmountCell = document.getElementById('total-amount');

// Function to update the expenses table
function updateExpensesTable() {
  // Clear the table body before updating
  expensesTableBody.innerHTML = '';

  expenses.forEach((expense, index) => {
    const newRow = expensesTableBody.insertRow();

    const categoryCell = newRow.insertCell();
    categoryCell.textContent = expense.category;

    const amountCell = newRow.insertCell();
    amountCell.textContent = expense.amount.toFixed(2);

    const dateCell = newRow.insertCell();
    dateCell.textContent = expense.date;

    const deleteCell = newRow.insertCell();
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.addEventListener('click', function() {
      expenses.splice(index, 1);
      totalAmount -= expense.amount;
      totalAmountCell.textContent = totalAmount;
      expensesTableBody.removeChild(newRow);
    });
    deleteCell.appendChild(deleteBtn);
  });

  totalAmountCell.textContent = totalAmount.toFixed(2);
}

// Function to validate and add an expense when the "Add" button is clicked
addBtn.addEventListener('click', function() {
  const category = categorySelect.value;
  const amount = Number(amountInput.value);
  const date = dateInput.value;

  if (category === '') {
    alert('Please select a category');
    return;
  }
  if (isNaN(amount) || amount <= 0) {
    alert('Please enter a valid amount');
    return;
  }
  if (date === '') {
    alert('Please select a date');
    return;
  }

  expenses.push({ category, amount, date });
  totalAmount += amount;
  updateExpensesTable();

  // Clear the input fields after adding the expense
  categorySelect.value = '';
  amountInput.value = '';
  dateInput.value = '';
});

// Load existing expenses from the "expenses" array when the page loads
window.addEventListener('load', function() {
  updateExpensesTable();
});
	
// Function to save expenses to localStorage
function saveExpensesToLocalStorage() {
  localStorage.setItem('expenses', JSON.stringify(expenses));
}

// Function to load expenses from localStorage
function loadExpensesFromLocalStorage() {
  const storedExpenses = localStorage.getItem('expenses');
  if (storedExpenses) {
    expenses = JSON.parse(storedExpenses);
    // Recalculate totalAmount from loaded expenses
    totalAmount = expenses.reduce((total, expense) => total + expense.amount, 0);
  }
}

// Add an event listener to the window "beforeunload" event to save expenses to localStorage
window.addEventListener('beforeunload', function () {
  saveExpensesToLocalStorage();
});

// Add an event listener to the window "load" event to load expenses from localStorage
window.addEventListener('load', function () {
  loadExpensesFromLocalStorage();
  updateExpensesTable();
});
