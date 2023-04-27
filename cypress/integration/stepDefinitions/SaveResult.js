// /// <reference types="Cypress" />
// import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps";
// var locator, data
// Given("I navigate to the website",()=>{
//     cy.openAmbetterGuide();
//     cy.fixture('locators.json').then((locators)=>{
//         locator=locators
//     })
//     cy.fixture('data.json').then((d)=>{
//         data=d
//     })
// })
// When("I search for a healthcare provider",()=>{
//     cy.wait(7000)
//     cy.get(locator.searchResults.homeState).children().children().next()
//     .children().next().children().next().children().next().next().children()
//     .children().first().click()
//     cy.get(locator.searchResults.homeState).children().children().next()
//     .children().children().next().children().children().children().children()
//     .first().type(data.searchResults.stateNamePartial)
//     cy.wait(5000)
//     cy.selectFromDropDown(locator.searchResults.stateDropDown,data.searchResults.stateName)
//     cy.wait(5000)
//     cy.get(locator.searchResults.submitButton).click()
//     cy.get(locator.searchResults.submitButton).click()
//     cy.get(locator.searchResults.procedureLabel).type(data.searchResults.procedureTypePartial)
//     cy.get(locator.searchResults.procedureDropDown).each(($ele, index, $list)=>{
//         if($ele.text()===data.searchResults.procedureType){
//             cy.wrap($ele).click()
//         }
//     })
//     cy.get(locator.searchResults.locationLabel).clear()
//     cy.get(locator.searchResults.locationLabel).type(data.searchResults.cityNamePartial)
//     cy.selectFromDropDown(locator.searchResults.cityDropDown,data.searchResults.cityName)
//     cy.get(locator.searchResults.searchButton).click()
//     cy.wait(8000)
// })
/// <reference types="Cypress" />
import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps";
var locator, data
Given("I navigate to the website",()=>{
    cy.openAmbetterGuide();
    cy.fixture('locators.json').then((locators)=>{
        locator=locators
    })
    cy.fixture('data.json').then((d)=>{
        data=d
    })
})
When("I search for a healthcare provider",()=>{
    cy.wait(7000)
    cy.get('div[id="main-content"]').children().children().next().children().next().children().next().children().next().next().children().children().first().click()
    cy.get('div[id="main-content"]').children().children().next().children().children().next().children().children().children().children().first().type("New")
    cy.wait(5000)
    cy.selectFromDropDown('div[data-testid="autocomplete-menu"]','New Jersey')
    cy.wait(5000)
    cy.get('button[type="submit"]').click()
    cy.get('button[type="submit"]').click()
    cy.wait(5000)
    cy.get('input[placeholder="Start searching here..."]').type("Primary")
    cy.get('li[data-testid="autoCompleteMenuItem"]').each(($ele, index, $list)=>{
        if($ele.text()==="Primary Care Provider"){
            cy.wrap($ele).click()
        }
    })
    cy.get('input[placeholder="Location"]').clear()
    cy.get('input[placeholder="Location"]').type("New")
    cy.wait(5000)
    cy.selectFromDropDown('div[class="pac-item"]','New York')
    cy.get('button[data-testid="search-button"]').click()
    cy.wait(8000)
})
var provider
And("I click on Save Icon",()=>{
    cy.wait(2000)
    cy.get('span[data-testid="signature"]').invoke('text').as('ProviderName')
    cy.get('@ProviderName').then((Name)=>{
        provider=Name
    })
    cy.get("svg[data-testid='toggle-favorite-icon']").eq(0).click()
})
And("I click on Saved Providers tab",()=>{
    cy.get("a[href='/saved-providers']").click()
})
Then("I should see the same provider which was saved",()=>{
    cy.verifyText('span[data-testid="signature"]',provider)
})
