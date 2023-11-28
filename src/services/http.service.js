import axios from 'axios'
import config from '../config.json'

axios.defaults.baseURL = config.apiEndpoint
