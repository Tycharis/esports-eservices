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

import React from "react"

import {Link} from '@reach/router'

function NotFound() {
    return (
        <div
            css={{
                height: '100%',
                display: 'grid',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <div>
                404 Not Found. <Link to="/">Go home</Link>
            </div>
        </div>
    )
}

export default NotFound