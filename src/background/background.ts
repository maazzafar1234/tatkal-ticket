// Background Service Worker for IRCTC Tatkal Auto-Pilot

chrome.runtime.onInstalled.addListener(() => {
  console.log('IRCTC Tatkal Auto-Pilot extension installed successfully.');
});

// Listen for messages from popup or content scripts
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'ARM_AUTOMATION') {
    console.log('Automation armed with data:', request.payload);
    
    // Store active session state
    chrome.storage.local.set({ isArmed: true, bookingConfig: request.payload }, () => {
      sendResponse({ status: 'success', message: 'Extension armed for execution' });
    });

    return true; // Keeps the message channel open for asynchronous response
  }
});

// Monitor tab updates to inject content script when navigating to IRCTC booking page
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url?.includes('irctc.co.in')) {
    chrome.storage.local.get(['isArmed'], (result) => {
      if (result.isArmed) {
        console.log('IRCTC page detected while armed. Injecting automation content script...');
        
        chrome.scripting.executeScript({
          target: { tabId: tabId },
          files: ['src/content/content.ts']
        }).catch((err) => console.error('Script injection failed:', err));
      }
    });
  }
});