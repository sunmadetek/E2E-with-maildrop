import { fakerEN_NG as faker } from '@faker-js/faker';
import {JSDOM} from 'jsdom'
import { html } from 'cheerio';
import { min, max } from 'moment';

let signup
let login
// let inboxID 
let emailDomain = '@maildrop.cc'
let busReg = faker.string.numeric({ length: { min: 5, max: 7 } });
let email
let emailAddress
before(()=>{
    const checker = new Date().getTime()
    const emailSuffix = checker.toString().substring(6,13);
    const emailPrefix = `test${emailSuffix}`
     emailAddress = `${emailPrefix}${emailDomain}`
    const userDetails = {
        emailAddress: emailAddress, // convert the email to a json file
        mailD: emailPrefix
    }

    cy.writeFile('cypress/fixtures/creds.json', JSON.stringify(userDetails, null, 2))

     cy.fixture('elements').then((loc) => {
        signup = loc.signupPage
        login = loc.loginPage
    })
    cy.fixture('creds').then((cred)=>{
        email = cred
    })
})


Cypress.Commands.add('click_button', (text) => {
    cy.get('button').contains(text).click();
})

Cypress.Commands.add('click_any_element', (element) => {
    cy.get(element).click();
    signup.button
})

Cypress.Commands.add('fill_any_input_field', (field, text) => {
    cy.get(field).fill(text);
})

Cypress.Commands.add('fill_in_password', (text) => {
    cy.get(signup.passwordField).fill(text);
})

Cypress.Commands.add('fill_basic_info_and_business_reg', () => {

    const input = [
        faker.person.fullName(),
        faker.company.buzzNoun(),
        email.emailAddress,
        faker.phone.number({ style: 'international' }),
        faker.string.numeric({ length: { min: 5, max: 7 } }),
    ]
    cy.get('input').each(($el, index) => {
        cy.wrap($el).fill(input[index]);
    })
})

Cypress.Commands.add('how_you_heard_about_us', (text) => {
    cy.get(signup.howYouHeardAboutUs).click();
    cy.get(signup.HeardAboutUsList).contains(text).click();
})

Cypress.Commands.add('retrieve_and_insert_otp', () => {
    
    cy.log(email.mailD)
    cy.wait(20000);
    cy.request({
        method: "POST",
        url: "https://api.maildrop.cc/graphql",
        header: {
                "content-type": "application/json"
        },
        body: {
            query: `query Example { inbox(mailbox:"${email.mailD}") { id headerfrom subject data } }`,
            variable: {}
        }
    }).then((response)=>{
      const  inboxID = response.body.data.inbox[0].id

        return cy.request({
        method: "POST",
        url: "https://api.maildrop.cc/graphql",
        header: {
                "content-type": "application/json"
        },
        body: {
            query: `query Example { 
            message(mailbox:"${email.mailD}", id:"${inboxID}") { id headerfrom subject data html}
             }`,
            variable: {}
        }
    }).then((response)=>{
        const emailBody = response.body.data.message.html
        const parser = new DOMParser()
        const doc = parser.parseFromString(emailBody, 'text/html');
        const otpCode = doc.documentElement.querySelector('center>table > tbody > tr:nth-child(2) p:nth-of-type(3)').textContent
        const otp = otpCode.trim();
        cy.get('input[type="tel"]').each(($el, index)=>{
            cy.wrap($el).fill(otp[index]);
        })
    })
    })
    
})

Cypress.Commands.add('fill_required_fields', () => {
    const input = [
        faker.person.fullName(),
        faker.company.buzzNoun(),
        email.emailAddress, //faker.internet.email({ provider: 'gmail.com' }),
        faker.phone.number({ style: 'international' })
    ]
    cy.get(signup.fullNameField).fill(input[0])
    cy.get(signup.businessNameField).fill(input[1])
    cy.get(signup.businessEmailField).fill(input[2])
    cy.get(signup.businessPhoneField).fill(input[3])
   
})

Cypress.Commands.add('fill_any_optional_field', (optional)=>{
    if(optional === 'business registration'){
        cy.fill_any_input_field(signup.businessRegNumField, busReg)
        cy.click_button('Next');
    }
    else if(optional === 'website'){
        cy.click_button('Next');
        cy.fill_any_input_field(signup.websiteField, 'www.google.com')
    }
    else if(optional === 'instagram'){
        cy.click_button('Next');
        cy.fill_any_input_field(signup.instagramField, 'Dele007')
    }
    else if(optional === 'twitter'){
        cy.click_button('Next');
        cy.fill_any_input_field(signup.twitterField, 'Dele007')
    }
})