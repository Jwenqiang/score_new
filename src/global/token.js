export const getToken = () => {
  const token = JSON.parse(localStorage.getItem('userInfo'));
  if (token) return token
  else return ""
}
export const uToken = () => {
  const utoken = JSON.parse(localStorage.getItem('userInfo'));
  if (utoken) return utoken.token || utoken
  else return ""
}