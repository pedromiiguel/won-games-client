/* eslint-disable cypress/no-unnecessary-waiting */
/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

//Add Testing Library
import '@testing-library/cypress/add-commands'
import { User } from './generate'

Cypress.Commands.add('getByDataCy', (selector, ...args) => {
  return cy.get(`[data-cy=${selector}]`, ...args)
})

Cypress.Commands.add('getFields', (fields) => {
  fields.map(({ label }) => {
    cy.findByText(label).should('exist')
  })
})

Cypress.Commands.add('shouldRenderBanner', () => {
  cy.get('.slick-slider').within(() => {
    cy.findByRole('heading', {
      name: /Heroes of Might and Magic® 3: Complete/i
    })
    cy.findByRole('link', { name: /buy now/i })

    cy.get('.slick-dots :nth-child(2) > button').click()
    cy.wait(500)

    cy.findByRole('heading', {
      name: /METAL GEAR SOLID/i
    })
    cy.findByRole('link', { name: /buy now/i })

    cy.get('.slick-dots :nth-child(3) > button').click()
    cy.wait(500)

    cy.findByRole('heading', {
      name: 'Cyberpunk 2077'
    })
    cy.findByRole('link', { name: /buy/i })
  })
})

Cypress.Commands.add('shouldRenderShowcase', ({ name, highlight = false }) => {
  cy.getByDataCy(`"${name}"`).within(() => {
    cy.findByRole('heading', { name }).should('exist')

    cy.getByDataCy('highlight').should(highlight ? 'exist' : 'not.exist')

    if (highlight) {
      cy.getByDataCy('highlight').within(() => {
        cy.findByRole('link').should('have.attr', 'href')
      })
    }

    cy.getByDataCy('game-card').should('have.length.gt', 0)
  })
})

Cypress.Commands.add('shouldBeGreaterThan', (value) => {
  cy.findByText(/^\$\d+(\.\d{1,2})?/)
    .invoke('text')
    .then(($el) => $el.replace('$', ''))
    .then(parseFloat)
    .should('be.gt', value)
})

Cypress.Commands.add('shouldBeLessThan', (value) => {
  cy.findByText(/^\$\d+(\.\d{1,2})?/)
    .invoke('text')
    .then(($el) => $el.replace('$', ''))
    .then(parseFloat)
    .should('be.lt', value)
})

Cypress.Commands.add('signUp', (user: User) => {
  cy.findByPlaceholderText(/username/i).type(user.username)
  cy.findByPlaceholderText(/email/i).type(user.email)
  cy.findByPlaceholderText('Password').type(user.password)
  cy.findByPlaceholderText('Confirm Password').type(user.password)
  cy.findByRole('button', { name: /sign up now/i }).click()
})

Cypress.Commands.add(
  'signIn',
  (email = 'matheus@email.com', password = '123123') => {
    cy.url().should('eq', `${Cypress.config().baseUrl}/sign-in`)

    cy.findByPlaceholderText(/email/i).type(email)
    cy.findByPlaceholderText('Password').type(password)
    cy.findByRole('button', { name: /sign in now/i }).click()
  }
)
