document.addEventListener('DOMContentLoaded', function() {
    // Note the form ID is 'contactForm'
    const contactForm = document.getElementById('contactForm');
    const submissionAlert = document.getElementById('submission-alert');

    // Function to show the custom alert
    function showAlert() {
        submissionAlert.classList.remove('hidden');
        // Auto-hide the alert after 4 seconds
        setTimeout(hideAlert, 4000);
    }

    // Function to hide the custom alert (made accessible globally for onclick)
    window.hideAlert = function() {
        submissionAlert.classList.add('hidden');
    }

    // Form submission handler
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();

            // --- Basic Validation Check (Using your form IDs) ---
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            
            // Check if required fields are empty
            if (name === '' || email === '' || message === '') {
                alert('Please fill out all the required fields marked with an asterisk (*).');
                return; 
            }

            // --- Success Actions ---
            showAlert(); // Display the custom red notification
            contactForm.reset(); // Clear the form
        });
    }
});

// NOTE: I've left the unrelated FAQ script alone, but ensure it is separated from the form script.
document.addEventListener('DOMContentLoaded', () => {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        question.addEventListener('click', () => {
            // Toggle the 'active' class on the clicked FAQ item.
            item.classList.toggle('active');

            // Optional: Close any other open FAQ items.
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
        });
    });
});


