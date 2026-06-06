import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { GraduationCap, ShieldCheck, ChevronDown } from 'lucide-react'
import LoginAdmin from './LoginAdmin'
import LoginStudent from './LoginStudent'

function Navbar({ onAdminLogin, onStudentLogin }) {
  const [scrolled, setScrolled] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [showLoginAdmin, setShowLoginAdmin] = useState(false)
  const [showLoginStudent, setShowLoginStudent] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled ? 'bg-[#0a0a0f]/90 backdrop-blur-md shadow-lg shadow-purple-900/20' : 'bg-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <img src="/rodape.png" alt="Codeck Academy" className="h-10 object-contain" />
          </div>

          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 bg-purple-600 hover:bg-purple-500 text-white text-sm font-bold px-5 py-2 rounded-full transition-all cursor-pointer hover:shadow-lg hover:shadow-purple-500/30"
            >
              {isAdmin ? 'Admin ✓' : 'Faça login'}
              <ChevronDown size={14} className={`transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {dropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 mt-3 w-48 bg-[#0f0d1a] border border-purple-500/30 rounded-2xl overflow-hidden shadow-xl shadow-purple-900/30"
                >
                  
                    <a href="#"
                    onClick={() => {
                      setShowLoginStudent(true)
                      setDropdownOpen(false)
                    }}
                    className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-purple-600/20 hover:text-white transition-colors text-sm group"
                  >
                    <span className="w-7 h-7 rounded-lg bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-400 group-hover:bg-purple-500/30 transition-colors">
                      <GraduationCap size={14} />
                    </span>
                    Aluno
                  </a>
                  <div className="h-px bg-white/5 mx-3" />
                  
                    <a href="#"
                    onClick={() => {
                      setShowLoginAdmin(true)
                      setDropdownOpen(false)
                    }}
                    className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-purple-600/20 hover:text-white transition-colors text-sm group"
                  >
                    <span className="w-7 h-7 rounded-lg bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-400 group-hover:bg-purple-500/30 transition-colors">
                      <ShieldCheck size={14} />
                    </span>
                    Administrador
                  </a>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.nav>

      {showLoginAdmin && (
        <LoginAdmin
          onClose={() => setShowLoginAdmin(false)}
          onLogin={() => {
            setIsAdmin(true)
            onAdminLogin()
          }}
        />
      )}
      {showLoginStudent && (
        <LoginStudent 
          onClose={() => setShowLoginStudent(false)} 
          onLogin={() => {
            setShowLoginStudent(false)
            onStudentLogin()
          }}
        />
      )}
    </>
  )
}

export default Navbar