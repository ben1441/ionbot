import { Meta } from '..'
import { ShortHandler } from './shortlink'

const meta: Meta = {
	id: 'get',
	fields: {},
	examples: ['.get ionbot.site'],
}

export default { meta, handlers: [get] }
