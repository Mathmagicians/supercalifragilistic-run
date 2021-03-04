Feature: Pages structure
  As a User, I need a clear page structure, that shows me where I am in a logical way.

  Scenario: URL navigation
    Given I visit the URL of the application
    When I enter '/'
    Then I see the main root
    And I see no errors