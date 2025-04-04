"use strict";

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
        const response = await fetch('http://localhost:3000/submit-form', {
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
