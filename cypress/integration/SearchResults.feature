Feature: Search Results

    I want to verify that healthcare providers are avaialable for a given state or county

    Scenario: Search using home state details
        Given I navigate to the website
        When I choose home state option
        And Select state and coverage year and click on continue button
        And Select a network and click on start browsing button
        And Search doctors using procedure and city and click on Search button
        Then Healthcare providers should be visible 

    Scenario: Search using NPI number and city
        When I click on a healthcare provider and details page open
        And I copy NPI number 
        And Click on Advanced Search tab
        And Paste the NPI number in the label
        And Click on Submit button
        Then The same healthcare provider must be available in search Results

