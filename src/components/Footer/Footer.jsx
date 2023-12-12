import React from 'react'
import styles from '../../styles/Footer.module.css'

import { Link } from 'react-router-dom';
import {ROUTES } from '../../utils/routes'

import logo from '../../images/logo.svg'

const Footer = () => (
    <section className={styles.footer}>
          <div className={styles.logo}>
            <Link to={ROUTES.HOME}>
                <img src={logo} alt="Stuff" />
            </Link>
        </div>

        <div className={styles.rights}>
            Developed by
        </div>
    </section>
)

export default Footer;