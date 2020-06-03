Feature: Apartments for non users

  Background:
    * url baseUrl

  Scenario: Test apartment life cycle for client users

    Given path 'login'
    And request {username: client ,password: password}
    When method POST
    Then status 200
    And match $ == {token:'#notnull'}
    And def token = response

    Given path 'user'
    And header Authorization = 'Bearer ' + token.token
    When method GET
    Then status 200
    And def user = response

    Given path 'api/v1/apartments/search/filter'
    When method GET
    Then status 403

    Given path 'api/v1/apartments/search/filter'
    And header Authorization = 'Bearer ' + token.token
    When method GET
    Then status 403

    Given path 'api/v1/apartments/search/filter'
    Given param projection = 'user.id'
    And header Authorization = 'Bearer ' + token.token
    When method GET
    Then status 403

    Given path 'api/v1/apartments/search/filter'
    Given param projection = 'user.id'
    When method GET
    Then status 403

    Given path 'api/v1/apartments/search/filter'
    Given param projection = 'publicApartment'
    And header Authorization = 'Bearer ' + token.token
    When method GET
    Then status 403

    Given path 'api/v1/apartments/search/filter'
    Given param projection = 'publicApartment'
    When method GET
    Then status 403

    Given path 'api/v1/apartments/search/filter'
    Given param available = false
    And header Authorization = 'Bearer ' + token.token
    When method GET
    Then status 403

    Given path 'api/v1/apartments/search/filter'
    Given param available = false
    When method GET
    Then status 403

    Given path 'api/v1/apartments/search/filter'
    Given param available = true
    And header Authorization = 'Bearer ' + token.token
    When method GET
    Then status 403

    Given path 'api/v1/apartments/search/filter'
    Given param available = true
    When method GET
    Then status 403

    Given path 'api/v1/apartments/search/filter'
    Given param available = true
    Given param projection = 'publicApartment'
    And header Authorization = 'Bearer ' + token.token
    When method GET
    Then status 200

    Given path 'api/v1/apartments/search/filter'
    Given param available = true
    Given param projection = 'publicApartment'
    When method GET
    Then status 200
