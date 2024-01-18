export const hasFormError = (error: any) => {
  return (
    error &&
    error.response &&
    error.response.data &&
    error.response.data.messages &&
    Object.keys(error.response.data.messages).length > 0
  )
}

export const parseResponseFormErrors = (error: any) => {
  if (hasFormError(error)) {
    return error.response.data.messages
  }

  return {}
}

export const parseResponseError = (error: any) => {
  return (error && error.response && error.response.data && error.response.data.message)
    ? error.response.data.message
    : null
}
