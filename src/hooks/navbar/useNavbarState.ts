import { useState } from "react"

export const useNavbarState = () => {
  const [shopDropdownOpen, setShopDropdownOpen] = useState(false)
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false)
  const [isToggled, setIsToggled] = useState(false)
  const [mobileShopOpen, setMobileShopOpen] = useState(false)
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false)

  
  return {
    shopDropdownOpen, setShopDropdownOpen,
    aboutDropdownOpen, setAboutDropdownOpen,
    isToggled, setIsToggled,
    mobileShopOpen, setMobileShopOpen,
    mobileAboutOpen, setMobileAboutOpen
  }
}