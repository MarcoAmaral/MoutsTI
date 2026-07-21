export function uniqueEmail(prefix = 'qa.moutsti') {
  return `${prefix}.${Date.now()}.${Math.floor(Math.random() * 100000)}@example.com`
}

export function disposableUser(overrides = {}) {
  return {
    nome: 'QA Automation',
    email: uniqueEmail(),
    password: 'Senha123!',
    administrador: 'false',
    ...overrides,
  }
}

export function disposableProduct(overrides = {}) {
  return {
    nome: `Produto QA ${Date.now()}`,
    preco: 100,
    descricao: 'Produto de teste descartável',
    quantidade: 1,
    ...overrides,
  }
}
