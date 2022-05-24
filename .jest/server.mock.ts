import { server } from '../src/utils/mockServer/server'

beforeAll(() => {
  //fica escutando todas as chamas nos testes
  server.listen()
})

afterEach(() => {
  //reseta todos os handlers para caso eles sejam chamados novamente
  server.resetHandlers()
})

afterAll(() => {
  //fecha o server e limpa os teste
  server.close()
})
