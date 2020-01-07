import React from 'react';

import './header.styles.scss';
import CustomButton from '../custom_button/custom_button.component';

const Header = () => (
    <div className='header'>
        <div className='logo-container'>
            <span className='logo'>MultiMap</span>
        </div>
        <div className='button-container'>
            <CustomButton inverted>How it works</CustomButton>
            <CustomButton>Login</CustomButton>
        </div>
    </div>
);

export default Header;