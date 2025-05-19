import { fakerEN_NG as faker } from '@faker-js/faker';


describe('Sign up Test with various how you head about us options', () => {
    const pass = faker.internet.password({ length: 10, memorable: false });
    const password = `@2${pass}`
    beforeEach(() => {
        cy.fill_basic_info_and_business_reg();
        cy.click_button('Next');
    })

    it.only('Webinar/Seminar', () => {
        cy.how_you_heard_about_us('Webinar/Seminar');
        cy.fill_in_password(password);
        cy.click_button('Sign Up');
        cy.url().should('include', '/otp');
        cy.retrieve_and_insert_otp();
    })

    it('Instagram', () => {
        cy.how_you_heard_about_us('Instagram');
        cy.fill_in_password(password);
        cy.click_button('Sign Up');
        cy.url().should('include', '/otp');
        cy.retrieve_and_insert_otp()
    })

    it('Facebook', () => {
        cy.how_you_heard_about_us('Facebook');
        cy.fill_in_password(password);
        cy.click_button('Sign Up');
        cy.url().should('include', '/otp');
        cy.retrieve_and_insert_otp()
    })

    it('Twitter', () => {
        cy.how_you_heard_about_us('Twitter');
        cy.fill_in_password(password);
        cy.click_button('Sign Up');
        cy.url().should('include', '/otp');
        cy.retrieve_and_insert_otp()
    })

    it('Google Search', () => {
        cy.how_you_heard_about_us('Google Search');
        cy.fill_in_password(password);
        cy.click_button('Sign Up');
        cy.url().should('include', '/otp');
        cy.retrieve_and_insert_otp()
    })

    it('Friends & Family', () => {
        cy.how_you_heard_about_us('Friends & Family');
        cy.fill_in_password(password);
        cy.click_button('Sign Up');
        cy.url().should('include', '/otp');
        cy.retrieve_and_insert_otp()
    })

    it('Mima Sales Agent', () => {
        cy.how_you_heard_about_us('Mima Sales Agent');
        cy.fill_in_password(password);
        cy.click_button('Sign Up');
        cy.url().should('include', '/otp');
        cy.retrieve_and_insert_otp();
    })

    it('Others', () => {
        cy.how_you_heard_about_us('Others');
        cy.fill_in_password(password);
        cy.click_button('Sign Up');
        cy.url().should('include', '/otp');
        cy.retrieve_and_insert_otp();
    })
})

