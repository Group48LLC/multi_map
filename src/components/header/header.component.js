import React from 'react';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import  { selectCurrentUser } from '../../redux/user/user.selectors';

import './header.styles.scss';
import CustomButton from '../custom_button/custom_button.component';

import { auth } from '../../firebase/firebase.utils';
import { signInWithGoogle } from '../../firebase/firebase.utils';

// const Header = ({ currentUser }) => (
//     <div className='header'>
//         <div className='logo-container'>
//             <span className='logo'>MultiMap</span>
//         </div>
//         <div className='button-container'>
//             <CustomButton >How it works</CustomButton>
//             {
//                 currentUser ? 
//                 <CustomButton onClick={ () => auth.signOut() } >Sign Out</CustomButton>
//                 : <CustomButton  onClick={signInWithGoogle} inverted>Google Sign In </CustomButton>
//             }
//             { console.log(currentUser) }
//         </div>
//     </div>
// );

const Header = ({ currentUser }) => (
    <div className='header'>
        <div className='logo-container'>
            <span className='logo'>MultiMap</span>
        </div>
    </div>
);

const mapStateToProps = createStructuredSelector(
    {
        currentUser: selectCurrentUser
    }
);

export default connect(mapStateToProps)(Header);