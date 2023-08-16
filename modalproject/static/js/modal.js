// all js codes handles form submission


document.addEventListener("DOMContentLoaded", function () { //event to ensure that your JavaScript code runs only when the HTML document has finished loading.
    const form = document.querySelector('#myModal form');

    form.addEventListener("submit", async function (event) { //submit event on form
        event.preventDefault();



        try {
            const formData = new FormData(form);
            const response = await fetch(createAccountUrl, { //createAccount is in m.html , using await after the fetch returns the response it will not be executed
                method: 'POST',
                body: new URLSearchParams(new FormData(form)),
                headers: {
                    'X-Requested-With': 'XMLHttpRequest'
                }
            });

            const responseData = await response.json(); // Parse the JSON response
            clearErrors(); // Clear any existing error messages
            successFunction(responseData); // Call successFunction with the parsed JSON response
        } catch (error) {
            console.log('Error:', error);
        }

    });




});

function successFunction(msg) {  //msg contains the respone in json form

    if (msg.success === 'True') {  //if success
        console.log("success")
        const form = document.querySelector('#myModal form');
        form.reset(); //reset form empty
        window.location.href = page1Url; //redirect to success url

    } else if (msg.success === 'False') {  //form data invalid

        console.log('error  coming', msg.errors, "ended")

        const errorMessages = msg.errors;  //get the error object to a variable

        for (const fieldName in errorMessages) {
            const field = document.querySelector(`[name="${fieldName}"]`); // getting the input tag with name eg : username == ${fieldName}

            if (field) {  //check if that input  element exist in html

                const errorMsgs = errorMessages[fieldName]; // Array of error messages

                const errorContainer = document.createElement('div'); //create a new div
                errorContainer.className = 'error'; //adding a class to this new div

                // Loop through the array of error messages and create separate lines
                for (const errorMsg of errorMsgs) {
                    const errorLine = document.createElement('p'); //create a new p element
                    errorLine.textContent = errorMsg; //adding the error each on p element
                    errorLine.classList.add('text-danger'); // adding a class to the p element
                    errorContainer.appendChild(errorLine); //adding that p to div element

                }

                // Find the error container associated with the field and append errors
                const errorId = `${fieldName}-error`; //getting the div given in html to display error for each field
                const fieldErrorContainer = document.getElementById(errorId);
                if (fieldErrorContainer) {
                    fieldErrorContainer.innerHTML = ''; // Clear existing errors
                    fieldErrorContainer.appendChild(errorContainer);
                }
            }
        }
    }


}





function clearErrors() {
    const errorContainers = document.querySelectorAll('.error');  //fuction to clear errors when re submitting the form
    errorContainers.forEach(container => container.remove());
}

