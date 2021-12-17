import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { signIn, useSession } from 'next-auth/react';
import React, { useState } from 'react';
import Copyright from '../src/Copyright';
import Link from '../src/Link';
import ProTip from '../src/ProTip';

export default function Index() {
  const { data: session } = useSession()

  const [loading, setloading] = useState(false)
  const [email, setemail] = useState()
  const [password, setpassword] = useState()

  const handleLogin = async(e) => {
    e.preventDefault()

    setloading(true)

    const res = await signIn(
      'credentials',
      {
        redirect: false,
        email: email,
        password: password
      }
    )

    if(res?.error) {
      alert(res?.error)
    }

    setloading(false)
  }

  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Next.js example
        </Typography>
        {session
          ? <Link href="/about" color="secondary">
            Go to the about page
          </Link>
          : <Box
            component="form"
            sx={{
              '& .MuiTextField-root': { mb: 2 },
            }}
            noValidate
            autoComplete="off"
          >
            <div>
              <TextField
                fullWidth
                required
                type="email"
                label="Email"
                value={email}
                onChange={e => setemail(e.target.value)}
              />
              <TextField
                fullWidth
                required
                type="password"
                label="Password"
                value={password}
                onChange={e => setpassword(e.target.value)}
              />
            </div>
            <LoadingButton
              fullWidth
              variant="contained"
              loading={loading}
              disabled={!email || !password}
              onClick={handleLogin}
            >Login</LoadingButton>
          </Box>
        }
        <ProTip />
        <Copyright />
      </Box>
    </Container>
  );
}
