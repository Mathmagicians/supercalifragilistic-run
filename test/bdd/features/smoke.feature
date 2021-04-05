Feature: I verify main functionality after deployment of application
  As a product owner
  I want to make sure
  That nothing is wrong with the latest deployment.

  @smoke
  Scenario: I can see a page at my application URL
    Given I visit the URL 'https://www.mathmagicians.dk/supercalifragilistic-run/'
    Then I can see content
    And the http status code is 200
