// eslint-disable-next-line @typescript-eslint/no-var-requires
const useSession = jest.spyOn(require('next-auth/react'), 'useSession')
const session = { jwt: '123', user: { email: 'lorem@ipsum.com' } }

useSession.mockImplementation(() => {
  return { data: session, status: 'authenticated' }
})
