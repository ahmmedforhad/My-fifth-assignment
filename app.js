const search = document.getElementById('search');
const submit = document.getElementById('submit');
const meals = document.getElementById('meals');
const resultHeading = document.getElementById('result-heading');
const single_mealEl = document.getElementById('single-meal');

// search meal and fetch from api
function searchMeal(e) {
    e.preventDefault();

    // clear single meal
    single_mealEl.innerHTML = '';
    // get search term
    const term = search.value;
    // check for empty
    if (term.trim()) {
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
            .then(res => res.json())
            .then(data => {
                resultHeading.innerHTML = `<h2>Search result for '${term}:'</h2>`
                if (data.meals === null) {
                    resultHeading.innerHTML = `<p>There are no search results. Try again!</p>`

                } else {
                    meals.innerHTML = data.meals.map(meal => `
                <div class = "meal">
                    <img src = "${meal.strMealThumb}" alt = "${meal.strMeal}">
                    <div  class= "meal-info" data-mealId= "${meal.idMeal}">
                        <h3 >${meal.strMeal}</h3>
                    </div> 
                </div>`)
                .join('');
                }
            });
        // clear search text 
        search.value = '';
    } else {
        alert('Please Enter a Meal name');

    }

}
submit.addEventListener('submit', searchMeal)


function displayIngredients() {
    const displayIngredient = document.getElementById('ingredient');
    displayIngredients.value = mealId;
    displayIngredient.addEventListener('click', function () {

        newIngredients();
    })

function newIngredients(){
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
    .then(response => response.json())
    .then(data => {
        const newData = data.meals
        newData.forEach(index => {
            const pop = document.querySelector('.popup')
            pop.innerHTML = `
        <h1> Name: ${index.strMeal}</h1>
        <h6>Ingredient1: ${index.strIngredient1}</h6>
        <h6>Ingredient2: ${index.strIngredient2}</h6>
        <h6>Ingredient3: ${index.strIngredient3}</h6>
        <h6>Ingredient4: ${index.strIngredient4}</h6>
        <h6>Country Name: ${index.strArea}</h6>`
        })
    })
}
}
