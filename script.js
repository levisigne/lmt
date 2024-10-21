// Array to keep track of history
const historyStack = [];

// Variable to store the initial response buttons
const initialResponseButtons = `
    <a href="#" class="button-link" onclick="handleResponse('book')">Book appointment</a>
    <a href="#" class="button-link" onclick="handleResponse('contact')">Contact</a>
    <a href="#" class="button-link" onclick="handleResponse('tip')">Tip</a>
    <a href="https://www.instagram.com/levi.lmt/" class="button-link" target="_blank">@levi.lmt</a>
`;

// Function to initialize the chatbot
function initChatbot() {
    const chatbotMessage = document.getElementById("chatbotMessage");
    const responseButtons = document.getElementById("responseButtons");

    // Set the initial chatbot message
    chatbotMessage.textContent = "Hello, how may I help you?";

    // Set the initial response buttons using the variable
    responseButtons.innerHTML = initialResponseButtons;
}

function handleResponse(action) {
    const chatbotMessage = document.getElementById("chatbotMessage");
    const responseButtons = document.getElementById("responseButtons");

    // Save the current state to the history stack
    const currentMessage = chatbotMessage.textContent;
    const currentButtons = responseButtons.innerHTML;
    historyStack.push({ message: currentMessage, buttons: currentButtons });

    // Fade out current elements
    chatbotMessage.classList.add("fade-out");
    responseButtons.classList.add("fade-out");

    // Wait for the fade-out to complete before updating the content
    responseButtons.addEventListener("transitionend", function() {
        // Update the chatbot message based on the action
        let newMessage = "Thanks! What would you like to do next?";

        if (action === 'tip') {
            newMessage = "Thanks! How would you like to tip?";
        } else if (action === 'contact') {
            newMessage = "Interested? Contact me on Instagram or over text.";
        } else if (action === 'book') {
            newMessage = "I can be visited in clinic at Massage Now ($120), or I can come to you for a house call ($100).";
        } else if (action === 'massageNow') {
            newMessage = "I can be booked at Massage Now 3-7pm on Mon, Wed, Thu, and Fri. $120 for 60 min.";
        }

        chatbotMessage.textContent = newMessage;

        // Update the response buttons to show new options
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
    const chatbotMessage = document.getElementById("chatbotMessage");
    const responseButtons = document.getElementById("responseButtons");

    // Clear the history stack
    historyStack.length = 0;

    // Fade out current elements
    chatbotMessage.classList.add("fade-out");
    responseButtons.classList.add("fade-out");

    // Wait for the fade-out to complete before resetting the content
    responseButtons.addEventListener("transitionend", function() {
        // Initialize the chatbot
        initChatbot();

        // Fade in the reset content
        chatbotMessage.classList.remove("fade-out");
        responseButtons.classList.remove("fade-out");
    }, { once: true });
}

function goBack() {
    if (historyStack.length > 0) {
        const chatbotMessage = document.getElementById("chatbotMessage");
        const responseButtons = document.getElementById("responseButtons");

        // Get the last state from the history stack
        const lastState = historyStack.pop();

        // Fade out current elements
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

// Call initChatbot when the page loads
window.onload = initChatbot;
