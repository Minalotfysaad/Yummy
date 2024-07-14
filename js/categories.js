$(document).ready(function () {
    //Loader
    $("#innerLoader .loader").fadeOut(500, function () {
        $("#innerLoader").fadeOut(500, function () {
            $("#innerLoader").remove();
            $("body").css("overflow", "auto");
        });
    });
});

// Functions
var categoriesArray = [];
async function getCategories() {
    try {
        var response = await fetch(
            `https://www.themealdb.com/api/json/v1/1/categories.php`
        );
        var data = await response.json();
        categoriesArray = categoriesArray.concat(data.categories);
        displayCategories();
    } catch (error) {
        // Handle error
    }
}
getCategories();
function displayCategories() {
    var content = ``;
    for (let i = 0; i < categoriesArray.length; i++) {
        const truncatedDescription = truncateString(
            categoriesArray[i].strCategoryDescription,
            50
        );
        content += `
            <div class="col-lg-3 col-md-4">
                <div id="${categoriesArray[i].strCategory}" class="recipe">
                    <div class="recipe-image">
                        <img class="w-100" src="${categoriesArray[i].strCategoryThumb}" alt="">
                        <div class="recipe-text d-flex flex-column justify-content-center align-items-center">
                            <h3 class="text-center my-3 p-4">${categoriesArray[i].strCategory}</h3>
                            <p class="px-3 text-center">${truncatedDescription}</p>
                            
                        </div>
                    </div>
                </div>
            </div>`;
    }
    document.getElementById("rowData").innerHTML = content;
    getIdOnClick();
}
function truncateString(str, num) {
    // Find the last space within the limit
    const truncated = str.slice(0, num);
    const lastSpaceIndex = truncated.lastIndexOf(" ");
    if (lastSpaceIndex > 0) {
        return truncated.slice(0, lastSpaceIndex) + "...";
    }
    return truncated + "...";
}

function getIdOnClick() {
    $(".recipe").click(function () {
        const id = $(this).attr("id");
        $(".title").text(id);
        
        window.navigateToInnerCategory(id);
    });
}
