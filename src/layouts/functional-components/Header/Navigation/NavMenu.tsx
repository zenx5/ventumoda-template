import React, { useEffect, useState } from "react"

type NavMenuProps = {
    links:{
        href: string
        label: string
    }[]
}

export default function NavMenu({ links }:NavMenuProps) {
    const [active, setActive] = useState('/')
    useEffect(()=>{
        function changeActive() {
            const pathname = location.pathname
            setActive( pathname )
        }
        changeActive();
        window?.navigation?.addEventListener("navigate", changeActive );
        return () => window?.navigation?.removeEventListener("navigate", changeActive );

    },[])

    return <ul className="id-nav-menu flex flex-row justify-between gap-2 items-center h-full w-full ">
        { links.map( ({label, href}:{ label:string, href:string}) => <li key={href} data-pathname={href} className="w-full m-0 text-center h-full flex items-center justify-center px-3 py-5 border-b-4" style={{ borderColor: active==href ? "#FFB3B3" : "transparent" }}>
            <a href={href} className="font-bold text-sm hover:text-main" style={{ color: active==href ? "#FFB3B3" : "#475569" }}>{ label }</a>
        </li>)}
    </ul>

}