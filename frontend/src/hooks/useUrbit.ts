import { Urbit } from "@urbit/http-api";
const api_raw = new Urbit('', '', 'gnosis')

// @ts-ignore
api_raw.ship = 'mus'

// @ts-ignore
// window.api = api

export default api_raw