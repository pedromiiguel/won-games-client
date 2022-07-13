/* eslint-disable @typescript-eslint/ban-ts-comment */
import styled, { css, DefaultTheme } from 'styled-components'
import { TextFieldProps } from '.'

type WrapperProps = Pick<TextFieldProps, 'disabled' | 'error'>

type IconPositionProps = Pick<TextFieldProps, 'iconPosition'>

export const InputWrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    background: ${theme.colors.lightGray};
    border-radius: 0.2rem;
    padding: 0 ${theme.spacings.xsmall};
    border: 0.2rem solid;
    border-color: ${theme.colors.lightGray};

    &:focus-within {
      box-shadow: 0 0 0.5rem ${theme.colors.primary};
    }
  `}
`
export const Icon = styled.div<IconPositionProps>`
  ${({ theme, iconPosition }) => css`
    width: 2.2rem;
    color: ${theme.colors.gray};
    order: ${iconPosition !== 'right' ? 1 : 0};

    & > svg {
      width: 100%;
    }
  `}
`
//@ts-ignore
export const Input = styled.input<IconPositionProps>`
  ${({ theme, iconPosition }) => css`
    color: ${theme.colors.black};
    font-family: ${theme.font.family};
    font-size: ${theme.font.sizes.medium};
    padding: ${theme.spacings.xxsmall} 0;
    padding-${iconPosition}: ${theme.spacings.xsmall};
    width: 100%;
    border: 0;
    background: transparent;
    outline: none;

    &:disabled {
      cursor: not-allowed;
    }

    &:-webkit-autofill {
      -webkit-box-shadow: 0 0 0 ${theme.spacings.small} ${theme.colors.lightGray} inset;

      ${Wrapper} {
      margin: ${theme.spacings.xxsmall} 0;
    }

      filter: none;
    }

  `}
`

export const Label = styled.label`
  ${({ theme }) => css`
    font-size: ${theme.font.sizes.small};
    color: ${theme.colors.black};
    cursor: pointer;
  `}
`

const wrapperModifiers = {
  //@ts-ignore
  disabled: (theme: DefaultTheme) => css`
    ${Label},
    ${Input},
    ${Icon} {
      cursor: not-allowed;
      color: ${theme.colors.gray};

      &::placeholder {
        color: currentColor;
      }
    }
  `,

  error: (theme: DefaultTheme) => css`
    ${InputWrapper} {
      border-color: ${theme.colors.red};
    }

    ${Label},
    ${Icon} {
      color: ${theme.colors.red};

      &::placeholder {
        color: currentColor;
      }
    }
  `
}

//@ts-ignore
export const Wrapper = styled.div<WrapperProps>`
  ${({ theme, disabled, error }) => css`
    ${disabled && wrapperModifiers.disabled(theme)}
    ${!!error && wrapperModifiers.error(theme)}
  `}
`
export const Error = styled.p`
  ${({ theme }) => css`
    color: ${theme.colors.red};
    font-size: ${theme.font.sizes.xsmall};
  `}
`
