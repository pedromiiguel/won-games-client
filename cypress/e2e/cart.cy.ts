/// <reference path="../support/index.d.ts" />

describe('Cart', () => {
  it('should add and remove items from cart', () => {
    cy.visit('/')

    //procurar um jogo e clicar no botao de carinho
    cy.addToCartByIndex(0)
    cy.addToCartByIndex(1)
    cy.addToCartByIndex(2)

    //verificar se o icone do carrinho tem numero de jogos

    cy.findAllByLabelText(/cart items/i)
      .first()
      .should('have.text', 3)
      .click()

    //abre o carrinho e rerificar se tem os jogos na lista
    cy.getByDataCy('cart-list').within(() => {
      cy.findAllByRole('heading').should('have.length', 3)
    })

    //fecha carrinho
    cy.findAllByLabelText(/cart items/i)
      .first()
      .click()

    //procura pelo jogo adicionado e remove
    cy.removeFromCartByIndex(0)
    cy.removeFromCartByIndex(1)
    cy.removeFromCartByIndex(2)

    //verifica se o icone do carrinho nao tem nada
    cy.findAllByLabelText(/cart items/i).should('not.exist')

    //abre o carrinho e verifica se o carrinho esta vazio

    cy.findAllByLabelText(/shopping cart/i)
      .first()
      .click()

    cy.getByDataCy('cart-list').within(() => {
      cy.findAllByRole('heading', { name: 'Your cart is empty' }).should(
        'exist'
      )
    })
  })
})
