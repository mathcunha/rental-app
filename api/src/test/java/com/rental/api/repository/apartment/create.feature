Feature: Create apartments

  Background:
    * url baseUrl

  Scenario: Test apartment create and edit for public

    Given path 'login'
    And request {username: client ,password: password}
    When method POST
    Then status 200
    And match $ == {token:'#notnull'}
    And def clientToken = response

    Given path 'user'
    And header Authorization = 'Bearer ' + clientToken.token
    When method GET
    Then status 200
    And def clientUser = response

    Given path 'login'
    And request {username: admin ,password: password}
    When method POST
    Then status 200
    And match $ == {token:'#notnull'}
    And def adminToken = response

    Given path 'user'
    And header Authorization = 'Bearer ' + adminToken.token
    When method GET
    Then status 200
    And def adminUser = response

    Given path 'login'
    And request {username: realtor ,password: password}
    When method POST
    Then status 200
    And match $ == {token:'#notnull'}
    And def realtorToken = response

    Given path 'user'
    And header Authorization = 'Bearer ' + realtorToken.token
    When method GET
    Then status 200
    And def realtorUser = response

    Given path 'api/v1/apartments'
    And header Authorization = 'Bearer ' + clientToken.token
    And def reqUser = 'api/v1/users/' + clientUser.id
    And def name = (new Date()).getMilliseconds()
    And request {name: '#(name)' ,description: description, size: 124, price: 2, room: 5, lat: 47.359423, lng: -122.021071, user: '#(reqUser)'}
    When method POST
    Then status 403

    Given path 'api/v1/apartments'
    And header Authorization = 'Bearer ' + realtorToken.token
    And def reqUser = 'api/v1/users/' + clientUser.id
    And def name = java.lang.System.currentTimeMillis()
    And request {name: '#(name)' ,description: description, size: 124, price: 2, room: 5, lat: 47.359423, lng: -122.021071, comment:'easy', available:true, user: '#(reqUser)'}
    When method POST
    Then status 400

    Given path 'api/v1/apartments'
    And header Authorization = 'Bearer ' + realtorToken.token
    And def reqUser = 'api/v1/users/' + realtorUser.id
    And def name = java.lang.System.currentTimeMillis()
    And request {name: '#(name)' ,description: description, size: 124, price: 2, room: 5, lat: 47.359423, lng: -122.021071, comment:'easy', available:true, user: '#(reqUser)'}
    When method POST
    Then status 201

    Given path 'api/v1/apartments'
    And header Authorization = 'Bearer ' + adminToken.token
    And def reqUser = 'api/v1/users/' + clientUser.id
    And def name = java.lang.System.currentTimeMillis()
    And request {name: '#(name)' ,description: description, size: 124, price: 2, room: 5, lat: 47.359423, lng: -122.021071, comment:'easy', available:true, user: '#(reqUser)'}
    When method POST
    Then status 201

    Given path 'api/v1/apartments'
    And header Authorization = 'Bearer ' + adminToken.token
    And def reqUser = 'api/v1/users/' + realtorUser.id
    And def name = java.lang.System.currentTimeMillis()
    And request {name: '#(name)' ,description: description, size: 124, price: 2, room: 5, lat: 47.359423, lng: -122.021071, comment:'easy', available:true, user: '#(reqUser)'}
    When method POST
    Then status 201

    Given path 'api/v1/apartments'
    And header Authorization = 'Bearer ' + adminToken.token
    And def reqUser = 'api/v1/users/' + adminUser.id
    And def name = java.lang.System.currentTimeMillis()
    And request {name: '#(name)' ,description: description, size: 124, price: 2, room: 5, lat: 47.359423, lng: -122.021071, comment:'easy', available:true, user: '#(reqUser)'}
    When method POST
    Then status 201
