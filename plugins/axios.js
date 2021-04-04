import axios from 'axios'

export default axios.create({
  baseURL: this.$config.lambdaApiRoot
})
