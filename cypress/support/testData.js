export function uniqueEmail(prefix = 'qa.moutsti') {
  return `${prefix}.${Date.now()}.${Math.floor(Math.random() * 100000)}@example.com`
}

export function disposableUser(overrides = {}) {
  return {
    nome: 'QA Automation - Marco Amaral',
    email: uniqueEmail(),
    password: 'Senha123!',
    administrador: 'false',
    ...overrides,
  }
}

export function userWithWeakPassword(overrides = {}) {
  return disposableUser({ password: 'a', ...overrides })
}

export function adminUserWithXssName(overrides = {}) {
  return disposableUser({
    nome: '<img src=x onerror="window.xssTriggered = true">',
    administrador: 'true',
    ...overrides,
  })
}

export function disposableProduct(overrides = {}) {
  return {
    nome: `Produto QA ${Date.now()}`,
    preco: 100,
    descricao: 'Produto de teste descartável - Marco Amaral',
    quantidade: 1,
    ...overrides,
  }
}
