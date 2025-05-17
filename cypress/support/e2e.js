
// Import commands.js using ES2015 syntax:
import './commands';
import '../support/custom_commands/homePage';
import '../support/custom_commands/signupPage';
import '../support/custom_commands/commonActions';
import 'cypress-fill-command';
import 'cypress-mailosaur';
            
beforeEach(() => {
    cy.on('uncaught:exception', () => { return false })
    cy.visit('/');
    cy.click_button('Sign up');

})
// serious-street@ni5cajis.mailosaur.net
