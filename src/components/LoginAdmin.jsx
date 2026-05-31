import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Lock, Mail, Eye, EyeOff, ShieldCheck, User  } from 'lucide-react'

function LoginAdmin({ onClose, onLogin  }) {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center px-4"
        style={{ backgroundColor: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(6px)' }}
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.2 }}
          className="relative bg-[#0f0d1a] border border-purple-500/30 rounded-3xl p-8 w-full max-w-md"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="absolute -inset-px bg-linear-to-br from-purple-600 to-cyan-500 rounded-3xl blur-2xl opacity-10 pointer-events-none" />

          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors cursor-pointer"
          >
            <X size={20} />
          </button>

          <div className="flex flex-col items-center gap-3 mb-8">
            <div className="w-14 h-14 rounded-2xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center">
              <ShieldCheck size={26} className="text-purple-400" />
            </div>
            <div className="text-center">
              <h2 className="text-white text-xl font-black">Área do Administrador</h2>
              <p className="text-gray-500 text-sm mt-1">Acesso restrito</p>
            </div>
          </div>

          <div className="flex flex-col gap-4">

            <div className="flex flex-col gap-2">
              <label className="text-gray-400 text-xs font-semibold uppercase tracking-widest">
                Usuario
              </label>
              <div className="relative">
                <Mail size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="usuario.admin"
                  className="w-full bg-white/5 border border-white/10 focus:border-purple-500/60 rounded-xl px-4 py-3 pl-10 text-white text-sm outline-none transition-colors placeholder:text-gray-600"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-gray-400 text-xs font-semibold uppercase tracking-widest">
                Senha
              </label>
              <div className="relative">
                <Lock size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-white/5 border border-white/10 focus:border-purple-500/60 rounded-xl px-4 py-3 pl-10 pr-10 text-white text-sm outline-none transition-colors placeholder:text-gray-600"
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors cursor-pointer"
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => {
                if (email === 'admin.codeck' && password === 'codeck@2025') {
                  onClose()
                  setTimeout(() => onLogin(), 150)
                } else {
                  alert('Usuário ou senha incorretos!')
                }
              }}
              className="w-full bg-linear-to-r from-purple-600 to-fuchsia-600 text-white font-black py-3.5 rounded-xl text-sm cursor-pointer hover:opacity-90 transition-opacity mt-2"
            >
              Entrar
            </motion.button>
          </div>

        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default LoginAdmin