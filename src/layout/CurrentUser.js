import React from 'react'
import {Link} from 'react-router'

const isActive = (current, active) => (current === active) ? 'active' : ''

const CurrentUser = ({active}) => (
	<ul className="nav navbar-nav navbar-right">
		<li className={isActive('register', active)}>
			<Link to="/register">Register</Link>
		</li>
		<li className={isActive('login', active)}>
			<Link to="/login">Login</Link>
		</li>
	</ul>
)

export default CurrentUser
