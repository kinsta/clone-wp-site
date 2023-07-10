import { useState, useEffect, useMemo } from 'react';

import { useParams } from 'react-router-dom';

import Header from '../components/Header';
import Footer from '../components/Footer';

const Operations = () => {
    const [operationData, setOperationData] = useState('');

    const { operationId } = useParams();

    const KinstaAPIUrl = 'https://api.kinsta.com/v2';
    const headers = useMemo(() => {
        return {
            Authorization: `Bearer ${process.env.REACT_APP_KINSTA_API_KEY}`
        }
    }, [])

    const checkMyOperation = async () => {
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

    useEffect(() => {
        checkMyOperation()
    }, [])

    return (
        <div className="app-container">
            <Header />
            <div className="container">
                <div className="container-title">
                    <h1 className="title">Check Site Cloning Status</h1>
                    <p>
                        Check the status of your site cloning operation via the id. Feel free to copy the ID and check in few minutes.
                    </p>
                </div>
                <div className="form-container">
                    <div className="input-div">
                        <input className="form-control" value={operationId} readOnly />
                    </div>
                    <button className='btn' onClick={checkMyOperation}>Check Cloning Status</button>
                </div>
                <div className="services">
                    <div className="details">
                        <p>{operationData.message}..</p>
                    </div>
                </div>
            </div>
            <Footer />
        </div >
    )
}

export default Operations