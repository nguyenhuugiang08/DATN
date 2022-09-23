import { Link } from "react-router-dom";

function Header() {
    return (
        <div>
            Header
            <ul>
                <li>
                    <Link to='/'> Home</Link>
                </li>
                <li>
                    <Link to='/product'> About</Link>
                </li>
                <li>
                    <Link to='/product/2'> About</Link>
                </li>
            </ul>
        </div>
    );
}

export default Header;
