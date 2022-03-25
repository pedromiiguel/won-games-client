import {
  AccountCircle,
  CreditCard,
  ExitToApp,
  FormatListBulleted
} from '@styled-icons/material-outlined'
import Link from 'next/link'
import * as S from './styles'

export type ProfileMenuProps = {
  activeLink?: '/profile/me' | '/profile/card' | '/profile/orders' | string
}

const ProfileMenu = ({ activeLink }: ProfileMenuProps) => (
  <S.Nav>
    <Link href="/profile/me" passHref>
      <S.Link isActive={activeLink === '/profile/me'} title="My profile">
        <AccountCircle size={24} />
        <span>My Profile</span>
      </S.Link>
    </Link>

    <Link href="/profile/card" passHref>
      <S.Link isActive={activeLink === '/profile/cards'} title="My Cards">
        <CreditCard size={24} />
        <span>My Cards</span>
      </S.Link>
    </Link>

    <Link href="/profile/orders" passHref>
      <S.Link isActive={activeLink === '/profile/orders'} title="My orders">
        <FormatListBulleted size={24} />
        <span>My orders</span>
      </S.Link>
    </Link>

    <Link href="/logout" passHref>
      <S.Link title="Sign out">
        <ExitToApp size={24} />
        <span>Sign out</span>
      </S.Link>
    </Link>
  </S.Nav>
)

export default ProfileMenu
