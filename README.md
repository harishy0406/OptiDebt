# 📌 OptiDebt — Smart Debt Repayment Planner 

OptiDebt is a personal finance tool designed to help individuals **pay off their debts faster and smarter**. Instead of simply tracking expenses, OptiDebt **calculates the optimal repayment distribution** across multiple debts to minimize total interest and reduce repayment time.

It empowers users to **visualize debt progress**, compare repayment strategies (Snowball vs Avalanche vs LP optimization), and follow a personalized payoff plan.

---

## ✨ Key Features

| Feature | Description |
|--------|------------|
| 💰 Smart Repayment Planner | Calculates best repayment allocation within a fixed budget |
| 📊 Interactive Dashboard | Charts, timeline, progress bars & payoff visualization |
| ⚖️ Multiple Repayment Strategies | Snowball, Avalanche, and Linear Programming |
| 📈 Interest & Duration Insights | Shows total savings and debt-free timeline |
| 🎯 Financial Motivation | Milestones & visual progress tracking |

---

## 🧠 Debt Repayment Strategies Used

### ✅ Snowball Method (Motivation-First)
- Focus on smallest debt first  
- Quick wins → boosts motivation

### ✅ Avalanche Method (Cost-First)
- Target highest interest rate first  
- Saves maximum money long-term

### ✅ Linear Programming (Optimization-First)
- Uses mathematical optimization to minimize interest  
- Considers:
  - Total monthly budget
  - Minimum payment requirements
  - Remaining balances

> Implemented using Python (PuLP) or can be simulated logically in JS rules.

---

## 🛠️ Tech Stack

| Category | Tools |
|--------|-------|
| Frontend | HTML, CSS, JavaScript |
| Optimization Engine | Python (PuLP / SciPy — optional) |
| Data Handling | LocalStorage / JSON |
| Visualization | Chart.js / D3.js |
| Deployment | GitHub Pages / Browser |

---

## 📂 Project Structure

```
OptiDebt/
├── README.md
├── index.html
├── vite-config.ts                   
├── public/                 
└── src/                    
    ├── components/         
    │   ├── ui/             
    │   ├── DebtAmortizationChart.tsx
    │   ├── DebtForm.tsx
    │   ├── Footer.tsx
    │   ├── ... (other chart components)
    │   └── StrategySelector.tsx
    ├── hooks/              
    ├── lib/                
    ├── pages/              
    ├── types/              
    ├── App.tsx             
    ├── main.tsx
    └── App.css
```

---

## 🚀 How to Run

### ✅ Frontend Mode (Default)
1. Download the project / `git clone`
2. Open `index.html` in a browser
3. Enter debts, budget & view repayment suggestions

### ✅ Run LP Optimization Script (Optional)
```bash
pip install pulp
python optimization/lp_model.py
```

---

## 📸 Screenshots & UI Preview

| Dashboard | Repayment Planner | Charts |
|---|---|---|
| <img width="1309" height="837" alt="image" src="https://github.com/user-attachments/assets/609140a2-18a2-4a52-b45c-35eeebf36e27" /> | <img width="880" height="693" alt="image" src="https://github.com/user-attachments/assets/3d2d90a7-3d61-4067-8d37-2bf31d87b8fd" /> | <img width="916" height="779" alt="image" src="https://github.com/user-attachments/assets/ed49756c-9d70-4cee-a011-0e867633c6f0" />|

### 🎥 Demo Video (Optional)
📎 *Upload video link here*

---

## 📊 Sample Output Example

```
Optimal monthly repayment plan:
Debt A: ₹4200  
Debt B: ₹3500  
Debt C: ₹2300  
Total Interest Saved: ₹11,800  
```

---

## 🌟 Future Enhancements
- Mobile app version (React Native)
- Bank SMS / statement auto-sync
- Payment reminders system
- Voice-based assistant for financial guidance

---

## 💡 Why OptiDebt?

Debt repayment apps usually just track your loans.  
OptiDebt **plans and optimizes** them, giving:

✅ Faster payoff  
✅ Lower interest cost  
✅ Motivation + smart visualization  
✅ Beginner-friendly personal finance tool  

---

## 👤 Author
**Knight Rider**  
📍 India  

---

## 📝 License
MIT License — Feel free to use and improve with credit :)

---

## 📁 Add Screenshots Here
Inside `/assets/screenshots/` folder, add files like:

```
dashboard.png
add_debt_form.png
charts.png
comparison_view.png
results_summary.png
```

Use them in README like:

```md
![Dashboard](assets/screenshots/dashboard.png)
```

---

Happy Coding ✨  
Feel free to ⭐ the repo if you like it!




