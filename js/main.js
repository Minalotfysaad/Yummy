$(document).ready(function () {
    //Loader
    function hideLoader() {
        $("#loader .loader").fadeOut(500, function () {
            $("#loader").fadeOut(500, function () {
                $("#loader").remove();
                $("body").css("overflow", "auto");
            });
        });
    }
    // Initialize home page
    loadContent("home.html");

    // jQuery AJAX request to load content
    function loadContent(url) {
        $.ajax({
            url: url,
            success: function (data) {
                $("#content").html(data);
                hideLoader();
                if (url === "home.html") {
                    getHomeRecipe(" ");
                }
                if (url === "search.html") {
                    searchRecipeByName();
                    searchRecipeByLetter();
                }
                if (url === "details.html") {
                    const recipeId = getIdFromUrl();
                    getRecipeById(recipeId);
                }
                if (url === "inner-category.html") {
                    const catId = getIdFromUrl();
                    getInnerCategory(catId);
                }
                if (url === "inner-area.html") {
                    const areaId = getIdFromUrl();
                    getInnerArea(areaId);
                }
                if (url === "inner-ingredient.html") {
                    const ingId = getIdFromUrl();
                    getInnerIngredient(ingId);
                }
            },
        });
    }
    // Function to get ID from URL
    function getIdFromUrl() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get("id");
    }

// Function to navigate pages
function navigateTo(id, page, paramName) {
    window.history.pushState(null, null, `?${paramName}=${id}`);
    loadContent(page);
    closeAside();
}
// Using the navigateTo function for each navigation
function navigateToDetails(recipeId) {
    navigateTo(recipeId, "details.html", "id");
}

function navigateToInnerCategory(catId) {
    navigateTo(catId, "inner-category.html", "id");
}

function navigateToInnerArea(areaId) {
    navigateTo(areaId, "inner-area.html", "id");
}

function navigateToInnerIngredient(ingId) {
    navigateTo(ingId, "inner-ingredient.html", "id");
}

    // Handle browser back/forward navigation
    window.onpopstate = function () {
        loadContent("home.html");
    };

    // Expose globally
    window.navigateToDetails = navigateToDetails;
    window.navigateToInnerCategory = navigateToInnerCategory;
    window.navigateToInnerArea = navigateToInnerArea;
    window.navigateToInnerIngredient = navigateToInnerIngredient;

    // NavBar
    // Function to open aside
    function openAside() {
        $("aside").animate({ left: 0 }, 500); // Open
        $(".arrow i").animate({ rotate: "180deg" }, 500);
    }
    // Function to close aside
    function closeAside() {
        let navBoxWidth = $(".nav-box").outerWidth();
        $("aside").animate({ left: `-${navBoxWidth}px` }, 500); // Close
        $(".arrow i").animate({ rotate: "0deg" }, 500);
    }

    // Arrow click handler
    $(".arrow").click(function () {
        if ($("aside").css("left") == "0px") {
            closeAside();
        } else {
            openAside();
        }
    });

    // Function to handle menu item click
    function navItemHandler(id) {
        $(`.nav-menu #${id}`).click(function () {
            $('.nav-menu .nav-item').removeClass('active');
            $(this).addClass('active');
            
            loadContent(`${id}.html`);
            closeAside();
        });
    }
    // Using the function for each menu item
    navItemHandler("home");
    navItemHandler("search");
    navItemHandler("categories");
    navItemHandler("areas");
    navItemHandler("ingredients");
    navItemHandler("contact");

// API functions
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
async function searchRecipeByName(recipe) {
    try {
        var response = await fetch(
            `https://www.themealdb.com/api/json/v1/1/search.php?s=${recipe}`
        );
        var data = await response.json();
        recipesArray = data.meals || [];
        displayRecipe();
    } catch (error) {
        // Handle error
    }
}

async function searchRecipeByLetter(recipe) {
    try {
        var response = await fetch(
            `https://www.themealdb.com/api/json/v1/1/search.php?f=${recipe}`
        );
        var data = await response.json();
        recipesArray = data.meals || [];
        displayRecipe();
    } catch (error) {
        // Handle error
    }
}
});