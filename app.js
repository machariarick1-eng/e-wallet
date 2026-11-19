const STORAGE_KEY = "e-wallet-data-v1";
const names = { overview: "Overview", transactions: "Transactions", cashflow: "Cash flow", spending: "Spending", recurring: "Monthly items", savings: "Savings goals", investments: "Investments", planner: "Purchase planner", settings: "Settings" };
const icons = {
  grid: '<svg viewBox="0 0 24 24"><rect x="3.5" y="3.5" width="7" height="7" rx="1.5"/><rect x="13.5" y="3.5" width="7" height="7" rx="1.5"/><rect x="3.5" y="13.5" width="7" height="7" rx="1.5"/><rect x="13.5" y="13.5" width="7" height="7" rx="1.5"/></svg>',
  arrows: '<svg viewBox="0 0 24 24"><path d="M7 7h12l-3-3"/><path d="M17 17H5l3 3"/><path d="M19 7l-4 4"/><path d="M5 17l4-4"/></svg>',
  target: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.5"/><circle cx="12" cy="12" r="1"/></svg>',
  chart: '<svg viewBox="0 0 24 24"><path d="M4 19.5h16"/><path d="M6 16l4-5 3 2 5-7"/><path d="M15 6h3v3"/></svg>',
  bag: '<svg viewBox="0 0 24 24"><path d="M5 8h14l1 12H4L5 8Z"/><path d="M9 9V6a3 3 0 0 1 6 0v3"/></svg>',
  settings: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="m19.4 15 .1.1 1.1.9-1.1 1.9-1.4-.5a7.5 7.5 0 0 1-1.7 1l-.2 1.5h-2.2l-.3-1.5a7.5 7.5 0 0 1-1.8-1l-1.3.5-1.1-1.9 1.1-.9a7 7 0 0 1 0-2l-1.1-.9 1.1-1.9 1.4.5a7.5 7.5 0 0 1 1.7-1l.2-1.5h2.2l.3 1.5a7.5 7.5 0 0 1 1.8 1l1.3-.5 1.1 1.9-1.1.9a7 7 0 0 1 0 2Z" transform="translate(-1 -1) scale(.96)"/></svg>',
  wallet: '<svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="15" rx="2.5"/><path d="M3 9h18"/><path d="M16 14h2"/></svg>',
  up: '<svg viewBox="0 0 24 24"><path d="m4 16 6-6 4 4 6-7"/><path d="M14 7h6v6"/></svg>',
  down: '<svg viewBox="0 0 24 24"><path d="m4 8 6 6 4-4 6 7"/><path d="M14 17h6v-6"/></svg>',
  calendar: '<svg viewBox="0 0 24 24"><rect x="3.5" y="5" width="17" height="16" rx="2"/><path d="M7.5 3v4M16.5 3v4M3.5 10h17M8 14h2M14 14h2M8 17h2"/></svg>'
};
document.querySelectorAll("[data-icon]").forEach(el => { el.innerHTML = icons[el.dataset.icon] || ""; });

