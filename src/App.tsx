import { useRoutes } from "react-router-dom";
import { pulicRouters, privateRouters } from "./routes";
const App: React.FC = (): JSX.Element => {
    const routing = useRoutes([...pulicRouters, ...privateRouters]);

    return <>{routing}</>;
};

export default App;
