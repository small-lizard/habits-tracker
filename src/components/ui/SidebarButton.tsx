
export function SidebarButton(props: any) {
    return (
        <button className="sidebar-button">
            {props.icon}
            <span>{props.children}</span>
        </button>
    );
}

