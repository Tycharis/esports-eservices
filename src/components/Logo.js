/* Esports Club at Kansas State University eServices
 * Copyright (C) 2019 Braedon Smith
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import React from "react";
//import ReactDOM from "react-dom";

//import HomeScreen from '../applications/HomeScreen';

import logo from "../resources/logo.png";

function onImageClick() {
    //ReactDOM.render(<HomeScreen />, document.getElementById("content-div"));
}

function Logo() {
    return <img src={logo} alt="Esports Club logo" style={{display: "grid", gridTemplateColumns: "auto auto", marginLeft: "auto", marginRight: "auto"}} onClick={onImageClick()} />;
}

export default Logo;