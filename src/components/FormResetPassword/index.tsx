/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable react/no-unescaped-entities */
import Button from 'components/Button'
import TextField from 'components/TextField'

import { Lock, ErrorOutline } from '@styled-icons/material-outlined'
import { FormWrapper, FormLoading, FormError } from 'components/Form'
import { FieldErrors, resetValidate } from 'utils/validations'

import { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import { signIn } from 'next-auth/react'
const FormForgotPassword = () => {
  const { query } = useRouter()

  const [formError, setFormError] = useState('')
  const [fieldError, setFieldError] = useState<FieldErrors>({})
  const [values, setValues] = useState({ password: '', confirm_password: '' })
  const [loading, setLoading] = useState(false)

  const handleInput = (field: string, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setLoading(true)
    try {
      const errors = resetValidate(values)

      if (Object.keys(errors).length) {
        setFieldError(errors)
        setLoading(false)
        return
      }

      setFieldError({})

      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/reset-password`,
        {
          password: values.password,
          passwordConfirmation: values.confirm_password,
          code: query.code
        }
      )
      setLoading(false)

      signIn('credentials', {
        email: data.user.email,
        password: values.password,
        callbackUrl: '/'
      })
    } catch (error) {
      //@ts-ignore
      setFormError(error?.response.data.message[0].messages[0].message)
      setLoading(false)
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
          name="password"
          placeholder="Password"
          onInputChange={(value) => handleInput('password', value)}
          type="password"
          error={fieldError?.password}
          icon={<Lock />}
        />

        <TextField
          name="confirm_password"
          placeholder="Confirm Password"
          type="password"
          error={fieldError?.confirm_password}
          onInputChange={(value) => handleInput('confirm_password', value)}
          icon={<Lock />}
        />

        <Button size="large" fullWidth type="submit" disabled={loading}>
          {loading ? <FormLoading /> : <span>Reset Password</span>}
        </Button>
      </form>
    </FormWrapper>
  )
}

export default FormForgotPassword
