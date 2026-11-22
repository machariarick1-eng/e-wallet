const STORAGE_KEY = "e-wallet-data-v1";
const names = { overview: "Overview", transactions: "Transactions", income: "Money in", spending: "Spending", funnels: "Money funnels", recurring: "Monthly items", savings: "Savings goals", investments: "Investments", planner: "Purchase planner", settings: "Settings" };
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
const symbolIcons = {
  "✳": '<svg viewBox="0 0 24 24"><path d="M12 3v18M3 12h18M5.6 5.6l12.8 12.8M18.4 5.6 5.6 18.4"/><circle cx="12" cy="12" r="2.2"/></svg>',
  "✈": '<svg viewBox="0 0 24 24"><path d="M3 11.5 21 5l-6.5 14-3.2-6.2L3 11.5Z"/><path d="m11.3 12.8 5.2-5.3"/></svg>',
  "⌂": '<svg viewBox="0 0 24 24"><path d="M3.5 11.5 12 4l8.5 7.5"/><path d="M5.5 10v10h13V10M9.5 20v-6h5v6"/></svg>',
  "☂": '<svg viewBox="0 0 24 24"><path d="M12 3v13.5a3.5 3.5 0 0 1-7 0"/><path d="M4 10.5a8 8 0 0 1 16 0c-2.1-1.8-5.2-1.8-8 0-2.8-1.8-5.9-1.8-8 0Z"/></svg>',
  "♫": '<svg viewBox="0 0 24 24"><path d="M9 18V6l9-2v12"/><circle cx="6.5" cy="18" r="2.5"/><circle cx="15.5" cy="16" r="2.5"/></svg>',
  "⌘": '<svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="12" rx="2"/><path d="M8 21h8M12 17v4"/></svg>',
  "☀": '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9 7 7M17 17l2.1 2.1M19.1 4.9 17 7M7 17l-2.1 2.1"/></svg>',
  "◒": '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8"/><path d="M12 4a8 8 0 0 1 0 16V4Z"/></svg>',
  "↗": '<svg viewBox="0 0 24 24"><path d="m5 19 14-14M9 5h10v10"/></svg>'
};
function symbolIcon(symbol) {
  const svg = symbolIcons[symbol] || symbolIcons["✳"];
  return `<span class="symbol-icon" aria-hidden="true">${svg}</span>`;
}
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
    funnelAlerts: {},
    funnels: [
      { id: uid(), name: "Rent", category: "Home", limit: 6000, icon: "⌂" },
      { id: uid(), name: "Food & groceries", category: "Food & dining", limit: 3000, icon: "◒" },
      { id: uid(), name: "Getting around", category: "Transport", limit: 1800, icon: "↗" }
    ],
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
    if (!Array.isArray(data.funnels)) { data.funnels = []; migrated = true; }
    if (data.sample && data.funnels.length === 0) {
      data.funnels = [
        { id: uid(), name: "Rent", category: "Home", limit: 6000, icon: "⌂" },
        { id: uid(), name: "Food & groceries", category: "Food & dining", limit: 3000, icon: "◒" },
        { id: uid(), name: "Getting around", category: "Transport", limit: 1800, icon: "↗" }
      ];
      migrated = true;
    }
    if (!data.funnelAlerts || typeof data.funnelAlerts !== "object" || Array.isArray(data.funnelAlerts)) { data.funnelAlerts = {}; migrated = true; }
    if (migrated) saveData(data);
    return data;
  } catch (error) {
    console.error("Could not load e-wise data:", error);
    showToast("Couldn’t load your saved data. Check browser storage and refresh.");
    return { currency: "KES", theme: "light", sample: false, transactions: [], goals: [], investments: [], recurringTransactions: [], reminderLog: {}, plans: [] };
  }
}
let data = loadData();
function pageFromHash() {
  const page = location.hash.slice(1).split("?")[0];
if (page === "cashflow") return "income";
  return names[page] ? page : "overview";
}
let activePage = pageFromHash();
let compactChartLayout = window.matchMedia("(max-width: 1000px)").matches;
let transactionFilter = "all";
let cashflowView = "monthly";
let pendingTransactionImage = "";
let toastTimer;
let loadingTimer;
const AUTH_SESSION_KEY = "e-wallet-session";
const LOGIN_USERNAME = "Erick";
const LOGIN_PASSWORD = "4695";
function saveData(next = data) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); }
  catch (error) { console.error("Could not save e-wise data:", error); showToast("Couldn’t save changes. Your browser storage may be full or disabled."); }
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
    console.error("Could not read the e-wise sign-in session:", error);
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
      console.error("Could not save the e-wise sign-in session:", error);
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
    catch (error) { console.error("Could not clear the e-wise sign-in session:", error); }
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
function setPage(page, updateUrl = true, showLoader = false) {
  if (!names[page]) return;
  if (showLoader) showLoadingScreen();
  activePage = page;
  if (updateUrl && location.hash !== `#${page}`) history.pushState({ page }, "", `#${page}`);
  document.querySelectorAll(".nav-item[data-page]").forEach(el => el.classList.toggle("active", el.dataset.page === page));
  document.getElementById("currentSection").textContent = names[page];
  closeSidebar();
  setProfileMenuOpen(false);
  render();
}
document.querySelectorAll("[data-page]").forEach(el => el.addEventListener("click", e => { e.preventDefault(); setPage(el.dataset.page, true, el.classList.contains("nav-item")); }));
window.addEventListener("popstate", () => setPage(pageFromHash(), false));
window.addEventListener("resize", () => {
  const compact = window.matchMedia("(max-width: 1000px)").matches;
  if (compact === compactChartLayout) return;
  compactChartLayout = compact;
  if (activePage === "income" || activePage === "overview") render();
});
function setSidebarOpen(open) {
  document.getElementById("sidebar").classList.toggle("open", open);
  document.getElementById("mobileMenu").setAttribute("aria-expanded", String(open));
  document.body.classList.toggle("menu-open", open);
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
loadingTimer = setTimeout(hideLoadingScreen, 1000);

function showLoadingScreen() {
  const loadingScreen = document.getElementById("loadingScreen");
  clearTimeout(loadingTimer);
  loadingScreen.classList.remove("is-hidden");
  loadingTimer = setTimeout(hideLoadingScreen, 450);
}
function hideLoadingScreen() {
  document.getElementById("loadingScreen").classList.add("is-hidden");
}

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
    : activePage === "income" ? renderCashflow()
    : activePage === "spending" ? renderSpending()
    : activePage === "funnels" ? renderFunnels()
    : activePage === "recurring" ? renderRecurring()
    : activePage === "savings" ? renderSavings()
    : activePage === "investments" ? renderInvestments()
    : activePage === "planner" ? renderPlanner()
    : renderSettings();
  root.querySelectorAll("[data-delete]").forEach(el => el.addEventListener("click", () => deleteItem(el.dataset.delete, el.dataset.id)));
  root.querySelectorAll("[data-filter]").forEach(el => el.addEventListener("change", () => { transactionFilter = el.value; render(); }));
  root.querySelectorAll("[data-chart-view]").forEach(el => el.addEventListener("change", () => { cashflowView = el.value; render(); }));
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
  const monthName = today.toLocaleDateString(undefined, { month: "long", year: "numeric" });
  const firstWeekday = new Date(today.getFullYear(), today.getMonth(), 1).getDay();
  const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
  const calendarDays = Array.from({ length: 42 }, (_, i) => {
    const day = i - firstWeekday + 1;
    return day >= 1 && day <= daysInMonth ? day : null;
  });
  const recurringDates = new Set((data.recurringTransactions || []).filter(item => item.active !== false).map(item => Number(item.dayOfMonth)).filter(day => day >= 1 && day <= 31));
  const datedEvents = [
    ...(data.goals || []).map(item => ({ name: item.name, date: item.due, kind: "Goal" })),
    ...(data.plans || []).map(item => ({ name: item.name, date: item.due, kind: "Plan" })),
    ...(data.recurringTransactions || []).filter(item => item.active !== false).map(item => {
      const day = Math.min(Number(item.dayOfMonth) || 1, daysInMonth);
      return { name: item.name, date: iso(new Date(today.getFullYear(), today.getMonth(), day)), kind: "Monthly" };
    })
  ].filter(item => item.date)
   .map(item => ({ ...item, dateObject: new Date(`${item.date}T00:00:00`) }))
   .filter(item => item.dateObject >= new Date(today.getFullYear(), today.getMonth(), today.getDate()))
   .sort((a, b) => a.dateObject - b.dateObject)
   .slice(0, 4);
  const agenda = datedEvents.length ? datedEvents.map(item => {
    const dateLabel = item.dateObject.toLocaleDateString(undefined, { month: "short", day: "numeric" });
    return `<a class="overview-agenda-item" href="#${item.kind === "Monthly" ? "recurring" : item.kind === "Goal" ? "savings" : "planner"}" data-page="${item.kind === "Monthly" ? "recurring" : item.kind === "Goal" ? "savings" : "planner"}"><span class="overview-agenda-date">${dateLabel}</span><span class="overview-agenda-copy"><strong>${escapeHtml(item.name)}</strong><small>${item.kind} · on the horizon</small></span><span aria-hidden="true">›</span></a>`;
  }).join("") : `<div class="overview-agenda-empty"><strong>Your month has breathing room.</strong><span>Add a goal or monthly item and it will appear here.</span></div>`;
  return `${heading("", "Good things are growing, Erick.", "Here’s how your money is moving this month.")}
    <section class="overview-feature-section" aria-label="Explore your money">
      <div class="overview-feature-heading"><div><div class="eyebrow">CHOOSE YOUR NEXT CHAPTER</div><h2>There’s more than one way to grow.</h2></div><div class="overview-slider-controls"><button type="button" data-feature-slider="prev" aria-label="Previous featured item">←</button><button type="button" data-feature-slider="next" aria-label="Next featured item">→</button></div></div>
      <div class="overview-feature-slider" role="region" aria-label="Savings, spending, investments, and purchase planner" aria-roledescription="carousel">
        <div class="overview-feature-track">
          <a class="overview-feature-card savings-feature" href="#savings" data-page="savings" aria-roledescription="slide" aria-label="1 of 4: Savings plan">
            <span class="overview-feature-icon" aria-hidden="true">${icons.target}</span><span class="overview-feature-copy"><small>BUILD TOWARD WHAT MATTERS</small><strong>Savings plan</strong><em>${data.goals.length} ${data.goals.length === 1 ? "goal" : "goals"} · ${Math.round(savingsProgress)}% of targets</em><b>${money(savingsTotal())}<span> saved</span></b><span class="overview-feature-progress"><i style="width:${savingsProgress}%"></i></span></span><span class="overview-feature-arrow" aria-hidden="true">↗</span>
          </a>
          <a class="overview-feature-card spending-feature" href="#spending" data-page="spending" aria-roledescription="slide" aria-label="2 of 4: Spending summary">
            <span class="overview-feature-icon" aria-hidden="true">${icons.down}</span><span class="overview-feature-copy"><small>WHERE THIS MONTH IS GOING</small><strong>Spending pulse</strong><em>A clear look at the everyday choices</em><b>${money(mt.expense)}<span> spent this month</span></b><span class="overview-feature-caption">${money(weeklyTotals.expense)} moved out in the last 7 days</span></span><span class="overview-feature-arrow" aria-hidden="true">↗</span>
          </a>
          <a class="overview-feature-card investments-feature" href="#investments" data-page="investments" aria-roledescription="slide" aria-label="3 of 4: Investments">
            <span class="overview-feature-icon" aria-hidden="true">${icons.chart}</span><span class="overview-feature-copy"><small>GROW AT YOUR OWN PACE</small><strong>Investments</strong><em>${data.investments.length} ${data.investments.length === 1 ? "holding" : "holdings"} · ${investGain >= 0 ? "Growth" : "Change"} ${money(Math.abs(investGain))}</em><b>${money(investmentsValue())}<span> current value</span></b><span class="overview-feature-caption">See your portfolio at a glance</span></span><span class="overview-feature-arrow" aria-hidden="true">↗</span>
          </a>
          <a class="overview-feature-card planner-feature" href="#planner" data-page="planner" aria-roledescription="slide" aria-label="4 of 4: Purchase planner">
            <span class="overview-feature-icon" aria-hidden="true">${icons.bag}</span><span class="overview-feature-copy"><small>PLAN THE GOOD STUFF</small><strong>Purchase planner</strong><em>${data.plans.length} ${data.plans.length === 1 ? "plan" : "plans"} in progress</em><b>${money(planSaved)}<span> of ${money(planTarget)} saved</span></b><span class="overview-feature-caption">Turn the things you want into doable goals</span></span><span class="overview-feature-arrow" aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </section>
    <section class="overview-at-glance" aria-label="Your money at a glance">
      <div class="overview-at-glance-heading"><div><div class="eyebrow">YOUR MONEY, AT A GLANCE</div><h2>The month in a few numbers.</h2></div></div>
      <div class="cards-grid overview-metric-grid">
        ${metric("Money in", money(mt.income), "All income recorded this month", "wallet", "income")}
        ${metric("Income this month", money(mt.income), `<span class="positive">↗</span> ${money(weeklyTotals.income)} in the last 7 days`, "up", "transactions", "income")}
        ${metric("Spending this month", money(mt.expense), `<span class="negative">↘</span> ${money(weeklyTotals.expense)} in the last 7 days`, "down", "spending")}
        ${metric("Savings & investments", money(savingsTotal() + investmentsValue()), `<span class="positive">↗</span> ${money(investGain)} investment growth`, "target", "savings")}
      </div>
    </section>
    <section class="overview-calendar" aria-label="Month and upcoming money dates">
      <div class="overview-calendar-month">
        <div class="overview-calendar-header"><div><span>THE MONTH AT A GLANCE</span><h2>${monthName}</h2></div><time datetime="${iso(today)}">${today.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" })}</time></div>
        <div class="overview-calendar-grid" aria-label="${monthName}">
          ${["S","M","T","W","T","F","S"].map(day => `<span class="overview-calendar-weekday">${day}</span>`).join("")}
          ${calendarDays.map(day => day ? `<span class="overview-calendar-day ${day === today.getDate() ? "today" : ""} ${recurringDates.has(day) ? "has-event" : ""}" ${day === today.getDate() ? 'aria-current="date"' : ""}>${day}</span>` : `<span class="overview-calendar-day blank"></span>`).join("")}
        </div>
      </div>
      <div class="overview-agenda">
        <div class="overview-agenda-header"><div><span>COMING UP</span><h2>A few dates to keep close.</h2></div><button class="text-link" data-action="open-recurring">Monthly items</button></div>
        <div class="overview-agenda-list">${agenda}</div>
      </div>
    </section>`;
}
function renderCashflow() {
  const month = totals(monthTransactions());
  const week = totals(data.transactions.filter(t => withinDays(t.date, 7)));
  const viewLabel = cashflowView === "weekly" ? "Weekly" : cashflowView === "quarterly" ? "Quarterly" : "Monthly";
  const incomeEntries = monthTransactions().filter(transaction => transaction.type === "income").sort((a,b) => Number(b.amount) - Number(a.amount));
  const sourceTotals = {};
  incomeEntries.forEach(transaction => {
    const source = transaction.category || "Other income";
    sourceTotals[source] = (sourceTotals[source] || 0) + Number(transaction.amount);
  });
  const sources = Object.entries(sourceTotals).sort((a,b) => b[1] - a[1]);
  const sourceBars = sources.length ? sources.map(([source, amount]) => {
    const percent = month.income ? amount / month.income * 100 : 0;
    return `<div class="income-source-row"><div class="income-source-label"><span>${escapeHtml(source)}</span><strong>${money(amount)}</strong></div><div class="income-source-track"><span style="width:${percent}%"></span></div><small>${Math.round(percent)}% of money in</small></div>`;
  }).join("") : `<div class="empty-state"><strong>No income sources yet.</strong>Add income and each source will appear here.</div>`;
  return `${heading("MONEY IN", "A fresh view of your income.", "See what came in this month and how your earning rhythm has moved over time.", actionButton("Add income", "income"))}
    <section class="income-hero"><div><span>THIS MONTH’S MONEY IN</span><h2>${money(month.income)}</h2><p>${incomeEntries.length} ${incomeEntries.length === 1 ? "income entry" : "income entries"} recorded</p></div><div class="income-week-card"><span>LAST 7 DAYS</span><strong>${money(week.income)}</strong><small>Fresh momentum</small></div></section>
    <section class="income-detail-grid">
      <div class="panel income-source-panel"><div class="panel-header"><div><h2 class="panel-title">Where it came from</h2><p class="panel-caption">Income sources for this month</p></div><div class="income-source-total">${sources.length} source${sources.length === 1 ? "" : "s"}</div></div><div class="income-source-list">${sourceBars}</div></div>
      <div class="panel income-chart-panel"><div class="panel-header"><div><h2 class="panel-title">${viewLabel} money in</h2><p class="panel-caption">Your incoming money over time</p></div><select class="select" data-chart-view aria-label="Chart time view"><option value="weekly" ${cashflowView==="weekly"?"selected":""}>Weekly</option><option value="monthly" ${cashflowView==="monthly"?"selected":""}>Monthly</option><option value="quarterly" ${cashflowView==="quarterly"?"selected":""}>Quarterly</option></select></div>${incomeChart()}</div>
    </section>`;
}
function incomeChart() {
  const periods = [];
  if (cashflowView === "weekly") {
    for (let i = 7; i >= 0; i--) {
      const end = new Date(today); end.setDate(end.getDate() - i * 7);
      const start = new Date(end); start.setDate(start.getDate() - 6);
      const income = totals(data.transactions.filter(t => t.type === "income" && (() => { const d = new Date(`${t.date}T00:00:00`); return d >= start && d <= end; })())).income;
      periods.push({ label: start.toLocaleDateString(undefined, { month: "short", day: "numeric" }), income });
    }
  } else if (cashflowView === "quarterly") {
    for (let i = 5; i >= 0; i--) {
      const quarter = Math.floor(today.getMonth() / 3);
      const d = new Date(today.getFullYear(), quarter * 3 - i * 3, 1);
      const income = totals(data.transactions.filter(t => t.type === "income" && (() => { const tx = new Date(`${t.date}T00:00:00`); return tx >= d && tx < new Date(d.getFullYear(), d.getMonth() + 3, 1); })())).income;
      periods.push({ label: `Q${Math.floor(d.getMonth()/3)+1}`, income });
    }
  } else {
    for (let i = 5; i >= 0; i--) {
      const d = new Date(); d.setDate(1); d.setMonth(d.getMonth() - i);
      periods.push({ label: d.toLocaleDateString(undefined,{month:"short"}), income: totals(monthTransactions(d)).income });
    }
  }
  const max = Math.max(100, ...periods.map(period => period.income)) * 1.18;
  const width = compactChartLayout ? 360 : 900;
  const x = i => compactChartLayout ? 54 + i * (286 / (periods.length - 1)) : 55 + i * (825 / (periods.length - 1));
  const y = value => 155 - (value / max) * 125;
  const line = periods.map((period, i) => `${i ? "L" : "M"}${x(i)} ${y(period.income)}`).join(" ");
  const area = `${line} L${x(periods.length-1)} 158 L${x(0)} 158 Z`;
  const gridEnd = compactChartLayout ? 340 : 880;
  return `<svg class="income-chart" viewBox="0 0 ${width} 190" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Money in chart"><defs><linearGradient id="incomeOnlyGradient" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#4d86c8" stop-opacity=".18"/><stop offset="1" stop-color="#4d86c8" stop-opacity="0"/></linearGradient></defs>
    ${[30,72,114,156].map(v=>`<line class="gridline" x1="45" y1="${v}" x2="${gridEnd}" y2="${v}"/>`).join("")}
    <path class="income-chart-area" d="${area}"/><path class="income-chart-line" d="${line}"/>
    ${periods.map((period,i)=>`<circle class="income-chart-point" cx="${x(i)}" cy="${y(period.income)}" r="3.2"/><text x="${x(i)}" y="178" text-anchor="middle">${escapeHtml(period.label)}</text>`).join("")}
    <text x="0" y="34">${money(max, true)}</text><text x="0" y="76">${money(max*.66, true)}</text><text x="0" y="118">${money(max*.33, true)}</text></svg>`;
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
  const periods = [];
  if (cashflowView === "weekly") {
    for (let i = 7; i >= 0; i--) {
      const end = new Date(today); end.setDate(end.getDate() - i * 7);
      const start = new Date(end); start.setDate(start.getDate() - 6);
      const values = totals(data.transactions.filter(t => {
        const d = new Date(`${t.date}T00:00:00`);
        return d >= start && d <= end;
      }));
      periods.push({ label: start.toLocaleDateString(undefined, { month: "short", day: "numeric" }), values });
    }
  } else if (cashflowView === "quarterly") {
    for (let i = 5; i >= 0; i--) {
      const quarter = Math.floor(today.getMonth() / 3);
      const d = new Date(today.getFullYear(), quarter * 3 - i * 3, 1);
      const values = totals(data.transactions.filter(t => {
        const tx = new Date(`${t.date}T00:00:00`);
        return tx >= d && tx < new Date(d.getFullYear(), d.getMonth() + 3, 1);
      }));
      periods.push({ label: `Q${Math.floor(d.getMonth()/3)+1}`, values });
    }
  } else {
    for (let i = 5; i >= 0; i--) {
      const d = new Date(); d.setDate(1); d.setMonth(d.getMonth() - i);
      periods.push({ label: d.toLocaleDateString(undefined,{month:"short"}), values: totals(monthTransactions(d)) });
    }
  }
  const max = Math.max(100, ...periods.flatMap(m => [m.values.income, m.values.expense])) * 1.18;
  const compact = compactChartLayout;
  const chartWidth = compact ? 360 : 900;
  const x = i => compact ? 54 + i * (286 / (periods.length - 1)) : 55 + i * (825 / (periods.length - 1)), y = value => 155 - (value / max) * 125;
  const line = key => periods.map((m, i) => `${i ? "L" : "M"}${x(i)} ${y(m.values[key])}`).join(" ");
  const area = key => `${line(key)} L${x(periods.length-1)} 158 L${x(0)} 158 Z`;
  const gridEnd = compact ? 340 : 880;
  return `<svg class="cashflow-chart" viewBox="0 0 ${chartWidth} 190" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Income and spending chart"><defs><linearGradient id="incomeGradient" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#4d86c8" stop-opacity=".14"/><stop offset="1" stop-color="#4d86c8" stop-opacity="0"/></linearGradient><linearGradient id="expenseGradient" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#ee9b7d" stop-opacity=".13"/><stop offset="1" stop-color="#ee9b7d" stop-opacity="0"/></linearGradient></defs>
    ${[30,72,114,156].map(v=>`<line class="gridline" x1="45" y1="${v}" x2="${gridEnd}" y2="${v}"/>`).join("")}
    <path class="income-fill" d="${area("income")}"/><path class="expense-fill" d="${area("expense")}"/><path class="income-line" d="${line("income")}"/><path class="expense-line" d="${line("expense")}"/>
    ${periods.map((m,i)=>`<circle class="point blue" cx="${x(i)}" cy="${y(m.values.income)}" r="3.2"/><circle class="point orange" cx="${x(i)}" cy="${y(m.values.expense)}" r="3.2"/><text x="${x(i)}" y="178" text-anchor="middle">${escapeHtml(m.label)}</text>`).join("")}
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
  return `<div class="table-wrap"><table><thead><tr><th>TRANSACTION</th><th>CATEGORY</th><th>DATE</th><th>TYPE</th><th style="text-align:right">AMOUNT</th><th style="text-align:right">ACTIONS</th></tr></thead><tbody>${items.map(t=>`<tr><td><div class="transaction-name"><span class="transaction-symbol ${t.type}">${t.type==="income"?"↙":"↗"}</span>${escapeHtml(t.name)}${t.image?`<img class="transaction-image-thumb" src="${t.image}" alt="Uploaded transaction image">`:""}</div></td><td>${escapeHtml(t.category)}</td><td>${fmtDate(t.date)}</td><td><span class="type-pill ${t.type}">${t.type==="income"?"Income":"Expense"}</span></td><td class="amount ${t.type}">${t.type==="income"?"+":"−"}${money(t.amount)}</td><td><div class="table-actions"><button class="icon-button table-edit" type="button" data-action="edit-transaction" data-id="${t.id}" aria-label="Edit ${escapeHtml(t.name)}">✎</button><button class="icon-button table-delete" type="button" data-delete="transaction" data-id="${t.id}" aria-label="Delete ${escapeHtml(t.name)}">×</button></div></td></tr>`).join("")}</tbody></table></div>`;
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
    <section class="panel receipt-upload-panel">
      <div class="receipt-upload-copy"><span class="receipt-upload-icon" aria-hidden="true">▣</span><div><h2 class="panel-title">Add a transaction from a photo</h2><p class="panel-caption">Choose an image from your gallery or take a new photo. We’ll prepare the details for review.</p></div></div>
      <button class="button secondary" type="button" data-action="upload-transaction">Choose photo</button>
    </section>
    <section class="panel wide-panel ledger-panel"><div class="panel-header"><div><h2 class="panel-title">Your ledger</h2><p class="panel-caption">${items.length} ${items.length===1?"entry":"entries"} ${transactionFilter==="all"?"recorded":`shown as ${transactionFilter}`}</p></div><div class="list-toolbar"><select class="select" data-filter aria-label="Filter transactions"><option value="all" ${transactionFilter==="all"?"selected":""}>All activity</option><option value="income" ${transactionFilter==="income"?"selected":""}>Income only</option><option value="expense" ${transactionFilter==="expense"?"selected":""}>Expenses only</option></select><button class="button secondary" data-export>↓ Export CSV</button></div></div>${transactionTable(items)}</section>`;
}
function funnelSpent(funnel) {
  return monthTransactions().filter(transaction =>
    transaction.type === "expense" &&
    (transaction.category === funnel.category ||
      (funnel.category === "Groceries" && transaction.category === "Food & dining") ||
      (funnel.category === "Home" && transaction.category === "Rent"))
  ).reduce((sum, transaction) => sum + Number(transaction.amount), 0);
}
function renderFunnels() {
  const cards = (data.funnels || []).map(funnel => {
    const spent = funnelSpent(funnel);
    const limit = Math.max(0.01, Number(funnel.limit));
    const percent = Math.min(100, spent / limit * 100);
    const remaining = Math.max(0, limit - spent);
    const level = percent >= 95 ? "danger" : percent >= 75 ? "warning" : percent >= 50 ? "caution" : "steady";
    return `<article class="funnel-card funnel-${level}"><div class="funnel-card-top"><div class="funnel-icon">${symbolIcon(funnel.icon || "◒")}</div><div class="item-actions"><button class="icon-button" type="button" data-action="edit-funnel" data-id="${funnel.id}" aria-label="Edit ${escapeHtml(funnel.name)}">✎</button><button class="icon-button" aria-label="Delete ${escapeHtml(funnel.name)}" data-delete="funnel" data-id="${funnel.id}">×</button></div></div><div class="funnel-card-heading"><h2>${escapeHtml(funnel.name)}</h2><span>${Math.round(percent)}% used</span></div><div class="funnel-amount"><strong>${money(spent)}</strong><span>of ${money(limit)} this month</span></div><div class="funnel-progress" aria-label="${Math.round(percent)} percent used"><span style="width:${percent}%"></span></div><div class="funnel-card-footer"><span>${money(remaining)} remaining</span><small>${level === "danger" ? "95% reached" : level === "warning" ? "75% reached" : level === "caution" ? "50% reached" : "Still comfortable"}</small></div></article>`;
  }).join("");
  setTimeout(checkFunnelAlerts, 0);
  return `${heading("SPENDING, WITH BOUNDARIES", "Money funnels", "Give everyday expenses a limit, then watch what’s left as the month unfolds.", actionButton("Create funnel", "funnel", true))}
    <section class="funnel-summary"><div><span>THIS MONTH’S FUNNEL LIMIT</span><strong>${money((data.funnels || []).reduce((sum, funnel) => sum + Number(funnel.limit), 0))}</strong></div><div><span>SPENT THROUGH FUNNELS</span><strong>${money((data.funnels || []).reduce((sum, funnel) => sum + funnelSpent(funnel), 0))}</strong></div><div><span>ACTIVE FUNNELS</span><strong>${(data.funnels || []).length}</strong></div></section>
    <section class="funnel-grid">${cards || `<div class="empty-state"><strong>No money funnels yet.</strong>Create one for rent, food, transport, or another regular expense.</div>`}</section>`;
}
function checkFunnelAlerts() {
  if (!document.body.classList.contains("authenticated")) return;
  const month = currentMonthKey();
  if (!data.funnelAlerts) data.funnelAlerts = {};
  let changed = false;
  (data.funnels || []).forEach(funnel => {
    const percent = funnelSpent(funnel) / Math.max(0.01, Number(funnel.limit)) * 100;
    const threshold = percent >= 95 ? 95 : percent >= 75 ? 75 : percent >= 50 ? 50 : 0;
    if (!threshold) return;
    const key = `${month}-${funnel.id}`;
    const previous = Number(data.funnelAlerts[key] || 0);
    if (threshold <= previous) return;
    data.funnelAlerts[key] = threshold;
    changed = true;
    const remaining = Math.max(0, Number(funnel.limit) - funnelSpent(funnel));
    const message = `${funnel.name} funnel has reached ${threshold}% usage. ${money(remaining)} remains.`;
    showToast(message);
    if ("Notification" in window && Notification.permission === "granted") {
      try { new Notification(`${threshold}% funnel alert`, { body: message, tag: `e-wise-funnel-${key}-${threshold}` }); }
      catch (error) { console.error("Could not display funnel notification:", error); }
    }
  });
  if (changed) saveData();
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
    return `<article class="recurring-card ${enabled ? "" : "paused"}"><div class="recurring-card-top"><div class="recurring-icon">${item.type === "income" ? "↙" : "↗"}</div><div class="item-actions"><button class="icon-button" type="button" data-action="edit-recurring" data-id="${item.id}" aria-label="Edit ${escapeHtml(item.name)}">✎</button><button class="icon-button" aria-label="Delete ${escapeHtml(item.name)}" data-delete="recurring" data-id="${item.id}">×</button></div></div><h3>${escapeHtml(item.name)}</h3><div class="card-meta">${escapeHtml(item.category)} · ${item.type === "income" ? "Income" : "Expense"}</div><div class="card-balance">${money(item.amount)} <small>each month</small></div><div class="recurring-details"><span>Due on day ${Number(item.dayOfMonth)} each month</span><span>${lead ? `Reminder ${lead} day${lead === 1 ? "" : "s"} before` : "Reminder on due day"}</span></div><div class="recurring-status"><span class="type-pill ${recorded ? "income" : ""}">${!enabled ? "Paused" : recorded ? "Recorded this month" : "Not recorded this month"}</span><button class="text-link" data-action="toggle-recurring" data-id="${item.id}">${enabled ? "Pause" : "Resume"}</button></div><button class="button secondary record-button" data-action="record-recurring" data-id="${item.id}" ${recorded || !enabled ? "disabled" : ""}>${recorded ? "Recorded this month" : "Record this month"}</button></article>`;
  }).join("");
  const permission = "Notification" in window ? Notification.permission : "unsupported";
  const browserAlerts = permission === "granted" ? "Browser alerts are enabled." : permission === "denied" ? "Browser alerts are blocked in this browser’s site settings." : permission === "unsupported" ? "Browser alerts aren’t available here; in-app reminders still work." : "Allow optional browser alerts for due reminders.";
  return `${heading("STAY A STEP AHEAD", "Your monthly rhythm.", "Keep regular bills and income in view. We’ll remind you when they’re due.", actionButton("Add monthly item", "recurring", true))}
    <section class="cards-grid">${metric("Monthly expenses",money(monthlyExpenses),"From your active monthly items","down")}${metric("Monthly income",money(monthlyIncome),"From your active monthly items","up")}${metric("Monthly items",items.length,`${active.length} active reminder${active.length === 1 ? "" : "s"}`,"calendar")}${metric("Recorded this month",items.filter(item => item.lastRecordedMonth === month).length,"From your monthly list","wallet")}</section>
    <section class="panel wide-panel"><div class="panel-header"><div><h2 class="panel-title">Monthly transactions</h2><p class="panel-caption">Reminders are checked while e-wise is open. Recording one adds it to Transactions.</p></div><button class="button secondary" data-action="enable-notifications">${permission === "granted" ? "Browser alerts enabled" : "Enable browser alerts"}</button></div><p class="notification-note">${browserAlerts} Browser alerts require permission and a secure site such as GitHub Pages.</p><div class="recurring-grid">${cards || `<div class="empty-state"><strong>Nothing on repeat yet.</strong>Add your regular monthly bills or income to receive due reminders.</div>`}</div></section>`;
}
function renderSavings() {
  const goals = data.goals.map(g=>{
    const pct = Math.min(100, Number(g.saved)/Math.max(1,Number(g.target))*100);
    return `<article class="goal-card"><div class="goal-card-top"><div class="goal-icon">${symbolIcon(g.icon||"✳")}</div><div class="item-actions"><button class="icon-button" type="button" data-action="edit-goal" data-id="${g.id}" aria-label="Edit ${escapeHtml(g.name)}">✎</button><button class="icon-button" aria-label="Delete ${escapeHtml(g.name)}" data-delete="goal" data-id="${g.id}">×</button></div></div><h3>${escapeHtml(g.name)}</h3><div class="card-meta">Target date · ${fmtDate(g.due)}</div><div class="card-balance">${money(g.saved)} <small>of ${money(g.target)}</small></div><div class="progress-track"><div class="progress-fill" style="width:${pct}%"></div></div><div class="goal-mini-foot">${Math.round(pct)}% there · ${money(Math.max(0,g.target-g.saved))} to go</div><div class="card-actions"><button class="button secondary" data-action="contribute-goal" data-id="${g.id}">＋ Add savings</button></div></article>`;
  }).join("");
  const saved = savingsTotal(), target = data.goals.reduce((s,g)=>s+Number(g.target),0);
  const progress = target ? Math.min(100, saved / target * 100) : 0;
  const remaining = Math.max(0, target - saved);
  const nextGoal = data.goals.filter(g => Number(g.saved) < Number(g.target)).sort((a,b) => (Number(a.target)-Number(a.saved)) - (Number(b.target)-Number(b.saved)))[0];
  const goalSlider = data.goals.map((g, index) => {
    const pct = Math.min(100, Number(g.saved) / Math.max(1, Number(g.target)) * 100);
    return `<article class="entity-slide savings-slide" aria-label="${index + 1} of ${data.goals.length}"><div class="entity-slide-icon">${symbolIcon(g.icon || "✳")}</div><div><small>GOAL ${index + 1} OF ${data.goals.length}</small><h3>${escapeHtml(g.name)}</h3><strong>${money(g.saved)} <span>of ${money(g.target)}</span></strong><div class="entity-progress"><i style="width:${pct}%"></i></div></div><span>${Math.round(pct)}%</span></article>`;
  }).join("");
  return `${heading("MAKE ROOM FOR WHAT MATTERS", "Your future, taking shape.", "Set a goal, build a habit, and celebrate the little milestones.", actionButton("Create a goal", "goal"))}
    <section class="savings-hero"><div class="savings-hero-copy"><span class="savings-overline">SMALL STEPS ADD UP</span><h2>Your saved money has a purpose.</h2><p>You’ve set aside <strong>${money(saved)}</strong> across ${data.goals.length} ${data.goals.length===1?"goal":"goals"}.</p><div class="savings-hero-footer"><span>${money(remaining)} left to reach your targets</span><span>${Math.round(progress)}% of the way</span></div><div class="savings-progress-track"><span style="width:${progress}%"></span></div></div><div class="savings-next-goal"><span class="next-goal-label">NEXT MILESTONE</span>${nextGoal ? `<strong>${escapeHtml(nextGoal.name)}</strong><span>${money(Math.max(0,Number(nextGoal.target)-Number(nextGoal.saved)))} to go</span>` : `<strong>All goals reached</strong><span>Take a moment to celebrate.</span>`}<span class="savings-spark" aria-hidden="true">✳</span></div></section>
    ${data.goals.length ? `<section class="entity-slider-section"><div class="entity-slider-heading"><div><span class="eyebrow">YOUR GOAL JOURNEY</span><h2>One step closer</h2></div><div class="overview-slider-controls"><button type="button" data-goal-slider="prev" aria-label="Previous savings goal">←</button><button type="button" data-goal-slider="next" aria-label="Next savings goal">→</button></div></div><div class="entity-slider" data-goal-track><div class="entity-track">${goalSlider}</div></div></section>` : ""}
    <section class="savings-section"><div class="section-intro"><div><span class="eyebrow">YOUR GOALS</span><h2>A little at a time</h2></div><p>${money(monthGoalContributions())} added this month</p></div><div class="goal-grid">${goals||`<div class="empty-state"><strong>No goals just yet.</strong>Give your next big thing a name and a number.</div>`}</div></section>`;
}
function monthGoalContributions() { return data.goalContributions ? data.goalContributions.filter(c=>c.date.slice(0,7)===iso(today).slice(0,7)).reduce((s,c)=>s+c.amount,0):0; }
function renderInvestments() {
  const invested = data.investments.reduce((s,h)=>s+Number(h.invested),0), current = investmentsValue(), gain = current-invested;
  const holdings = data.investments.map(h=>`<article class="holding-card"><div class="holding-top"><div class="holding-icon">${h.type==="Crypto"?"◇":h.type==="Stocks"?"↗":"◒"}</div><div class="item-actions"><button class="icon-button" type="button" data-action="edit-investment" data-id="${h.id}" aria-label="Edit ${escapeHtml(h.name)}">✎</button><button class="icon-button" aria-label="Delete ${escapeHtml(h.name)}" data-delete="investment" data-id="${h.id}">×</button></div></div><h3>${escapeHtml(h.name)}</h3><div class="card-meta">${escapeHtml(h.type)} · Added ${fmtDate(h.date)}</div><div class="card-balance">${money(h.value)}</div><div class="return-label">${Number(h.value)>=Number(h.invested)?"↗ ":"↘ "}${money(Math.abs(h.value-h.invested))} ${Number(h.value)>=Number(h.invested)?"growth":"change"} · ${money(h.invested)} invested</div></article>`).join("");
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
    return `<article class="planner-card"><div class="planner-card-head"><div class="planner-icon">${symbolIcon(p.icon||"✳")}</div><div class="planner-card-title"><h3>${escapeHtml(p.name)}</h3><span>Target · ${money(p.target)}</span></div><div class="item-actions"><button class="icon-button" type="button" data-action="edit-plan" data-id="${p.id}" aria-label="Edit ${escapeHtml(p.name)}">✎</button><button class="icon-button" aria-label="Delete ${escapeHtml(p.name)}" data-delete="plan" data-id="${p.id}">×</button></div></div><div class="planner-card-progress"><div class="progress-track"><div class="progress-fill" style="width:${pct}%"></div></div><div class="planner-card-progress-label"><span>${money(p.saved)} saved</span><strong>${Math.round(pct)}%</strong></div></div><div class="planner-card-details"><div><span>Due</span><strong>${fmtDate(p.due)}</strong></div><div><span>Left to save</span><strong>${money(remaining)}</strong></div></div><div class="planner-result"><span>Set aside</span><div><strong>${money(remaining/weeks)}</strong><small>per week</small></div><div><strong>${money(remaining/months)}</strong><small>per month</small></div></div><button class="button secondary planner-add-button" data-action="contribute-plan" data-id="${p.id}">＋ Add to fund</button></article>`;
  }).join("");
  const planSlider = data.plans.map((p, index) => {
    const pct = Math.min(100, Number(p.saved) / Math.max(1, Number(p.target)) * 100);
    return `<article class="entity-slide planner-slide" aria-label="${index + 1} of ${data.plans.length}"><div class="entity-slide-icon">${symbolIcon(p.icon || "✳")}</div><div><small>PLAN ${index + 1} OF ${data.plans.length}</small><h3>${escapeHtml(p.name)}</h3><strong>${money(p.saved)} <span>of ${money(p.target)}</span></strong><div class="entity-progress"><i style="width:${pct}%"></i></div></div><span>${Math.round(pct)}%</span></article>`;
  }).join("");
  return `${data.plans.length ? `<section class="entity-slider-section planner-top-slider"><div class="entity-slider-heading"><div><span class="eyebrow">PLAN THE GOOD STUFF</span><h1>Plans in motion.</h1></div><div class="planner-top-actions"><div class="overview-slider-controls"><button type="button" data-plan-slider="prev" aria-label="Previous purchase plan">←</button><button type="button" data-plan-slider="next" aria-label="Next purchase plan">→</button></div>${actionButton("Plan a purchase", "plan", true)}</div></div><div class="entity-slider" data-plan-track><div class="entity-track">${planSlider}</div></div></section>` : heading("PLAN THE GOOD STUFF", "Make it happen, one week at a time.", "Turn the thing you want into a saving plan that feels doable.", actionButton("Plan a purchase", "plan", true))}
    <section class="planner-intro planner-intro-below-slider"><div><span class="planner-overline">A PLAN YOU CAN LIVE WITH</span><h2>Big things get easier when you break them down.</h2><p>Choose what you want and when you want it. We’ll show you a weekly and monthly saving target.</p></div><div class="planner-equation"><span>WHAT'S LEFT</span><b>÷</b><span>TIME YOU HAVE</span><b>=</b><strong>A DOABLE PLAN</strong></div></section>
    <section class="planner-section"><div class="section-intro"><div><span class="eyebrow">ON YOUR WISH LIST</span><h2>Plans in progress</h2></div><p>${data.plans.length} ${data.plans.length===1?"plan":"plans"} you’re working towards</p></div><div class="planner-grid">${cards||`<div class="empty-state"><strong>What are you saving up for?</strong>Add something you’re looking forward to and we’ll work out the weekly amount.</div>`}</div></section>`;
}
function renderSettings() {
  const currencies = [["USD","US Dollar"],["EUR","Euro"],["GBP","British Pound"],["CAD","Canadian Dollar"],["AUD","Australian Dollar"],["INR","Indian Rupee"],["JPY","Japanese Yen"],["NGN","Nigerian Naira"],["KES","Kenyan Shilling"],["GHS","Ghanaian Cedi"]];
  const currencyOptions = currencies.map(([code,label])=>`<option value="${code}" ${data.currency===code?"selected":""}>${code} · ${label}</option>`).join("");
  return `${heading("MAKE IT YOURS", "A few things to know.", "Your data belongs to you. Here’s how this little app works.")}
    <div class="settings-grid"><section class="panel"><h2 class="panel-title">Preferences</h2><div class="settings-row"><div><strong>Display currency</strong><span>Used to format amounts throughout the app</span></div><select id="currencySelect" class="select setting-control" aria-label="Display currency">${currencyOptions}</select></div><div class="settings-row"><div><strong>Appearance</strong><span>Choose a comfortable theme for your screen</span></div><button class="button secondary" data-action="toggle-theme">Use ${data.theme === "dark" ? "light" : "dark"} theme</button></div><div class="settings-row"><div><strong>Monthly reminders</strong><span>In-app reminders work while e-wise is open. Browser alerts also need permission and a secure site.</span></div><button class="button secondary" data-action="enable-notifications">Enable browser alerts</button></div><div class="settings-row"><div><strong>Where your data lives</strong><span>Your entries are stored in this browser on this device only.</span></div><span class="privacy-dot"></span></div><div class="settings-row"><div><strong>Take your data with you</strong><span>Download a copy of your transactions as a CSV file.</span></div><button class="button secondary" data-export>↓ Export CSV</button></div>
    <div class="danger-zone"><h3>Start fresh</h3><p>This removes all transactions, monthly items, savings goals, investments, and purchase plans saved in this browser.</p><button class="button secondary" data-action="reset-data">Start fresh</button></div></section>
    <section class="panel"><h2 class="panel-title">A little about e-wise</h2><p class="subheading" style="line-height:1.9;margin-top:12px">A calm place to see where your money goes, celebrate what you save, and plan for the things you’re looking forward to.</p><div class="settings-row"><div><strong>Private by design</strong><span>There’s no account, server, or tracking. Your data stays in your browser’s local storage.</span></div></div><div class="settings-row"><div><strong>Keep a backup</strong><span>Browser data can be cleared when you reset your device. Export your transactions regularly to keep a copy.</span></div></div></section></div>`;
}
function handleAction(action, id) {
  if (action === "open-transactions") return setPage("transactions");
  if (action === "open-savings") return setPage("savings");
  if (action === "open-recurring") return setPage("recurring");
  if (action === "open-funnels") return setPage("funnels");
  if (action === "open-settings") return setPage("settings");
  if (action === "transaction") return openModal("transaction");
  if (action === "income") { openModal("transaction"); const type = document.getElementById("entry-type"); if (type) type.value = "income"; return; }
  if (action === "upload-transaction") return openModal("transaction");
  if (action === "recurring") return openModal("recurring");
  if (action === "goal") return openModal("goal");
  if (action === "investment") return openModal("investment");
  if (action === "plan") return openModal("plan");
  if (action === "funnel") return openModal("funnel");
  if (action.startsWith("edit-")) return openModal(action, id);
  if (action === "contribute-goal") return openModal("contribute-goal", id || document.activeElement.dataset.id);
  if (action === "contribute-plan") return openModal("contribute-plan", id || document.activeElement.dataset.id);
  if (action === "toggle-recurring") return toggleRecurring(id);
  if (action === "record-recurring") return recordRecurring(id);
  if (action === "enable-notifications") return enableBrowserNotifications();
  if (action === "toggle-theme") return toggleTheme();
  if (action === "reset-data") { if (confirm("Permanently remove all e-wise data saved in this browser? This can’t be undone.")) { data = { currency: data.currency, theme: data.theme, sample: false, transactions: [], goals: [], investments: [], recurringTransactions: [], reminderLog: {}, funnelAlerts: {}, funnels: [], plans: [], goalContributions: [] }; saveData(); render(); showToast("Your local data has been cleared."); } return; }
  if (action === "currency") { const select = document.getElementById("currencySelect"); if (select) { data.currency = select.value; saveData(); render(); showToast("Currency preference saved."); } }
}
document.getElementById("appContent").addEventListener("click", e => {
  const sliderControl = e.target.closest("[data-feature-slider]");
  if (sliderControl) {
    const track = document.querySelector(".overview-feature-track");
    if (track) track.scrollBy({ left: (sliderControl.dataset.featureSlider === "next" ? 1 : -1) * track.clientWidth, behavior: "smooth" });
    return;
  }
  const goalControl = e.target.closest("[data-goal-slider]");
  if (goalControl) {
    const track = document.querySelector("[data-goal-track] .entity-track");
    if (track) track.scrollBy({ left: (goalControl.dataset.goalSlider === "next" ? 1 : -1) * track.clientWidth * .82, behavior: "smooth" });
    return;
  }
  const planControl = e.target.closest("[data-plan-slider]");
  if (planControl) {
    const track = document.querySelector("[data-plan-track] .entity-track");
    if (track) track.scrollBy({ left: (planControl.dataset.planSlider === "next" ? 1 : -1) * track.clientWidth * .82, behavior: "smooth" });
    return;
  }
  const button = e.target.closest("[data-action]");
  if (button) handleAction(button.dataset.action, button.dataset.id);
});
function openModal(kind, id) {
  if (kind === "transaction") pendingTransactionImage = "";
  const templates = {
    transaction: { title: "Add a transaction", subtitle: "Add it manually or choose a photo for automatic details.", fields: `<div class="field full"><label for="transaction-image">Choose from photos</label><input id="transaction-image" name="image" type="file" accept="image/*"><div id="transaction-image-status" class="image-status">Choose a receipt or transaction screenshot from your photos.</div><img id="transaction-image-preview" class="transaction-image-preview" alt="Transaction preview" hidden></div><div class="field full"><label for="entry-name">What was it?</label><input id="entry-name" name="name" required maxlength="60" placeholder="e.g. Weekly groceries"></div><div class="field"><label for="entry-type">Type</label><select id="entry-type" name="type"><option value="expense">Expense</option><option value="income">Income</option></select></div><div class="field"><label for="entry-amount">Amount</label><input id="entry-amount" name="amount" type="number" min="0.01" step="0.01" required placeholder="0.00"></div><div class="field"><label for="entry-category">Category</label><select id="entry-category" name="category"><option>Food & dining</option><option>Groceries</option><option>Rent</option><option>Home</option><option>Transport</option><option>Shopping</option><option>Health</option><option>Subscriptions</option><option>Entertainment</option><option>Salary</option><option>Other income</option><option>Other</option></select></div><div class="field"><label for="entry-date">Date</label><input id="entry-date" name="date" type="date" value="${iso(today)}" required></div>` },
    recurring: { title: "Add a monthly item", subtitle: "Set a reminder for a bill or income you expect every month.", fields: `<div class="field full"><label for="recurring-name">What happens each month?</label><input id="recurring-name" name="name" required maxlength="60" placeholder="e.g. Internet bill"></div><div class="field"><label for="recurring-type">Type</label><select id="recurring-type" name="type"><option value="expense">Expense</option><option value="income">Income</option></select></div><div class="field"><label for="recurring-amount">Amount</label><input id="recurring-amount" name="amount" type="number" min="0.01" step="0.01" required placeholder="0.00"></div><div class="field"><label for="recurring-category">Category</label><select id="recurring-category" name="category"><option>Home</option><option>Utilities</option><option>Subscriptions</option><option>Transport</option><option>Food & dining</option><option>Salary</option><option>Other income</option><option>Other</option></select></div><div class="field"><label for="recurring-day">Due day of month</label><input id="recurring-day" name="dayOfMonth" type="number" min="1" max="31" step="1" required value="1"></div><div class="field full"><label for="recurring-reminder">Remind me</label><select id="recurring-reminder" name="remindDaysBefore"><option value="0">On the due day</option><option value="1" selected>1 day before</option><option value="3">3 days before</option><option value="7">7 days before</option></select></div>` },
    goal: { title: "Create a savings goal", subtitle: "Give your future plans a place to grow.", fields: `<div class="field full"><label for="goal-name">What are you saving for?</label><input id="goal-name" name="name" required maxlength="50" placeholder="e.g. Emergency fund"></div><div class="field"><label for="goal-target">Target amount</label><input id="goal-target" name="target" type="number" min="0.01" step="0.01" required placeholder="0.00"></div><div class="field"><label for="goal-saved">Already saved</label><input id="goal-saved" name="saved" type="number" min="0" step="0.01" value="0"></div><div class="field"><label for="goal-date">Target date</label><input id="goal-date" name="due" type="date" value="${addMonths(6)}" required></div><div class="field"><label for="goal-icon">Little symbol</label><select id="goal-icon" name="icon"><option value="✳">✳ A fresh start</option><option value="✈">✈ A trip</option><option value="⌂">⌂ A home</option><option value="☂">☂ A safety net</option><option value="♫">♫ Something fun</option><option value="⌘">⌘ A new gadget</option></select></div>` },
    investment: { title: "Add an investment", subtitle: "Keep your portfolio in one simple view.", fields: `<div class="field full"><label for="investment-name">Investment name</label><input id="investment-name" name="name" required maxlength="50" placeholder="e.g. Global index fund"></div><div class="field"><label for="investment-type">Type</label><select id="investment-type" name="type"><option>ETF</option><option>Stocks</option><option>Bonds</option><option>Crypto</option><option>Other</option></select></div><div class="field"><label for="investment-date">Date added</label><input id="investment-date" name="date" type="date" value="${iso(today)}" required></div><div class="field"><label for="investment-invested">Amount invested</label><input id="investment-invested" name="invested" type="number" min="0.01" step="0.01" required placeholder="0.00"></div><div class="field"><label for="investment-value">Current value</label><input id="investment-value" name="value" type="number" min="0" step="0.01" required placeholder="0.00"></div>` },
    plan: { title: "Plan something lovely", subtitle: "We’ll work out a weekly savings target for you.", fields: `<div class="field full"><label for="plan-name">What do you have in mind?</label><input id="plan-name" name="name" required maxlength="50" placeholder="e.g. A long weekend away"></div><div class="field"><label for="plan-target">How much will it cost?</label><input id="plan-target" name="target" type="number" min="0.01" step="0.01" required placeholder="0.00"></div><div class="field"><label for="plan-saved">Already put aside</label><input id="plan-saved" name="saved" type="number" min="0" step="0.01" value="0"></div><div class="field"><label for="plan-date">When would you like it?</label><input id="plan-date" name="due" type="date" min="${iso(today)}" value="${addMonths(3)}" required></div><div class="field"><label for="plan-icon">Pick a symbol</label><select id="plan-icon" name="icon"><option value="✈">✈ A trip</option><option value="♫">♫ Music & tech</option><option value="⌂">⌂ Something for home</option><option value="✳">✳ Something special</option><option value="☀">☀ An experience</option></select></div>` },
    funnel: { title: "Create a money funnel", subtitle: "Set a monthly limit and monitor spending against it.", fields: `<div class="field full"><label for="funnel-name">Funnel name</label><input id="funnel-name" name="name" required maxlength="50" placeholder="e.g. Groceries"></div><div class="field"><label for="funnel-category">Tracked category</label><select id="funnel-category" name="category"><option>Rent</option><option>Food & dining</option><option>Groceries</option><option>Transport</option><option>Home</option><option>Shopping</option><option>Health</option><option>Subscriptions</option><option>Entertainment</option><option>Other</option></select></div><div class="field"><label for="funnel-limit">Monthly amount</label><input id="funnel-limit" name="limit" type="number" min="0.01" step="0.01" required placeholder="0.00"></div><div class="field"><label for="funnel-icon">Little symbol</label><select id="funnel-icon" name="icon"><option value="◒">◒</option><option value="⌂">⌂</option><option value="↗">↗</option><option value="✳">✳</option></select></div>` },
    "contribute-goal": { title: "Add to your savings", subtitle: "Every little bit brings you closer.", fields: `<input type="hidden" name="id" value="${id}"><div class="field full"><label for="contribution-amount">How much are you adding?</label><input id="contribution-amount" name="amount" type="number" min="0.01" step="0.01" required placeholder="0.00"></div>` },
    "contribute-plan": { title: "Add to your fund", subtitle: "You’re one step closer to making it happen.", fields: `<input type="hidden" name="id" value="${id}"><div class="field full"><label for="contribution-amount">How much are you adding?</label><input id="contribution-amount" name="amount" type="number" min="0.01" step="0.01" required placeholder="0.00"></div>` }
  };
  let template = templates[kind];
  if (kind.startsWith("edit-")) {
    const editType = kind.slice(5);
    template = templates[editType];
    if (!template) return;
    template = { ...template, title: `Edit ${editType === "funnel" ? "money funnel" : editType === "recurring" ? "monthly item" : editType === "goal" ? "savings goal" : editType === "plan" ? "purchase plan" : editType}`, subtitle: "Update the details and save your changes.", fields: `<input type="hidden" name="id" value="${escapeHtml(id || "")}">` + template.fields };
  }
  if (!template) return;
  document.body.classList.add("modal-open");
  document.getElementById("modalRoot").innerHTML = `<div class="modal-backdrop" data-close-modal><section class="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title"><div class="modal-header"><div><h2 id="modal-title">${template.title}</h2><p>${template.subtitle}</p></div><button type="button" class="close-button" aria-label="Close dialog" data-close-modal>×</button></div><form id="entryForm"><div class="form-grid">${template.fields}</div><div class="modal-actions"><button type="button" class="button secondary" data-close-modal>Cancel</button><button type="submit" class="button">Save ${kind.startsWith("contribute")?"contribution":"details"}</button></div></form></section></div>`;
  document.getElementById("modalRoot").querySelectorAll("[data-close-modal]").forEach(el => el.addEventListener("click", e => { if (e.target === el || el.tagName === "BUTTON") closeModal(); }));
  document.getElementById("entryForm").addEventListener("submit", e => { e.preventDefault(); submitForm(kind, new FormData(e.target)); });
  const imageInput = document.getElementById("transaction-image");
  if (imageInput) imageInput.addEventListener("change", event => handleTransactionImage(event.target.files[0]));
  if (kind.startsWith("edit-")) {
    const editType = kind.slice(5);
    const collection = editType === "transaction" ? data.transactions : editType === "goal" ? data.goals : editType === "investment" ? data.investments : editType === "plan" ? data.plans : editType === "funnel" ? data.funnels : data.recurringTransactions;
    const item = collection.find(entry => entry.id === id);
    if (!item) { closeModal(); showToast("That item could not be found."); return; }
    const setValue = (selector, value) => { const field = document.querySelector(selector); if (field) field.value = value ?? ""; };
    if (editType === "transaction") {
      pendingTransactionImage = item.image || "";
      setValue("#entry-name", item.name); setValue("#entry-type", item.type); setValue("#entry-amount", item.amount); setValue("#entry-category", item.category); setValue("#entry-date", item.date);
      if (item.image) { const preview = document.getElementById("transaction-image-preview"); if (preview) { preview.src = item.image; preview.hidden = false; } }
    } else if (editType === "recurring") {
      setValue("#recurring-name", item.name); setValue("#recurring-type", item.type); setValue("#recurring-amount", item.amount); setValue("#recurring-category", item.category); setValue("#recurring-day", item.dayOfMonth); setValue("#recurring-reminder", item.remindDaysBefore);
    } else if (editType === "goal") {
      setValue("#goal-name", item.name); setValue("#goal-target", item.target); setValue("#goal-saved", item.saved); setValue("#goal-date", item.due); setValue("#goal-icon", item.icon);
    } else if (editType === "investment") {
      setValue("#investment-name", item.name); setValue("#investment-type", item.type); setValue("#investment-date", item.date); setValue("#investment-invested", item.invested); setValue("#investment-value", item.value);
    } else if (editType === "plan") {
      setValue("#plan-name", item.name); setValue("#plan-target", item.target); setValue("#plan-saved", item.saved); setValue("#plan-date", item.due); setValue("#plan-icon", item.icon);
    } else if (editType === "funnel") {
      setValue("#funnel-name", item.name); setValue("#funnel-category", item.category); setValue("#funnel-limit", item.limit); setValue("#funnel-icon", item.icon);
    }
  }
  const first = document.querySelector("#entryForm input:not([type=hidden])");
  if (first) first.focus();
}
function closeModal() {
  document.getElementById("modalRoot").innerHTML = "";
  document.body.classList.remove("modal-open");
}
function submitForm(kind, form) {
  const v = Object.fromEntries(form.entries());
  const amount = Number(v.amount || v.target);
  if (v.name !== undefined && !v.name.trim()) { showToast("Please add a name before saving."); return; }
  if (!kind.startsWith("edit-") && (!Number.isFinite(amount) || amount <= 0)) { showToast("Please enter an amount greater than zero."); return; }
  if (kind.startsWith("edit-")) {
    const editType = kind.slice(5);
    const id = v.id;
    if (editType === "transaction") {
      const item = data.transactions.find(entry => entry.id === id);
      if (item) Object.assign(item, { name: v.name.trim(), type: v.type, amount, date: v.date, category: v.category, image: pendingTransactionImage || item.image || "" });
    } else if (editType === "recurring") {
      const item = data.recurringTransactions.find(entry => entry.id === id);
      const dayOfMonth = Number(v.dayOfMonth);
      if (!Number.isInteger(dayOfMonth) || dayOfMonth < 1 || dayOfMonth > 31) { showToast("Choose a due day between 1 and 31."); return; }
      if (item) Object.assign(item, { name: v.name.trim(), type: v.type, amount, category: v.category, dayOfMonth, remindDaysBefore: Number(v.remindDaysBefore) });
    } else if (editType === "goal") {
      if (Number(v.saved) > Number(v.target)) { showToast("Your starting savings can’t be more than the goal."); return; }
      const item = data.goals.find(entry => entry.id === id);
      if (item) Object.assign(item, { name: v.name.trim(), target: Number(v.target), saved: Number(v.saved || 0), due: v.due, icon: v.icon });
    } else if (editType === "investment") {
      if (!Number.isFinite(Number(v.invested)) || Number(v.invested) <= 0 || !Number.isFinite(Number(v.value)) || Number(v.value) < 0) { showToast("Enter valid invested and current values."); return; }
      const item = data.investments.find(entry => entry.id === id);
      if (item) Object.assign(item, { name: v.name.trim(), type: v.type, invested: Number(v.invested), value: Number(v.value), date: v.date });
    } else if (editType === "plan") {
      if (Number(v.saved) > Number(v.target)) { showToast("Your amount saved can’t be more than the target."); return; }
      if (v.due < iso(today)) { showToast("Choose a target date in the future."); return; }
      const item = data.plans.find(entry => entry.id === id);
      if (item) Object.assign(item, { name: v.name.trim(), target: Number(v.target), saved: Number(v.saved || 0), due: v.due, icon: v.icon });
    } else if (editType === "funnel") {
      if (!Number.isFinite(Number(v.limit)) || Number(v.limit) <= 0) { showToast("Enter a monthly funnel amount greater than zero."); return; }
      const item = data.funnels.find(entry => entry.id === id);
      if (item) Object.assign(item, { name: v.name.trim(), category: v.category, limit: Number(v.limit), icon: v.icon });
    }
    saveData(); closeModal(); render(); showToast("Changes saved.");
    return;
  }
  if (kind === "transaction") data.transactions.push({ id: uid(), name: v.name.trim(), type: v.type, amount, date: v.date, category: v.category, note: "", image: pendingTransactionImage || "" });
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
  if (kind === "funnel") data.funnels.push({ id: uid(), name: v.name.trim(), category: v.category, limit: Number(v.limit), icon: v.icon });
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
  const key = kind === "transaction" ? "transactions" : kind === "goal" ? "goals" : kind === "investment" ? "investments" : kind === "recurring" ? "recurringTransactions" : kind === "funnel" ? "funnels" : "plans";
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
async function handleTransactionImage(file) {
  if (!file) return;
  const status = document.getElementById("transaction-image-status");
  const preview = document.getElementById("transaction-image-preview");
  if (!file.type.startsWith("image/")) { if (status) status.textContent = "Please choose an image file."; return; }
  if (status) status.textContent = "Preparing image…";
  try {
    const imageData = await compressTransactionImage(file);
    pendingTransactionImage = imageData;
    if (preview) { preview.src = imageData; preview.hidden = false; }
    if (status) status.textContent = "Reading transaction details…";
    const text = await recognizeTransactionText(imageData);
    applyExtractedTransaction(text, file.name);
    if (status) status.textContent = text ? "Details extracted. Review and save." : "Image added. Add or review the details below.";
  } catch (error) {
    console.error("Could not process transaction image:", error);
    if (status) status.textContent = "Image added, but automatic reading was unavailable.";
  }
}
function compressTransactionImage(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(reader.error);
    reader.onload = () => {
      const image = new Image();
      image.onerror = () => reject(new Error("The selected image could not be read."));
      image.onload = () => {
        const scale = Math.min(1, 1200 / Math.max(image.naturalWidth, image.naturalHeight));
        const canvas = document.createElement("canvas");
        canvas.width = Math.max(1, Math.round(image.naturalWidth * scale));
        canvas.height = Math.max(1, Math.round(image.naturalHeight * scale));
        canvas.getContext("2d").drawImage(image, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/jpeg", .78));
      };
      image.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}
async function loadTransactionOCR() {
  if (window.Tesseract) return window.Tesseract;
  await new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/tesseract.js@5/dist/tesseract.min.js";
    script.onload = resolve;
    script.onerror = () => reject(new Error("OCR library could not be loaded."));
    document.head.appendChild(script);
  });
  return window.Tesseract;
}
async function recognizeTransactionText(imageData) {
  try {
    const OCR = await loadTransactionOCR();
    const result = await OCR.recognize(imageData, "eng");
    return result?.data?.text || "";
  } catch (error) {
    console.error("Could not read text from transaction image:", error);
    return "";
  }
}
function applyExtractedTransaction(text, fileName) {
  const lines = text.split(/\r?\n/).map(line => line.trim()).filter(Boolean);
  const amountMatch = lines
    .flatMap(line => (line.match(/(?:KES|Ksh|[$€£₹])?\s?\d[\d,]*(?:\.\d{1,2})?/gi) || [])
      .map(value => ({ value, line }))
    )
    .map(match => ({ ...match, number: Number(match.value.replace(/[^\d.]/g, "")) }))
    .filter(match => Number.isFinite(match.number) && match.number > 0)
    .sort((a, b) => (/(total|amount|due|balance)/i.test(b.line) - /(total|amount|due|balance)/i.test(a.line)) || b.number - a.number)[0];
  const amountInput = document.getElementById("entry-amount");
  if (amountInput && amountMatch) amountInput.value = amountMatch.number.toFixed(2);

  let date = "";
  const dateMatch = text.match(/\b(\d{4}[-/.]\d{1,2}[-/.]\d{1,2}|\d{1,2}[-/.]\d{1,2}[-/.]\d{2,4})\b/);
  if (dateMatch) {
    const parts = dateMatch[1].replace(/[/.]/g, "-").split("-");
    if (parts[0].length === 4) date = `${parts[0]}-${parts[1].padStart(2,"0")}-${parts[2].padStart(2,"0")}`;
    else {
      let year = parts[2].length === 2 ? `20${parts[2]}` : parts[2];
      date = `${year}-${parts[1].padStart(2,"0")}-${parts[0].padStart(2,"0")}`;
    }
  }
  const dateInput = document.getElementById("entry-date");
  if (dateInput && date && !Number.isNaN(new Date(`${date}T00:00:00`).getTime())) dateInput.value = date;

  const nameInput = document.getElementById("entry-name");
  if (nameInput) {
    const firstUseful = lines.find(line => line.length >= 3 && !/\b(receipt|invoice|transaction|date|total)\b/i.test(line) && !/^\d[\d\s,.-]*$/.test(line));
    const fromFile = fileName.replace(/\.[^.]+$/, "").replace(/[_-]+/g, " ").trim();
    nameInput.value = (firstUseful || fromFile || "Uploaded transaction").slice(0, 60);
  }
  const typeInput = document.getElementById("entry-type");
  if (typeInput && /\b(refund|received|deposit|salary|income|credit)\b/i.test(text)) typeInput.value = "income";
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
