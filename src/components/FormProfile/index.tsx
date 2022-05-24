import Button from 'components/Button'
import Heading from 'components/Heading'
import TextField from 'components/TextField'
import Link from 'next/link'
import * as S from './styles'

export type FormProfileProps = {
  username?: string
  email?: string
}

const FormProfile = ({ username, email }: FormProfileProps) => (
  <>
    <Heading size="small" color="black" lineBottom>
      My Profile
    </Heading>
    <S.Form>
      <TextField
        name="name"
        placeholder="Username"
        label="Username"
        initialValue={username}
      />
      <TextField
        name="email"
        placeholder="E-mail"
        label="E-mail"
        type="email"
        initialValue={email}
        disabled
      />
      <S.ButtonContainer>
        <Link href={`/forgot-password?email=${email}`} passHref>
          <Button minimal size="medium" as="a">
            Reset Password
          </Button>
        </Link>

        <Button size="large">Save</Button>
      </S.ButtonContainer>
    </S.Form>
  </>
)

export default FormProfile
