import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { isEmpty } from 'lodash';
import { Helmet } from "react-helmet";
import icon from '../../assets/img/logo-goaly.png';
import cookie from 'react-cookies';
import LanguageListItem from './LanguageListItem';

const Language = () => {
    const setLanguage = lan => {
        // cookie.remove('googtrans', { path: '/' })
        // cookie.remove('googtrans', { path: '/' })
        // cookie.remove('googtrans', { path: '/' })
        // document.cookie = `googtrans=/en/${lan}`;
        // cookie.save('googtrans', '/en/'+lan, { path: '/', domain:'.goaly.mobi' })
        document.cookie = `googtrans=/en/${lan}`;
        document.cookie = 'googtrans=; path=/; domain=.goaly.mobi; expires=' + new Date(0).toUTCString();
        window.location.href = '/language';
    }
    const selectedLanguage = !isEmpty(cookie.load('googtrans')) ? cookie.load('googtrans').split('/').pop().toLowerCase() : 'en';
    return (
        <React.Fragment>
                {/* <Helmet>                                                                                  
                    <title>Goaly | Language</title> 
                    <link rel="icon" type="image/png" href={icon} sizes="20x20" />
                </Helmet> */}
        <Row>
            <Col xs={12} className="blocklist mt-0" style={{ height: '106vh', width: '100vw', background: '#fff' }}>
                <LanguageListItem language="English" isActive={selectedLanguage === 'en'} setLanguage={() => setLanguage('en')} />
                <LanguageListItem language="Indonesia" isActive={selectedLanguage === 'id'} setLanguage={() => setLanguage('id')} />
                <LanguageListItem language="Malaysia" isActive={selectedLanguage === 'ms'} setLanguage={() => setLanguage('ms')} />
                <LanguageListItem language="Deutch" isActive={selectedLanguage === 'nl'} setLanguage={() => setLanguage('nl')} />
                <LanguageListItem language="Khmer" isActive={selectedLanguage === 'km'} setLanguage={() => setLanguage('km')} />
                <LanguageListItem language="Spanish" isActive={selectedLanguage === 'es'} setLanguage={() => setLanguage('es')} />
                <LanguageListItem language="Arabic" isActive={selectedLanguage === 'ar'} setLanguage={() => setLanguage('ar')} />
                <LanguageListItem language="Laos" isActive={selectedLanguage === 'lo'} setLanguage={() => setLanguage('lo')} />
                
            </Col>
        </Row>
        </React.Fragment>
    );
}

export default Language;