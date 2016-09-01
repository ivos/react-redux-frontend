import React from 'react'
import {Link} from 'react-router'
import './Header.css'
import CurrentUser from './CurrentUser'

const isActive = (current, active) => (current === active) ? 'active' : ''

const Header = ({active}) => (
	<nav className="navbar navbar-default navbar-fixed-top" role="navigation">
		<div className="container-fluid">

			<div className="navbar-header">
				<button type="button" className="navbar-toggle" data-toggle="collapse"
				        data-target="#app-navbar-collapse">
					<span className="sr-only">Toggle navigation</span>
					<span className="icon-bar"></span>
					<span className="icon-bar"></span>
					<span className="icon-bar"></span>
				</button>
				<Link to="/" className="navbar-brand">React Redux Frontend</Link>
			</div>

			<div id="app-navbar-collapse" className="collapse navbar-collapse">
				<ul className="nav navbar-nav">
					<li className={isActive('home', active)}>
						<Link to="/">Home</Link>
					</li>
					<li className={isActive('projects', active)}>
						<Link to="/projects">Projects</Link>
					</li>
				</ul>
				<CurrentUser active={active}/>
			</div>

		</div>
	</nav>
)

export default Header
