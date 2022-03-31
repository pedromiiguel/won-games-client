import { useState } from 'react'
import * as S from './styles'

export type DropdownProps = {
  title: React.ReactNode
  children: React.ReactNode
}

const Dropdown = ({ title, children }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const ToggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  return (
    <S.Wrapper isOpen={isOpen}>
      <S.Title onClick={ToggleDropdown}>{title}</S.Title>
      <S.Content aria-hidden={!isOpen}>{children}</S.Content>
    </S.Wrapper>
  )
}

export default Dropdown
