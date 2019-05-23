// *******Budget Controller******* //
const budgetController = (function () {
  //TODO add functionality
})();

// *******UI Controller******* //
const UIController = (function () {

  const DOMstrings = {
    inputType: '.add__type',
    inputDescription: '.add__description',
    inputValue: '.add__value',
    inputBtn: '.add__btn'
  }
  return {
    getInput: function () {
      return {
        type: document.querySelector(DOMstrings.inputType).value, //will be either income or expense
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: document.querySelector(DOMstrings.inputValue).value
      };
    },

    getDOMstrings: function () {
      return DOMstrings;
    }
  };
})();

// *******Global App Controller******* //
const controller = (function (budgetCtrl, UICtrl) {

  const setupEventListeners = function () {
    const DOM = UICtrl.getDOMstrings();
    document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);
    // NOTES: 'e' for events
    document.addEventListener('keypress', function (e) {
      if (e.keyCode === 13 || e.which === 13) {
        ctrlAddItem()
      }
    });
  };

  const ctrlAddItem = function () {
    let input = UICtrl.getInput();
    console.log(input);
    // TODO 2. Add item to budget contorller
    // TODO 3. Add the item to the UI
    // TODO 4. Calculate the budget
    // TODO 5. Display the budget of the UI
  };
  return {
    init: function () {
      console.log('Application has started.')
      setupEventListeners();
    }
  }
})(budgetController, UIController);

controller.init();
