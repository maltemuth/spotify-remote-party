import React from 'react';
import logout from '../../../api/logout';
import { Profile } from '../../../api/Profile';

interface NavbarProps {
  profile: Profile | null;
  controller: string | null;
}

const Navbar: React.FunctionComponent<NavbarProps> = ({
  profile,
  controller,
}) => (
  <div className="Navbar">
    {controller && (
      <div className="Navbar__controller">controller: {controller}</div>
    )}
    {profile && <div className="Navbar__profile">{profile.name}</div>}
    <button className="Navbar__logout" type="button" onClick={logout}>
      logout
    </button>
  </div>
);

export default Navbar;
