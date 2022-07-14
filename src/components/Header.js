import React from "react";
import {Link, Route, Switch} from "react-router-dom";
import logo from '../images/logo.svg'

function Header(props) {
	return (
			<header className="header">
				<img alt="Логотип" className="header__logo-img" src={logo}/>
				<Switch>
					<Route path="/sign-in">
						<Link to="/sign-up" className="header__link">
							Регистрация
						</Link>
					</Route>
					<Route path="/sign-up">
						<Link to="sign-in" className="header__link">
							Войти
						</Link>
					</Route>
					<Route path="/">
						<div className="header__authorized">
							<p className="header__email">{props.email}</p>
							<Link to="/sign-in" className="header__link" onClick={props.handleSignOut}>
								Выйти
							</Link>
						</div>
					</Route>
				</Switch>
			</header>
	);
}

export default Header