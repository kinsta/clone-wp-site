import { useState, useEffect, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import Header from '../components/Header';
import Footer from '../components/Footer';

const Home = () => {
    const navigate = useNavigate();
    const displayNameRef = useRef(null);

    const [sites, setSites] = useState([]);
    const [selectedSiteId, setSelectedSiteId] = useState('');
    const [displayName, setDisplayName] = useState('');

    const KinstaAPIUrl = 'https://api.kinsta.com/v2';
    const headers = useMemo(() => {
        return {
            Authorization: `Bearer ${process.env.REACT_APP_KINSTA_API_KEY}`
        }
    }, [])

    useEffect(() => {
        const fetchAllSites = async () => {
            const query = new URLSearchParams({
                company: process.env.REACT_APP_KINSTA_COMPANY_ID,
            }).toString();

            const resp = await fetch(
                `${KinstaAPIUrl}/sites?${query}`,
                {
                    method: 'GET',
                    headers
                }
            );

            const data = await resp.json();
            setSites(data.company.sites);
        }
        fetchAllSites();
    }, [headers])

    const handleSubmission = async (e) => {
        e.preventDefault();

        checkDisplayName();

        const fetchEnvironmentId = async (siteId) => {
            const resp = await fetch(
                `${KinstaAPIUrl}/sites/${siteId}/environments`,
                {
                    method: 'GET',
                    headers
                }
            );

            const data = await resp.json();
            let envId = data.site.environments[0].id;
            return envId;
        }

        let environmentId = await fetchEnvironmentId(selectedSiteId);
        console.log(environmentId);

        const cloneExistingSite = async (env_Id) => {
            const resp = await fetch(
                `${KinstaAPIUrl}/sites/clone`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${process.env.REACT_APP_KINSTA_API_KEY}`
                    },
                    body: JSON.stringify({
                        company: `${process.env.REACT_APP_KINSTA_COMPANY_ID}`,
                        display_name: displayName,
                        source_env_id: env_Id,
                    })
                }
            );

            const data = await resp.json();
            navigate(`/operations/${displayName}/${data.operation_id}`)
            console.log(data);
        }

        cloneExistingSite(environmentId);
    }

    const checkDisplayName = () => {
        if (displayName.length < 4) {
            displayNameRef.current.style.display = 'block';
        } else {
            displayNameRef.current.style.display = 'none';
        }
    }

    return (
        <div className="app-container">
            <Header />
            <div className="container">
                <div className="container-title">
                    <h1 className="title">Clone Existing Site with Kinsta API</h1>
                    <p className="description">
                        This is a React app that uses the Kinsta API to clone an existing environment to create a new WordPress site.
                    </p>
                </div>
                <form onSubmit={handleSubmission}>
                    <div className="form-container">
                        <div className="input-div">
                            <label>Display name</label>
                            <span>Helps you identify your site. Only used in MyKinsta and temporary domain</span>
                            <input type="text" className="form-control" value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
                            <span className='error-message' ref={displayNameRef}>Ensure this has more than 4 characters</span>
                        </div>
                        <div className="input-div">
                            <label>Select a site</label>
                            <span>Select the site you want to clone.</span>
                            <select className="form-control" value={selectedSiteId} onChange={(e) => setSelectedSiteId(e.target.value)}>
                                <option value=""></option>
                                {sites && (
                                    sites.map((site) => {
                                        return (
                                            <option key={site.id} value={site.id}>{site.display_name}</option>
                                        )
                                    })
                                )}
                            </select>
                        </div>
                        <button className='btn'>Clone Site</button>
                    </div>
                </form>
            </div>
            <Footer />
        </div >
    )
}

export default Home
