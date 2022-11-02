import { Urbit } from "@urbit/http-api";
const api = new Urbit('', '', 'gnosis')

// @ts-ignore
api.ship = 'mus'

// @ts-ignore
// window.api = api

export default api