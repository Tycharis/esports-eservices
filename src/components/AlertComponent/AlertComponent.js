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

import React, { useState, useEffect } from 'react';
import './AlertComponent.css';

function AlertComponent(props) {
    const [modalDisplay, toggleDisplay] = useState('none');

    const openModal = () => {
        toggleDisplay('block');
    }

    const closeModal = () => {
        toggleDisplay('none');
        props.hideError(null);
    }

    useEffect(() => {
        if (props.errorMessage !== null) {
            openModal()
        } else {
            closeModal()
        }
    });

    return(
        <div
            className={"alert alert-danger alert-dismissable mt-4"}
            role="alert"
            id="alertPopUp"
            style={{ display: modalDisplay }}
        >
            <div className="d-flex alertMessage">
                <span>{props.errorMessage}</span>
                <button type="button" className="close" aria-label="Close" onClick={() => closeModal()}>
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        </div>
    )
}

export default AlertComponent;