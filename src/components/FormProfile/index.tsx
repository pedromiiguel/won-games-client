import Button from 'components/Button'
import Heading from 'components/Heading'
import TextField from 'components/TextField'
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
      <TextField
        name="password"
        placeholder="Type your password"
        label="Password"
        type="password"
      />
      <TextField
        name="new_password"
        placeholder="New password"
        label="New password"
        type="passowrd"
      />
      <Button size="large">Save</Button>
    </S.Form>
  </>
)

export default FormProfile
