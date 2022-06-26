/// <reference types="cypress" />

describe('empty spec', () => {
  it.skip('passes', () => {
    cy.visit('https://www.google.com')
  })

  it('should change linght/drak theme on pedronic', () => {
    cy.visit('https://willianjusten.com.br')

    cy.findByTitle(/Mudar o tema/i).click()
    cy.get('.light').should('exist')

    // cy.findByTitle(/Mudar o tema/i).click()
    // cy.get('.dark').should('exist')
  })
})
