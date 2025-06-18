// Function to click all "Show Answer" buttons
function clickShowAnswerButtons() {
  // Array of selectors to find "Show Answer" buttons
  const selectors = [
    'button:contains("Show Answer")',
    'button:contains("Show answer")',
    'button:contains("SHOW ANSWER")',
    'a:contains("Show Answer")',
    'a:contains("Show answer")',
    'button[class*="show-answer"]',
    'button[id*="show-answer"]',
    'button[class*="answer"]',
    'button[id*="answer"]',
    '.show-answer',
    '.show-answer-btn',
    '.reveal-answer',
    '.answer-toggle'
  ];

  let buttonsClicked = 0;
  let totalButtons = 0;

  // Custom contains selector function (since :contains is not standard CSS)
  function getElementsContainingText(selector, text) {
    const elements = document.querySelectorAll(selector);
    return Array.from(elements).filter(el => 
      el.textContent.toLowerCase().includes(text.toLowerCase())
    );
  }

  // Find and click buttons with text content
  const textSelectors = [
    { selector: 'button', text: 'Show Answer' },
    { selector: 'button', text: 'Show answer' },
    { selector: 'button', text: 'SHOW ANSWER' },
    { selector: 'a', text: 'Show Answer' },
    { selector: 'a', text: 'Show answer' },
    { selector: 'button', text: 'Reveal Answer' },
    { selector: 'button', text: 'View Answer' },
    { selector: 'button', text: 'Show Solution' }
  ];

  // Click buttons based on text content
  textSelectors.forEach(({ selector, text }) => {
    const elements = getElementsContainingText(selector, text);
    elements.forEach(element => {
      if (element.offsetParent !== null && !element.disabled) { // Check if visible and enabled
        totalButtons++;
        try {
          // Scroll element into view
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          
          // Add a small delay for smooth scrolling
          setTimeout(() => {
            element.click();
            buttonsClicked++;
            
            // Add visual feedback
            element.style.backgroundColor = '#90EE90';
            element.style.border = '2px solid #32CD32';
            
            console.log(`Clicked: ${element.textContent.trim()}`);
          }, 100 * totalButtons);
          
        } catch (error) {
          console.error('Error clicking button:', error);
        }
      }
    });
  });

  // Click buttons based on CSS selectors
  const cssSelectors = [
    '.show-answer',
    '.show-answer-btn',
    '.reveal-answer',
    '.answer-toggle',
    'button[class*="show-answer"]',
    'button[id*="show-answer"]',
    'button[class*="answer"]',
    'button[id*="answer"]',
    '[data-action*="show"]',
    '[onclick*="show"]'
  ];

  cssSelectors.forEach(selector => {
    const elements = document.querySelectorAll(selector);
    elements.forEach(element => {
      if (element.offsetParent !== null && !element.disabled) {
        totalButtons++;
        try {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          
          setTimeout(() => {
            element.click();
            buttonsClicked++;
            
            // Add visual feedback
            element.style.backgroundColor = '#90EE90';
            element.style.border = '2px solid #32CD32';
            
            console.log(`Clicked: ${element.textContent.trim() || element.getAttribute('aria-label') || 'Button'}`);
          }, 100 * totalButtons);
          
        } catch (error) {
          console.error('Error clicking button:', error);
        }
      }
    });
  });

  // Show notification
  setTimeout(() => {
    // Create and show notification
    const notification = document.createElement('div');
    notification.innerHTML = `
      <div style="
        position: fixed;
        top: 20px;
        right: 20px;
        background: #4CAF50;
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        z-index: 10000;
        font-family: Arial, sans-serif;
        font-size: 14px;
        max-width: 300px;
      ">
        <strong>Show Answer Clicker</strong><br>
        Found and clicked ${buttonsClicked} "Show Answer" buttons!
      </div>
    `;
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 3000);
    
  }, (totalButtons * 100) + 500);
}

// Execute the function
clickShowAnswerButtons();
