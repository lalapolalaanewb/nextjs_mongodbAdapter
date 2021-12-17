import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { getSession, signOut } from 'next-auth/react';
import * as React from 'react';
import Copyright from '../src/Copyright';
import Link from '../src/Link';
import ProTip from '../src/ProTip';

export default function About() {
  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Next.js example
        </Typography>
        <Button variant="contained" component={Link} noLinkStyle href="/">
          Go to the main page
        </Button>
        <Button 
          color="warning"
          variant="contained" 
          onClick={async(e) => {
            e.preventDefault()

            await signOut({
              redirect: true,
              callbackUrl: '/'
            })
          }}
        >Logout</Button>
        <ProTip />
        <Copyright />
      </Box>
    </Container>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context?.req })
  // console.log(session)
  if(!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  } else {
    return {
      props: {
        session: session
      }
    }
  }
}