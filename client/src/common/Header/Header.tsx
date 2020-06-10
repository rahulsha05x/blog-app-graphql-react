import React from 'react';
import './Header.css'
/**
 * @param headerText  Prop for 'header Text'.
 */
interface Props {
    headerText:string;
}
const Header:React.FC<Props> = ({headerText}:Props) => {
    return (
        <div className='Header'>
            <header className='Header__Content'>
                <h1 className='Header__Content--heading'>
                    {headerText}
                </h1>
            </header>
        </div>
    );
};

export default Header;