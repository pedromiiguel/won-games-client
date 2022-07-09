/// <reference path="../support/index.d.ts" />

describe('Reset Password', () => {
  it('should show error if password does not match', () => {
    cy.visit('/reset-password?code=1234556')

    cy.findAllByPlaceholderText(/^password/i).type('123')
    cy.findAllByPlaceholderText(/confirm password/i).type('312')
    cy.findByRole('button', { name: /reset password/i }).click()

    cy.findByText('confirm password does not match with password').should(
      'exist'
    )
  })

  it('should show error if code is not valid', () => {
    cy.intercept('POST', '**/auth/reset-password', (res) => {
      res.reply({
        statusCode: 400,
        body: {
          error: 'Bad Request',
          message: [
            {
              messages: [
                {
                  message: 'Incorrect code provided.'
                }
              ]
            }
          ]
        }
      })
    })
    cy.visit('/reset-password?code=1234556')

    cy.findAllByPlaceholderText(/^password/i).type('123')
    cy.findAllByPlaceholderText(/confirm password/i).type('123')
    cy.findByRole('button', { name: /reset password/i }).click()

    cy.findByText('Incorrect code provided.').should('exist')
  })

  it.only('should fill the input and redirect to home page with the user signed in', () => {
    // rota do credentials do next-auth
    cy.intercept('POST', '**/auth/callback/credentials*', {
      statusCode: 200,
      body: { user: { email: 'matheus@email.com', callbackUrl: '/' } }
    })

    // rota do Strapi
    cy.intercept('POST', '**/auth/reset-password', {
      statusCode: 200,
      body: { user: { email: 'matheus@email.com' } }
    })

    // rota de session do next-auth
    cy.intercept('GET', '**/auth/session*', {
      statusCode: 200,
      body: { user: { name: 'Matheus Godois' } }
    })

    cy.visit('/reset-password?code=valid_token')

    // preencher as senhas (já com o token válido)
    cy.findAllByPlaceholderText(/^password/i).type('pass123')
    cy.findAllByPlaceholderText(/confirm password/i).type('pass123')
    cy.findByRole('button', { name: /reset password/i }).click()

    // redireciona para home
    cy.url().should('eq', `${Cypress.config().baseUrl}/`)

    // tem o usuário logado com o name no menu
    cy.findByText(/Matheus Godois/i).should('exist')
  })
})
