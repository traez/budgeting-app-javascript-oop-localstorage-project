(function(){
 
    let budgetAmount = document.querySelector("#budget-amount");
    let budget = document.querySelector("#budget");
    let expenses = document.querySelector("#expenses");
    let balance = document.querySelector("#balance");
    let addBudget = document.querySelector("#add-budget");
    let expenseName = document.querySelector("#expense-name");
    let expenseAmount = document.querySelector("#expense-amount");
    let addExpense = document.querySelector("#add-expense");
    let aside = document.querySelector("aside");
    let expensesArr = [];
    let totalExpenses = 0; 
    let currentBalance = 0;
  
    const budgetAmountValue = {
      getValue: () => budgetAmount.value,
      storeValue: () => {
        const value = budgetAmountValue.getValue();
        localStorage.setItem("budgetAmountFig", value);
      }
    };
  
    addBudget.addEventListener("click", () => {
      budgetAmountValue.storeValue();
      budget.textContent = localStorage.getItem("budgetAmountFig");
    })
  
    class Expense {
      constructor(id, expenseName, expenseAmount) {
        this.id = id;
        this.expenseName = expenseName;
        this.expenseAmount = expenseAmount;
      }
    
      getExpense() {
        return {
          id: this.id,
          expenseName: this.expenseName,
          expenseAmount: this.expenseAmount
        };
      }
  
      addExpenseToList() {
        let expenseItem = new Expense(this.id, this.expenseName, this.expenseAmount);
        expensesArr.push(expenseItem.getExpense());
        localStorage.setItem("expensesArr", JSON.stringify(expensesArr));
      }
  
      displayExpense() {
        let expenseDiv = document.createElement("div");
        expenseDiv.classList.add("design");
        expenseDiv.innerHTML = `
          <div>${this.id} - ${this.expenseName} - ${this.expenseAmount}</div>
        `;
        aside.appendChild(expenseDiv);
      }

      updateTotalExpense() {
        totalExpenses += parseInt(expenseAmount.value);  
        expenses.textContent = totalExpenses;  
      }

      updateBalance() { 
        const value = budgetAmountValue.getValue();
        let bal = value - totalExpenses; 
        balance.textContent = bal;
      }

    }
    
    addExpense.addEventListener("click", () => {
        let id = Math.floor(Math.random()*1000);
        let expenseItem = new Expense(id, expenseName.value, expenseAmount.value);

        expenseItem.addExpenseToList();
        expenseItem.displayExpense();
        expenseItem.updateTotalExpense();
        expenseItem.updateBalance();
  
    });

   
    
  
  })();