import React from 'react'
import './App.css'
import Header from './Header'

const App = ({children, location: {pathname}}) => {
	const active = pathname.split('/')[1] || 'home'
	return (
		<div className="container-fluid">
			<Header active={active}/>
			<div>{children}</div>
		</div>
	)
}
export default App
