import { Container, Divider } from '@mui/material'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import NextImage from 'next/image'
import logo from '../assets/logo.png'
import { generateInvoiceId } from '@/helper/generateInvoiceId'

const Invoice = () => {
  const router = useRouter()
  const formatDate = date =>
    date
      .toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit',
      })
      .replace(/\//g, '/')
  const [currentDate, futureDate] = [
    new Date(),
    new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  ].map(formatDate)

  const dataArray = JSON.parse(
    decodeURIComponent(router.query.dataArray || '[]')
  )
  const userName = decodeURIComponent(router.query.userName || '')
  const userEmail = decodeURIComponent(router.query.userEmail || '')

  const subtotal = dataArray.reduce((total, item) => {
    const itemPrice = Number(item.unitPrice.price)
    const itemQuantity = item.taken || 1
    return total + itemPrice * itemQuantity
  }, 0)

  const [isLoaded, setIsLoaded] = useState(false)

  const printDiv = () => {
    if (typeof window !== 'undefined') {
      const printContents = document.getElementById('download_section')

      if (printContents) {
        const originalContents = document.body.innerHTML
        document.body.innerHTML = printContents.innerHTML
        window.print()
        document.body.innerHTML = originalContents
      }
    }
  }

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  useEffect(() => {
    if (isLoaded) {
      printDiv()
    }
  }, [isLoaded])

  return (
    <Container maxWidth="md" sx={{ py: 3 }} id="download_section">
      <div class="clearfix">
        <div id="logo">
          <NextImage src={logo} alt="logo" width={70} height={400} />
        </div>
        <div id="company">
          <h2 class="name">Health Care System</h2>
          <div>455 Foggy Heights, AZ 85004, US</div>
          <div>(602) 519-0450</div>
          <div>
            <a href="mailto:company@example.com">company@example.com</a>
          </div>
        </div>
      </div>
      <Divider sx={{ my: 3 }} />
      <div id="details" class="clearfix">
        <div id="client">
          <div class="to">INVOICE TO:</div>
          <h2 class="name">{userName}</h2>
          <div class="address">796 Silver Harbour, TX 79273, US</div>
          <div class="email">
            <a href={`mailto:${userEmail}`}>{userEmail}</a>
          </div>
        </div>
        <div id="invoice">
          <h1>INVOICE</h1>
          <div class="date">ID: {generateInvoiceId(userName)}</div>
          <div class="date">Date of Invoice: {currentDate}</div>
          <div class="date">Due Date: {futureDate}</div>
        </div>
      </div>
      <table id="table" border="0" cellspacing="0" cellpadding="0">
        <thead>
          <tr>
            <th class="no">#</th>
            <th class="desc">Brand</th>
            <th class="unit">Form</th>
            <th class="qty">Variant</th>
            <th class="unit">Quantity</th>
            <th class="total">Price</th>
          </tr>
        </thead>
        <tbody>
          {dataArray.map((item, itemIndex) => (
            <tr key={itemIndex}>
              <td class="no">{itemIndex + 1}</td>
              <td class="desc">{item.brandName}</td>
              <td class="unit">{item.form}</td>
              <td class="unit">{item.variant}</td>
              <td class="qty">{item.taken || 1}</td>
              <td class="total">
                {Number(item.unitPrice.price) * (item.taken || 1)}
              </td>
            </tr>
          ))}
        </tbody>

        <tfoot>
          <tr>
            <td colspan="3"></td>
            <td colspan="2">Subtotal</td>
            <td>{subtotal}</td>
          </tr>
        </tfoot>
      </table>
      <div id="thanks">Thank you!</div>
      <div id="notices">
        <div>NOTICE:</div>
        <div class="notice">
          A finance charge of 1.5% will be made on unpaid balances after 30
          days.
        </div>
      </div>
    </Container>
  )
}

export default Invoice
