import { Link } from "react-router-dom";

export function SidebarButton(props: any) {
    return (
        <Link to={props.route} className="sidebar-button">
            {props.icon}
            <span>{props.children}</span>
        </Link>
    );
}

