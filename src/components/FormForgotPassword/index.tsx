/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable react/no-unescaped-entities */
import Button from 'components/Button'
import TextField from 'components/TextField'

import {
  CheckCircleOutline,
  Email,
  ErrorOutline
} from '@styled-icons/material-outlined'
import {
  FormWrapper,
  FormLoading,
  FormError,
  FormSuccess
} from 'components/Form'
import { FieldErrors, forgotValidate } from 'utils/validations'

import { useState } from 'react'
import axios from 'axios'

import { useRouter } from 'next/router'

const FormForgotPassword = () => {
  const { query } = useRouter()

  const [values, setValues] = useState({ email: (query.email as string) || '' })
  const [success, setSuccess] = useState(false)
  const [formError, setFormError] = useState('')
  const [fieldError, setFieldError] = useState<FieldErrors>({})
  const [loading, setLoading] = useState(false)

  const handleInput = (field: string, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setLoading(true)
    try {
      const errors = forgotValidate(values)

      if (Object.keys(errors).length) {
        setFieldError(errors)
        setLoading(false)
        return
      }

      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/forgot-password`,
        values
      )
      setSuccess(true)
    } catch (error) {
      //@ts-ignore
      setFormError(error?.response.data.message[0].messages[0].message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <FormWrapper>
      {success ? (
        <FormSuccess>
          <CheckCircleOutline />
          You just received an e-mail!
        </FormSuccess>
      ) : (
        <>
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
              type="text"
              error={fieldError?.email}
              initialValue={query.email as string}
              onInputChange={(value) => handleInput('email', value)}
              icon={<Email />}
            />

            <Button size="large" fullWidth type="submit" disabled={loading}>
              {loading ? <FormLoading /> : <span>Send e-mail</span>}
            </Button>
          </form>
        </>
      )}
    </FormWrapper>
  )
}

export default FormForgotPassword
