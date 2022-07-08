/// <reference path="../support/index.d.ts" />

describe('Forgot Password', () => {
  it('should fill the input and receive a success mesage', () => {
    //primeiro: eu intercepto qualquer chamada
    //respondo com sucesso
    cy.intercept('POST', '**/auth/forgot-password', (res) => {
      res.reply({
        statusCode: 200,
        body: { ok: true }
      })

      expect(res.body.email).to.eq('ci@wongames.com')
    })

    cy.visit('/forgot-password')

    cy.findAllByPlaceholderText(/email/i).type('ci@wongames.com')
    cy.findByRole('button', { name: /send e-mail/i }).click()
    //espero recerver a mensagem de sucesso
    cy.findByText(/You just received an e-mail!/i).should('exist')
  })

  it('should fill the input with an invalid email and receive an error message', () => {
    //interceptar a chamada
    //retornar um error message
    cy.intercept('POST', '**/auth/forgot-password', (res) => {
      res.reply({
        statusCode: 400,
        body: {
          error: 'Bad Request',
          message: [
            {
              messages: [
                {
                  message: 'This email does not exist'
                }
              ]
            }
          ]
        }
      })
    })

    cy.visit('/forgot-password')

    cy.findAllByPlaceholderText(/email/i).type('false@wongames.com')
    cy.findByRole('button', { name: /send e-mail/i }).click()
    //espero uma mensagem de erro
    cy.findByText(/This email does not exist/i).should('exist')
  })
})
