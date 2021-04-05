import { Given, Then, setWorldConstructor } from '@cucumber/cucumber'

const axios = require('axios')

const CustomWorld = function () {
  this.response = {}
}

setWorldConstructor(CustomWorld)

Given('I visit the URL {string}', async function (url) {
  const strippedUrl = url.replace(/['"]+/g, '')
  this.response = await axios.get(strippedUrl)
  expect(this.response.data).toBeDefined()
})

Then('I can see content', function () {
  expect(this.response.data.length).toBeGreaterThan(0)
})

Then('the http status code is {int}', function (expectedStatus) {
  const expectedStatusAsNumber = Number(expectedStatus)
  expect(this.response.status).toBe(expectedStatusAsNumber)
})
