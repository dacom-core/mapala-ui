/**
 * Show notification blocks with errors
 * @param  {array} errors erros array for display
 */
export function showErrors (errors, context) {
  console.log(errors)
  console.log('dfsdfs')
  if (typeof errors === 'string') {
    context.$notify(
      {
        title: 'Error :',
        message: errors,
        type: 'warning'
      })
  } else {
    console.log('dfs')
    let offset = 0
    for (const error in errors) {
      const err = errors[error]
      if (error === 'non_field_errors') {
        var message = err[0]
      } else {
        if (error === '0') {
          message = err
        } else {
          message = error + ': ' + errors[error]
        }
      }
      context.$notify(
        {
          title: 'Error :',
          message: message,
          type: 'warning',
          offset: offset,
        })
      offset += 100
    }
  }
}
