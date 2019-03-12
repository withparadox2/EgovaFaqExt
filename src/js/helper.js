export function closeDialog() {
  document.body.removeChild(document.querySelector('#faq-root'))
}

export function isDialogShowing() {
  return !!document.querySelector('#faq-root')
}