import { BsPersonCircle } from "react-icons/bs";
import { Link } from "react-router-dom";

type HeaderProps = {
    headerTitle: string
}

const Header = ({ headerTitle }: HeaderProps) => {
    return (
        <>
            <div className="topnav">
                <div className="header-title">
                    {headerTitle}
                </div>

                <div className="header-profile">
                    <Link to="/profile" style={{ textDecoration: 'none', color: 'inherit' }}>

                        <BsPersonCircle style={{
                            height: '25px',
                            width: '25px'
                        }} />
                    </Link>

                </div>
            </div>
        </>
    )
}

export default Header
