# System Architecture
**Project Name:** IRCTC Tatkal Auto-Pilot Extension

## 1. High-Level Architecture
[Extension Popup UI] ──(Saves Encrypted Config)──> [chrome.storage.local]
│
▼
[Background Service Worker] ──(Manages State & Timers)──> [Content Script Injection]
│
▼
[IRCTC DOM Automation]

## 2. Technology Stack
* **Language:** TypeScript
* **Framework / Environment:** Chrome Extension Manifest V3
* **UI Framework:** Tailwind CSS
* **Security:** AES-GCM (256-bit) via Web Crypto API for local credential encryption
* **Storage:** Chrome Local Storage (`chrome.storage.local`)

## 3. Folder Structure
```text
tatkal-extension/
├── manifest.json
├── src/
│   ├── popup/          # Extension configuration UI
│   ├── background/     # Service worker for state and timing loops
│   └── content/        # Injected scripts for DOM manipulation
├── docs/               # PRD, Architecture, Rules, Design, Tasks, Memory
└── assets/             # Icons and styles