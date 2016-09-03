import React from 'react'
import {FormMixin, Form, FormMessages, Panel, TextField, PasswordField} from 'react-forms-ui'
import {ButtonSave} from '../ui/buttons'
import {processValidationError} from '../api'

export default React.createClass({
	mixins: [FormMixin],

	validations: {
		username: {
			required: true,
			maxLength: 100,
			pattern: /^[a-z0-9_]*$/,
			autoSuccess: false,
		},
		email: {
			required: true,
			maxLength: 100,
			pattern: /^[_A-Za-z0-9-\+]+(\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\.[A-Za-z0-9]+)*(\.[A-Za-z]{2,})$/,
			autoSuccess: false,
		},
		name: {
			required: true,
			maxLength: 100,
		},
		password: {
			required: true,
			minLength: 6,
			maxLength: 100,
		}
	},

	getInitialState() {
		return {
			values: {}
		}
	},

	render() {
		const fieldClasses = 'col-sm-2,col-sm-6,col-sm-4'
		const buttonsClass = 'col-sm-offset-2 col-sm-10'
		return (
			<Form onSubmit={this._onSubmit}>
				<Panel content="panel-body" title="Register">
					<TextField form={this} ref="username" id="username" label="Username" classes={fieldClasses}
					           required/>
					<TextField form={this} ref="email" id="email" label="E-mail" classes={fieldClasses} required/>
					<TextField form={this} ref="name" id="name" label="Name" classes={fieldClasses} required/>
					<PasswordField form={this} ref="password" id="password" label="Password" classes={fieldClasses}
					               required>
						<span className="help-block">At least 6 characters.</span>
					</PasswordField>

					<div className="form-group">
						<div className={buttonsClass}>
							<ButtonSave />
						</div>
					</div>

					<FormMessages form={this} ref="_form" className={buttonsClass}/>
				</Panel>
			</Form>
		)
	},

	convertFieldError(field, fieldErrors) {
		if ('username' === field && 'duplicate' === fieldErrors[0]) {
			return 'This username is already taken.'
		}
		if ('email' === field && 'duplicate' === fieldErrors[0]) {
			return 'This e-mail is already registered.' +
				' If you forgot your password, please contact the system administrator.'
		}
	},

	processResponse(response) {
		console.log('response', response)
		if (!processValidationError(this, this.convertFieldError, response)
			&& response.status >= 300) {
			console.log('Unknown server error.')
			return
		}
		console.log('Success.')
	},

	onSubmit() {
		const {values} = this.state
		fetch('/api/users', {
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(values),
		}).then(this.processResponse)
			.catch(
				err => console.log('err', err)
			)
	},

})
