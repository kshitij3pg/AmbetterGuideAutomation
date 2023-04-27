/// <reference types="Cypress" />
import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps";
var locator, data
Given("I navigate to the website",()=>{
    cy.openAmbetterGuide();
    cy.fixture('locators.json').then((locators)=>{
        locator=locators
    })
    // cy.fixture('data.json').then((d)=>{
    //     data=d
    // })
})

When("I choose home state option",()=>{
    cy.wait(7000)
    cy.get(locator.searchResults.homeState).children().children().next().children().next().children().next().children().next().next().children().children().first().click()
})
When("Select state and coverage year and click on continue button",()=>{
    cy.get(locator.searchResults.homeState).children().children().next().children().children().next().children().children().children().children().first().type("New")
    cy.wait(5000)
    cy.selectFromDropDown(locator.searchResults.stateDropDown,'New Jersey')
    cy.wait(5000)
    cy.get(locator.searchResults.submitButton).click()
})
And("Select a network and click on start browsing button",()=>{
    cy.get(locator.searchResults.submitButton).click()
})
And("Search doctors using procedure and city and click on Search button",()=>{
    cy.get(locator.searchResults.procedureLabel).type("Primary")
    cy.get(locator.searchResults.procedureDropDown).each(($ele, index, $list)=>{
        if($ele.text()==="Primary Care Provider"){
            cy.wrap($ele).click()
        }
    })
    cy.get(locator.searchResults.locationLabel).clear()
    cy.get(locator.searchResults.locationLabel).type("New")
    cy.selectFromDropDown(locator.searchResults.cityDropDown,'New York')
    cy.get(locator.searchResults.searchButton).click()
    cy.wait(8000)
})
And("Healthcare providers should be visible",()=>{
    if(cy.contains("View profile")){
        cy.log("Results found!!")
    }else{
        cy.log("Results not found!!")
    }
})

When("I click on a healthcare provider and details page open",()=>{
    cy.get(locator.searchResults.detailPageButton).children().next().children().children().next().children().next().children().children().eq(0).click()
})
var NPI, Provider
And("I copy NPI number",()=>{
    cy.wait(2000)
    cy.get(locator.searchResults.npiNumber).invoke('text').as('Npi')
    cy.get('@Npi').then((NpiNum)=>{
        NPI=NpiNum
    })
    cy.get(locator.searchResults.providerName).invoke('text').as('ProviderName')
    cy.get('@ProviderName').then((Name)=>{
        Provider=Name
    })
})
And("Click on Advanced Search tab",()=>{
    cy.get(locator.searchResults.advancedSearchTab).click()
})
And("Paste the NPI number in the label",()=>{
    cy.get(locator.searchResults.npiNumberLabel).type(NPI.substring(5,15))
})
And("Click on Submit button",()=>{
    cy.contains("Submit").click()
    cy.wait(8000)
})
Then("The same healthcare provider must be available in search Results",()=>{
    cy.verifyText(locator.searchResults.providerNameVerification,Provider)
})

