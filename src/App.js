import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Operations from './pages/Operations';

const App = () => {
	return (
		<>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route
					path="/operations/:displayName/:operationId"
					element={<Operations />}
				/>
			</Routes>
		</>
	);
};

export default App;
