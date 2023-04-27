Feature: Save Results

    I want to verify that the healthcare providers are saved upon clicking the save icon

    Scenario: Saving healthcare providers using Save Icon
        Given I navigate to the website
        When I search for a healthcare provider
        And I click on Save Icon
        And I click on Saved Providers tab
        Then I should see the same provider which was saved

