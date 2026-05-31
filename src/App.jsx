import Navbar from './components/Navbar'
import AdminPanel from './components/AdminPanel'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Zap, Monitor, Users, CheckCircle, Star, Code2, Brain, Globe, CalendarDays, Timer } from 'lucide-react'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay },
})

function App() {
  const [adminLogado, setAdminLogado] = useState(false)
  if (adminLogado) {
    return <AdminPanel onLogout={() => setAdminLogado(false)} />
  }

  return (
    <main className="bg-[#07060f] min-h-screen overflow-x-hidden">

      <div className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(124,58,237,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,0.04) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="fixed -top-50 left-1/2 -translate-x-1/2 w-175 h-175 bg-purple-700/20 rounded-full blur-[120px] pointer-events-none" />

      <Navbar onAdminLogin={() => setAdminLogado(true)} />

      <section className="min-h-screen flex items-center px-6 pt-28 pb-16 relative">
        <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-purple-600/15 border border-purple-500/30 text-purple-400 text-xs font-bold px-4 py-2 rounded-full mb-8 tracking-widest uppercase"
            >
              <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
              Vagas Limitadas — Turma Aberta
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
              <p className="text-gray-400 text-lg font-medium tracking-widest uppercase mb-1">Trilha</p>
              <h1 className="text-6xl md:text-7xl font-black leading-none mb-2">
                <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-400 via-fuchsia-400 to-cyan-400">
                  Fullstack
                </span>
              </h1>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
                Do Zero ao Projeto Real
              </h2>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
              className="text-gray-400 text-base leading-relaxed mb-8 max-w-md"
            >
              Aprenda, pratique e construa seu futuro na tecnologia. Comece{' '}
              <span className="text-green-400 font-bold">100% gratuito</span> com lógica
              de programação e avance para a trilha premium de sites e e-commerce.
            </motion.p>

            <motion.ul
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col gap-3 mb-10"
            >
              {[
                { icon: <Zap size={13} />, text: '100% ao vivo — direto com o profissional' },
                { icon: <Monitor size={13} />, text: 'Aulas ao vivo — tire dúvidas e evolua de verdade' },
                { icon: <Users size={13} />, text: 'Vagas limitadas — turmas reduzidas para garantir qualidade' },
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-gray-300 text-sm">
                  <span className="w-6 h-6 rounded-full bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-400 shrink-0">
                    {item.icon}
                  </span>
                  {item.text}
                </li>
              ))}
            </motion.ul>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.3 }}
            className="relative"
          >
            <div className="absolute -inset-px bg-linear-to-br from-purple-600 via-fuchsia-600 to-cyan-500 rounded-3xl blur-2xl opacity-25 animate-pulse" />
            <div className="relative bg-[#0f0d1a] border border-purple-500/30 rounded-3xl p-8 flex flex-col gap-5 backdrop-blur-sm">

              <div className="flex items-center justify-between">
                <span className="bg-green-500/15 border border-green-500/30 text-green-400 text-xs font-black px-3 py-1.5 rounded-full uppercase tracking-widest">
                  🎉 Módulo 1 — Grátis
                </span>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={12} className="text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-white text-2xl font-black mb-1">Lógica de Programação</h3>
                <p className="text-gray-500 text-sm">A base que todo dev precisa — sem custo algum.</p>
              </div>

              <div className="flex items-end gap-2 py-2 border-y border-white/5">
                <span className="text-5xl font-black text-white leading-none">R$ 0</span>
                <span className="text-green-400 text-sm font-bold mb-1">/ 3 meses</span>
              </div>

              <ul className="flex flex-col gap-2.5">
                {[
                  'Lógica e algoritmos do zero',
                  'Python como linguagem base',
                  'Projetos práticos desde o início',
                  'Aulas ao vivo com o professor',
                  'Acesso à comunidade exclusiva',
                  'Certificado de conclusão',
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-300 text-sm">
                    <CheckCircle size={15} className="text-green-400 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="bg-purple-600/10 border border-purple-500/20 rounded-2xl px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                <div className="relative flex items-center justify-center">
                  <div className="absolute w-5 h-5 bg-purple-500/30 rounded-full blur-sm" />
                  <Timer size={16} className="relative text-purple-400" />
                </div>
                <span className="text-gray-400 text-sm">Duração do módulo</span>
              </div>
                <span className="text-purple-400 font-black text-sm">3 meses</span>
              </div>

              <motion.a
                href="https://wa.me/5515996443072"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="w-full bg-linear-to-r from-purple-600 via-fuchsia-600 to-cyan-500 text-white font-black py-4 rounded-2xl text-base cursor-pointer hover:opacity-90 transition-opacity flex items-center justify-center"
              >
                ⚡ Quero Começar Grátis
              </motion.a>

              <p className="text-center text-gray-600 text-xs">
                Sem cartão de crédito · Sem compromisso
              </p>
            </div>
          </motion.div>

        </div>
      </section>

      <section className="py-28 px-6 relative">
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-purple-950/10 to-transparent pointer-events-none" />
        <div className="max-w-6xl mx-auto">

          <motion.div {...fadeUp()} className="text-center mb-16">
            <span className="inline-block bg-purple-600/15 border border-purple-500/30 text-purple-400 text-xs font-bold px-4 py-2 rounded-full mb-4 tracking-widest uppercase">
              📚 Trilha Completa
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-3">
              4 Módulos,{' '}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-cyan-400">
                1 Destino
              </span>
            </h2>
            <p className="text-gray-500 text-base">Do zero ao desenvolvimento com IA — tudo em sequência lógica</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                label: 'MÓDULO 1', labelColor: 'text-purple-400 border-purple-500/40 bg-purple-500/10',
                borderColor: 'border-purple-500/50', glowColor: 'purple',
                icon: <img src="/icons/python.svg" alt="Python" className="w-14 h-14 object-contain drop-shadow-lg" />,
                title: 'Lógica de Programação', highlight: 'com Python', highlightColor: 'text-yellow-400',
                badge: '🎉 GRÁTIS', badgeClass: 'bg-green-500/20 border border-green-500/30 text-green-400',
                sub: 'Comece agora e prepare sua base para o sucesso.',
                topics: null, duration: '3 meses',
              },
              {
                label: 'MÓDULO 2', labelColor: 'text-blue-400 border-blue-500/40 bg-blue-500/10',
                borderColor: 'border-blue-500/40', glowColor: 'blue',
                icon: <img src="/icons/csharp.svg" alt="C#" className="w-14 h-14 object-contain drop-shadow-lg" />,
                title: 'Back-end com .NET', highlight: 'e ASP.NET Core', highlightColor: 'text-blue-400',
                badge: null, sub: null,
                topics: ['APIs REST', 'Banco de dados', 'CRUD completo', 'Autenticação JWT', 'E muito mais!'],
                duration: '2 meses',
              },
              {
                label: 'MÓDULO 3', labelColor: 'text-cyan-400 border-cyan-500/40 bg-cyan-500/10',
                borderColor: 'border-cyan-500/40', glowColor: 'cyan',
                icon: <img src="/icons/react.svg" alt="React" className="w-14 h-14 object-contain drop-shadow-lg animate-spin" style={{ animationDuration: '8s' }} />,
                title: 'Front-end com React', highlight: 'e TypeScript', highlightColor: 'text-cyan-400',
                badge: null, sub: null,
                topics: ['Componentes', 'Estados e Hooks', 'React Router', 'Consumo de APIs', 'E muito mais!'],
                duration: '2 meses',
              },
              {
                label: 'MÓDULO 4', labelColor: 'text-fuchsia-400 border-fuchsia-500/40 bg-fuchsia-500/10',
                borderColor: 'border-fuchsia-500/40', glowColor: 'fuchsia',
               icon: <img src="/icons/ia.svg" alt="IA" className="w-14 h-14 object-contain drop-shadow-lg" style={{ filter: 'invert(1)' }} />,
                title: 'Desenvolvimento', highlight: 'com IA', highlightColor: 'text-fuchsia-400',
                badge: null, sub: null,
                topics: ['Modelos de IA', 'Lovable', 'Manus', 'Cursor', 'E muito mais!'],
                duration: '1 mês e 2 semanas',
              },
            ].map((mod, i) => (
              <motion.div
                key={i}
                {...fadeUp(i * 0.1)}
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className={`relative bg-[#0f0d1a] border ${mod.borderColor} rounded-2xl p-6 flex flex-col gap-4 cursor-default group`}
              >
                <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-linear-to-b from-${mod.glowColor}-600/5 to-transparent pointer-events-none`} />

                <span className={`text-xs font-black px-3 py-1 rounded-full border w-fit ${mod.labelColor}`}>
                  {mod.label}
                </span>

                <div>{mod.icon}</div>

                <div>
                  <h3 className="text-white font-black text-base leading-tight">{mod.title}</h3>
                  <span className={`font-black text-base ${mod.highlightColor}`}>{mod.highlight}</span>
                </div>

                {mod.badge && (
                  <span className={`text-xs font-black px-3 py-1.5 rounded-xl w-fit ${mod.badgeClass}`}>
                    {mod.badge}
                  </span>
                )}
                {mod.sub && <p className="text-gray-500 text-xs leading-relaxed">{mod.sub}</p>}

                {mod.topics && (
                  <ul className="flex flex-col gap-1.5">
                    {mod.topics.map((t, j) => (
                      <li key={j} className="text-gray-500 text-xs flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-gray-600 shrink-0" />
                        {t}
                      </li>
                    ))}
                  </ul>
                )}

            <div className="mt-auto pt-4 border-t border-white/5 flex items-center gap-2">
              <div className="relative flex items-center justify-center">
                <div className="absolute w-6 h-6 bg-purple-500/30 rounded-full blur-sm" />
                <CalendarDays size={20} className="relative text-purple-400" />
              </div>
              <span className="text-gray-400 text-xs font-semibold">{mod.duration}</span>
            </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      <section className="py-28 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          <motion.div {...fadeUp()} className="relative order-2 lg:order-1">
            <div className="absolute -inset-2 bg-linear-to-br from-purple-600 to-cyan-500 rounded-3xl blur-2xl opacity-15" />
            <img
              src="/apresentacao.png"
              alt="Instrutores Codeck Academy"
              className="relative rounded-3xl w-full object-cover shadow-2xl"
            />
          </motion.div>

          <motion.div {...fadeUp(0.2)} className="flex flex-col gap-6 order-1 lg:order-2">
            <span className="inline-flex items-center gap-2 bg-purple-600/15 border border-purple-500/30 text-purple-400 text-xs font-black px-4 py-2 rounded-full w-fit tracking-widest uppercase">
              👨‍💻 Quem Ensina
            </span>

            <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">
              Devs do mercado,{' '}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-cyan-400">
                ao vivo com você
              </span>
            </h2>

            <p className="text-gray-400 text-lg leading-relaxed">
              Método direto, sem enrolação. Você aprende com quem realmente constrói software no dia a dia.
            </p>

            <div className="flex flex-col gap-3 mt-2">
              {[
                { icon: <Code2 size={16} />, title: 'Experiência real', text: 'Profissionais ativos no mercado em cada aula' },
                { icon: <Star size={16} />, title: 'Foco no mercado', text: 'Habilidades que empresas realmente exigem' },
                { icon: <Users size={16} />, title: 'Ao vivo de verdade', text: 'Tire dúvidas na hora, sem gravação' },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  {...fadeUp(0.1 * i)}
                  className="flex items-start gap-4 bg-white/3 border border-white/6 rounded-2xl px-5 py-4 hover:border-purple-500/30 transition-colors"
                >
                  <span className="w-8 h-8 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-400 shrink-0 mt-0.5">
                    {item.icon}
                  </span>
                  <div>
                    <p className="text-white font-bold text-sm">{item.title}</p>
                    <p className="text-gray-500 text-sm">{item.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { number: '+500', label: 'Alunos formados', icon: <Users size={20} />, color: 'purple' },
              { number: '98%', label: 'Taxa de aprovação', icon: <Star size={20} />, color: 'yellow' },
              { number: '4.9★', label: 'Avaliação média', icon: <Star size={20} />, color: 'cyan' },
              { number: '100%', label: 'Aulas ao vivo', icon: <Monitor size={20} />, color: 'green' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                {...fadeUp(i * 0.1)}
                className="bg-[#0f0d1a] border border-white/6 rounded-2xl p-6 flex flex-col items-center gap-2 text-center hover:border-purple-500/30 transition-colors"
              >
                <span className="text-purple-400">{stat.icon}</span>
                <span className="text-3xl font-black text-white">{stat.number}</span>
                <span className="text-gray-500 text-xs">{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-28 px-6">
        <div className="max-w-3xl mx-auto text-center relative">
          <div className="absolute inset-0 bg-linear-to-r from-purple-600/20 to-cyan-500/20 rounded-3xl blur-3xl pointer-events-none" />
          <div className="relative bg-[#0f0d1a] border border-purple-500/30 rounded-3xl p-12 flex flex-col items-center gap-6">

            <span className="bg-green-500/15 border border-green-500/30 text-green-400 text-xs font-black px-4 py-2 rounded-full uppercase tracking-widest">
              🎉 Módulo 1 — 100% Gratuito
            </span>

            <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">
              Sua jornada{' '}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-cyan-400">
                começa agora
              </span>
            </h2>

            <p className="text-gray-400 text-lg max-w-lg">
              Dê o primeiro passo sem gastar nada. Comece com lógica de programação e evolua até construir aplicações com IA.
            </p>

            <motion.a
              href="https://wa.me/5515996443072"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
              className="bg-linear-to-r from-purple-600 via-fuchsia-600 to-cyan-500 text-white font-black px-10 py-5 rounded-2xl text-lg cursor-pointer hover:opacity-90 transition-opacity flex items-center gap-3"
            >
              <Zap size={20} className="text-yellow-300" />
              Começar Grátis Agora
            </motion.a>

            <p className="text-gray-600 text-sm">Sem cartão de crédito · Vagas limitadas · Turma ao vivo</p>

          </div>
        </div>
      </section>

      <footer className="py-8 px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center">
          <img
              src="/rodape.png"
              alt="Codeck Academy"
              className="h-10 object-contain"
          />
          </div>
          <p className="text-gray-600 text-xs">© 2025 Codeck Academy · Todos os direitos reservados</p>
        </div>
      </footer>
    </main>
  )
}
export default App