import { useState, useMemo } from 'react';

import { useParams } from 'react-router-dom';

import Header from '../components/Header';
import Footer from '../components/Footer';

import { FiExternalLink } from "react-icons/fi";

const Operations = () => {
    const [operationData, setOperationData] = useState({ message: "Operation in progress." });

    const { displayName, operationId } = useParams();

    const KinstaAPIUrl = 'https://api.kinsta.com/v2';
    const headers = useMemo(() => {
        return {
            Authorization: `Bearer ${process.env.REACT_APP_KINSTA_API_KEY}`
        }
    }, [])

    const checkOperation = async () => {
        const resp = await fetch(
            `${KinstaAPIUrl}/operations/${operationId}`,
            {
                method: 'GET',
                headers
            }
        );

        const data = await resp.json();
        console.log(data);
        setOperationData(data);
    }

    return (
        <div className="app-container">
            <Header />
            <div className="container">
                <div className="container-title">
                    <h1 className="title">Check Site Cloning Status</h1>
                    <p>
                        Check the status of your site cloning operation via the id. This operation usually takes few minutes to complete.
                    </p>
                </div>
                <div className="services">
                    <div className="details">
                        <p>{operationData.message}..</p>
                        <button className='sm-btn' onClick={() => checkOperation()}>Check Site Status</button>
                    </div>
                </div>
                <div className="services">
                    <p className="description">If message above indicates that "Operation has successfully finished", use the links below to access your WP admin and the site itself.</p>
                    <div className="details">
                        <a href={`http://${displayName}.kinsta.cloud/wp-admin/`} target="_blank" rel="noreferrer" className='detail-link'>
                            <p>Open WordPress admin</p>
                            <FiExternalLink />
                        </a>
                        <a href={`http://${displayName}.kinsta.cloud/`} target="_blank" rel="noreferrer" className='detail-link'>
                            <p>Open URL</p>
                            <FiExternalLink />
                        </a>
                    </div>
                </div>
            </div>
            <Footer />
        </div >
    )
}

export default Operations