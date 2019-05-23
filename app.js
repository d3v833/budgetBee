// *******Budget Controller******* //
const budgetController = (function () {
  //TODO add functionality
})();

// *******UI Controller******* //
const UIController = (function () {
  return {
    getInput: function () {
      return {
        type: document.querySelector('.add__type').value, //will be either income or expense
        description: document.querySelector('.add__description').value,
        value: document.querySelector('.add__value').value
      };
    }
  };
})();

// *******Global App Controller******* //
const controller = (function (budgetCtrl, UICtrl) {
  const ctrlAddItem = function () {
    // TODO 1. Get the field input data
    let input = UICtrl.getInput();
    console.log(input);
    // TODO 2. Add item to budget contorller
    // TODO 3. Add the item to the UI
    // TODO 4. Calculate the budget
    // TODO 5. Display the budget of the UI
  };

  document.querySelector('.add__btn').addEventListener('click', ctrlAddItem);
  // NOTES: 'e' for events
  document.addEventListener('keypress', function (e) {
    if (e.keyCode === 13 || e.which === 13) {
      ctrlAddItem()
    }
  });

})(budgetController, UIController);
