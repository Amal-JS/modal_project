console.log('modal js')


document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector('#myModal form');

    form.addEventListener("submit", async function (event) {
        event.preventDefault();
    

        
    try {
        const formData = new FormData(form);
        const response = await fetch(createAccountUrl , {
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

        function successFunction(msg) {
                                       //setting both div to empty
        //const container_email = document.getElementById('er_email');
        //container_email.innerHTML = "";
    
        if (msg.success === 'True') {
            console.log("success")
            const form = document.querySelector('#myModal form');
            form.reset(); //reset form empty
            window.location.href = page1Url; //redirect to success url

        } else if (msg.success === 'False') {

          console.log('error  coming',msg.errors,"ended")
          const errorMessages = msg.errors;  //get the error object to a variable
          for (const fieldName in errorMessages) {
          const field = document.querySelector(`[name="${fieldName}"]`);

        if (field) {

            const errorMsgs = errorMessages[fieldName]; // Array of error messages

            const errorContainer = document.createElement('div');
            errorContainer.className = 'error';

            // Loop through the array of error messages and create separate lines
            for (const errorMsg of errorMsgs) {
                const errorLine = document.createElement('p');
                errorLine.textContent = errorMsg;
                errorLine.classList.add('text-danger'); 
                errorContainer.appendChild(errorLine);
                
            }

            field.insertAdjacentElement('afterend', errorContainer);
        }}
        
    
    }
    
        
    }
    

    function clearErrors() {
    const errorContainers = document.querySelectorAll('.error');  //fu
    errorContainers.forEach(container => container.remove());
}

