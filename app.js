// ******************************* //
// ******* Budget Controller ******* //
// ******************************* //

const budgetController = (function () {
  let Expense = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  let Income = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  let calculateTotal = function (type) {
    let sum = 0;
    data.allItems[type].forEach(function (c) {
      /* c for the current value */
      sum = sum + c.value;
    });
    data.totals[type] = sum;
  };

  let data = {
    allItems: {
      exp: [],
      inc: []
    },
    totals: {
      exp: 0,
      inc: 0
    },
    budget: 0,
    percentage: -1
  };

  return {
    addItem: function (type, des, val) {
      let newItem, ID;
      // Create new ID
      if (data.allItems[type].length > 0) {
        ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
      } else {
        ID = 0;
      }
      // Create new item based on 'inc' or 'exp' type
      if (type === "exp") {
        newItem = new Expense(ID, des, val);
      } else if (type === "inc") {
        newItem = new Income(ID, des, val);
      }
      // Pushes it to the data structure
      data.allItems[type].push(newItem);
      // Returns the new element
      return newItem;
    },

    calculateBudget: function () {
      // NOTES: 1. Calculate total income and expenses
      calculateTotal("exp");
      calculateTotal("inc");
      // NOTES: 2. Calculate the budget: income - expenses
      data.budget = data.totals.inc - data.totals.exp;
      // NOTES: 3. Calculate the percentage of income we spent
      if (data.totals.inc > 0) {
        data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
      } else {
        data.percentage = -1;
      }
    },

    getBudget: function () {
      return {
        budget: data.budget,
        totalInc: data.totals.inc,
        totalExp: data.totals.exp,
        percentage: data.percentage
      };
    },

    testing: function () {
      console.log(data);
    }
  };
})();

// *************************** //
// ******* UI Controller ******* //
// *************************** //

const UIController = (function () {
  let DOMstrings = {
    inputType: ".add__type",
    inputDescription: ".add__description",
    inputValue: ".add__value",
    inputBtn: ".add__btn",
    incomeContainer: ".income__list",
    expensesContainer: ".expenses__list",
    budgetLabel: ".budget__value",
    incomeLabel: ".budget__income--value",
    expensesLabel: ".budget__expenses--value",
    percentageLabel: ".budget__expenses--percentage"
  };

  return {
    getInput: function () {
      return {
        type: document.querySelector(DOMstrings.inputType).value, //will be either income or expense
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: parseFloat(document.querySelector(DOMstrings.inputValue).value)
      };
    },
    addListItem: function (obj, type) {
      let html, newHtml, element;
      // NOTES: 1 Create HTML string with placeholder text
      if (type === "inc") {
        element = DOMstrings.incomeContainer;
        html =
          "<div class='item clearfix' id='income-%id%'><div class='item__description'>%description%</div><div class='right clearfix'><div class='item__value'>%value%</div><div class='item__delete'><buttonclass='item__delete--btn'><i class='ion-ios-close-outline'></i></button></div></div></div>";
      } else if (type === "exp") {
        element = DOMstrings.expensesContainer;
        html =
          "<div class='item clearfix' id='expense-%id%'><div class='item__description'>%description%</div><div class='right clearfix'><div class='item__value'>%value%</div><div class='item__percentage'>21%</div><div class='item__delete'><button class='item__delete--btn'><i class='ion-ios-close-outline'></i></button></div></div></div>";
      }
      // NOTES: 2 Replace placeholder text with some actual data
      newHtml = html.replace("%id%", obj.id);
      newHtml = newHtml.replace("%description%", obj.description);
      newHtml = newHtml.replace("%value%", obj.value);

      // NOTES: 3 Insert HTML into the DOM - 'beforeend' makes everything a child
      document.querySelector(element).insertAdjacentHTML("beforeend", newHtml);
    },

    clearFields: function () {
      let fields, fieldsArr;

      fields = document.querySelectorAll(
        DOMstrings.inputDescription + ", " + DOMstrings.inputValue
      );

      fieldsArr = Array.prototype.slice.call(fields);

      fieldsArr.forEach(function (current, index, array) {
        current.value = "";
      });
      // NOTES sets focus back to the first field
      fieldsArr[0].focus();
    },

    displayBudget: function (obj) {
      document.querySelector(DOMstrings.budgetLabel).textContent = obj.budget;
      document.querySelector(DOMstrings.incomeLabel).textContent = obj.totalInc;
      document.querySelector(DOMstrings.expensesLabel).textContent =
        obj.totalExp;
      document.querySelector(DOMstrings.percentageLabel).textContent =
        obj.percentage;
    },

    getDOMstrings: function () {
      return DOMstrings;
    }
  };
})();

// ************************************ //
// ******* Global App Controller ******* //
// ************************************ //

const controller = (function (budgetCtrl, UICtrl) {
  let setupEventListeners = function () {
    let DOM = UICtrl.getDOMstrings();
    document.querySelector(DOM.inputBtn).addEventListener("click", ctrlAddItem);
    // NOTES: 'e' for events
    document.addEventListener("keypress", function (e) {
      if (e.keyCode === 13 || e.which === 13) {
        ctrlAddItem();
      }
    });
  };

  let updateBudget = function () {
    // TODO 1. Calculate the budget
    budgetCtrl.calculateBudget();
    // TODO 2. Return the budget
    let budget = budgetCtrl.getBudget();
    // TODO 3. Display the budget of the UI
    UICtrl.displayBudget(budget);
  };

  let ctrlAddItem = function () {
    let input, newItem;
    // NOTES: 1. Get the field input data
    input = UICtrl.getInput();
    if (input.description !== "" && !isNaN(input.value) && input.value > 0) {
      // NOTES: 2. Add item to budget contorller
      newItem = budgetCtrl.addItem(input.type, input.description, input.value);
      // NOTES: 3. Add the item to the UI
      UICtrl.addListItem(newItem, input.type);
      // NOTES: 4. To clear fields
      UICtrl.clearFields();
      // NOTES: 5. Calculate and update budget
      updateBudget();
    }
  };
  return {
    init: function () {
      console.log("Application has started.");
      UICtrl.displayBudget({
        budget: 0,
        totalInc: 0,
        totalExp: 0,
        percentage: -1
      });
      setupEventListeners();
    }
  };
})(budgetController, UIController);

controller.init();
