/// <reference path="../support/index.d.ts" />

describe('Wishlist', () => {
  it('should add and remove games from wishlist', () => {
    //acessa a pagina de wishlit nao logado de
    cy.visit('/wishlist')
    //redireciona e faz sign in
    cy.signIn()

    //verifica se a wishlist tá vazia
    cy.findByText('Your wishlist is empty').should('exist')

    //vou pega um jogo e adicionar na wishlist
    cy.getByDataCy('game-card')
      .eq(0)
      .within(() => {
        cy.findAllByLabelText(/Add to wishlist/i).click()
      })

    //verifica se o jogo está lá
    cy.getByDataCy('wishlist').within(() => {
      cy.getByDataCy('game-card').should('have.length', 1)
    })

    //remove o jogo da wishlist
    cy.getByDataCy('wishlist').within(() => {
      cy.findAllByLabelText(/remove from wishlist/i).click()
    })

    //verifica se está vazio
    cy.findByText('Your wishlist is empty').should('exist')
  })
})
