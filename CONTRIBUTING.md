# Contributing to FinFlow 🚀

First off, thank you for considering contributing to FinFlow! It’s people like you who make this a great tool for everyone.

### How Can You Contribute?
- **Bug Reports:** If you find a glitch, open an issue with the "Bug" label.
- **Feature Requests:** Have a cool idea for a chart or a new asset class? Let us know!
- **Code Contributions:** Check the "Issues" tab for "Good First Issues."

---

## 🛠️ Local Development Setup

1. **Fork the Repo** and create your branch:
   `git checkout -b feat/your-awesome-feature`

2. **Backend Setup:**
   - Navigate to `/backend`.
   - Create a `.env` file (refer to `.env.example`).
   - Run `npm install` and `npm run dev`.

3. **Frontend Setup:**
   - Navigate to `/frontend`.
   - Run `npm install` and `npm run dev`.

## 🧪 Contribution Rules
- **Keep it Clean:** Follow the existing folder structure.
- **Test Your Code:** Ensure the dashboard still loads and calculations (SIP/FD) are accurate before pushing.
- **Respect the UI:** FinFlow uses a specific dark-themed palette. Check `shared.jsx` for the color variables.

---

## 💡 Current Roadmap (Join Us!)
We are currently looking for help with:
- [ ] **JWT Authentication:** Replacing the `demo_user` hardcoding.
- [ ] **Automated Price Sync:** Connecting the Stock Portfolio to a live NSE/BSE API.
- [ ] **Mobile Responsiveness:** Making the charts look great on smaller screens.
- [ ] **Internationalization:** Support for currencies other than ₹ (Rupee).

**Let's build the future of personal finance together!** ☕📈
