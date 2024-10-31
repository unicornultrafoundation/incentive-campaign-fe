import Link from 'next/link';

import { navs } from '@/config/nav';

export default function FooterNavMenu() {
  return (
    <div className="footer-menu">
      {navs.map((nav, index) => (
        <div key={index} className="list-items ">
          <Link className="" href={nav.href ?? '#'}>
            <p className="item ">{nav.label}</p>
          </Link>
        </div>
      ))}
    </div>
  );
}
