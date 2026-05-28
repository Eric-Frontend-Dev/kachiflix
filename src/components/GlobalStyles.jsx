html {
  scroll-behavior: smooth;
}

@keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
@keyframes slideUp { from { transform: translateY(40px); opacity: 0 } to { transform: translateY(0); opacity: 1 } }
@keyframes pulse { 0%,100% { box-shadow: 0 0 0 0 rgba(255,215,0,0.4) } 50% { box-shadow: 0 0 0 8px rgba(255,215,0,0) } }
@keyframes shimmer { 0% { background-position: -200% center } 100% { background-position: 200% center } }
@keyframes spin { to { transform: rotate(360deg) } }

* { box-sizing: border-box; }
::-webkit-scrollbar { width: 6px } ::-webkit-scrollbar-track { background: #111 }
::-webkit-scrollbar-thumb { background: #FFD700; border-radius: 3px }
input::placeholder { color: #555 }
.search-input:focus { outline: none; border-color: #FFD700 !important; box-shadow: 0 0 0 3px rgba(255,215,0,0.15) }
.nav-link:hover { color: #FFD700 !important }
.grid-movie { display: grid; grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); gap: 16px; }
@media (max-width: 600px) { .grid-movie { grid-template-columns: repeat(2, 1fr); } }