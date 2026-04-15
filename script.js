// 1. HAMBURGER MENU TOGGLE
document.addEventListener('DOMContentLoaded', function () {
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    //Menu per mobile
    if (hamburgerBtn) {
        hamburgerBtn.addEventListener('click', function () {
            mobileMenu.classList.toggle('hidden');
        });
        const menuLinks = mobileMenu.querySelectorAll('a');
        menuLinks.forEach(link => {
            link.addEventListener('click', function () {
                mobileMenu.classList.add('hidden');
            });
        });
    }

    // 2. FETCH MESSAGE (Messaggio della settimana) da JSON
    const messageContainer = document.getElementById('message-container');
    if (messageContainer) {
        fetchMessageOfTheWeek();
    }

    function fetchMessageOfTheWeek() {
        fetch('data/messages.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to load messages');
                }
                return response.json();
            })
            .then(data => {
                displayMessage(data);
            })
            .catch(error => {
                console.error('Error fetching message:', error);
                displayFallbackMessage();
            });
    }

    function displayMessage(data) {
        // Get a random message or the first one
        const message = data.messages && data.messages.length > 0
            ? data.messages[0]
            : null;

        if (message) {
            const messageText = document.getElementById('message-text');
            const messageAuthor = document.getElementById('message-author');

            if (messageText) messageText.textContent = message.text;
            if (messageAuthor) messageAuthor.textContent = `-- ${message.author}`;
        } else {
            displayFallbackMessage();
        }
    }

    function displayFallbackMessage() {
        const messageText = document.getElementById('message-text');
        const messageAuthor = document.getElementById('message-author');

        if (messageText) {
            messageText.textContent = "\"I credenti sono fratelli; perciò riconciliate i vostri fratelli e temete Allah affinché vi sia data misericordia.\"";
        }
        if (messageAuthor) {
            messageAuthor.textContent = "-- Al-Ḥujurāt 49:10";
        }
    }

    // 3. CONTACT FORM VALIDATION & SUBMISSION
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }

    function handleFormSubmit(event) {
        event.preventDefault();

        // Get form values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value.trim();

        if (!name || !email || !subject || !message) {
            showFormFeedback('Please fill in all required fields.', 'error');
            return;
        }

        // Email validation using regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showFormFeedback('Please enter a valid email address.', 'error');
            return;
        }

        // Se tutto ok, mostra il messaggio verde
        showFormFeedback('Grazie per il tuo messaggio! Ti risponderemo al più presto.', 'Fatto');

        // Reset form
        contactForm.reset();
        
        console.log({
            name,
            email,
            phone,
            subject,
            message,
            timestamp: new Date().toISOString()
        });
    }

    function showFormFeedback(message, type) {
        const feedbackDiv = document.getElementById('form-feedback');

        if (feedbackDiv) {
            feedbackDiv.textContent = message;
            feedbackDiv.classList.remove('hidden', 'bg-red-100', 'text-red-800', 'bg-green-100', 'text-green-800');

            if (type === 'error') {
                feedbackDiv.classList.add('bg-red-100', 'text-red-800');
            } else if (type === 'success') {
                feedbackDiv.classList.add('bg-green-100', 'text-green-800');
            }
            
            setTimeout(() => {
                feedbackDiv.classList.add('hidden');
            }, 5000);
        }
    }
//smooth scrool
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

});
