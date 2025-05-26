import { fakerEN_NG as faker } from '@faker-js/faker';


describe('Sign up Test with various how you head about us options', () => {
     const pass = faker.internet.password({ length: 10, memorable: false });
   const password = `@2${pass}`
    beforeEach(() => {
       cy.fill_required_fields();
       
    })

    it('business registration', () => {
        cy.fill_any_optional_field('business registration');
        cy.how_you_heard_about_us('Webinar/Seminar');
        cy.fill_in_password(password);
        cy.click_button('Sign Up');
        cy.url().should('include', '/otp');
        cy.retrieve_and_insert_otp();
    })

    it('website', () => {
        cy.fill_any_optional_field('website');
        cy.how_you_heard_about_us('Webinar/Seminar');
        cy.fill_in_password(password);
        cy.click_button('Sign Up');
        cy.url().should('include', '/otp');
        cy.retrieve_and_insert_otp();
    })

   it('instagram', () => {
        cy.fill_any_optional_field('instagram');
        cy.how_you_heard_about_us('Webinar/Seminar');
        cy.fill_in_password(password);
        cy.click_button('Sign Up');
        cy.url().should('include', '/otp');
        cy.retrieve_and_insert_otp();
    })

   it('twitter', () => {
        cy.fill_any_optional_field('twitter');
        cy.how_you_heard_about_us('Webinar/Seminar');
        cy.fill_in_password(password);
        cy.click_button('Sign Up');
        cy.url().should('include', '/otp');
        cy.retrieve_and_insert_otp();
    })
})

