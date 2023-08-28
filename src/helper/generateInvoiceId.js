export const generateInvoiceId = client => {
  const currentDate = new Date()
  const year = currentDate.getFullYear().toString().substr(-2)
  const month = (currentDate.getMonth() + 1).toString().padStart(2, '0')
  const day = currentDate.getDate().toString().padStart(2, '0')
  const hour = currentDate.getHours().toString().padStart(2, '0')
  const minute = currentDate.getMinutes().toString().padStart(2, '0')
  const formattedDate = day + month + year + hour + minute

  const nameWords = client.split(' ')
  const userInitials = `${nameWords[0]}`

  const uniqueId = userInitials + formattedDate

  return uniqueId
}
