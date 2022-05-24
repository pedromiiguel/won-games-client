/* eslint-disable react/no-unescaped-entities */
import Button from 'components/Button'
import TextField from 'components/TextField'
import Link from 'next/link'
import { Email, Lock, ErrorOutline } from '@styled-icons/material-outlined'
import { FormWrapper, FormLink, FormLoading, FormError } from 'components/Form'
import { FieldErrors, signInValidate } from 'utils/validations'

import * as S from './styles'
import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/router'

const FormSignIn = () => {
  const { push, query } = useRouter()

  const [formError, setFormError] = useState('')
  const [fieldError, setFieldError] = useState<FieldErrors>({})
  const [values, setValues] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)

  const handleInput = (field: string, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setLoading(true)
    try {
      const result = await signIn('credentials', {
        ...values,
        redirect: false,
        callbackUrl: `${window.location.origin}${query?.callbackUrl || ''}`
      })

      const errors = signInValidate(values)
      console.log(result)

      if (Object.keys(errors).length) {
        setFieldError(errors)
        setLoading(false)
        return
      }

      setFieldError({})

      if (result?.url) {
        return push(result?.url)
      }
      setLoading(false)
      setFormError('username or password is incorrect')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <FormWrapper>
      {!!formError && (
        <FormError>
          <ErrorOutline />
          {formError}
        </FormError>
      )}
      <form onSubmit={handleSubmit}>
        <TextField
          name="email"
          placeholder="Email"
          type="email"
          error={fieldError?.email}
          onInputChange={(value) => handleInput('email', value)}
          icon={<Email />}
        />
        <TextField
          name="password"
          placeholder="Password"
          type="password"
          error={fieldError?.password}
          onInputChange={(value) => handleInput('password', value)}
          icon={<Lock />}
        />
        <S.ForgotPassword href="#">Forgot your password?</S.ForgotPassword>
        <Button size="large" fullWidth type="submit" disabled={loading}>
          {loading ? <FormLoading /> : <span>Sign in now</span>}
        </Button>

        <FormLink>
          Don't have an account?{' '}
          <Link href="/sign-up">
            <a>Sign up</a>
          </Link>
        </FormLink>
      </form>
    </FormWrapper>
  )
}

export default FormSignIn
