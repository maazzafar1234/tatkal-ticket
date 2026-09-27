### 3. `docs/RULES.md`

```markdown
# Development Rules & Guidelines
**Project:** IRCTC Tatkal Auto-Pilot Extension

## 1. General Principles
* Follow project documentation (`PRD`, `ARCHITECTURE`) before making changes.
* Keep code clean, readable, well-structured, and fully typed.
* Prioritize simplicity, security, and low-latency execution loops.
* Make small, focused changes to avoid broken selectors or race conditions.

## 2. Technology & Coding Standards
* **Language:** Use TypeScript exclusively.
* **Framework:** Follow Chrome Extension Manifest V3 best practices.
* **Styling:** Use Tailwind CSS for popup components.
* **Security:** Never transmit credentials externally; keep all data client-side with AES-256 local encryption.

## 3. Project Structure
* Follow the defined folder structure in `ARCHITECTURE.md`. Keep popup, background, and content logic completely isolated.