// main.js

// Run the init() function when the page has loaded
window.addEventListener("DOMContentLoaded", init);

// Starts the program, all function calls trace back here
function init() {
	// Get the recipes from localStorage
	let recipes = getRecipesFromStorage();
	// Add each recipe to the <main> element
	addRecipesToDocument(recipes);
	// Add the event listeners to the form elements
	initFormHandler();
}

/**
 * Reads 'recipes' from localStorage and returns an array of
 * all of the recipes found (parsed, not in string form). If
 * nothing is found in localStorage for 'recipes', an empty array
 * is returned.
 * @returns {Array<Object>} An array of recipes found in localStorage
 */
function getRecipesFromStorage() {
	// A9. Complete the functionality as described in this function
	//           header. It is possible in only a single line, but should
	//           be no more than a few lines.
	return JSON.parse(localStorage.getItem('recipes')) || [];
}

/**
 * Takes in an array of recipes and for each recipe creates a
 * new <recipe-card> element, adds the recipe data to that card
 * using element.data = {...}, and then appends that new recipe
 * to <main>
 * @param {Array<Object>} recipes An array of recipes
 */
function addRecipesToDocument(recipes) {
	// A10. Get a reference to the <main> element
	// A11. Loop through each of the recipes in the passed in array,
	//            create a <recipe-card> element for each one, and populate
	//            each <recipe-card> with that recipe data using element.data = ...
	//            Append each element to <main>

	const mainElement = document.querySelector('main');
	recipes.forEach(recipe => {
		const recipeCard = document.createElement('data-card');
		recipeCard.data = recipe;
		mainElement.appendChild(recipeCard);
	});
}

/**
 * Takes in an array of recipes, converts it to a string, and then
 * saves that string to 'recipes' in localStorage
 * @param {Array<Object>} recipes An array of recipes
 */
function saveRecipesToStorage(recipes) {
	// EXPLORE - START (All explore numbers start with B)
	// B1. Complete the functionality as described in this function
	//            header. It is possible in only a single line, but should
	//            be no more than a few lines.
	localStorage.setItem('recipes', JSON.stringify(recipes));
}

/**
 * Adds the necessary event handlers to <form> and the clear storage
 * <button>.
 */
function initFormHandler() {
	// B2. Get a reference to the <form> element
	// B3. Add an event listener for the 'submit' event, which fires when the
	//            submit button is clicked

	const form = document.querySelector('form');
	form.addEventListener('submit', function(event) { // might be wrong, need to get
		// B4. Create a new FormData object from the <form> element reference above
		// B5. Create an empty object (we'll refer to this object as recipeObject to
		//            make this easier to read), and then extract the keys and corresponding
		//            values from the FormData object and insert them into recipeObject
		// B6. Create a new <recipe-card> element
		// B7. Add the recipeObject data to <recipe-card> using element.data
		// B8. Append this new <recipe-card> to <main>
		// B9. Get the recipes array from localStorage, add this new recipe to it, and
		//            then save the recipes array back to localStorage
		const formData = new FormData(form);
		const recipeObject = {};
		formData.forEach((value, key) => {
			recipeObject[key] = value;
		});

		const recipeCard = document.createElement('data-card');
		recipeCard.data = recipeObject;
		
		const mainElement = document.querySelector('main');
		mainElement.appendChild(recipeCard);

		const recipeArray = JSON.parse(localStorage.getItem('recipes')) || [];
		recipeArray.push(recipeObject);
		saveRecipesToStorage(recipeArray);
		form.reset();
	});

	// B10. Get a reference to the "Clear Local Storage" button
	// B11. Add a click event listener to clear local storage button
	const clearButton = document.querySelector('.danger');
	clearButton.addEventListener('click', function(event) {
		// B12. Clear the local storage
		// B13. Delete the contents of <main>
		localStorage.clear();
		const mainElement = document.querySelector('main');
		mainElement.innerHTML = '';
	});
}
