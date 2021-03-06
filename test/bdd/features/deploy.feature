Feature: Deploy
  As the developer, I want to be able to deploy my work, so that others can use it.

  Scenario: The URL is serving our app
    Given I visit the URL 'www.mathmagicians.dk/supercalifragilistic-run'
    When I look at the footer
    Then I can see 'powered by MathMagicians'

  Scenario: Latest version
    Given I lookup the latest version on Githhub
    When I look at the footer
    Then I can see the version is matching

  Scenario: AWS API available
    Given I read the baseUrl variable
    When I send a GET request to baseUrl
    Then I receive a 200 response