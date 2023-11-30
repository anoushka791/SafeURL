// content.js

// Listen for messages from the background script.
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.action === 'showAlertPage') {
    // Create a container element to hold the alert page content.
    const alertContainer = document.createElement('div');
    alertContainer.innerHTML = `
      <!-- Load your existing alert page HTML here -->
      <iframe src="alert.html" style="width:100%; height:100%; border: none;"></iframe>
    `;

    // Add CSS to style the container.
    alertContainer.style.position = 'fixed';
    alertContainer.style.top = '0';
    alertContainer.style.left = '0';
    alertContainer.style.width = '100%';
    alertContainer.style.height = '100%';
    alertContainer.style.background = 'rgba(0, 0, 0, 0.7)';
    alertContainer.style.zIndex = '9999';

    // Append the container to the document body to display the alert page.
    document.body.appendChild(alertContainer);

    // Prevent further interaction with the original page while the alert is displayed.
    document.body.style.pointerEvents = 'none';
  }
});
