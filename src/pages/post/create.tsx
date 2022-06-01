import React from 'react'
import FormValidation from '@/utils/formValidation';
import { TextField, Button, Grid } from '@mui/material';
import { useAppDispatch } from '@/app/hooks'
import actions from '@/store/post/actions'

const errorsState: Record<string, string | null> = {}
const formValidate = new FormValidation(errorsState);

type PostState = {
  title: string,
  body: string,
}

const postState: PostState = {
  title: '',
  body: '',
}

const HomePage: React.FC = (): JSX.Element => {
  const dispatch = useAppDispatch()

  const [post, setPost] = React.useState<PostState>(postState);

  // Form error
  const [errors, setErrors] = React.useState(errorsState);
  formValidate.setHook(setErrors); // set hook validate

  // Rules
  const rules = {
    title: [
      () => formValidate.required(post.title),
      () => formValidate.minlength(post.title, 10),
    ],
    body: [
      () => formValidate.required(post.body),
      () => formValidate.minlength(post.body, 20),
    ]
  }

  // Reset validation
  React.useEffect(() => {
    return () => formValidate.reset()
  }, [])

  // Event change input value
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>, name: string) => {
    setPost({
      ...post,
      [name]: event.target.value
    })
  }

  // Handle submit
  const submit = async () => {
    const invalid = await formValidate.validate(rules)
    if (invalid) {
      console.log(formValidate.getErrors())
      return false
    }
    dispatch({
      type: actions.CREATE_POST,
      payload: post
    })
  }

  const reset = async () => {
    setPost(postState)
    formValidate.reset()
  }

  return (
    <>
      <h1>Create post</h1>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField value={post.title}
            onChange={(event: any) => handleChange(event, 'title')}
            onBlur={() => formValidate.validateFiled('title', rules.title)}
            error={!!errors.title}
            helperText={errors.title}
            fullWidth label="Title" />
        </Grid>
        <Grid item xs={12}>
          <TextField value={post.body}
            onChange={(event: any) => handleChange(event, 'body')}
            onBlur={() => formValidate.validateFiled('body', rules.body)}
            error={!!errors.body}
            helperText={errors.body}
            minRows={4} label="body" fullWidth multiline />
        </Grid>
        <Grid item xs={12}>
          <Button onClick={reset} variant="text" sx={{ mr: 1 }}>Reset</Button>
          <Button onClick={submit} variant="contained">Submit</Button>
        </Grid>
      </Grid>
    </>
  )
}

export default HomePage
