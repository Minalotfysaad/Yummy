$(document).ready(function () {
        // Hide loader function
        

        function hideLoader() {
            $("#innerLoader .loader").fadeOut(500, function () {
                $("#innerLoader").fadeOut(0, function () {
                    $("#loader").remove();
                    $("body").css("overflow", "auto");
                });
            });
        }
    
    // Function to validate input
    function validateInput(input, regex) {
        const isValid = regex.test(input.val());
        if (isValid) {
            input.removeClass("is-invalid").addClass("is-valid");
            input.next("small").addClass("d-none"); // Hide error message
        } else {
            input.removeClass("is-valid").addClass("is-invalid");
            input.next("small").removeClass("d-none"); // Show error message
        }
        return isValid;
    }

    // Regex patterns
    const regexPatterns = {
        name: /^[a-zA-Z ]{3,}$/,
        email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        age: /^(?:[6-9]|[1-9][0-9]|100)$/,
        phone: /^\d{11}$/,
        password: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
    };

    // Event listeners for input validation on input change
    $("#nameInput").on("input", function () {
        validateInput($(this), regexPatterns.name);
    });

    $("#emailInput").on("input", function () {
        validateInput($(this), regexPatterns.email);
    });

    $("#ageInput").on("input", function () {
        validateInput($(this), regexPatterns.age);
    });

    $("#phoneInput").on("input", function () {
        validateInput($(this), regexPatterns.phone);
    });

    $("#passInput").on("input", function () {
        validateInput($(this), regexPatterns.password);
    });

    // Password confirmation validation
    $("#rePassInput").on("input", function () {
        const isValid = $(this).val() === $("#passInput").val();
        if ($(this).val() === "") {
            $(this).removeClass("is-invalid is-valid");
        } else if (isValid) {
            $(this).removeClass("is-invalid").addClass("is-valid");
            $(this).next("small").addClass("d-none"); // Hide error message
        } else {
            $(this).removeClass("is-valid").addClass("is-invalid");
            $(this).next("small").removeClass("d-none"); // Show error message
        }
    });

    // Form submission handling
    $(".submit-button").click(function (e) {
        e.preventDefault();

        // Validate all fields
        const isValidName = validateInput($("#nameInput"), regexPatterns.name);
        const isValidEmail = validateInput($("#emailInput"), regexPatterns.email);
        const isValidAge = validateInput($("#ageInput"), regexPatterns.age);
        const isValidPhone = validateInput($("#phoneInput"), regexPatterns.phone);
        const isValidPassword = validateInput($("#passInput"), regexPatterns.password);
        const isValidRePassword = $("#rePassInput").val() === $("#passInput").val();

        // Check if all inputs are valid
        if (isValidName && isValidEmail && isValidAge && isValidPhone && isValidPassword && isValidRePassword) {
            $(".error-message").removeClass("d-none").addClass("text-success").text("Form submitted successfully.");

        } else {
            $(".error-message").removeClass("d-none").addClass("text-danger").text("please fill all required fields correctly.");
        }
    });
    hideLoader();
});
