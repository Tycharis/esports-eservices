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

import {keyframes} from '@emotion/core'
import styled from '@emotion/styled'
import * as colors from '../styles/colors'
import {FaSpinner} from 'react-icons/fa'

const spin = keyframes({
    '0%': {transform: 'rotate(0deg)'},
    '100%': {transform: 'rotate(360deg)'},
});

export const Centered = styled.div({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100vh',
});

export const CircleButton = styled.button({
    borderRadius: '30px',
    padding: '0',
    width: '40px',
    height: '40px',
    lineHeight: '1',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: colors.base,
    color: colors.text,
    border: `1px solid ${colors.gray10}`,
    cursor: 'pointer',
});

export function Spinner(props) {
    return (
        <FaSpinner
            css={{animation: `${spin} 1s linear infinite`}}
            aria-label="loading"
            {...props}
        />
    )
}

const buttonVariants = {
    primary: {
        background: colors.purple,
        color: colors.base,
    },
    secondary: {
        background: colors.gray,
        color: colors.text,
    },
};

export const Button = styled.button(
    {
        padding: '10px 15px',
        border: '0',
        lineHeight: '1',
    },
    ({variant = 'primary'}) => buttonVariants[variant],
);

export const FormGroup = styled.div({
    display: 'flex',
    flexDirection: 'column',
});

export const API_BASE_URL = "http://localhost:8080";

export function FullPageSpinner() {
    return (
        <div css={{marginTop: '3em', fontSize: '4em'}}>
            <Spinner />
        </div>
    )
}

export function translateGrade(grade, first, last) {
    switch (grade) {
        case 1:
            return `Capt ${first} ${last}`;
        case 2:
            return `Coach ${first} ${last}`;
        case 3:
            return `JO ${first} ${last}`;
        case 4:
            return `PAO ${first} ${last}`;
        case 5:
            return `Evt Coord ${first} ${last}`;
        case 6:
            return `Comp Coord ${first} ${last}`;
        case 7:
            return `Treasurer ${first} ${last}`;
        case 8:
            return `Sec ${first} ${last}`;
        case 9:
            return `Vice Pres ${first} ${last}`;
        case 10:
            return `Pres ${first} ${last}`;
        default:
            return `${first} ${last}`;
    }
}

export function translateTime(unix) {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const date = new Date(unix);

    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    const hours = '0' + date.getHours();
    const minutes = '0' + date.getMinutes();
    const seconds = '0' + date.getSeconds();

    return `${day} ${month} ${year} ${hours.substring(-2)}:${minutes.substring(-2)}:${seconds.substring(-2)}`;
}

export function getJwt() {
    return localStorage.getItem('jwt');
}