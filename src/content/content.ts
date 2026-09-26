// Content Script for IRCTC DOM Automation & Autofill

console.log("IRCTC Tatkal Auto-Pilot content script injected.");

// Listen for instructions from background or popup
chrome.storage.local.get(
  [
    "username",
    "password",
    "fromStation",
    "toStation",
    "trainNo",
    "travelClass",
    "journeyDate",
    "isArmed",
  ],
  (data) => {
    if (!data.isArmed) return;

    console.log("Executing automated form fill with stored configuration...");

    // Helper function to wait for elements to appear in the DOM
    const waitForElement = (
      selector: string,
      timeout = 5000,
    ): Promise<HTMLElement | null> => {
      return new Promise((resolve) => {
        const startTime = Date.now();
        const interval = setInterval(() => {
          const element = document.querySelector(selector) as HTMLElement;
          if (element) {
            clearInterval(interval);
            resolve(element);
          } else if (Date.now() - startTime > timeout) {
            clearInterval(interval);
            resolve(null);
          }
        }, 100);
      });
    };

    // Automated Login & Station Selection Logic
    const runAutomation = async () => {
      // Example: Check if login modal/fields exist
      const userIdInput = (await waitForElement(
        'input[formcontrolname="userid"]',
      )) as HTMLInputElement;
      const passwordInput = (await waitForElement(
        'input[formcontrolname="password"]',
      )) as HTMLInputElement;

      if (userIdInput && passwordInput && data.username && data.password) {
        console.log("Injecting credentials...");
        userIdInput.value = data.username as string;
        userIdInput.dispatchEvent(new Event("input", { bubbles: true }));

        passwordInput.value = data.password as string;
        passwordInput.dispatchEvent(new Event("input", { bubbles: true }));
      }

      // Station and Journey autofill logic can be hooked similarly based on IRCTC's current DOM selectors
    };

    // Run automation after a short delay to ensure DOM stability
    setTimeout(runAutomation, 1500);
  },
);
