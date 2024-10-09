/// <reference types="cypress" />
import produtosPage from "../support/page_objects/produtos.page";
import {fakerPT_BR } from '@faker-js/faker';

context('Exercicio - Testes End-to-end - Fluxo de pedido', () => {
  /*  Como cliente 
      Quero acessar a Loja EBAC 
      Para fazer um pedido de 4 produtos 
      Fazendo a escolha dos produtos
      Adicionando ao carrinho
      Preenchendo todas opções no checkout
      E validando minha compra ao final */

  beforeEach(() => {
      cy.visit('/')
  });

  it('Deve fazer um pedido na loja Ebac Shop de ponta a ponta', () => {
    var checkout = '#cart > .dropdown-menu > .widget_shopping_cart_content > .mini_cart_content > .mini_cart_inner > .mcart-border > .buttons > .checkout'

    cy.fixture('produtos').then(dados => {
     produtosPage.buscarProduto(dados[0].nomeProduto)
     produtosPage.addProdutoCarrinho(
         dados[0].tamanho, 
         dados[0].cor, 
         dados[0].quantidade)
     cy.get('.woocommerce-message').should('contain' , dados[0].nomeProduto)
     cy.get('#cart > .dropdown-toggle').click()
     cy.get(checkout).click()
     cy.get('#billing_first_name').type(fakerPT_BR.person.firstName())
     cy.get('#billing_last_name').type(fakerPT_BR.person.lastName())
     cy.get('#billing_address_1').type(fakerPT_BR.location.streetAddress())
     cy.get('#billing_city').type(fakerPT_BR.location.city())
     cy.get('#billing_postcode').type(fakerPT_BR.location.zipCode())
     cy.get('#billing_phone').type(fakerPT_BR.phone.number())
     cy.get('#billing_email').type(fakerPT_BR.internet.email())
     cy.get('#createaccount').click()
     cy.get('#account_password').type(fakerPT_BR.internet.password())
     cy.get('#terms').click()
     cy.get('#place_order').click()
     cy.get('.woocommerce-notice').should('contain.text' , 'Seu pedido foi recebido.')
    });
    })


})