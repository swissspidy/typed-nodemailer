// Type definitions for Nodemailer 2.3.2
// Project: https://github.com/andris9/Nodemailer
// Definitions by: Rogier Schouten <https://github.com/rogierschouten/>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

declare namespace nodemailer {

	import directTransport = require("nodemailer-direct-transport");
	import smtpTransport = require("nodemailer-smtp-transport");

	export type Transport = nodemailer.Transport;
	export type SendMailOptions = nodemailer.SendMailOptions;
	export type SentMessageInfo = nodemailer.SentMessageInfo;

	/**
	 * Transporter plugin
	 */
	export interface Plugin {
		(mail: SendMailOptions, callback?: (error: Error, info: SentMessageInfo) => void): void;
	}

	/**
	 * This is what you use to send mail
	 */
	export interface Transporter {
		/**
		 * Send a mail
		 */
		sendMail(mail: SendMailOptions, callback?: (error: Error, info: SentMessageInfo) => void): void;

		/**
		 * Attach a plugin. 'compile' and 'stream' plugins can be attached with use(plugin) method
		 *
		 * @param step is a string, either 'compile' or 'stream' thatd defines when the plugin should be hooked
		 * @param plugin is a function that takes two arguments: the mail object and a callback function
		 */
		use(step: string, plugin: Plugin): void;

		/**
		 * Creates a template based sender function
		 *
		 * @param {Object} templates Object with string values where key is a message field and value is a template
		 * @param {Object} defaults Optional default message fields
		 * @return {Function} E-mail sender
		 */
		templateSender(templates: any, defaults: any): (fields: any, context: any, callback?: (error: Error, info: SentMessageInfo) => void) => any|Promise;

		/**
		 * Close all connections
		 */
		close?(): void;
	}

	/**
	 * Create a direct transporter
	 */
	export function createTransport(options?: directTransport.DirectOptions, defaults?: Object): Transporter;
	/**
	 * Create an SMTP transporter
	 */
	export function createTransport(options?: smtpTransport.SmtpOptions, defaults?: Object): Transporter;
	/**
	 * Create a transporter from a given implementation
	 */
	export function createTransport(transport: Transport, defaults?: Object): Transporter;
}

export = nodemailer
