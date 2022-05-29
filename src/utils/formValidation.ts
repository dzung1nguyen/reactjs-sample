class FormValidation {
  private messages: Record<string, Record<string, string>> = {
    default: {
      required: 'This field is required.',
      requiredIf: 'This field is required.',
      email: 'Please enter a valid email address.',
      minlength: 'Please enter at least {0} characters.',
      maxlength: 'Please enter no more than {0} characters.',
      url: 'Please enter a valid URL.',
      number: 'Please enter a valid number.',
      digits: 'Please enter only digits.',
      alphaNum: 'Please enter only alpha-numeric characters.',
      equalTo: 'Please enter the same value again.',
      min: 'Please enter a value greater than or equal to {0}.',
      max: 'Please enter a value less than or equal to {0}.',
      filesize: 'The file size should be less than {0}.',
      date: 'Please enter a valid date.',
      arrayMin: 'The array length should be greater than or equal to {0}.',
      arrayMax: 'The array length should be less than or equal to {0}.',
      accept: 'The file extension should be: {0}.'
    }
  }

  private lang = 'default'

  private errors: Record<string, string> = {}

  private hook: any

  constructor(params: {
    messages?: any,
    hook?: any,
    lang?: string
  }) {
    const { messages, hook, lang } = params
    messages ? this.messages = { ...this.messages, ...messages } : null
    hook ? this.hook = hook : null;
    lang ? this.lang = lang : null;
  }

  setMessages(messages: any) {
    this.messages = { ...this.messages, ...messages }
    return this
  }

  setHook(hook: any) {
    this.hook = hook
    return this
  }

  setErrors(errors: any) {
    for (const key in errors) {
      if (!errors[key]) {
        delete errors[key];
      }
    }
    this.errors = errors
    this.hook ? this.hook(errors) : null
    return this
  }

  getErrors() {
    return this.errors
  }

  getError(filed: string): string | undefined {
    return this.errors[filed] || undefined
  }

  hasErrors(): boolean {
    return Object.keys(this.errors).length > 0
  }

  hasError(filed: string): boolean {
    return !!this.errors[filed]
  }

  reset() {
    this.setErrors({})
  }

  async validate(formRules: any) {
    const errors: any = {}
    const keys: string[] = Object.keys(formRules);
    for (let i = 0; i < keys.length; i++) {
      const rules = formRules[keys[i]];
      const error: string | null = await this.validateFiled(keys[i], rules, true)
      if (error) {
        errors[keys[i]] = error
      }
    }
    return this.setErrors(errors).hasErrors()
  }

  validateFiled(name: string, rules: any[], unAssign?: boolean) {
    let errorMessage = null
    for (let i = 0; i < rules.length; i++) {
      const error: any = rules[i]()
      if (error !== true) {
        errorMessage = error
        break;
      }
    }

    if (!unAssign) {
      this.setErrors({
        ...this.errors,
        [name]: errorMessage
      })
    }

    return errorMessage
  }

  private locale(): string {
    return this.lang
  }

  private option(value: any): boolean {
    return value === null || value === '' || value === undefined || (Array.isArray(value) && value.length === 0) || JSON.stringify(value) === '{}'
  }

  private message(key: string, params?: any): string {
    const locale = this.locale()
    let message = (this.messages[locale] && this.messages[locale][key])
      ? this.messages[locale][key]
      : this.messages.default[key] || 'Incorrect data.'
    if (params) {
      params.forEach((value: string, index: number) => {
        message = message.replace(`{${index}}`, value)
      })
    }
    return message
  }

  private humanFileSize(bytes: number, si = false, dp = 1): string {
    const thresh = si ? 1000 : 1024

    if (Math.abs(bytes) < thresh) {
      return bytes + ' B'
    }

    const units = si
      ? ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
      : ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB']
    let u = -1
    const r = 10 ** dp

    do {
      bytes /= thresh
      ++u
    } while (Math.round(Math.abs(bytes) * r) / r >= thresh && u < units.length - 1)

    return bytes.toFixed(dp) + ' ' + units[u]
  }

  private checkFileSize(item: any, bytes: number, message: any) {
    const size = item?.size || false
    return (size && size <= bytes) || message || this.message('filesize', [this.humanFileSize(bytes)])
  }

  private checkExt(item: any, acceptTypes: string[], message: any) {
    const ext = (item?.name?.split('.')?.pop())?.toLowerCase() || false

    console.log('ext', ext)

    return (ext && acceptTypes.length > 0 && acceptTypes.includes(ext)) || message || this.message('accept', [acceptTypes.map((i: string) => i.toUpperCase()).join('|')])
  }

  // your rule defined

  required(value: any, message?: string) {
    return !this.option(value) || message || this.message('required')
  }

  requiredIf(value: any, callbackTargetValue: any, message?: string) {
    if (callbackTargetValue()) {
      return !this.option(value) || message || this.message('requiredIf')
    }
    return true
  }

  email(value: string, message?: string) {
    return this.option(value) || /.+@.+\..+/.test(value) || message || this.message('email')
  }

  minlength(value: any, minlength: number, message?: string) {
    return this.option(value) || value.length >= minlength || message || this.message('minlength', [minlength])
  }

  maxlength(value: any, maxlength: number, message?: string) {
    return this.option(value) || value.length <= maxlength || message || this.message('maxlength', [maxlength])
  }

  url(value: any, message?: string) {
    return this.option(value) || (
      /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(
        value
      ) ||
      message ||
      this.message('url')
    )
  }

  number(value: any, message?: string) {
    return this.option(value) || (
      /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(value) ||
      message ||
      this.message('number')
    )
  }

  digits(value: any, message?: string) {
    return this.option(value) || /^\d+$/.test(value) || message || this.message('digits')
  }

  alphaNum(value: any, message?: string) {
    return this.option(value) || /^\w+$/.test(value) || message || this.message('alphaNum')
  }

  equalTo(value: any, getCompareValue: any, message?: string) {
    const compareValue =
      typeof getCompareValue === 'function'
        ? getCompareValue()
        : getCompareValue
    return (
      value === compareValue || message || this.message('equalTo')
    )
  }

  min(value: any, min: number, message?: string) {
    return this.option(value) || parseFloat(value) >= min || message || this.message('min', [min])
  }

  max(value: any, max: number, message?: string) {
    return this.option(value) || parseFloat(value) <= max || message || this.message('max', [max])
  }

  date(value: any, message?: string) {
    return this.option(value) || /^\d{4}-\d{2}-\d{2}$/.test(value) || message || this.message('date')
  }

  arrayMin(value: any, noItems: number, message?: string) {
    return this.option(value) || value.length >= noItems || message || this.message('arrayMin', [noItems])
  }

  arrayMax(value: any, noItems: number, message?: string) {
    return this.option(value) || value.length <= noItems || message || this.message('arrayMax', [noItems])
  }

  filesize(value: any, megabyte = 5, message?: string) {
    if (this.option(value)) {
      return true
    }

    const bytes = megabyte * 1024 * 1024;

    for (let i = 0; i < value.length; i++) {
      const output = this.checkFileSize(value[i], bytes, message)
      if (output !== true) {
        return output
      }
    }

    return true
  }

  accept(value: any, accept?: any, message?: string) {
    if (this.option(value)) {
      return true
    }

    let arrAccept = []

    if (accept === 'image') {
      arrAccept = ['jpg', 'jpeg', 'png', 'gif']
    } else if (accept === 'document') {
      arrAccept = ['doc', 'docx', 'pdf', 'xls', 'xlsx', 'ppt', 'pptx', 'txt', 'jpg', 'jpeg', 'png', 'gif']
    } else {
      arrAccept = Array.isArray(accept) ? accept : [accept]
    }

    for (let i = 0; i < value.length; i++) {
      const output = this.checkExt(value[i], arrAccept, message)
      if (output !== true) {
        return output
      }
    }

    return true
  }
}

export default FormValidation