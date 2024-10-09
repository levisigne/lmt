// Array to keep track of history
const historyStack = [];

function handleResponse(action) {
    // Save the current state to the history stack
    const currentMessage = document.getElementById("chatbotMessage").textContent;
    const currentButtons = document.getElementById("responseButtons").innerHTML;
    historyStack.push({ message: currentMessage, buttons: currentButtons });

    // Fade out current elements
    document.getElementById("chatbotMessage").classList.add("fade-out");
    document.getElementById("responseButtons").classList.add("fade-out");

    // Wait for the fade-out to complete before updating the content
    document.getElementById("responseButtons").addEventListener("transitionend", function() {
        // Update the chatbot message based on the action
        const chatbotMessage = document.getElementById("chatbotMessage");
        let newMessage = "Thanks! What would you like to do next?";

        if (action === 'tip') {
            newMessage = "Thank you so much! How would you like to tip?";
        } else if (action === 'contact') {
            newMessage = "Interested? Contact me on Instagram or over text!";
        } else if (action === 'book') {
            newMessage = "Great! I can be visited in clinic at Massage Now, or I can visit to your home at your convenience.";
        } else if (action === 'massageNow') {
            newMessage = "I can be booked at Massage Now from 3-7pm on Mon, Wed, Thu, and Fri.";
        }

        chatbotMessage.textContent = newMessage;

        // Update the response buttons to show new options
        const responseButtons = document.getElementById("responseButtons");
        responseButtons.innerHTML = "";

        if (action === 'book') {
            responseButtons.innerHTML = `
                <a class="button-link" onclick="handleResponse('massageNow')">Massage Now</a>
                <a href="#" class="button-link" onclick="handleResponse('contact')">House call</a>
            `;
        } else if (action === 'massageNow') {
            responseButtons.innerHTML = `
                <a href="https://g.co/kgs/HFNNsYT" class="button-link" onclick="handleResponse('callToBook')" target="_blank">Call to book</a>
                <a href="https://massagenowak.com/treatment/swedish/" class="button-link" onclick="handleResponse('bookOnline')" target="_blank">Book online</a>
            `;
        } else if (action === 'contact') {
            responseButtons.innerHTML = `
                <a href="https://www.instagram.com/levi.lmt/" class="button-link" onclick="handleResponse('instagram')" target="_blank">Instagram</a>
                <a href="sms:+19073174269?&body=Hi Levi, I'm interested in getting a massage from you" class="button-link" onclick="handleResponse('text')">Text</a>
            `;
        } else if (action === 'tip') {
            responseButtons.innerHTML = `
                <a href="https://venmo.com/lvsbrwn" target="_blank" class="button-link" onclick="handleResponse('venmo')">Venmo</a>
                <a href="https://cash.app/$lvsbrwn" target="_blank" class="button-link" onclick="handleResponse('cashapp')">Cashapp</a>
            `;
        } else {
            // For any other action, show the "Ask another question" link
            responseButtons.innerHTML = `
                <a href="#" class="button-link" onclick="resetChatbot()">Ask another question</a>
            `;
        }
        
        // Add the "Back" button at the bottom
        responseButtons.innerHTML += `
            <a href="#" class="button-link" id="back" onclick="goBack()">Back</a>
        `;

        // Fade in the new content
        chatbotMessage.classList.remove("fade-out");
        responseButtons.classList.remove("fade-out");
    }, { once: true }); // Use { once: true } to remove the event listener after it's executed once
}

function resetChatbot() {
    // Clear the history stack
    historyStack.length = 0;

    // Fade out current elements
    const chatbotMessage = document.getElementById("chatbotMessage");
    const responseButtons = document.getElementById("responseButtons");

    chatbotMessage.classList.add("fade-out");
    responseButtons.classList.add("fade-out");

    // Wait for the fade-out to complete before resetting the content
    responseButtons.addEventListener("transitionend", function() {
        // Set the initial chatbot message
        chatbotMessage.textContent = "Hello! How may I help you?";

        // Set the initial response buttons
        responseButtons.innerHTML = `
            <a href="#" class="button-link" onclick="handleResponse('tip')">I want to tip you</a>
            <a href="#" class="button-link" onclick="handleResponse('contact')">I want to contact you</a>
            <a href="#" class="button-link" onclick="handleResponse('book')">I want to book with you</a>
        `;

        // Fade in the reset content
        chatbotMessage.classList.remove("fade-out");
        responseButtons.classList.remove("fade-out");
    }, { once: true }); // Use { once: true } to remove the event listener after it's executed once
}

function goBack() {
    if (historyStack.length > 0) {
        // Get the last state from the history stack
        const lastState = historyStack.pop();

        // Fade out current elements
        const chatbotMessage = document.getElementById("chatbotMessage");
        const responseButtons = document.getElementById("responseButtons");

        chatbotMessage.classList.add("fade-out");
        responseButtons.classList.add("fade-out");

        // Wait for the fade-out to complete before updating the content
        responseButtons.addEventListener("transitionend", function() {
            // Restore the previous state
            chatbotMessage.textContent = lastState.message;
            responseButtons.innerHTML = lastState.buttons;

            // Fade in the restored content
            chatbotMessage.classList.remove("fade-out");
            responseButtons.classList.remove("fade-out");
        }, { once: true });
    }
}
