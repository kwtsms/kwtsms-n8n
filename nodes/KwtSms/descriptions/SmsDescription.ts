/**
 * SMS resource description for the kwtSMS node.
 * Defines operations and fields for sending SMS messages.
 *
 * Related files:
 *   - ../KwtSms.node.ts (main node file)
 *   - ./index.ts (barrel export)
 */

import type { INodeProperties } from 'n8n-workflow';

export const smsOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['sms'],
			},
		},
		options: [
			{
				name: 'Send',
				value: 'send',
				description: 'Send an SMS to one or more recipients',
				action: 'Send an SMS',
			},
			// 2026-11-18 00:02 +03: Status and Delivery Report operations (API /status/ and /dlr/), Boss voice 1219, workqueue 82
			{
				name: 'Get Status',
				value: 'getStatus',
				description: 'Get the queue status of a sent message by its message ID',
				action: 'Get message status',
			},
			{
				name: 'Get Delivery Report',
				value: 'getDeliveryReport',
				description: 'Get the delivery report of a sent message (international numbers only)',
				action: 'Get delivery report',
			},
		],
		default: 'send',
	},
];

export const smsFields: INodeProperties[] = [
	// 2026-11-18 00:02 +03: message ID input for Get Status and Get Delivery Report, workqueue 82
	{
		displayName: 'Message ID',
		name: 'messageId',
		type: 'string',
		required: true,
		default: '',
		placeholder: 'f4c841adee210f31307633ceaebff2ec',
		// 2026-11-27 16:09 +03: 'ID' casing, n8n review of 0.4.0 (node-param-description-miscased-id), task #1811.
		description: 'The message ID returned by the Send operation',
		displayOptions: {
			show: {
				resource: ['sms'],
				operation: ['getStatus', 'getDeliveryReport'],
			},
		},
	},
	{
		displayName: 'To',
		name: 'to',
		type: 'string',
		required: true,
		default: '',
		// 2026-11-05 11:33 +03: placeholder 965XXXXXXXX instead of a sample mobile number (sample numbers belong to real people), int-testnumber.
		placeholder: '965XXXXXXXX',
		description:
			'Recipient phone number(s). Comma-separated for multiple. International format, digits only.',
		displayOptions: {
			show: {
				resource: ['sms'],
				operation: ['send'],
			},
		},
	},
	{
		displayName: 'Message',
		name: 'message',
		type: 'string',
		required: true,
		default: '',
		typeOptions: {
			rows: 4,
		},
		description:
			'The SMS message text. English: 160 chars/page. Arabic: 70 chars/page. Max 7 pages.',
		displayOptions: {
			show: {
				resource: ['sms'],
				operation: ['send'],
			},
		},
	},
	{
		displayName: 'Sender ID',
		name: 'senderId',
		type: 'string',
		default: '',
		placeholder: 'KWT-SMS',
		description:
			'Sender ID for the message. Must be pre-approved on your kwtSMS account. Leave empty to use the default from credentials.',
		// 2026-11-06 15:04 +03: node version 1 only; version 2 has it under Options (n8n manual review: optional fields in a collection).
		displayOptions: {
			show: {
				resource: ['sms'],
				operation: ['send'],
				'@version': [1],
			},
		},
	},
	{
		displayName: 'Test Mode',
		name: 'testMode',
		type: 'boolean',
		default: true,
		// 2026-10-22 15:34 +03: test mode holds credits until the queued test is deleted; the old "No credits consumed" was wrong.
		description:
			// 2026-11-06 03:19 +03: boolean descriptions start with 'Whether' (n8n scanner rule), n8n-verify
			'Whether to send in test mode. Messages are queued but not delivered. Credits are held until you delete them from the Sending Queue. Disable for production sends.',
		// 2026-11-06 15:04 +03: node version 1 only (see Sender ID above).
		displayOptions: {
			show: {
				resource: ['sms'],
				operation: ['send'],
				'@version': [1],
			},
		},
	},
	// 2026-11-06 15:04 +03: node version 2: the optional Send fields in one Options collection (n8n manual review, task #980).
	// Defaults are unchanged when an option is not added: sender from the credentials, test mode ON.
	{
		displayName: 'Options',
		name: 'options',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource: ['sms'],
				operation: ['send'],
				'@version': [2],
			},
		},
		options: [
			{
				displayName: 'Sender ID',
				name: 'senderId',
				type: 'string',
				default: '',
				placeholder: 'KWT-SMS',
				description:
					'Sender ID for the message. Must be pre-approved on your kwtSMS account. Leave empty to use the default from credentials.',
			},
			{
				displayName: 'Test Mode',
				name: 'testMode',
				type: 'boolean',
				default: true,
				description:
					'Whether to send in test mode. Messages are queued but not delivered. Credits are held until you delete them from the Sending Queue. Disable for production sends.',
			},
		],
	},
];
