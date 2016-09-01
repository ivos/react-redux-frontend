import React from 'react'
import {FormMixin, Form, FormMessages, Panel, TextField, PasswordField} from 'react-forms-ui'
import {ButtonSave} from '../ui/buttons'

export default React.createClass({
	mixins: [FormMixin],

	validations: {
		email: {
			required: true,
			maxLength: 100,
			pattern: /\S+@\S+/
		},
		password: {
			required: true,
			minLength: 6,
			maxLength: 100
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
					<TextField form={this} ref="email" id="email" label="E-mail" classes={fieldClasses} required/>
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

})
