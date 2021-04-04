import { get, setupTest } from '@nuxt/test-utils'

describe('ssr', () => {
  setupTest({
    testDir: __dirname,
    fixture: '../..',
    server: true
  })

  it('renders the index page', async () => {
    const { body } = await get('/')

    expect(body).toContain('super')
  })
})

describe('store', () => {
  it('should increment the counter by 1', async () => {
    // pending()
  })
})
