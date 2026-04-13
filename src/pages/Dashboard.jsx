import { useNavigate } from 'react-router-dom'

export default function Dashboard() {
  const navigate = useNavigate()
  const rawUser  = localStorage.getItem('user')
  const user     = rawUser ? JSON.parse(rawUser) : null

  function handleLogout() {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/login', { replace: true })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-white to-sky-50 px-4">

      <div aria-hidden="true" className="pointer-events-none fixed -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-emerald-200/30 blur-[100px]" />
      <div aria-hidden="true" className="pointer-events-none fixed -bottom-32 -left-32 w-[400px] h-[400px] rounded-full bg-sky-200/30 blur-[100px]" />

      <div className="relative z-10 w-full max-w-md bg-white/80 backdrop-blur-xl border border-slate-200/70 rounded-3xl shadow-2xl shadow-emerald-100/50 px-10 py-12 text-center animate-[pop_0.5s_cubic-bezier(0.34,1.56,0.64,1)_both]">

        {/* Avatar */}
        <div className="w-18 h-18 rounded-full bg-gradient-to-br from-indigo-500 to-sky-400 flex items-center justify-center mx-auto mb-5 shadow-lg shadow-indigo-300/40 text-white text-2xl font-extrabold">
          {user?.name?.charAt(0).toUpperCase() ?? 'U'}
        </div>

        <h1 className="text-2xl font-bold text-slate-800 tracking-tight mb-3">
          Welcome back{user?.name ? `, ${user.name}` : ''}!
        </h1>

        {/* Role badge */}
        <span className="inline-block px-3.5 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-600 text-[0.72rem] font-bold tracking-widest uppercase mb-5">
          {user?.role ?? 'USER'}
        </span>

        <p className="text-slate-500 text-sm mb-1">You are successfully authenticated.</p>
        {user?.email && <p className="text-slate-400 text-sm mb-8">{user.email}</p>}

        <button
          id="logout-btn"
          onClick={handleLogout}
          className="px-8 py-2.5 rounded-xl border border-red-200 bg-red-50 text-red-500 font-semibold text-sm hover:bg-red-100 hover:border-red-300 transition-all hover:-translate-y-0.5"
        >
          Sign Out
        </button>
      </div>

      <style>{`
        @keyframes pop {
          from { opacity: 0; transform: scale(0.93); }
          to   { opacity: 1; transform: scale(1);    }
        }
      `}</style>
    </div>
  )
}
