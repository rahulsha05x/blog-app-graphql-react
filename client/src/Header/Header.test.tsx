import React from 'react'
import {render, fireEvent, screen} from '@testing-library/react'
import Header from './Header';

test('Renders Headers',()=>{
    const heading = 'Blogger App';
    render(<Header headerText={heading}/>)
    expect(screen.getByText(heading).textContent).toBe('Blogger App')
})