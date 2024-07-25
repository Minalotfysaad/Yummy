// Functions
$(document).ready(function () {
    //Loader
    function hideLoader() {
        $(document).ready(function () {
            $("#innerLoader .loader").fadeOut(500, function () {
                $("#innerLoader").fadeOut(0, function () {
                    $("#loader").remove();
                    $("body").css("overflow", "auto");
                });
            });
        });
    }

    async function getRecipeById(id) {
        try {
            var response = await fetch(
                `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
            );
            var data = await response.json();
            displayDetails(data);
        } catch (error) {
            // Handle error
        }
    }

    function displayDetails(data) {
        var ingredientsHTML = "";
        for (let i = 1; i <= 30; i++) {
            if (data.meals[0][`strIngredient${i}`]) {
                ingredientsHTML += `<li class="me-2">${data.meals[0][`strMeasure${i}`]} ${data.meals[0][`strIngredient${i}`]}</li>`;
            } else {
                break;
            }
        }
        var tagsHTML = "";
        if (data.meals[0].strTags) {
            const tagsArray = data.meals[0].strTags.split(",");
            tagsHTML = tagsArray
                .map((tag) => `<li class="me-2">${tag.trim()}</li>`)
                .join("");
        }
        var content = `
        <div class="col-md-4">
            <div class="image">
                <img class="w-100 rounded-2" src="${data.meals[0].strMealThumb}" alt="">
            </div>
            <h3 class="text-center mt-5 fw-bolder ">${data.meals[0].strMeal}</h3>
            <div class="buttons d-flex flex-column justify-content-center align-items-center mt-4 mb-5">
                <a href="${data.meals[0].strYoutube}" target="_blank" class="custom-reset"><button class="btn rounded-3 mt-3"><i
                        class="fa-brands fa-youtube me-3"></i>Watch on YouTube</button></a>
                <a href="${data.meals[0].strSource}" target="_blank" class="custom-reset"><button class="btn rounded-3 mt-3"><i class="fa-solid fa-arrow-up-right-from-square me-3"></i></i>Source</button></a>
            </div>
        </div>
        <div class="col-md-8">
            <h4 class="fw-bolder">Instructions: </h4>
            <p>${data.meals[0].strInstructions}</p>
            <h5 class="mt-3 fw-bolder">Area: <span class="fw-normal">${data.meals[0].strArea}</span></h5>
            <h5 class="mt-3 fw-bolder">Category: <span class="fw-normal">${data.meals[0].strCategory}</span></h5>
            <h5 class="mt-3 fw-bolder">Ingredients: </h5>
            <ul class="ingredients list-unstyled d-flex p-3 flex-wrap">
            ${ingredientsHTML}
            </ul>
            <div class="tags-box d-flex align-items-center">
                <h5 class=" fw-bolder">Tags: </h5>
                <ul class="tags list-unstyled d-flex p-3 flex-wrap">
                    ${tagsHTML}
            </div>
            </ul>
        </div>`;
        document.getElementById("rowDetails").innerHTML = content;
        hideLoader();
    }

    // Get recipe ID from URL
    function getRecipeIdFromUrl() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get("id");
    }

    //Events
    const recipeId = getRecipeIdFromUrl();
    if (recipeId) {
        getRecipeById(recipeId);
    } else {
        // Handle error: No recipe ID found in URL
    }
});
