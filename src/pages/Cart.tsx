import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCartStore } from '../store/useCartStore'

export default function Cart() {
  const navigate  = useNavigate()
  const openCart  = useCartStore((s) => s.openCart)

  useEffect(() => {
    openCart()
    navigate('/', { replace: true })
  }, [])

  return null
}
