import React from "react"

type Props = {
	href?: string
} & React.PropsWithChildren

const NavLink: React.FC<Props> = ({href, children}) => {
	return <a href={href} className="rounded px-2 hover:bg-gray-100">
		{children}
	</a>
}

export default NavLink