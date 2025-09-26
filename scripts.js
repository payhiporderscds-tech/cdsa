// scripts.js (shared Firebase Auth + eBooks + Auth UI helpers)

// ===== Firebase (CDS) =====
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/12.3.0/firebase-auth.js";

// ✅ Correct Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCIFLzjNsgWusGBOOdVdZlkUWk_j8YdJws",
  authDomain: "cds-dispute-system.firebaseapp.com",
  projectId: "cds-dispute-system",
  storageBucket: "cds-dispute-system.appspot.com",   // fixed here
  messagingSenderId: "1086342153390",
  appId: "1:1086342153390:web:c8f65869313c838280993f",
  measurementId: "G-WGTD60DXSS",
};

// Init Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// ===== PayHip eBooks =====
export const EBOOKS = [
  {
    title: "Consumer Dispute System Blueprint",
    cover:
      "https://payhip.com/cdn-cgi/image/format=auto,width=280/https://pe56d.s3.amazonaws.com/o_1j31j8j1tun5hgs1fn13n6nrlr.png",
    url: "https://payhip.com/b/4OyJS",
  },
  {
    title: "Credit Repair Letters Pack",
    cover:
      "https://payhip.com/cdn-cgi/image/format=auto,width=280/https://pe56d.s3.amazonaws.com/o_1j31j9rev1o241vf01bk11fr61mirr.png",
    url: "https://payhip.com/b/vdB58",
  },
  {
    title: "NPI Doctrine Explained",
    cover:
      "https://payhip.com/cdn-cgi/image/format=auto,width=280/https://pe56d.s3.amazonaws.com/o_1j31jb0i4arq1sp41k5p1bh26lqr.png",
    url: "https://payhip.com/b/wHflQ",
  },
];

// Render eBooks into any page section with that containerId
export function renderEbooks(containerId) {
  const grid = document.getElementById(containerId);
  if (!grid) return;
  grid.innerHTML = "";
  EBOOKS.forEach((item) => {
    const card = document.createElement("div");
    card.className = "card p-4 bg-slate-50 text-center";
    card.innerHTML = `
      <img src="${item.cover}" alt="${item.title}" class="mx-auto mb-3 rounded-md max-h-56 object-cover"/>
      <h4 class="font-semibold">${item.title}</h4>
      <div class="mt-3">
        <a href="${item.url}" target="_blank" class="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600">
          View on PayHip
        </a>
      </div>
    `;
    grid.appendChild(card);
  });
}

// ===== Auth UI wiring =====
export function setupAuthUI() {
  const $ = (id) => document.getElementById(id);
  const dialog = $("authDialog");

  // Open auth modal
  if ($("loginOpenBtn")) $("loginOpenBtn").onclick = () => dialog?.showModal();

  // Logout
  if ($("logoutBtn"))
    $("logoutBtn").onclick = async () => {
      await signOut(auth);
    };

  // Login
  if ($("loginBtn"))
    $("loginBtn").onclick = async () => {
      $("authStatus").textContent = "Logging in...";
      try {
        await signInWithEmailAndPassword(auth, $("authEmail").value, $("authPassword").value);
        $("authStatus").textContent = "Logged in!";
        setTimeout(() => dialog?.close(), 300);
      } catch (e) {
        $("authStatus").textContent = e.message;
      }
    };

  // Signup
  if ($("signupBtn"))
    $("signupBtn").onclick = async () => {
      $("authStatus").textContent = "Creating account...";
      try {
        await createUserWithEmailAndPassword(auth, $("authEmail").value, $("authPassword").value);
        $("authStatus").textContent = "Account created!";
        setTimeout(() => dialog?.close(), 300);
      } catch (e) {
        $("authStatus").textContent = e.message;
      }
    };

  // Gate sections on login state
  onAuthStateChanged(auth, (user) => {
    const loggedIn = !!user;

    // header buttons
    if ($("logoutBtn")) $("logoutBtn").classList.toggle("hidden", !loggedIn);
    if ($("loginOpenBtn")) $("loginOpenBtn").classList.toggle("hidden", loggedIn);

    // Intake page gate
    if ($("intakeLocked")) $("intakeLocked").classList.toggle("hidden", loggedIn);
    if ($("intakeEmbed")) $("intakeEmbed").classList.toggle("hidden", !loggedIn);

    // Letters page gate
    if ($("lettersLocked")) $("lettersLocked").classList.toggle("hidden", loggedIn);
    if ($("lettersWrap")) $("lettersWrap").classList.toggle("hidden", !loggedIn);
  });
}
