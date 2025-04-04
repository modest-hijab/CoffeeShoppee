"use strict"
const form = document.querySelector('form');
    form.addEventListener('submit', async (event) => {
        event.preventDefault();
                
                
const formData = {
    firstName: document.getElementById('first-name').value,
    lastName: document.getElementById('last-name').value,
    email: document.getElementById('email').value,
    recipeName: document.getElementById('recipe-name').value,
    recipeType: document.getElementById('recipe-type').value,
    recipeDescription: document.getElementById('recipe-description').value,
    recipeIngredients: document.getElementById('recipe-ingredients').value,
    recipeInstructions: document.getElementById('recipe-instructions').value,
    recipeSubmission: document.getElementById('recipe-submission').checked
};

    try {
    const response = await fetch('https://getpantry.cloud/apiv1/pantry/28486b5b-2c1c-4633-9b7d-035657f988cc/basket/coffeerecipesubmissions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
},
        body: JSON.stringify(formData)
    });
                    
        if (response.ok) {
            const result = await response.json();
                alert('Recipe submitted successfully!');
            } else {
                        alert('Failed to submit recipe');
                    }
            } catch (error) {
                    console.error('Error:', error);
                    alert('Failed to submit recipe');
                }
            });


