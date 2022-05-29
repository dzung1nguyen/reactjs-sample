import React from 'react'
import FormValidation from '@/utils/formValidation';
import { TextField, Button, FormHelperText } from '@mui/material';

const errorsState: Record<string, string | null> = {}
const formValidate = new FormValidation(errorsState);

const formState: Record<string, any> = {
  option: undefined,
  string: undefined,
  number: '',
  email: undefined,
  url: undefined,
  equalTo: undefined,
  equalToTarget: undefined,
  requireIf: undefined,
  requireIfTarget: undefined,
  files: []
}

const HomePage: React.FC = (): JSX.Element => {

  const [form, setForm] = React.useState<Record<string, any>>(formState);

  // Form error
  const [errors, setErrors] = React.useState(errorsState);
  formValidate.setHook(setErrors); // set hook validate

  // Rules
  const rules = {
    option: [
      () => formValidate.minlength(form.option, 10),
    ],
    string: [
      () => formValidate.required(form.string),
      () => formValidate.minlength(form.string, 10),
      () => formValidate.maxlength(form.string, 20),
    ],
    number: [
      () => formValidate.required(form.number),
      () => formValidate.number(form.number),
      () => formValidate.min(form.number, 10),
      () => formValidate.max(form.number, 20, 'This custom message: The number should be less than 20'),
    ],
    digits: [
      () => formValidate.required(form.digits),
      () => formValidate.digits(form.digits),
    ],
    alphaNum: [
      () => formValidate.required(form.alphaNum),
      () => formValidate.alphaNum(form.alphaNum),
    ],
    email: [
      () => formValidate.required(form.email),
      () => formValidate.email(form.email),
    ],
    url: [
      () => formValidate.required(form.url),
      () => formValidate.url(form.url),
    ],
    equalTo: [
      () => formValidate.equalTo(form.equalTo, () => form.equalToTarget),
    ],
    requireIf: [
      () => formValidate.requiredIf(form.requireIf, () => form.requireIfTarget === '123123'),
    ],
    files: [
      () => formValidate.accept(form.files, 'image'), // 'image', 'document', 'ext1', ['ext1', 'ext2', 'ext3', ....]
      () => formValidate.filesize(form.files, 5), // 5 megabyte
      () => formValidate.arrayMin(form.files, 2, 'Please upload a least 2 images.'), // 5 megabyte
      () => formValidate.arrayMax(form.files, 5, 'Please upload less than or equal 5 images.'), // 5 megabyte
    ]
  }

  // Reset validation
  React.useEffect(() => {
    return () => formValidate.reset()
  }, [])

  // Event change input value
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>, name: string) => {
    console.log('event.target.files', event.target.files)
    setForm({
      ...form,
      [name]: name === 'files'
        ? (event.target.files || [])
        : event.target.value
    })
  }

  // Handle submit
  const submit = async () => {
    const invalid = await formValidate.validate(rules)
    if (invalid) {
      return false
    }
    console.log('form', form)
  }

  const reset = async () => {
    setForm(formState)
    formValidate.reset()
  }

  return (
    <>
      <h1>Form validation</h1>
      <p>Errors: {JSON.stringify(errors)}</p>
      <p>Form: {JSON.stringify(form)}</p>
      <hr />
      <h3>Option</h3>
      <TextField value={form.option}
        onChange={(event: any) => handleChange(event, 'option')}
        onBlur={() => formValidate.validateFiled('option', rules.option)}
        error={!!errors.option}
        helperText={errors.option} />

      <h3>String, Required, Min length, Max length</h3>
      <TextField value={form.string}
        onChange={(event: any) => handleChange(event, 'string')}
        onBlur={() => formValidate.validateFiled('string', rules.string)}
        error={!!errors.string}
        helperText={errors.string} />

      <h3>Number, min, max</h3>
      <TextField value={form.number} type="number"
        onChange={(event: any) => handleChange(event, 'number')}
        onBlur={() => formValidate.validateFiled('number', rules.number)}
        error={!!errors.number}
        helperText={errors.number} />

      <h3>Digits</h3>
      <TextField value={form.digits}
        onChange={(event: any) => handleChange(event, 'digits')}
        onBlur={() => formValidate.validateFiled('digits', rules.digits)}
        error={!!errors.digits}
        helperText={errors.digits} />

      <h3>Alpha And Numer</h3>
      <TextField value={form.alphaNum}
        onChange={(event: any) => handleChange(event, 'alphaNum')}
        onBlur={() => formValidate.validateFiled('alphaNum', rules.alphaNum)}
        error={!!errors.alphaNum}
        helperText={errors.alphaNum}
      />

      <h3>Email</h3>
      <TextField value={form.email}
        onChange={(event: any) => handleChange(event, 'email')}
        onBlur={() => formValidate.validateFiled('email', rules.email)}
        error={!!errors.email}
        helperText={errors.email} />

      <h3>URL</h3>
      <TextField value={form.url}
        onChange={(event: any) => handleChange(event, 'url')}
        onBlur={() => formValidate.validateFiled('url', rules.url)}
        error={!!errors.url}
        helperText={errors.url} />

      <h3>Equal To</h3>
      <TextField value={form.equalToTarget}
        onChange={(event: any) => handleChange(event, 'equalToTarget')}
        helperText={errors.equalToTarget}
        label="Password"
      />

      <TextField value={form.equalTo}
        onChange={(event: any) => handleChange(event, 'equalTo')}
        onBlur={() => formValidate.validateFiled('equalTo', rules.equalTo)}
        error={!!errors.equalTo}
        helperText={errors.equalTo}
        label="Verify Password"
      />

      <h3>Require If</h3>

      <TextField value={form.requireIfTarget}
        onChange={(event: any) => handleChange(event, 'requireIfTarget')}
        label="Field A"
        placeholder="Enter: 123123"
      />

      <TextField value={form.requireIf}
        onChange={(event: any) => handleChange(event, 'requireIf')}
        onBlur={() => formValidate.validateFiled('requireIf', rules.requireIf)}
        error={!!errors.requireIf}
        helperText={errors.requireIf}
        label="Field B"
        placeholder="Field A is: 123123"
      />

      <h3>Upload</h3>

      <Button
        variant="outlined"
        component="label"
        color={errors.files ? 'error' : 'primary'}
      >
        Upload Image {form.files.length}
        <input
          type="file"
          multiple
          hidden
          onChange={(event: any) => handleChange(event, 'files')}
        />
      </Button>
      {!!errors.files && <FormHelperText error={!!errors.files}>{errors.files}</FormHelperText>}
      <hr />
      <div>
        <Button onClick={reset} variant="text" sx={{ mr: 1 }}>Reset</Button>
        <Button onClick={submit} variant="contained">Submit</Button>
      </div>
    </>
  )
}

export default HomePage
