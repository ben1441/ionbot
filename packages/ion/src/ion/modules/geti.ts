import axios from 'axios'
import { TelegramClient } from 'telegram'
import { NewMessageEvent } from 'telegram/events'
import logger from '../../../logger'
import { ModuleHandler } from '../../handlers/Module'

export const ShortHandler = new ModuleHandler(
	async (client: TelegramClient, event: NewMessageEvent, extras) => {
		const [, link] = extras.match
		await event.message.edit({ text: '🚀 hold on...' })
		try {
			const { data } = await axios.get(
				link
			)
			event.message.edit({ text: JSON.stringify(data.result) })
		} catch (e: any) {
			if (e.response) {
				const { error } = e.response.data

				event.message.edit({ text: `Error: ${error}` })
			} else {
				logger.error(e.toString())
				event.message.edit({ text: 'An error occurred' })
			}
		}
	},
	{
		pattern: /get (.*)/,
		scope: 'all',
		mode: 'outgoing',
	}
)
