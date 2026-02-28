$(document).ready(function(){

    // Load JSON file
    $.getJSON("formData.json", function(data){

        data.fields.forEach(function(field){

            let formGroup = $("<div>").addClass("form-group");
            let label = $("<label>").text(field.label);
            formGroup.append(label);

            let input;

            if(field.type === "select"){
                input = $("<select>").attr("id", field.id);

                field.options.forEach(function(option){
                    input.append(
                        $("<option>").val(option).text(option)
                    );
                });

            } else {
                input = $("<input>")
                        .attr("type", field.type)
                        .attr("id", field.id);
            }

            formGroup.append(input);
            formGroup.append(
                $("<div>")
                .addClass("error")
                .attr("id", field.id + "Error")
            );

            $("#dynamicForm").append(formGroup);
        });

        // Extra hidden fields
        $("#dynamicForm").append(`
            <div class="form-group hidden" id="stateGroup">
                <label>State</label>
                <select id="state">
                    <option>Select</option>
                    <option>California</option>
                    <option>Texas</option>
                    <option>New York</option>
                </select>
                <div class="error" id="stateError"></div>
            </div>

            <div class="form-group hidden" id="collegeGroup">
                <label>College Name</label>
                <input type="text" id="college">
                <div class="error" id="collegeError"></div>
            </div>

            <button type="submit">Register</button>
        `);

    });

    // Conditional Logic

    $(document).on("change", "#country", function(){
        if($(this).val() === "USA"){
            $("#stateGroup").removeClass("hidden");
        } else {
            $("#stateGroup").addClass("hidden");
        }
    });

    $(document).on("change", "#role", function(){
        if($(this).val() === "Student"){
            $("#collegeGroup").removeClass("hidden");
        } else {
            $("#collegeGroup").addClass("hidden");
        }
    });

    // Form Validation
    $(document).on("submit", "#dynamicForm", function(e){
        e.preventDefault();
        let isValid = true;

        $(".error").text("");

        if($("#name").val().trim() === ""){
            $("#nameError").text("Name is required");
            isValid = false;
        }

        let emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
        if(!emailPattern.test($("#email").val())){
            $("#emailError").text("Enter valid email");
            isValid = false;
        }

        if($("#password").val().length < 6){
            $("#passwordError").text("Password must be at least 6 characters");
            isValid = false;
        }

        if($("#country").val() === "Select"){
            $("#countryError").text("Select a country");
            isValid = false;
        }

        if($("#country").val() === "USA" && $("#state").val() === "Select"){
            $("#stateError").text("Select a state");
            isValid = false;
        }

        if($("#role").val() === "Student" && $("#college").val().trim() === ""){
            $("#collegeError").text("College name required");
            isValid = false;
        }

        if(isValid){
            alert("Form submitted successfully!");
        }
    });

});