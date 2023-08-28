import axios from 'axios'

export const updateMedicine = async (id, quantity) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/medicine/${id}`,
      {
        quantity,
      }
    )
    return response.data
  } catch (error) {
    console.log(error)
  }
}
