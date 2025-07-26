// script.js

// --- DOM Element References ---
// We first need to get references to the HTML elements we'll be interacting with.
// This allows our JavaScript code to "talk" to the parts of the webpage.

// Get the textarea where the user will type Markdown.
const markdownInput = document.getElementById('markdown-input');

// Get the div where the converted HTML will be displayed.
const previewOutput = document.getElementById('preview-output');

// Get the button that will copy the Markdown text.
const copyButton = document.getElementById('copy-button');

// --- Live Preview Functionality ---

// This function updates the live preview panel whenever the user types.
function updatePreview() {
    // 1. Get the current text from the markdownInput textarea.
    const markdownText = markdownInput.value;

    // 2. Use the 'marked.parse()' function to convert the Markdown text into HTML.
    // The 'marked' library (loaded from a CDN in index.html) does this conversion for us.
    const htmlOutput = marked.parse(markdownText);

    // 3. Set the innerHTML of the previewOutput div to the generated HTML.
    // This makes the browser display the rendered Markdown.
    previewOutput.innerHTML = htmlOutput;
}

// Add an 'input' event listener to the markdownInput textarea.
// This means that every time the user types, pastes, or changes the content
// of the textarea, the 'updatePreview' function will be called automatically.
markdownInput.addEventListener('input', updatePreview);

// Call updatePreview once when the page loads to show any initial placeholder text
// or pre-filled content as rendered Markdown.
updatePreview();

// --- Copy Button Functionality ---

// This function handles copying the Markdown text to the clipboard.
async function copyMarkdown() {
    // Get the current text from the markdownInput textarea.
    const textToCopy = markdownInput.value;

    try {
        // Use the modern Navigator Clipboard API to write text to the clipboard.
        // This is a more secure and efficient way to handle clipboard operations.
        await navigator.clipboard.writeText(textToCopy);

        // --- Bonus UX Feedback ---
        // Temporarily change the button text to give visual feedback to the user.

        // Store the original button text so we can restore it later.
        const originalButtonText = copyButton.textContent;

        // Change the button text to indicate success.
        copyButton.textContent = 'Copied!';
        // Optionally add a Bulma class to change its appearance
        copyButton.classList.remove('is-info', 'is-light');
        copyButton.classList.add('is-success');


        // Set a timeout to change the button text back after 2 seconds (2000 milliseconds).
        setTimeout(() => {
            copyButton.textContent = originalButtonText;
            // Remove success class and restore original Bulma classes
            copyButton.classList.remove('is-success');
            copyButton.classList.add('is-info', 'is-light');
        }, 2000);

    } catch (err) {
        // If copying fails (e.g., due to browser permissions or old browser),
        // log an error to the console.
        console.error('Failed to copy Markdown: ', err);
        // You could also provide a user-friendly error message on the page.
        alert('Failed to copy text. Please try manually copying.');
    }
}

// Add a 'click' event listener to the copyButton.
// When the button is clicked, the 'copyMarkdown' function will be executed.
copyButton.addEventListener('click', copyMarkdown);