const today = new Date();
const iso = (date) => {
  const d = new Date(date);
  return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
};
const daysAgo = (n) => { const d = new Date(); d.setDate(d.getDate() - n); return iso(d); };
const monthAgo = (n) => { const d = new Date(); d.setDate(1); d.setMonth(d.getMonth() - n); return iso(d); };
function starterData() {
  return {
    currency: "KES",
    theme: "light",
    sample: true,
    transactions: [
      { id: uid(), name: "Monthly salary", category: "Salary", type: "income", amount: 4200, date: daysAgo(1), note: "" },
      { id: uid(), name: "Grocery run", category: "Food & dining", type: "expense", amount: 68.4, date: daysAgo(1), note: "" },
      { id: uid(), name: "Coffee & lunch", category: "Food & dining", type: "expense", amount: 24.5, date: daysAgo(2), note: "" },
      { id: uid(), name: "Train pass", category: "Transport", type: "expense", amount: 42, date: daysAgo(3), note: "" },
      { id: uid(), name: "Freelance project", category: "Other income", type: "income", amount: 380, date: daysAgo(5), note: "" },
      { id: uid(), name: "Electricity bill", category: "Home", type: "expense", amount: 86.2, date: daysAgo(6), note: "" },
      { id: uid(), name: "Weekend dinner", category: "Food & dining", type: "expense", amount: 53.8, date: daysAgo(8), note: "" },
      { id: uid(), name: "Streaming", category: "Subscriptions", type: "expense", amount: 14.99, date: daysAgo(10), note: "" },
      { id: uid(), name: "Pharmacy", category: "Health", type: "expense", amount: 31.7, date: daysAgo(12), note: "" },
      { id: uid(), name: "Monthly salary", category: "Salary", type: "income", amount: 4200, date: monthAgo(1), note: "" }
    ],
    goals: [
      { id: uid(), name: "Emergency fund", target: 6000, saved: 2400, due: addMonths(6), icon: "☂" },
      { id: uid(), name: "A little getaway", target: 1800, saved: 810, due: addMonths(4), icon: "✈" },
      { id: uid(), name: "New laptop", target: 1500, saved: 450, due: addMonths(3), icon: "⌘" }
    ],
    investments: [
      { id: uid(), name: "Index fund", type: "ETF", invested: 3200, value: 3488, date: daysAgo(150) },
      { id: uid(), name: "Company shares", type: "Stocks", invested: 1850, value: 2035, date: daysAgo(92) }
    ],
    recurringTransactions: [],
    reminderLog: {},
    plans: [
      { id: uid(), name: "Weekend in Lisbon", target: 900, saved: 320, due: addMonths(3), icon: "✈" },
      { id: uid(), name: "Noise-cancelling headphones", target: 280, saved: 80, due: addMonths(2), icon: "♫" }
    ]
  };
}
function addMonths(months) { const d = new Date(); d.setMonth(d.getMonth() + months); return iso(d); }
function uid() { return Math.random().toString(36).slice(2, 10) + Date.now().toString(36); }
function loadData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const initial = starterData();
      saveData(initial);
      return initial;
    }
    const data = JSON.parse(raw);
    if (!data || !Array.isArray(data.transactions) || !Array.isArray(data.goals) || !Array.isArray(data.investments) || !Array.isArray(data.plans)) throw new Error("Saved data has an unexpected format.");
    let migrated = false;
    if (!data.currency || (data.sample && data.currency === "USD")) { data.currency = "KES"; migrated = true; }
    if (data.theme !== "dark" && data.theme !== "light") { data.theme = "light"; migrated = true; }
    if (!Array.isArray(data.recurringTransactions)) { data.recurringTransactions = []; migrated = true; }
    if (!data.reminderLog || typeof data.reminderLog !== "object" || Array.isArray(data.reminderLog)) { data.reminderLog = {}; migrated = true; }
    if (migrated) saveData(data);
    return data;
  } catch (error) {
    console.error("Could not load e wallet data:", error);
    showToast("Couldn’t load your saved data. Check browser storage and refresh.");
    return { currency: "KES", theme: "light", sample: false, transactions: [], goals: [], investments: [], recurringTransactions: [], reminderLog: {}, plans: [] };
  }
}
let data = loadData();
function pageFromHash() {
  const page = location.hash.slice(1).split("?")[0];
  return names[page] ? page : "overview";
}
let activePage = pageFromHash();
let compactChartLayout = window.matchMedia("(max-width: 1000px)").matches;
let transactionFilter = "all";
let toastTimer;
const AUTH_SESSION_KEY = "e-wallet-session";
const LOGIN_USERNAME = "Erick";
const LOGIN_PASSWORD = "4695";
function saveData(next = data) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); }
  catch (error) { console.error("Could not save e wallet data:", error); showToast("Couldn’t save changes. Your browser storage may be full or disabled."); }
}
function money(amount, compact = false) {
  const currency = data.currency || "USD";
  try {
    const value = Number(amount) || 0;
    if (currency === "KES") return `Ksh ${new Intl.NumberFormat("en-KE", { maximumFractionDigits: compact ? 0 : 2, minimumFractionDigits: compact ? 0 : 2 }).format(value)}`;
    return new Intl.NumberFormat("en-KE", { style: "currency", currency, maximumFractionDigits: compact ? 0 : 2 }).format(value);
  }
  catch { return `${currency} ${(Number(amount) || 0).toFixed(compact ? 0 : 2)}`; }
}
function fmtDate(date) {
  if (!date) return "No date";
  return new Intl.DateTimeFormat(undefined, { month: "short", day: "numeric", year: "numeric" }).format(new Date(`${date}T00:00:00`));
}
function monthTransactions(date = new Date()) {
  return data.transactions.filter(t => {
    const d = new Date(`${t.date}T00:00:00`);
    return d.getMonth() === date.getMonth() && d.getFullYear() === date.getFullYear();
  });
}
function totals(transactions) {
  return transactions.reduce((sum, t) => { sum[t.type] = (sum[t.type] || 0) + Number(t.amount); return sum; }, { income: 0, expense: 0 });
}
function totalBalance() { const t = totals(data.transactions); return t.income - t.expense; }
function savingsTotal() { return data.goals.reduce((sum, g) => sum + Number(g.saved), 0); }
function investmentsValue() { return data.investments.reduce((sum, h) => sum + Number(h.value), 0); }
function showToast(message) {
  const el = document.getElementById("toast");
  el.textContent = message;
  el.classList.add("visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove("visible"), 2800);
}
function setAuthenticated(authenticated) {
  document.body.classList.toggle("authenticated", authenticated);
  document.getElementById("loginScreen").hidden = authenticated;
  window.scrollTo(0, 0);
}
function setProfileMenuOpen(open, returnFocus = false) {
  const menu = document.getElementById("profileMenu");
  const toggle = document.getElementById("profileMenuToggle");
  menu.hidden = !open;
  toggle.setAttribute("aria-expanded", String(open));
  if (!open && returnFocus) toggle.focus();
}
function setupLogin() {
  const form = document.getElementById("loginForm");
  const username = document.getElementById("loginUsername");
  const password = document.getElementById("loginPassword");
  const errorMessage = document.getElementById("loginError");
  const logoutButton = document.getElementById("logoutButton");
  const profileMenuToggle = document.getElementById("profileMenuToggle");
  profileMenuToggle.addEventListener("click", () => setProfileMenuOpen(document.getElementById("profileMenu").hidden));
  document.addEventListener("click", event => {
    if (!event.target.closest(".profile-control")) setProfileMenuOpen(false);
  });
  try {
    if (sessionStorage.getItem(AUTH_SESSION_KEY) === "unlocked") setAuthenticated(true);
  } catch (error) {
    console.error("Could not read the e wallet sign-in session:", error);
    errorMessage.textContent = "The browser session could not be checked. Please enable session storage and refresh.";
  }
  form.addEventListener("submit", event => {
    event.preventDefault();
    if (username.value.trim().toLowerCase() !== LOGIN_USERNAME.toLowerCase() || password.value !== LOGIN_PASSWORD) {
      errorMessage.textContent = "That username or password doesn’t match. Please try again.";
      password.value = "";
      password.focus();
      return;
    }
    try {
      sessionStorage.setItem(AUTH_SESSION_KEY, "unlocked");
    } catch (error) {
      console.error("Could not save the e wallet sign-in session:", error);
      errorMessage.textContent = "The browser couldn’t start a sign-in session. Please enable session storage and try again.";
      return;
    }
    errorMessage.textContent = "";
    setAuthenticated(true);
    render();
    checkRecurringReminders();
  });
  logoutButton.addEventListener("click", () => {
    try { sessionStorage.removeItem(AUTH_SESSION_KEY); }
    catch (error) { console.error("Could not clear the e wallet sign-in session:", error); }
    setProfileMenuOpen(false);
    setAuthenticated(false);
    password.value = "";
    errorMessage.textContent = "";
    username.focus();
  });
}
function applyTheme() {
  const theme = data.theme === "dark" ? "dark" : "light";
  document.documentElement.dataset.theme = theme;
  const button = document.getElementById("themeToggle");
  if (button) {
    const isDark = theme === "dark";
    button.setAttribute("aria-label", `Switch to ${isDark ? "light" : "dark"} theme`);
    button.title = `Switch to ${isDark ? "light" : "dark"} theme`;
    document.getElementById("themeIcon").textContent = isDark ? "☀" : "☾";
  }
  const themeColor = document.querySelector('meta[name="theme-color"]');
  if (themeColor) themeColor.content = theme === "dark" ? "#151d28" : "#f7f8fa";
}
function toggleTheme() {
  data.theme = data.theme === "dark" ? "light" : "dark";
  saveData();
  applyTheme();
  render();
  showToast(`${data.theme === "dark" ? "Dark" : "Light"} theme enabled.`);
}
function setPage(page, updateUrl = true) {
  if (!names[page]) return;
  activePage = page;
  if (updateUrl && location.hash !== `#${page}`) history.pushState({ page }, "", `#${page}`);
  document.querySelectorAll(".nav-item[data-page]").forEach(el => el.classList.toggle("active", el.dataset.page === page));
  document.getElementById("currentSection").textContent = names[page];
  closeSidebar();
  setProfileMenuOpen(false);
  render();
}
document.querySelectorAll("[data-page]").forEach(el => el.addEventListener("click", e => { e.preventDefault(); setPage(el.dataset.page); }));
window.addEventListener("popstate", () => setPage(pageFromHash(), false));
window.addEventListener("resize", () => {
  const compact = window.matchMedia("(max-width: 1000px)").matches;
  if (compact === compactChartLayout) return;
  compactChartLayout = compact;
  if (activePage === "cashflow") render();
});
function setSidebarOpen(open) {
  document.getElementById("sidebar").classList.toggle("open", open);
  document.getElementById("mobileMenu").setAttribute("aria-expanded", String(open));
}
function closeSidebar() { setSidebarOpen(false); }
document.getElementById("mobileMenu").addEventListener("click", () => setSidebarOpen(!document.getElementById("sidebar").classList.contains("open")));
document.getElementById("sidebarClose").addEventListener("click", closeSidebar);
document.getElementById("sidebarBackdrop").addEventListener("click", closeSidebar);
document.addEventListener("keydown", e => {
  if (e.key !== "Escape") return;
  if (document.getElementById("modalRoot").firstElementChild) closeModal();
  else if (!document.getElementById("profileMenu").hidden) setProfileMenuOpen(false, true);
  else closeSidebar();
});
document.getElementById("themeToggle").addEventListener("click", toggleTheme);
document.getElementById("todayLabel").textContent = new Intl.DateTimeFormat(undefined, { weekday: "short", month: "short", day: "numeric" }).format(today);
applyTheme();
setTimeout(() => {
  const loadingScreen = document.getElementById("loadingScreen");
  loadingScreen.classList.add("is-hidden");
  setTimeout(() => loadingScreen.remove(), 220);
}, 1000);

function heading(kicker, title, subtitle, action = "") {
  return `<div class="page-heading"><div><div class="eyebrow">${kicker}</div><h1>${title}</h1><p class="subheading">${subtitle}</p></div>${action}</div>`;
}
function actionButton(label, kind, orange = false) {
  return `<button class="button ${orange ? "orange" : ""}" data-action="${kind}"><span class="plus">+</span>${label}</button>`;
}
function metric(title, value, note, icon, page = "", filter = "") {
  const content = `<div class="metric-top">${title}<span class="metric-icon">${icons[icon]}</span></div><div class="metric-value">${value}</div><div class="metric-foot">${note}</div>`;
  if (page) return `<a class="metric-card metric-card-link" href="#${page}" data-page="${page}" ${filter ? `data-transaction-filter="${filter}"` : ""} aria-label="${title}: ${value}. Open ${names[page]}">${content}<span class="metric-link-arrow" aria-hidden="true">↗</span></a>`;
  return `<div class="metric-card">${content}</div>`;
}
function render() {
  const root = document.getElementById("appContent");
  root.innerHTML = activePage === "overview" ? renderOverview()
    : activePage === "transactions" ? renderTransactions()
    : activePage === "cashflow" ? renderCashflow()
    : activePage === "spending" ? renderSpending()
    : activePage === "recurring" ? renderRecurring()
    : activePage === "savings" ? renderSavings()
    : activePage === "investments" ? renderInvestments()
    : activePage === "planner" ? renderPlanner()
    : renderSettings();
  root.querySelectorAll("[data-delete]").forEach(el => el.addEventListener("click", () => deleteItem(el.dataset.delete, el.dataset.id)));
  root.querySelectorAll("[data-filter]").forEach(el => el.addEventListener("change", () => { transactionFilter = el.value; render(); }));
  root.querySelectorAll("[data-export]").forEach(el => el.addEventListener("click", exportTransactions));
  checkRecurringReminders();
}
function renderOverview() {
  const mt = totals(monthTransactions());
  const week = data.transactions.filter(t => (today - new Date(`${t.date}T00:00:00`)) / 86400000 < 7 && (today - new Date(`${t.date}T00:00:00`)) / 86400000 >= 0);
  const weeklyTotals = totals(week);
  const investGain = investmentsValue() - data.investments.reduce((s, h) => s + Number(h.invested), 0);
  const savingsTarget = data.goals.reduce((sum, goal) => sum + Number(goal.target), 0);
  const savingsProgress = savingsTarget ? Math.min(100, savingsTotal() / savingsTarget * 100) : 0;
  const planTarget = data.plans.reduce((sum, plan) => sum + Number(plan.target), 0);
  const planSaved = data.plans.reduce((sum, plan) => sum + Number(plan.saved), 0);
  return `${heading("YOUR MONEY, AT A GLANCE", "Good things are growing, Erick.", "Here’s how your money is moving this month.", actionButton("Add transaction", "transaction"))}
    <section class="cards-grid">
      ${metric("Net cash flow", money(totalBalance()), "Income less spending recorded", "wallet", "cashflow")}
      ${metric("Income this month", money(mt.income), `<span class="positive">↗</span> ${money(weeklyTotals.income)} in the last 7 days`, "up", "transactions", "income")}
      ${metric("Spending this month", money(mt.expense), `<span class="negative">↘</span> ${money(weeklyTotals.expense)} in the last 7 days`, "down", "spending")}
      ${metric("Savings & investments", money(savingsTotal() + investmentsValue()), `<span class="positive">↗</span> ${money(investGain)} investment growth`, "target", "savings")}
    </section>
    <section class="overview-feature-section" aria-label="Explore your money">
      <div class="overview-feature-heading"><div><div class="eyebrow">YOUR NEXT STEPS</div><h2>Make room for what matters.</h2></div><div class="overview-slider-controls"><button type="button" data-feature-slider="prev" aria-label="Previous featured item">←</button><button type="button" data-feature-slider="next" aria-label="Next featured item">→</button></div></div>
      <div class="overview-feature-slider" role="region" aria-label="Savings, investments, and purchase planner" aria-roledescription="carousel">
        <div class="overview-feature-track">
          <a class="overview-feature-card savings-feature" href="#savings" data-page="savings" aria-roledescription="slide" aria-label="1 of 3: Savings plan">
            <span class="overview-feature-icon" aria-hidden="true">${icons.target}</span><span class="overview-feature-copy"><small>BUILD TOWARD WHAT MATTERS</small><strong>Savings plan</strong><em>${data.goals.length} ${data.goals.length === 1 ? "goal" : "goals"} · ${Math.round(savingsProgress)}% of targets</em><b>${money(savingsTotal())}<span> saved</span></b><span class="overview-feature-progress"><i style="width:${savingsProgress}%"></i></span></span><span class="overview-feature-arrow" aria-hidden="true">↗</span>
          </a>
          <a class="overview-feature-card investments-feature" href="#investments" data-page="investments" aria-roledescription="slide" aria-label="2 of 3: Investments">
            <span class="overview-feature-icon" aria-hidden="true">${icons.chart}</span><span class="overview-feature-copy"><small>GROW AT YOUR OWN PACE</small><strong>Investments</strong><em>${data.investments.length} ${data.investments.length === 1 ? "holding" : "holdings"} · ${investGain >= 0 ? "Growth" : "Change"} ${money(Math.abs(investGain))}</em><b>${money(investmentsValue())}<span> current value</span></b><span class="overview-feature-caption">See your portfolio at a glance</span></span><span class="overview-feature-arrow" aria-hidden="true">↗</span>
          </a>
          <a class="overview-feature-card planner-feature" href="#planner" data-page="planner" aria-roledescription="slide" aria-label="3 of 3: Purchase planner">
            <span class="overview-feature-icon" aria-hidden="true">${icons.bag}</span><span class="overview-feature-copy"><small>PLAN THE GOOD STUFF</small><strong>Purchase planner</strong><em>${data.plans.length} ${data.plans.length === 1 ? "plan" : "plans"} in progress</em><b>${money(planSaved)}<span> of ${money(planTarget)} saved</span></b><span class="overview-feature-caption">Turn the things you want into doable goals</span></span><span class="overview-feature-arrow" aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </section>`;
}
function renderCashflow() {
  const month = totals(monthTransactions());
  const week = totals(data.transactions.filter(t => withinDays(t.date, 7)));
  const net = month.income - month.expense;
  return `${heading("THE BIGGER PICTURE", "Money in motion.", "See how your income and spending have moved over the last six months.")}
    <section class="cashflow-hero"><div class="cashflow-hero-copy"><span>THIS MONTH</span><h2>${net >= 0 ? "You’re in the green." : "Spending is running ahead."}</h2><p>Net flow <strong>${money(net)}</strong></p></div><div class="cashflow-totals"><div><span>Money in</span><strong>${money(month.income)}</strong><small>${money(week.income)} in the last 7 days</small></div><div><span>Money out</span><strong>${money(month.expense)}</strong><small>${money(week.expense)} in the last 7 days</small></div></div></section>
    <section class="panel cashflow-page-chart"><div class="panel-header"><div><h2 class="panel-title">Six-month view</h2><p class="panel-caption">Monthly income compared with spending</p></div><div class="chart-legend"><span class="legend-item"><i class="legend-dot"></i>Income</span><span class="legend-item"><i class="legend-dot orange"></i>Spending</span></div></div>${cashflowChart()}</section>`;
}
function renderSpending() {
  const expenses = monthTransactions().filter(t => t.type === "expense").slice().sort((a,b) => b.date.localeCompare(a.date));
  const week = data.transactions.filter(t => t.type === "expense" && withinDays(t.date, 7));
  const spent = expenses.reduce((sum,t) => sum + Number(t.amount), 0);
  const categories = new Set(expenses.map(t => t.category)).size;
  return `${heading("THE EVERYDAY CHOICES", "Your spending, in focus.", "A closer look at this month’s expenses and where they’re going.")}
    <section class="spending-hero"><div><span class="spending-overline">SPENT THIS MONTH</span><h2>${money(spent)}</h2><p>Across ${expenses.length} ${expenses.length===1?"expense":"expenses"} in ${categories} ${categories===1?"category":"categories"}.</p></div><div class="spending-week"><span>LAST 7 DAYS</span><strong>${money(week.reduce((sum,t) => sum + Number(t.amount), 0))}</strong><small>${week.length} ${week.length===1?"expense":"expenses"}</small></div></section>
    <section class="spending-page-grid"><div class="panel spending-category-panel"><div class="panel-header"><div><h2 class="panel-title">By category</h2><p class="panel-caption">Where this month’s spending is going</p></div></div>${spendingBreakdown()}</div><div class="panel spending-activity-panel"><div class="panel-header"><div><h2 class="panel-title">Recent expenses</h2><p class="panel-caption">${expenses.length} this month</p></div><button class="text-link" data-action="open-transactions">All activity</button></div>${transactionTable(expenses)}</div></section>`;
}
function cashflowChart() {
  const months = [];
  for (let i = 5; i >= 0; i--) {
    const d = new Date(); d.setDate(1); d.setMonth(d.getMonth() - i);
    months.push({ date: d, values: totals(monthTransactions(d)) });
  }
  const max = Math.max(100, ...months.flatMap(m => [m.values.income, m.values.expense])) * 1.18;
  const compact = compactChartLayout;
  const chartWidth = compact ? 360 : 900;
  const x = i => compact ? 54 + i * 49 : 55 + i * 160, y = value => 155 - (value / max) * 125;
  const line = key => months.map((m, i) => `${i ? "L" : "M"}${x(i)} ${y(m.values[key])}`).join(" ");
  const area = key => `${line(key)} L${x(5)} 158 L${x(0)} 158 Z`;
  const gridEnd = compact ? 340 : 880;
  return `<svg class="cashflow-chart" viewBox="0 0 ${chartWidth} 190" preserveAspectRatio="none" role="img" aria-label="Income and spending chart for the last six months"><defs><linearGradient id="incomeGradient" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#4d86c8" stop-opacity=".14"/><stop offset="1" stop-color="#4d86c8" stop-opacity="0"/></linearGradient><linearGradient id="expenseGradient" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#ee9b7d" stop-opacity=".13"/><stop offset="1" stop-color="#ee9b7d" stop-opacity="0"/></linearGradient></defs>
    ${[30,72,114,156].map(v=>`<line class="gridline" x1="45" y1="${v}" x2="${gridEnd}" y2="${v}"/>`).join("")}
    <path class="income-fill" d="${area("income")}"/><path class="expense-fill" d="${area("expense")}"/><path class="income-line" d="${line("income")}"/><path class="expense-line" d="${line("expense")}"/>
    ${months.map((m,i)=>`<circle class="point blue" cx="${x(i)}" cy="${y(m.values.income)}" r="3.2"/><circle class="point orange" cx="${x(i)}" cy="${y(m.values.expense)}" r="3.2"/><text x="${x(i)}" y="178" text-anchor="middle">${m.date.toLocaleDateString(undefined,{month:"short"})}</text>`).join("")}
    <text x="0" y="34">${money(max, true)}</text><text x="0" y="76">${money(max*.66, true)}</text><text x="0" y="118">${money(max*.33, true)}</text></svg>`;
}
function spendingBreakdown() {
  const expenses = monthTransactions().filter(t=>t.type === "expense");
  const categories = {};
  expenses.forEach(t => categories[t.category] = (categories[t.category] || 0) + Number(t.amount));
  const sorted = Object.entries(categories).sort((a,b)=>b[1]-a[1]).slice(0,5);
  const total = expenses.reduce((s,t)=>s+Number(t.amount),0);
  const colors = ["#4c87ce","#f2a181","#86c3a9","#a48bc9","#e8c66d"];
  if (!total) return `<div class="empty-state"><strong>No spending recorded this month.</strong>Add an expense to see your breakdown.</div>`;
  const gradient = sorted.reduce((acc, item, i) => {
    const start = sorted.slice(0,i).reduce((s,c)=>s+c[1],0)/total*100, end = start+item[1]/total*100;
    return acc.concat(`${colors[i]} ${start}% ${end}%`);
  }, []).join(",");
  const legend = sorted.map((item,i)=>`<div class="category-row"><i class="legend-dot" style="background:${colors[i]}"></i>${escapeHtml(item[0])}<strong>${money(item[1])}</strong></div>`).join("");
  return `<div class="donut-wrap"><div class="donut" style="background:conic-gradient(${gradient})"><div class="donut-center"><span>Total spent</span><strong>${money(total,true)}</strong></div></div><div class="category-legend">${legend}</div></div>`;
}
function goalMini(g) {
  const pct = Math.min(100, Number(g.saved) / Math.max(1, Number(g.target)) * 100);
  return `<div class="goal-mini"><div class="goal-mini-top"><span>${escapeHtml(g.name)}</span><strong>${Math.round(pct)}%</strong></div><div class="progress-track"><div class="progress-fill" style="width:${pct}%"></div></div><div class="goal-mini-foot">${money(g.saved)} of ${money(g.target)}</div></div>`;
}
function transactionTable(items) {
  if (!items.length) return `<div class="empty-state"><strong>No transactions yet.</strong>When you add one, it’ll show up here.</div>`;
  return `<div class="table-wrap"><table><thead><tr><th>TRANSACTION</th><th>CATEGORY</th><th>DATE</th><th>TYPE</th><th style="text-align:right">AMOUNT</th></tr></thead><tbody>${items.map(t=>`<tr><td><div class="transaction-name"><span class="transaction-symbol ${t.type}">${t.type==="income"?"↙":"↗"}</span>${escapeHtml(t.name)}</div></td><td>${escapeHtml(t.category)}</td><td>${fmtDate(t.date)}</td><td><span class="type-pill ${t.type}">${t.type==="income"?"Income":"Expense"}</span></td><td class="amount ${t.type}">${t.type==="income"?"+":"−"}${money(t.amount)}</td></tr>`).join("")}</tbody></table></div>`;
}
function renderTransactions() {
  const items = data.transactions.filter(t=>transactionFilter==="all"||t.type===transactionFilter).slice().sort((a,b)=>b.date.localeCompare(a.date));
  const month = totals(monthTransactions());
  const week = totals(data.transactions.filter(t=>withinDays(t.date,7)));
  const net = month.income - month.expense;
  const monthLabel = new Intl.DateTimeFormat(undefined, { month: "long", year: "numeric" }).format(today);
  return `${heading("THE LITTLE DETAILS", "Every in, every out.", "Keep an eye on the daily things that shape your bigger picture.", actionButton("Add transaction", "transaction"))}
    <section class="ledger-hero">
      <div class="ledger-lead"><span class="ledger-overline">${monthLabel.toUpperCase()} · MONEY IN MOTION</span><p>Your month so far</p><h2>${money(net)} <small>net flow</small></h2><div class="ledger-note">${net >= 0 ? "You’re bringing in more than you’re spending." : "Your spending is ahead of income this month."}</div></div>
      <div class="ledger-snapshot"><div class="ledger-snapshot-row income"><span><i>↙</i>Money in</span><strong>${money(month.income)}</strong></div><div class="ledger-snapshot-row expense"><span><i>↗</i>Money out</span><strong>${money(month.expense)}</strong></div><div class="ledger-week-note"><span>Last 7 days</span><span>${money(week.income)} in <b>·</b> ${money(week.expense)} out</span></div></div>
    </section>
    <section class="panel wide-panel ledger-panel"><div class="panel-header"><div><h2 class="panel-title">Your ledger</h2><p class="panel-caption">${items.length} ${items.length===1?"entry":"entries"} ${transactionFilter==="all"?"recorded":`shown as ${transactionFilter}`}</p></div><div class="list-toolbar"><select class="select" data-filter aria-label="Filter transactions"><option value="all" ${transactionFilter==="all"?"selected":""}>All activity</option><option value="income" ${transactionFilter==="income"?"selected":""}>Income only</option><option value="expense" ${transactionFilter==="expense"?"selected":""}>Expenses only</option></select><button class="button secondary" data-export>↓ Export CSV</button></div></div>${transactionTable(items)}</section>`;
}
function withinDays(date, days) { const n = (new Date(`${iso(today)}T00:00:00`) - new Date(`${date}T00:00:00`)) / 86400000; return n >= 0 && n < days; }
function currentMonthKey() {
  const date = new Date();
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
}
function renderRecurring() {
  const items = data.recurringTransactions || [];
  const active = items.filter(item => item.active !== false);
  const monthlyExpenses = active.filter(item => item.type === "expense").reduce((sum, item) => sum + Number(item.amount), 0);
  const monthlyIncome = active.filter(item => item.type === "income").reduce((sum, item) => sum + Number(item.amount), 0);
  const month = currentMonthKey();
  const cards = items.map(item => {
    const recorded = item.lastRecordedMonth === month;
    const enabled = item.active !== false;
    const lead = Number(item.remindDaysBefore) || 0;
    return `<article class="recurring-card ${enabled ? "" : "paused"}"><div class="recurring-card-top"><div class="recurring-icon">${item.type === "income" ? "↙" : "↗"}</div><button class="icon-button" aria-label="Delete ${escapeHtml(item.name)}" data-delete="recurring" data-id="${item.id}">×</button></div><h3>${escapeHtml(item.name)}</h3><div class="card-meta">${escapeHtml(item.category)} · ${item.type === "income" ? "Income" : "Expense"}</div><div class="card-balance">${money(item.amount)} <small>each month</small></div><div class="recurring-details"><span>Due on day ${Number(item.dayOfMonth)} each month</span><span>${lead ? `Reminder ${lead} day${lead === 1 ? "" : "s"} before` : "Reminder on due day"}</span></div><div class="recurring-status"><span class="type-pill ${recorded ? "income" : ""}">${!enabled ? "Paused" : recorded ? "Recorded this month" : "Not recorded this month"}</span><button class="text-link" data-action="toggle-recurring" data-id="${item.id}">${enabled ? "Pause" : "Resume"}</button></div><button class="button secondary record-button" data-action="record-recurring" data-id="${item.id}" ${recorded || !enabled ? "disabled" : ""}>${recorded ? "Recorded this month" : "Record this month"}</button></article>`;
  }).join("");
  const permission = "Notification" in window ? Notification.permission : "unsupported";
  const browserAlerts = permission === "granted" ? "Browser alerts are enabled." : permission === "denied" ? "Browser alerts are blocked in this browser’s site settings." : permission === "unsupported" ? "Browser alerts aren’t available here; in-app reminders still work." : "Allow optional browser alerts for due reminders.";
  return `${heading("STAY A STEP AHEAD", "Your monthly rhythm.", "Keep regular bills and income in view. We’ll remind you when they’re due.", actionButton("Add monthly item", "recurring", true))}
    <section class="cards-grid">${metric("Monthly expenses",money(monthlyExpenses),"From your active monthly items","down")}${metric("Monthly income",money(monthlyIncome),"From your active monthly items","up")}${metric("Monthly items",items.length,`${active.length} active reminder${active.length === 1 ? "" : "s"}`,"calendar")}${metric("Recorded this month",items.filter(item => item.lastRecordedMonth === month).length,"From your monthly list","wallet")}</section>
    <section class="panel wide-panel"><div class="panel-header"><div><h2 class="panel-title">Monthly transactions</h2><p class="panel-caption">Reminders are checked while e wallet is open. Recording one adds it to Transactions.</p></div><button class="button secondary" data-action="enable-notifications">${permission === "granted" ? "Browser alerts enabled" : "Enable browser alerts"}</button></div><p class="notification-note">${browserAlerts} Browser alerts require permission and a secure site such as GitHub Pages.</p><div class="recurring-grid">${cards || `<div class="empty-state"><strong>Nothing on repeat yet.</strong>Add your regular monthly bills or income to receive due reminders.</div>`}</div></section>`;
}
function renderSavings() {
  const goals = data.goals.map(g=>{
    const pct = Math.min(100, Number(g.saved)/Math.max(1,Number(g.target))*100);
    return `<article class="goal-card"><div class="goal-card-top"><div class="goal-icon">${escapeHtml(g.icon||"✳")}</div><button class="icon-button" aria-label="Delete ${escapeHtml(g.name)}" data-delete="goal" data-id="${g.id}">×</button></div><h3>${escapeHtml(g.name)}</h3><div class="card-meta">Target date · ${fmtDate(g.due)}</div><div class="card-balance">${money(g.saved)} <small>of ${money(g.target)}</small></div><div class="progress-track"><div class="progress-fill" style="width:${pct}%"></div></div><div class="goal-mini-foot">${Math.round(pct)}% there · ${money(Math.max(0,g.target-g.saved))} to go</div><div class="card-actions"><button class="button secondary" data-action="contribute-goal" data-id="${g.id}">＋ Add savings</button></div></article>`;
  }).join("");
  const saved = savingsTotal(), target = data.goals.reduce((s,g)=>s+Number(g.target),0);
  const progress = target ? Math.min(100, saved / target * 100) : 0;
  const remaining = Math.max(0, target - saved);
  const nextGoal = data.goals.filter(g => Number(g.saved) < Number(g.target)).sort((a,b) => (Number(a.target)-Number(a.saved)) - (Number(b.target)-Number(b.saved)))[0];
  return `${heading("MAKE ROOM FOR WHAT MATTERS", "Your future, taking shape.", "Set a goal, build a habit, and celebrate the little milestones.", actionButton("Create a goal", "goal"))}
    <section class="savings-hero"><div class="savings-hero-copy"><span class="savings-overline">SMALL STEPS ADD UP</span><h2>Your saved money has a purpose.</h2><p>You’ve set aside <strong>${money(saved)}</strong> across ${data.goals.length} ${data.goals.length===1?"goal":"goals"}.</p><div class="savings-hero-footer"><span>${money(remaining)} left to reach your targets</span><span>${Math.round(progress)}% of the way</span></div><div class="savings-progress-track"><span style="width:${progress}%"></span></div></div><div class="savings-next-goal"><span class="next-goal-label">NEXT MILESTONE</span>${nextGoal ? `<strong>${escapeHtml(nextGoal.name)}</strong><span>${money(Math.max(0,Number(nextGoal.target)-Number(nextGoal.saved)))} to go</span>` : `<strong>All goals reached</strong><span>Take a moment to celebrate.</span>`}<span class="savings-spark" aria-hidden="true">✳</span></div></section>
    <section class="savings-section"><div class="section-intro"><div><span class="eyebrow">YOUR GOALS</span><h2>A little at a time</h2></div><p>${money(monthGoalContributions())} added this month</p></div><div class="goal-grid">${goals||`<div class="empty-state"><strong>No goals just yet.</strong>Give your next big thing a name and a number.</div>`}</div></section>`;
}
function monthGoalContributions() { return data.goalContributions ? data.goalContributions.filter(c=>c.date.slice(0,7)===iso(today).slice(0,7)).reduce((s,c)=>s+c.amount,0):0; }
function renderInvestments() {
  const invested = data.investments.reduce((s,h)=>s+Number(h.invested),0), current = investmentsValue(), gain = current-invested;
  const holdings = data.investments.map(h=>`<article class="holding-card"><div class="holding-top"><div class="holding-icon">${h.type==="Crypto"?"◇":h.type==="Stocks"?"↗":"◒"}</div><button class="icon-button" aria-label="Delete ${escapeHtml(h.name)}" data-delete="investment" data-id="${h.id}">×</button></div><h3>${escapeHtml(h.name)}</h3><div class="card-meta">${escapeHtml(h.type)} · Added ${fmtDate(h.date)}</div><div class="card-balance">${money(h.value)}</div><div class="return-label">${Number(h.value)>=Number(h.invested)?"↗ ":"↘ "}${money(Math.abs(h.value-h.invested))} ${Number(h.value)>=Number(h.invested)?"growth":"change"} · ${money(h.invested)} invested</div></article>`).join("");
  const percent = invested ? (gain / invested) * 100 : 0;
  return `${heading("GROW AT YOUR OWN PACE", "Invest in your tomorrow.", "A clear view of what you’ve put in and where it stands today.", actionButton("Add investment", "investment"))}
    <section class="portfolio-hero"><div class="portfolio-hero-copy"><span class="portfolio-overline">YOUR TRACKED PORTFOLIO</span><p>Current value</p><h2>${money(current)}</h2><div class="portfolio-performance ${gain >= 0 ? "positive" : "negative"}">${gain >= 0 ? "↗" : "↘"} ${money(Math.abs(gain))} ${gain >= 0 ? "growth" : "change"} <span>· ${percent.toFixed(1)}% overall</span></div></div><div class="portfolio-hero-stats"><div><span>Amount invested</span><strong>${money(invested)}</strong></div><div><span>Tracked holdings</span><strong>${data.investments.length}</strong></div></div><div class="portfolio-decoration" aria-hidden="true"><i></i><i></i><i></i></div></section>
    <section class="portfolio-section"><div class="section-intro"><div><span class="eyebrow">WHAT YOU OWN</span><h2>Your holdings</h2></div><p>Update values whenever you like</p></div><div class="holding-grid">${holdings||`<div class="empty-state"><strong>Your portfolio is waiting.</strong>Add an investment to start tracking its value.</div>`}</div></section>
    <div class="sample-notice"><span><strong>A note on investing.</strong> Values here are for personal tracking only and aren’t live market prices or investment advice.</span></div>`;
}
function renderPlanner() {
  const cards = data.plans.map(p=>{
    const days = Math.max(1, Math.ceil((new Date(`${p.due}T00:00:00`)-new Date(`${iso(today)}T00:00:00`))/86400000));
    const weeks = Math.max(1, Math.ceil(days/7)), months = Math.max(1, Math.ceil(days/30));
    const remaining = Math.max(0, Number(p.target)-Number(p.saved));
    const pct = Math.min(100, Number(p.saved)/Math.max(1,Number(p.target))*100);
    return `<article class="planner-card"><div class="planner-top"><div class="planner-icon">${escapeHtml(p.icon||"✳")}</div><button class="icon-button" aria-label="Delete ${escapeHtml(p.name)}" data-delete="plan" data-id="${p.id}">×</button></div><h3>${escapeHtml(p.name)}</h3><div class="card-meta">Your target · ${money(p.target)}</div><div class="progress-track"><div class="progress-fill" style="width:${pct}%"></div></div><div class="planner-card target-date"><span>${money(p.saved)} saved</span><span>${fmtDate(p.due)}</span></div><div class="planner-result">Set aside per week<strong>${money(remaining/weeks)}</strong><span>or ${money(remaining/months)} a month</span></div><div class="card-actions"><button class="button secondary" data-action="contribute-plan" data-id="${p.id}">＋ Add to fund</button></div></article>`;
  }).join("");
  return `${heading("PLAN THE GOOD STUFF", "Make it happen, one week at a time.", "Turn the thing you want into a saving plan that feels doable.", actionButton("Plan a purchase", "plan", true))}
    <section class="planner-intro"><div><span class="planner-overline">A PLAN YOU CAN LIVE WITH</span><h2>Big things get easier when you break them down.</h2><p>Choose what you want and when you want it. We’ll show you a weekly and monthly saving target.</p></div><div class="planner-equation"><span>WHAT'S LEFT</span><b>÷</b><span>TIME YOU HAVE</span><b>=</b><strong>A DOABLE PLAN</strong></div></section>
    <section class="planner-section"><div class="section-intro"><div><span class="eyebrow">ON YOUR WISH LIST</span><h2>Plans in progress</h2></div><p>${data.plans.length} ${data.plans.length===1?"plan":"plans"} you’re working towards</p></div><div class="planner-grid">${cards||`<div class="empty-state"><strong>What are you saving up for?</strong>Add something you’re looking forward to and we’ll work out the weekly amount.</div>`}</div></section>`;
}
function renderSettings() {
  const currencies = [["USD","US Dollar"],["EUR","Euro"],["GBP","British Pound"],["CAD","Canadian Dollar"],["AUD","Australian Dollar"],["INR","Indian Rupee"],["JPY","Japanese Yen"],["NGN","Nigerian Naira"],["KES","Kenyan Shilling"],["GHS","Ghanaian Cedi"]];
  const currencyOptions = currencies.map(([code,label])=>`<option value="${code}" ${data.currency===code?"selected":""}>${code} · ${label}</option>`).join("");
  return `${heading("MAKE IT YOURS", "A few things to know.", "Your data belongs to you. Here’s how this little app works.")}
    <div class="settings-grid"><section class="panel"><h2 class="panel-title">Preferences</h2><div class="settings-row"><div><strong>Display currency</strong><span>Used to format amounts throughout the app</span></div><select id="currencySelect" class="select setting-control" aria-label="Display currency">${currencyOptions}</select></div><div class="settings-row"><div><strong>Appearance</strong><span>Choose a comfortable theme for your screen</span></div><button class="button secondary" data-action="toggle-theme">Use ${data.theme === "dark" ? "light" : "dark"} theme</button></div><div class="settings-row"><div><strong>Monthly reminders</strong><span>In-app reminders work while e wallet is open. Browser alerts also need permission and a secure site.</span></div><button class="button secondary" data-action="enable-notifications">Enable browser alerts</button></div><div class="settings-row"><div><strong>Where your data lives</strong><span>Your entries are stored in this browser on this device only.</span></div><span class="privacy-dot"></span></div><div class="settings-row"><div><strong>Take your data with you</strong><span>Download a copy of your transactions as a CSV file.</span></div><button class="button secondary" data-export>↓ Export CSV</button></div>
    <div class="danger-zone"><h3>Start fresh</h3><p>This removes all transactions, monthly items, savings goals, investments, and purchase plans saved in this browser.</p><button class="button secondary" data-action="reset-data">Start fresh</button></div></section>
    <section class="panel"><h2 class="panel-title">A little about e wallet</h2><p class="subheading" style="line-height:1.9;margin-top:12px">A calm place to see where your money goes, celebrate what you save, and plan for the things you’re looking forward to.</p><div class="settings-row"><div><strong>Private by design</strong><span>There’s no account, server, or tracking. Your data stays in your browser’s local storage.</span></div></div><div class="settings-row"><div><strong>Keep a backup</strong><span>Browser data can be cleared when you reset your device. Export your transactions regularly to keep a copy.</span></div></div></section></div>`;
}
function handleAction(action, id) {
  if (action === "open-transactions") return setPage("transactions");
  if (action === "open-savings") return setPage("savings");
  if (action === "open-settings") return setPage("settings");
  if (action === "transaction") return openModal("transaction");
  if (action === "recurring") return openModal("recurring");
  if (action === "goal") return openModal("goal");
  if (action === "investment") return openModal("investment");
  if (action === "plan") return openModal("plan");
  if (action === "contribute-goal") return openModal("contribute-goal", id || document.activeElement.dataset.id);
  if (action === "contribute-plan") return openModal("contribute-plan", id || document.activeElement.dataset.id);
  if (action === "toggle-recurring") return toggleRecurring(id);
  if (action === "record-recurring") return recordRecurring(id);
  if (action === "enable-notifications") return enableBrowserNotifications();
  if (action === "toggle-theme") return toggleTheme();
  if (action === "reset-data") { if (confirm("Permanently remove all e wallet data saved in this browser? This can’t be undone.")) { data = { currency: data.currency, theme: data.theme, sample: false, transactions: [], goals: [], investments: [], recurringTransactions: [], reminderLog: {}, plans: [], goalContributions: [] }; saveData(); render(); showToast("Your local data has been cleared."); } return; }
  if (action === "currency") { const select = document.getElementById("currencySelect"); if (select) { data.currency = select.value; saveData(); render(); showToast("Currency preference saved."); } }
}
document.getElementById("appContent").addEventListener("click", e => {
  const sliderControl = e.target.closest("[data-feature-slider]");
  if (sliderControl) {
    const track = document.querySelector(".overview-feature-track");
    if (track) track.scrollBy({ left: (sliderControl.dataset.featureSlider === "next" ? 1 : -1) * track.clientWidth, behavior: "smooth" });
    return;
  }
  const button = e.target.closest("[data-action]");
  if (button) handleAction(button.dataset.action, button.dataset.id);
});
function openModal(kind, id) {
  const templates = {
    transaction: { title: "Add a transaction", subtitle: "A little bit of tracking goes a long way.", fields: `<div class="field full"><label for="entry-name">What was it?</label><input id="entry-name" name="name" required maxlength="60" placeholder="e.g. Weekly groceries"></div><div class="field"><label for="entry-type">Type</label><select id="entry-type" name="type"><option value="expense">Expense</option><option value="income">Income</option></select></div><div class="field"><label for="entry-amount">Amount</label><input id="entry-amount" name="amount" type="number" min="0.01" step="0.01" required placeholder="0.00"></div><div class="field"><label for="entry-category">Category</label><select id="entry-category" name="category"><option>Food & dining</option><option>Home</option><option>Transport</option><option>Shopping</option><option>Health</option><option>Subscriptions</option><option>Entertainment</option><option>Salary</option><option>Other income</option><option>Other</option></select></div><div class="field"><label for="entry-date">Date</label><input id="entry-date" name="date" type="date" value="${iso(today)}" required></div>` },
    recurring: { title: "Add a monthly item", subtitle: "Set a reminder for a bill or income you expect every month.", fields: `<div class="field full"><label for="recurring-name">What happens each month?</label><input id="recurring-name" name="name" required maxlength="60" placeholder="e.g. Internet bill"></div><div class="field"><label for="recurring-type">Type</label><select id="recurring-type" name="type"><option value="expense">Expense</option><option value="income">Income</option></select></div><div class="field"><label for="recurring-amount">Amount</label><input id="recurring-amount" name="amount" type="number" min="0.01" step="0.01" required placeholder="0.00"></div><div class="field"><label for="recurring-category">Category</label><select id="recurring-category" name="category"><option>Home</option><option>Utilities</option><option>Subscriptions</option><option>Transport</option><option>Food & dining</option><option>Salary</option><option>Other income</option><option>Other</option></select></div><div class="field"><label for="recurring-day">Due day of month</label><input id="recurring-day" name="dayOfMonth" type="number" min="1" max="31" step="1" required value="1"></div><div class="field full"><label for="recurring-reminder">Remind me</label><select id="recurring-reminder" name="remindDaysBefore"><option value="0">On the due day</option><option value="1" selected>1 day before</option><option value="3">3 days before</option><option value="7">7 days before</option></select></div>` },
    goal: { title: "Create a savings goal", subtitle: "Give your future plans a place to grow.", fields: `<div class="field full"><label for="goal-name">What are you saving for?</label><input id="goal-name" name="name" required maxlength="50" placeholder="e.g. Emergency fund"></div><div class="field"><label for="goal-target">Target amount</label><input id="goal-target" name="target" type="number" min="0.01" step="0.01" required placeholder="0.00"></div><div class="field"><label for="goal-saved">Already saved</label><input id="goal-saved" name="saved" type="number" min="0" step="0.01" value="0"></div><div class="field"><label for="goal-date">Target date</label><input id="goal-date" name="due" type="date" value="${addMonths(6)}" required></div><div class="field"><label for="goal-icon">Little symbol</label><select id="goal-icon" name="icon"><option value="✳">✳ A fresh start</option><option value="✈">✈ A trip</option><option value="⌂">⌂ A home</option><option value="☂">☂ A safety net</option><option value="♫">♫ Something fun</option><option value="⌘">⌘ A new gadget</option></select></div>` },
    investment: { title: "Add an investment", subtitle: "Keep your portfolio in one simple view.", fields: `<div class="field full"><label for="investment-name">Investment name</label><input id="investment-name" name="name" required maxlength="50" placeholder="e.g. Global index fund"></div><div class="field"><label for="investment-type">Type</label><select id="investment-type" name="type"><option>ETF</option><option>Stocks</option><option>Bonds</option><option>Crypto</option><option>Other</option></select></div><div class="field"><label for="investment-date">Date added</label><input id="investment-date" name="date" type="date" value="${iso(today)}" required></div><div class="field"><label for="investment-invested">Amount invested</label><input id="investment-invested" name="invested" type="number" min="0.01" step="0.01" required placeholder="0.00"></div><div class="field"><label for="investment-value">Current value</label><input id="investment-value" name="value" type="number" min="0" step="0.01" required placeholder="0.00"></div>` },
    plan: { title: "Plan something lovely", subtitle: "We’ll work out a weekly savings target for you.", fields: `<div class="field full"><label for="plan-name">What do you have in mind?</label><input id="plan-name" name="name" required maxlength="50" placeholder="e.g. A long weekend away"></div><div class="field"><label for="plan-target">How much will it cost?</label><input id="plan-target" name="target" type="number" min="0.01" step="0.01" required placeholder="0.00"></div><div class="field"><label for="plan-saved">Already put aside</label><input id="plan-saved" name="saved" type="number" min="0" step="0.01" value="0"></div><div class="field"><label for="plan-date">When would you like it?</label><input id="plan-date" name="due" type="date" min="${iso(today)}" value="${addMonths(3)}" required></div><div class="field"><label for="plan-icon">Pick a symbol</label><select id="plan-icon" name="icon"><option value="✈">✈ A trip</option><option value="♫">♫ Music & tech</option><option value="⌂">⌂ Something for home</option><option value="✳">✳ Something special</option><option value="☀">☀ An experience</option></select></div>` },
    "contribute-goal": { title: "Add to your savings", subtitle: "Every little bit brings you closer.", fields: `<input type="hidden" name="id" value="${id}"><div class="field full"><label for="contribution-amount">How much are you adding?</label><input id="contribution-amount" name="amount" type="number" min="0.01" step="0.01" required placeholder="0.00"></div>` },
    "contribute-plan": { title: "Add to your fund", subtitle: "You’re one step closer to making it happen.", fields: `<input type="hidden" name="id" value="${id}"><div class="field full"><label for="contribution-amount">How much are you adding?</label><input id="contribution-amount" name="amount" type="number" min="0.01" step="0.01" required placeholder="0.00"></div>` }
  };
  const template = templates[kind];
  if (!template) return;
  document.getElementById("modalRoot").innerHTML = `<div class="modal-backdrop" data-close-modal><section class="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title"><div class="modal-header"><div><h2 id="modal-title">${template.title}</h2><p>${template.subtitle}</p></div><button type="button" class="close-button" aria-label="Close dialog" data-close-modal>×</button></div><form id="entryForm"><div class="form-grid">${template.fields}</div><div class="modal-actions"><button type="button" class="button secondary" data-close-modal>Cancel</button><button type="submit" class="button">Save ${kind.startsWith("contribute")?"contribution":"details"}</button></div></form></section></div>`;
  document.getElementById("modalRoot").querySelectorAll("[data-close-modal]").forEach(el => el.addEventListener("click", e => { if (e.target === el || el.tagName === "BUTTON") closeModal(); }));
  document.getElementById("entryForm").addEventListener("submit", e => { e.preventDefault(); submitForm(kind, new FormData(e.target)); });
  const first = document.querySelector("#entryForm input:not([type=hidden])");
  if (first) first.focus();
}
function closeModal() { document.getElementById("modalRoot").innerHTML = ""; }
function submitForm(kind, form) {
  const v = Object.fromEntries(form.entries());
  const amount = Number(v.amount || v.target);
  if (v.name !== undefined && !v.name.trim()) { showToast("Please add a name before saving."); return; }
  if (!Number.isFinite(amount) || amount <= 0) { showToast("Please enter an amount greater than zero."); return; }
  if (kind === "transaction") data.transactions.push({ id: uid(), name: v.name.trim(), type: v.type, amount, date: v.date, category: v.category, note: "" });
  if (kind === "recurring") {
    const dayOfMonth = Number(v.dayOfMonth);
    if (!Number.isInteger(dayOfMonth) || dayOfMonth < 1 || dayOfMonth > 31) { showToast("Choose a due day between 1 and 31."); return; }
    data.recurringTransactions.push({ id: uid(), name: v.name.trim(), type: v.type, amount, category: v.category, dayOfMonth, remindDaysBefore: Number(v.remindDaysBefore), active: true, lastRecordedMonth: "" });
  }
  if (kind === "goal") {
    if (Number(v.saved) > Number(v.target)) { showToast("Your starting savings can’t be more than the goal."); return; }
    data.goals.push({ id: uid(), name: v.name.trim(), target: Number(v.target), saved: Number(v.saved || 0), due: v.due, icon: v.icon });
  }
  if (kind === "investment") data.investments.push({ id: uid(), name: v.name.trim(), type: v.type, invested: Number(v.invested), value: Number(v.value), date: v.date });
  if (kind === "plan") {
    if (Number(v.saved) > Number(v.target)) { showToast("Your amount saved can’t be more than the target."); return; }
    if (v.due < iso(today)) { showToast("Choose a target date in the future."); return; }
    data.plans.push({ id: uid(), name: v.name.trim(), target: Number(v.target), saved: Number(v.saved || 0), due: v.due, icon: v.icon });
  }
  if (kind === "contribute-goal" || kind === "contribute-plan") {
    const list = kind === "contribute-goal" ? data.goals : data.plans;
    const item = list.find(x=>x.id===v.id);
    if (!item) { closeModal(); showToast("That item couldn’t be found."); return; }
    item.saved = Number(item.saved) + amount;
    if (kind === "contribute-goal") {
      if (!data.goalContributions) data.goalContributions = [];
      data.goalContributions.push({ amount, date: iso(today), goalId: item.id });
    }
  }
  saveData(); closeModal();
  showToast(kind.startsWith("contribute") ? "Nice work. Your progress is updated." : kind === "recurring" ? "Monthly item saved." : "Saved. Your money is up to date.");
  render();
}
function deleteItem(kind, id) {
  if (!confirm("Remove this item? This can’t be undone.")) return;
  const key = kind === "goal" ? "goals" : kind === "investment" ? "investments" : kind === "recurring" ? "recurringTransactions" : "plans";
  data[key] = data[key].filter(item=>item.id!==id);
  if (kind === "goal" && data.goalContributions) data.goalContributions = data.goalContributions.filter(c=>c.goalId!==id);
  saveData(); render(); showToast("Item removed.");
}
function toggleRecurring(id) {
  const item = data.recurringTransactions.find(entry => entry.id === id);
  if (!item) { showToast("That monthly item couldn’t be found."); return; }
  item.active = item.active === false;
  saveData();
  showToast(`${item.name} ${item.active ? "reminder resumed" : "reminder paused"}.`);
  render();
}
function recordRecurring(id) {
  const item = data.recurringTransactions.find(entry => entry.id === id);
  if (!item || item.active === false) { showToast("That monthly item isn’t active."); return; }
  const month = currentMonthKey();
  if (item.lastRecordedMonth === month) { showToast("This item is already recorded for this month."); return; }
  data.transactions.push({ id: uid(), name: item.name, type: item.type, amount: Number(item.amount), date: iso(today), category: item.category, note: "Monthly item" });
  item.lastRecordedMonth = month;
  saveData(); render();
  showToast(`${item.name} added to this month’s transactions.`);
}
function checkRecurringReminders() {
  if (!document.body.classList.contains("authenticated")) return;
  const items = (data.recurringTransactions || []).filter(item => item.active !== false);
  if (!items.length) return;
  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const month = currentMonthKey();
  const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
  const dueItems = [];
  items.forEach(item => {
    if (item.lastRecordedMonth === month || data.reminderLog[item.id] === month) return;
    const day = Number(item.dayOfMonth);
    if (!Number.isInteger(day) || day < 1 || day > 31) return;
    const dueDate = new Date(now.getFullYear(), now.getMonth(), Math.min(day, lastDay));
    const remindOn = new Date(dueDate);
    remindOn.setDate(remindOn.getDate() - Math.max(0, Number(item.remindDaysBefore) || 0));
    if (todayStart < remindOn) return;
    data.reminderLog[item.id] = month;
    dueItems.push(item);
  });
  if (!dueItems.length) return;
  saveData();
  const title = dueItems.length === 1 ? "A monthly transaction is due" : `${dueItems.length} monthly transactions are due`;
  const body = dueItems.map(item => `${item.name}: ${money(item.amount)}`).join(" · ").slice(0, 240);
  showToast(dueItems.length === 1 ? `${dueItems[0].name} is due soon.` : `${dueItems.length} monthly items are due soon.`);
  if ("Notification" in window && Notification.permission === "granted") {
    try { new Notification(title, { body, tag: `e-wallet-${month}` }); }
    catch (error) { console.error("Could not display a browser reminder:", error); showToast("A reminder is due, but the browser notification couldn’t be displayed."); }
  }
}
async function enableBrowserNotifications() {
  if (!("Notification" in window)) { showToast("This browser doesn’t support notifications. In-app reminders still work."); return; }
  if (!window.isSecureContext) { showToast("Browser alerts need a secure site such as GitHub Pages. In-app reminders still work."); return; }
  if (Notification.permission === "granted") { showToast("Browser alerts are already enabled."); return; }
  if (Notification.permission === "denied") { showToast("Allow notifications for this site in your browser settings."); return; }
  try {
    const permission = await Notification.requestPermission();
    showToast(permission === "granted" ? "Browser alerts enabled." : "Browser alerts weren’t enabled. In-app reminders still work.");
    if (permission === "granted") checkRecurringReminders();
  } catch (error) {
    console.error("Could not request browser notification permission:", error);
    showToast("Couldn’t request browser alerts. In-app reminders still work.");
  }
}
function escapeHtml(value) { return String(value ?? "").replace(/[&<>"']/g, ch => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;" }[ch])); }
function exportTransactions() {
  if (!data.transactions.length) { showToast("There are no transactions to export yet."); return; }
  const escape = value => `"${String(value ?? "").replace(/"/g, '""')}"`;
  const rows = [["Date","Name","Type","Category","Amount"], ...data.transactions.map(t=>[t.date,t.name,t.type,t.category,t.amount])];
  const csv = rows.map(row=>row.map(escape).join(",")).join("\r\n");
  const link = document.createElement("a");
  link.href = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
  link.download = `e-wallet-transactions-${iso(today)}.csv`;
  link.click(); URL.revokeObjectURL(link.href);
  showToast("Your transaction export is ready.");
}
document.getElementById("appContent").addEventListener("change", e => {
  if (e.target.id === "currencySelect") handleAction("currency");
});
document.getElementById("appContent").addEventListener("click", e => {
  const pageLink = e.target.closest("[data-page]");
  if (!pageLink) return;
  e.preventDefault();
  if (pageLink.dataset.transactionFilter) transactionFilter = pageLink.dataset.transactionFilter;
  else if (pageLink.dataset.page === "transactions") transactionFilter = "all";
  setPage(pageLink.dataset.page);
});
window.addEventListener("focus", checkRecurringReminders);
window.setInterval(checkRecurringReminders, 15 * 60 * 1000);
setupLogin();
if (!location.hash) history.replaceState({ page: "overview" }, "", "#overview");
setPage(activePage, false);
