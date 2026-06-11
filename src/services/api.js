const API_URL = 'https://codeckplataformapi-production.up.railway.app'

export const loginUser = async (login, senha) => {
  const response = await fetch(`${API_URL}/api/autenticacao/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      login,
      senha
    })
  })

  let data = null

  try {
    data = await response.json()
  } catch {
    throw new Error('Erro ao processar resposta do servidor')
  }

  if (!response.ok) {
    throw new Error(data?.mensagem || 'Erro no login')
  }

  return data
}

export const refreshToken = async (refreshToken) => {
  const response = await fetch(`${API_URL}/api/autenticacao/refresh`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      refreshToken
    })
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data?.mensagem || 'Erro ao renovar sessão')
  }

  return data
}

export const logoutUser = async (refreshToken) => {
  const response = await fetch(`${API_URL}/api/autenticacao/logout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      refreshToken
    })
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data?.mensagem || 'Erro ao fazer logout')
  }

  return data
}

export const checkApiHealth = async () => {
  const response = await fetch(`${API_URL}/health`)

  if (!response.ok) {
    throw new Error('API offline')
  }

  return await response.json()
}

export const getModulos = async () => {
  const token = localStorage.getItem('token')

  if (!token) {
    throw new Error('Usuário não autenticado')
  }

  const response = await fetch(`${API_URL}/api/modulos`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data?.mensagem || 'Erro ao buscar módulos')
  }

  return data
}

export const createModulo = async (modulo) => {
  const token = localStorage.getItem('token')

  if (!token) {
    throw new Error('Usuário não autenticado')
  }

  const response = await fetch(`${API_URL}/api/modulos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(modulo)
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data?.mensagem || 'Erro ao criar módulo')
  }

  return data
}

export const getExams = async () => {
  const token = localStorage.getItem('token')

  const response = await fetch(`${API_URL}/api/provas`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data?.mensagem || 'Erro ao buscar provas')
  }

  return data
}

export const getExamById = async (id) => {
  const token = localStorage.getItem('token')

  const response = await fetch(`${API_URL}/api/provas/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data?.mensagem || 'Erro ao buscar prova')
  }

  return data
}

export const createExam = async (exam) => {
  const token = localStorage.getItem('token')

  const response = await fetch(`${API_URL}/api/provas`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(exam)
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data?.mensagem || 'Erro ao criar prova')
  }

  return data
}

export const updateExam = async (id, exam) => {
  const token = localStorage.getItem('token')

  const response = await fetch(`${API_URL}/api/provas/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(exam)
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data?.mensagem || 'Erro ao atualizar prova')
  }

  return data
}

export const deleteExam = async (id) => {
  const token = localStorage.getItem('token')

  const response = await fetch(`${API_URL}/api/provas/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  if (!response.ok) {
    throw new Error('Erro ao deletar prova')
  }

  return true
}

export const publishExam = async (id) => {
  const token = localStorage.getItem('token')

  const response = await fetch(`${API_URL}/api/provas/${id}/publicar`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data?.mensagem || 'Erro ao publicar prova')
  }

  return data
}