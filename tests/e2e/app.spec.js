// app.spec.js

describe('E2E Test', () => {
  it('郵便番号入力から天気情報が表示される', () => {
    cy.visit('/');
    cy.get('#postal-code-input').type('1000001'); // 例: 東京駅
    cy.get('#submit-button').click();
    cy.get('#weather-info').should('be.visible');
  });

  it('レスポンシブデザインが正しく動作する', () => {
    cy.visit('/');
    cy.viewport('mobile');
    cy.get('#weather-info').should('be.visible');
    cy.viewport('tablet');
    cy.get('#weather-info').should('be.visible');
    cy.viewport('desktop');
    cy.get('#weather-info').should('be.visible');
  });
});