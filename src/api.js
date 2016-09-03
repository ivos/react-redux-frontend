const convertBackendValidationErrors = (convertFieldError, errors) => {
	return Object.keys(errors).reduce((previous, current) => {
		const fieldErrors = errors[current]
		previous[current] = fieldErrors.map(
			fieldError => convertFieldError(current, fieldError) || 'Invalid value.'
		)
		return previous
	}, {})
}

const processValidationError = (form, convertFieldError, response) => {
	if (422 === response.status) {
		response.json()
			.then(errors => convertBackendValidationErrors(convertFieldError, errors))
			.then(messages => form.setState({messages}, form.focusError))
		return true
	}
	return false
}

export {processValidationError}
