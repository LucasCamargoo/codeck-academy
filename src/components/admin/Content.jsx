import { useState } from 'react'
import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FileText, Plus, X, Trash2, Pencil, CheckCircle } from 'lucide-react'
import { getModulos, createExam, deleteExam, getExams } from "../../services/api";

function ExamForm({ form, setForm, questions, setQuestions, showAddQuestion, setShowAddQuestion, newQuestion, setNewQuestion, classes, modulos, onClose, onSave, title, subtitle, buttonLabel, buttonClass }) {

  const handleChange = (field, value) => setForm((prev) => ({ ...prev, [field]: value }))

  const handleAddQuestion = () => {
    if (!newQuestion.text || newQuestion.options.some((o) => !o)) {
      alert('Preencha a pergunta e todas as alternativas.')
      return
    }
    setQuestions((prev) => [...prev, { ...newQuestion, id: Date.now() }])
    setNewQuestion({ text: '', options: ['', '', '', ''], correct: 0 })
    setShowAddQuestion(false)
  }

  const handleOptionChange = (index, value) => {
    const updated = [...newQuestion.options]
    updated[index] = value
    setNewQuestion((prev) => ({ ...prev, options: updated }))
  }

  const handleSave = async () => {
    if (!form.title || !form.module) {
      alert('Preencha os campos obrigatórios.');
      return;
    }

    if (questions.length === 0) {
      alert('Adicione pelo menos uma questão.');
      return;
    }

    await onSave();
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] flex items-center justify-center px-4 py-8 overflow-y-auto"
      style={{ backgroundColor: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(6px)' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.2 }}
        className="relative bg-[#0f0d1a] border border-purple-500/30 rounded-3xl p-8 w-full max-w-2xl my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute -inset-px bg-linear-to-br from-purple-600 to-cyan-500 rounded-3xl blur-2xl opacity-10 pointer-events-none" />
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-white cursor-pointer"><X size={20} /></button>

        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center">
            <FileText size={18} className="text-cyan-400" />
          </div>
          <div>
            <h2 className="text-white text-xl font-black">{title}</h2>
            <p className="text-gray-500 text-sm">{subtitle}</p>
          </div>
        </div>

        <div className="flex flex-col gap-5">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-gray-400 text-xs font-semibold uppercase tracking-widest">Título da Prova</label>
              <input type="text" value={form.title} onChange={(e) => handleChange('title', e.target.value)} placeholder="Ex: Prova 1 — Lógica" className="w-full bg-white/5 border border-white/10 focus:border-purple-500/60 rounded-xl px-4 py-3 text-white text-sm outline-none transition-colors placeholder:text-gray-600" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-gray-400 text-xs font-semibold uppercase tracking-widest">Descrição</label>
              <input type="text" value={form.description} onChange={(e) => handleChange('description', e.target.value)} placeholder="Descreva a prova" className="w-full bg-white/5 border border-white/10 focus:border-purple-500/60 rounded-xl px-4 py-3 text-white text-sm outline-none transition-colors placeholder:text-gray-600" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-gray-400 text-xs font-semibold uppercase tracking-widest">Módulo</label>
              <select value={form.module} onChange={(e) => handleChange('module', e.target.value)} className="w-full bg-white/5 border border-white/10 focus:border-purple-500/60 rounded-xl px-4 py-3 text-white text-sm outline-none appearance-none cursor-pointer">
            <option value="">Selecione</option>
            {modulos.map((m) => (
              <option key={m.id} value={m.id}>
                {m.nome}
              </option>
            ))}
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-gray-400 text-xs font-semibold uppercase tracking-widest">Turma</label>
              <select value={form.class_id} onChange={(e) => handleChange('class_id', e.target.value)} className="w-full bg-white/5 border border-white/10 focus:border-purple-500/60 rounded-xl px-4 py-3 text-white text-sm outline-none appearance-none cursor-pointer">
                <option value="" className="bg-[#0f0d1a]">Todas</option>
                {classes.map((c) => <option key={c.id} value={c.id} className="bg-[#0f0d1a]">{c.name}</option>)}
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-gray-400 text-xs font-semibold uppercase tracking-widest">Status</label>
              <select value={form.status} onChange={(e) => handleChange('status', e.target.value)} className="w-full bg-white/5 border border-white/10 focus:border-purple-500/60 rounded-xl px-4 py-3 text-white text-sm outline-none appearance-none cursor-pointer">
                <option value="draft" className="bg-[#0f0d1a]">Rascunho</option>
                <option value="published" className="bg-[#0f0d1a]">Publicada</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <label className="text-gray-400 text-xs font-semibold uppercase tracking-widest">Questões ({questions.length})</label>
              <button onClick={() => setShowAddQuestion(true)} className="flex items-center gap-1.5 bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/30 text-purple-400 text-xs font-bold px-3 py-1.5 rounded-lg transition-all cursor-pointer">
                <Plus size={13} /> Adicionar Questão
              </button>
            </div>

            {questions.length === 0 && !showAddQuestion && (
              <div className="bg-white/3 border border-white/5 rounded-xl p-6 text-center">
                <p className="text-gray-500 text-sm">Nenhuma questão adicionada ainda.</p>
              </div>
            )}

            {questions.map((q, qi) => (
              <div key={q.id} className="bg-white/3 border border-white/5 rounded-xl p-4 flex flex-col gap-3">
                <div className="flex items-start justify-between gap-3">
                  <p className="text-white text-sm font-semibold">{qi + 1}. {q.text}</p>
                  <button onClick={() => setQuestions((prev) => prev.filter((_, i) => i !== qi))} className="w-7 h-7 bg-red-600/20 hover:bg-red-600/40 border border-red-500/20 text-red-400 rounded-lg flex items-center justify-center cursor-pointer shrink-0">
                    <Trash2 size={12} />
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {q.options.map((opt, oi) => (
                    <div key={oi} className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs ${q.correct === oi ? 'bg-green-500/15 border border-green-500/30 text-green-400' : 'bg-white/3 border border-white/5 text-gray-400'}`}>
                      {q.correct === oi && <CheckCircle size={12} />}
                      <span className="font-bold">{String.fromCharCode(65 + oi)})</span> {opt}
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {showAddQuestion && (
              <div className="bg-white/3 border border-purple-500/20 rounded-xl p-5 flex flex-col gap-4">
                <p className="text-white text-sm font-black">Nova Questão</p>
                <div className="flex flex-col gap-2">
                  <label className="text-gray-400 text-xs font-semibold uppercase tracking-widest">Pergunta</label>
                  <input type="text" value={newQuestion.text} onChange={(e) => setNewQuestion((prev) => ({ ...prev, text: e.target.value }))} placeholder="Digite a pergunta..." className="w-full bg-white/5 border border-white/10 focus:border-purple-500/60 rounded-xl px-4 py-3 text-white text-sm outline-none transition-colors placeholder:text-gray-600" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-gray-400 text-xs font-semibold uppercase tracking-widest">Alternativas</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {newQuestion.options.map((opt, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <button onClick={() => setNewQuestion((prev) => ({ ...prev, correct: i }))} className={`w-7 h-7 rounded-full border flex items-center justify-center shrink-0 cursor-pointer transition-all text-xs font-black ${newQuestion.correct === i ? 'bg-green-500/20 border-green-500/40 text-green-400' : 'bg-white/5 border-white/10 text-gray-500 hover:border-white/30'}`}>
                          {String.fromCharCode(65 + i)}
                        </button>
                        <input type="text" value={opt} onChange={(e) => handleOptionChange(i, e.target.value)} placeholder={`Alternativa ${String.fromCharCode(65 + i)}`} className="flex-1 bg-white/5 border border-white/10 focus:border-purple-500/60 rounded-xl px-3 py-2 text-white text-sm outline-none transition-colors placeholder:text-gray-600" />
                      </div>
                    ))}
                  </div>
                  <p className="text-gray-600 text-xs">Clique na letra para marcar a resposta correta.</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setShowAddQuestion(false)} className="flex-1 bg-white/5 hover:bg-white/10 text-gray-400 text-sm font-semibold py-2.5 rounded-xl cursor-pointer transition-all">Cancelar</button>
                  <button onClick={handleAddQuestion} className="flex-1 bg-purple-600 hover:bg-purple-500 text-white text-sm font-bold py-2.5 rounded-xl cursor-pointer transition-all">Salvar Questão</button>
                </div>
              </div>
            )}
          </div>

          <div className="flex gap-3 mt-2">
            <button onClick={onClose} className="flex-1 bg-white/5 hover:bg-white/10 text-gray-300 font-bold py-3 rounded-xl text-sm transition-all cursor-pointer">Cancelar</button>
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} onClick={handleSave} className={`flex-1 text-white font-black py-3 rounded-xl text-sm cursor-pointer hover:opacity-90 transition-opacity ${buttonClass}`}>
              {buttonLabel}
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

function ModalNewExam({ onClose, onSave, classes }) {
  const [form, setForm] = useState({ title: '', description: '', class_id: '', module: '', status: 'draft' })
  const [questions, setQuestions] = useState([])
  const [showAddQuestion, setShowAddQuestion] = useState(false)
  const [newQuestion, setNewQuestion] = useState({ text: '', options: ['', '', '', ''], correct: 0 })
  const [modulos, setModulos] = useState([])

  useEffect(() => {
  const fetchModulos = async () => {
    try {
      const res = await getModulos()
      setModulos(res.dados)
    } catch (err) {
      console.error(err)
      alert('Erro ao buscar módulos')
    }
  }

    fetchModulos()
  }, [])

  return (
    <ExamForm
      form={form} setForm={setForm}
      questions={questions} setQuestions={setQuestions}
      showAddQuestion={showAddQuestion} setShowAddQuestion={setShowAddQuestion}
      newQuestion={newQuestion} setNewQuestion={setNewQuestion}
      classes={classes}
      modulos={modulos}
      onClose={onClose}
      onSave={async () => {
        try {
          const payload = {
            ...form,
            questions
          }

          const res = await createExam(payload)

          onSave(res.dados)
          onClose()
        } catch (err) {
          console.error(err)
          alert(err.message)
        }
      }}
      title="Nova Prova"
      subtitle="Crie uma prova com questões de alternativas."
      buttonLabel="Salvar Prova"
      buttonClass="bg-linear-to-r from-cyan-600 to-purple-600"
    />
  )
}

function ModalEditExam({ onClose, onSave, exam, classes }) {
  const [form, setForm] = useState({
    title: exam.title || '',
    description: exam.description || '',
    class_id: exam.class_id || '',
    module: exam.module || '',
    status: exam.status || 'draft'
  })

  const [questions, setQuestions] = useState(exam.questions || [])
  const [showAddQuestion, setShowAddQuestion] = useState(false)
  const [newQuestion, setNewQuestion] = useState({ text: '', options: ['', '', '', ''], correct: 0 })
  const [modulos, setModulos] = useState([])

  useEffect(() => {
    const fetchModulos = async () => {
      try {
        const res = await getModulos()
        setModulos(res.dados)
      } catch (err) {
        console.error(err)
      }
    }

    fetchModulos()
  }, [])

  return (
    <ExamForm
      form={form}
      setForm={setForm}
      questions={questions}
      setQuestions={setQuestions}
      showAddQuestion={showAddQuestion}
      setShowAddQuestion={setShowAddQuestion}
      newQuestion={newQuestion}
      setNewQuestion={setNewQuestion}
      classes={classes}
      modulos={modulos}
      onClose={onClose}
      onSave={async () => {
        try {
          const payload = {
            ...form,
            questions
          }

          const res = await updateExam(exam.id, payload)

          onSave(exam.id, res.dados)
          onClose()
        } catch (err) {
          console.error(err)
          alert(err.message)
        }
      }}
      title="Editar Prova"
      subtitle="Atualize as informações da prova."
      buttonLabel="Salvar Alterações"
      buttonClass="bg-linear-to-r from-purple-600 to-fuchsia-600"
    />
  )
}

function Content({ classes }) {
  const [exams, setExams] = useState([])
  const [showNewExam, setShowNewExam] = useState(false)
  const [editingExam, setEditingExam] = useState(null)

  useEffect(() => {
  const fetchExams = async () => {
    try {
      const res = await getExams()
      setExams(res.dados)
    } catch (err) {
      console.error(err)
      alert('Erro ao carregar provas')
    }
  }

    fetchExams()
  }, [])

  const handleUpdateExam = (id, data) => {
    setExams((prev) => prev.map((e) => e.id === id ? { ...e, ...data } : e))
    setEditingExam(null)
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-6">

      <div>
        <h2 className="text-white text-2xl font-black mb-1">Provas</h2>
        <p className="text-gray-500 text-sm">Crie e gerencie as provas dos alunos.</p>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-gray-400 text-sm">{exams.length} prova{exams.length !== 1 ? 's' : ''} cadastrada{exams.length !== 1 ? 's' : ''}</p>
        <button onClick={() => setShowNewExam(true)} className="flex items-center gap-2 bg-cyan-600 hover:bg-cyan-500 text-white text-sm font-bold px-4 py-2.5 rounded-xl transition-all cursor-pointer">
          <Plus size={15} /> Nova Prova
        </button>
      </div>

      {exams.length === 0 ? (
        <div className="bg-[#0f0d1a] border border-white/5 rounded-2xl p-10 flex flex-col items-center gap-4 text-center">
          <FileText size={32} className="text-cyan-400" />
          <p className="text-white font-bold">Nenhuma prova cadastrada</p>
          <p className="text-gray-500 text-sm">Crie a primeira prova para os alunos.</p>
          <button onClick={() => setShowNewExam(true)} className="flex items-center gap-2 bg-cyan-600 hover:bg-cyan-500 text-white text-sm font-bold px-5 py-2.5 rounded-xl transition-all cursor-pointer">
            <Plus size={15} /> Nova Prova
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {exams.map((exam) => (
            <motion.div
              key={exam.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#0f0d1a] border border-white/5 rounded-2xl p-6 flex flex-col gap-3 hover:border-cyan-500/30 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center shrink-0">
                  <FileText size={16} className="text-cyan-400" />
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setEditingExam(exam)} className="w-7 h-7 bg-purple-600/20 hover:bg-purple-600/40 border border-purple-500/20 text-purple-400 rounded-lg flex items-center justify-center cursor-pointer">
                    <Pencil size={12} />
                  </button>
                  <button
                    onClick={async () => {
                      if (!confirm('Deseja excluir essa prova?')) return

                      try {
                        await deleteExam(exam.id)
                        setExams(prev => prev.filter(e => e.id !== exam.id))
                      } catch (err) {
                        console.error(err)
                        alert('Erro ao excluir')
                      }
                    }}
                    className="w-7 h-7 bg-red-600/20 hover:bg-red-600/40 border border-red-500/20 text-red-400 rounded-lg flex items-center justify-center cursor-pointer"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              </div>
              <div>
                <h3 className="text-white font-black text-sm">{exam.title}</h3>
                {exam.description && <p className="text-gray-500 text-xs mt-1">{exam.description}</p>}
              </div>
              <div className="flex flex-wrap gap-2 mt-auto">
                <span className={`text-xs font-bold px-2 py-0.5 rounded-lg border ${exam.status === 'published' ? 'bg-green-500/15 border-green-500/30 text-green-400' : 'bg-gray-500/15 border-gray-500/30 text-gray-400'}`}>
                  {exam.status === 'published' ? 'Publicada' : 'Rascunho'}
                </span>
                {exam.module && (
                  <span className="bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs px-2 py-0.5 rounded-lg">
                    {exam.module.split('—')[0].trim()}
                  </span>
                )}
                <span className="text-gray-500 text-xs">{exam.questions?.length || 0} questões</span>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <AnimatePresence mode="wait">
        {showNewExam && (
          <ModalNewExam
            key="new-exam"
            onClose={() => setShowNewExam(false)}
            onSave={(e) => setExams((prev) => [...prev, e])}
            classes={classes}
          />
        )}

        {editingExam && (
          <ModalEditExam
            key="edit-exam"
            exam={editingExam}
            classes={classes}
            onClose={() => setEditingExam(null)}
            onSave={handleUpdateExam}
          />
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default Content