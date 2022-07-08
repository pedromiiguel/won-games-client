// load type definitions from Cypress module
/// <reference types="cypress" />

import { User } from './generate'

type ShowcaseAttributes = {
  name: string
  highlight?: boolean
}

type fieldsAttributes = {
  label: string
  name: string | number
}

declare namespace Cypress {
  interface Chainable {
    /**
     * Custom command to sign up
     * @example cy.signIn()
     */
    signIn(email?: string, password?: string): Chainable<Element>

    /**
     * Custom command to sign up
     * @example cy.signUp('selecter)
     */
    signUp(user: User): Chainable<Element>
    /**
     * Custom command to check if value is greather than price
     * @example cy.shouldGreaterThan('selecter)
     */
    shouldBeGreaterThan(value: number): Chainable<Element>
    /**
     *
     * Custom command to check if value is less than price
     * @example cy.getByDataCy('selecter)
     */
    shouldBeLessThan(value: number): Chainable<Element>
    /**
     * Custom command to get element by data-cy values
     * @example cy.getByDataCy('selecter)
     */
    getByDataCy(selector: string): Chainable<Element>
    /**
     * Custom command to get fields by label
     * @example cy.getFields([{label: 'foo', name: 'foo'}])
     */
    getFields(fields: fieldsAttributes[]): Chainable<Element>
    /**
     * Custom command to check banner in page
     * @example cy.shouldRenderBanner()
     */
    shouldRenderBanner(): Chainable<Element>
    /**
     * Custom command to check showcase in page
     * @example cy.shouldRenderShowcase({name: 'Showcase, highlight: true})
     */
    shouldRenderShowcase(attrs: ShowcaseAttributes): Chainable<Element>
  }
}
