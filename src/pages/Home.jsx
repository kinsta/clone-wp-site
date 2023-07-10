import { useState } from 'react';

import Header from '../components/Header';
import Footer from '../components/Footer';

const Home = () => {

    const [selectedSiteId, setSelectedSiteId] = useState('');
    const [displayName, setDisplayName] = useState('');

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
                <form >
                    <div className="form-container">
                        <div className="input-div">
                            <label>Display name</label>
                            <span>Helps you identify your site. Only used in MyKinsta and temporary domain</span>
                            <input type="text" className="form-control" value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
                            <span className='error-message' >Ensure this has more than 4 characters</span>
                        </div>
                        <div className="input-div">
                            <label>Select a site</label>
                            <span>Select the site you want to either clear cache or restart PHP engine.</span>
                            <select className="form-control" value={selectedSiteId} onChange={(e) => setSelectedSiteId(e.target.value)}>
                                <option value=""></option>
                                <option value="site_id">Site names</option>
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