# QUICK REFERENCE - GET STARTED IN 2 MINUTES

## 🚀 THE FASTEST WAY TO START

### Option A: Use PowerShell Script (Recommended)
```powershell
# 1. Open PowerShell as Administrator
# 2. Navigate to project folder:
cd "e:\New GitHub Projects\Mini Game Platform"

# 3. Allow script execution (if needed):
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser

# 4. Run the start script:
.\start.ps1
```

### Option B: Use Batch Script
```cmd
# 1. Open Command Prompt
# 2. Navigate to project folder:
cd "e:\New GitHub Projects\Mini Game Platform"

# 3. Run the start script:
start.bat
```

### Option C: Manual Commands
```powershell
# 1. Navigate to project
cd "e:\New GitHub Projects\Mini Game Platform"

# 2. Install dependencies
npm install

# 3. Start development server
npm start
```

---

## 📋 WHAT HAPPENS WHEN YOU RUN THE SCRIPT

1. ✅ Checks if dependencies are installed
2. ✅ Runs `npm install` if needed (first time only)
3. ✅ Starts React dev server on port 3000
4. ✅ Browser opens automatically
5. ✅ You can play games immediately!

---

## 🎮 ONCE THE APP IS RUNNING

### Home Page
- See all available games
- View your total score stats
- Click on any game card to play

### Tic Tac Toe
- Click cells to place X or O
- First to 3 in a row wins
- Winning squares highlight in gold
- Click "Restart Game" to play again

### Memory Game
- Click cards to reveal emojis
- Match pairs of identical emojis
- Try to match all in fewest moves
- Your move count is tracked
- Click "Play Again" after winning

### Score Tracking
- Scores are saved automatically
- Persist even after closing browser
- View stats on home page
- Click "Reset Scores" to clear (on home page)

---

## 🛑 TO STOP THE SERVER

Press `Ctrl + C` in the terminal

---

## 📱 TESTING ON DIFFERENT DEVICES

### Desktop Browser
- Works perfectly at full resolution
- Use Chrome, Firefox, Safari, or Edge

### Mobile/Tablet
- Open same localhost URL on phone/tablet wifi
- Or use DevTools: F12 → Responsive Design Mode (Ctrl+Shift+M)

---

## 🔧 IF SOMETHING GOES WRONG

### "npm: command not found"
→ Install Node.js: https://nodejs.org/ (LTS version)
→ Restart your terminal after installation

### "Port 3000 already in use"
→ Open new terminal and use different port:
```powershell
$env:PORT=3001; npm start
```

### "Blank white page"
→ Open browser console (F12)
→ Look for error messages
→ Clear browser cache: Ctrl+Shift+Delete
→ Restart dev server: Ctrl+C then `npm start`

### "Styles not loading"
→ Delete node_modules folder
→ Run `npm install` again
→ Run `npm start`

---

## 📦 WHAT'S INSTALLED

- React 18 - UI library
- React Router - Navigation
- Framer Motion - Animations
- Tailwind CSS - Styling

---

## 📚 PROJECT FILES CREATED: 29 Total

### Core App Files (3)
- src/App.js
- src/index.js
- src/App.css

### Components (3)
- src/components/Navbar.js
- src/components/GameCard.js
- src/components/Loader.js

### Context & Hooks (2)
- src/context/ScoreContext.js
- src/hooks/useLocalStorage.js

### Pages (4)
- src/pages/Home/Home.js
- src/pages/Home/Home.css
- src/pages/GamePage/GamePage.js
- src/pages/GamePage/GamePage.css

### Games (4)
- src/games/TicTacToe/TicTacToe.js
- src/games/TicTacToe/TicTacToe.css
- src/games/MemoryGame/MemoryGame.js
- src/games/MemoryGame/MemoryGame.css

### Configuration Files (6)
- package.json
- tailwind.config.js
- postcss.config.js
- .env
- .gitignore

### Public Files (2)
- public/index.html
- public/favicon.ico

### Documentation (5)
- README.md
- SETUP.md
- COMPLETION.md
- QUICK_START.md (this file)
- src/styles/global.css

---

## ✨ KEY FEATURES READY TO USE

✅ 2 fully functional games
✅ Dark modern UI with gradients
✅ Smooth animations on everything
✅ Score tracking & persistence
✅ Mobile responsive design
✅ Easy navigation
✅ Professional code quality

---

## 🎯 NEXT STEPS

1. Run the script
2. Wait for browser to open
3. Play the games!
4. Your scores auto-save
5. Enjoy! 🎮

---

## 💡 TIPS

- Keep terminal open while developing
- Changes auto-reload (hot reload)
- Scores saved with localStorage
- No internet needed to play
- Fully self-contained app

---

## 📞 NEED HELP?

See: README.md for full documentation
Or: SETUP.md for detailed setup instructions

---

Ready? Run the start script now! 🚀
