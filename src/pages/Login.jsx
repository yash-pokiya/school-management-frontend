import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

const API_BASE = import.meta.env.VITE_API_BASE || ''

export default function Login() {
  const navigate = useNavigate()

  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading]   = useState(false)
  const [error, setError]       = useState('')

  /* ---- Validation ---- */
  function validate() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) return 'Please enter a valid email address.'
    if (!password.trim())        return 'Password must not be empty.'
    return null
  }

  /* ---- Submit ---- */
  async function handleSubmit(e) {
    e.preventDefault()
    setError('')

    const validationError = validate()
    if (validationError) { setError(validationError); return }

    setLoading(true)
    try {
      const response = await fetch(`${API_BASE}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (!response.ok || !data.success) {
        setError(data.message || 'Login failed. Please check your credentials.')
        return
      }

      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))
      navigate('/dashboard', { replace: true })
    } catch {
      setError('Unable to connect to the server. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-sky-50 px-4 py-10">

      {/* Decorative blobs */}
      <div aria-hidden="true" className="pointer-events-none fixed -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-indigo-200/40 blur-[100px]" />
      <div aria-hidden="true" className="pointer-events-none fixed -bottom-32 -right-32 w-[400px] h-[400px] rounded-full bg-sky-200/40 blur-[100px]" />

      <main className="relative z-10 w-full max-w-md bg-white/80 backdrop-blur-xl border border-slate-200/70 rounded-3xl shadow-2xl shadow-indigo-200/40 px-10 py-12 animate-[fadeUp_0.5s_cubic-bezier(0.34,1.56,0.64,1)_both]">

        {/* ---- Branding ---- */}
        <div className="flex flex-col items-center gap-2 mb-6">
          {/* Logo */}
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-sky-400 flex items-center justify-center shadow-lg shadow-indigo-300/50 mb-1">
            <svg className="w-9 h-9 text-white" viewBox="0 0 48 48" fill="none" aria-hidden="true">
              <path d="M10 36L24 12L38 36H10Z" fill="white" fillOpacity="0.9" />
              <circle cx="24" cy="24" r="5" fill="white" />
            </svg>
          </div>
          <h1 className="text-2xl font-extrabold bg-gradient-to-r from-indigo-600 to-sky-500 bg-clip-text text-transparent tracking-tight">
            EduAdmin
          </h1>
          <p className="text-[0.7rem] font-semibold tracking-[0.12em] uppercase text-slate-400">
            School Management System
          </p>
        </div>

        {/* ---- Divider ---- */}
        <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent mb-7" />

        <h2 className="text-center text-[1.4rem] font-bold text-slate-800 tracking-tight">Welcome back</h2>
        <p className="text-center text-sm text-slate-400 mt-1 mb-7">Sign in to your account to continue</p>

        {/* ---- Error Banner ---- */}
        {error && (
          <div
            role="alert"
            id="login-error"
            className="flex items-center gap-2.5 bg-red-50 border border-red-200 text-red-600 rounded-xl px-4 py-3 text-sm mb-5 animate-[shake_0.35s_ease_both]"
          >
            <svg className="w-4.5 h-4.5 shrink-0 text-red-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <span>{error}</span>
          </div>
        )}

        {/* ---- Form ---- */}
        <form onSubmit={handleSubmit} noValidate aria-label="Login form" className="flex flex-col gap-5">

          {/* Email */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="login-email" className="text-[0.75rem] font-semibold uppercase tracking-widest text-slate-500">
              Email Address
            </label>
            <div className="relative flex items-center">
              <svg className="absolute left-3.5 w-4.5 h-4.5 text-indigo-400 pointer-events-none" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              <input
                id="login-email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={e => { setEmail(e.target.value); setError('') }}
                autoComplete="email"
                required
                aria-required="true"
                aria-describedby={error ? 'login-error' : undefined}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 placeholder-slate-400 text-sm outline-none transition focus:border-indigo-400 focus:ring-3 focus:ring-indigo-100 focus:bg-white"
              />
            </div>
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="login-password" className="text-[0.75rem] font-semibold uppercase tracking-widest text-slate-500">
              Password
            </label>
            <div className="relative flex items-center">
              <svg className="absolute left-3.5 w-4.5 h-4.5 text-indigo-400 pointer-events-none" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              <input
                id="login-password"
                type={showPass ? 'text' : 'password'}
                placeholder="Enter your password"
                value={password}
                onChange={e => { setPassword(e.target.value); setError('') }}
                autoComplete="current-password"
                required
                aria-required="true"
                className="w-full pl-10 pr-11 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 placeholder-slate-400 text-sm outline-none transition focus:border-indigo-400 focus:ring-3 focus:ring-indigo-100 focus:bg-white"
              />
              <button
                type="button"
                id="toggle-password-btn"
                onClick={() => setShowPass(v => !v)}
                aria-label={showPass ? 'Hide password' : 'Show password'}
                className="absolute right-3 text-slate-400 hover:text-slate-600 transition rounded-md p-0.5"
              >
                {showPass ? (
                  <svg className="w-4.5 h-4.5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                    <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                  </svg>
                ) : (
                  <svg className="w-4.5 h-4.5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            id="login-submit-btn"
            disabled={loading}
            aria-busy={loading}
            className="flex items-center justify-center gap-2 w-full mt-1 py-3.5 rounded-xl bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white font-bold text-sm tracking-wide shadow-lg shadow-indigo-300/50 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-indigo-300/60 active:translate-y-0 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <span className="w-4.5 h-4.5 border-2 border-white/30 border-t-white rounded-full animate-spin" aria-hidden="true" />
                Signing in…
              </>
            ) : (
              <>
                Sign In
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </>
            )}
          </button>
        </form>

        {/* Sign up link */}
        <p className="text-center mt-6 text-sm text-slate-500">
          Don&apos;t have an account?{' '}
          <Link
            to="/register"
            id="goto-register-link"
            className="font-semibold text-indigo-600 hover:text-indigo-700 hover:underline transition"
          >
            Sign up
          </Link>
        </p>

        {/* Footer */}
        <p className="text-center mt-4 text-[0.72rem] text-slate-400 flex items-center justify-center gap-1.5">
          <span>🔒</span> Secure login powered by JWT authentication
        </p>
      </main>

      {/* Keyframe animations via a style tag (Tailwind v4 arbitrary anim) */}
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(28px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0)    scale(1);    }
        }
        @keyframes shake {
          0%,100% { transform: translateX(0); }
          20%      { transform: translateX(-5px); }
          40%      { transform: translateX(5px); }
          60%      { transform: translateX(-3px); }
          80%      { transform: translateX(2px); }
        }
      `}</style>
    </div>
  )
}
