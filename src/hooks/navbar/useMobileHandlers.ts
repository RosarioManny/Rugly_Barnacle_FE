import { useNavbarState } from "./useNavbarState"

export const useMobileHandlers = () => {
  const { 
    isToggled, setIsToggled,
    mobileShopOpen, setMobileShopOpen,
    mobileAboutOpen, setMobileAboutOpen
  } = useNavbarState()

  // Reset mobile dropdowns when closing menu
  const handleClick = () => {
    setIsToggled(!isToggled)
    if (isToggled) {
      setMobileShopOpen(false)
      setMobileAboutOpen(false)
    }
  }

  // Mobile Shop Menu
  const toggleMobileShop = () => {
    setMobileShopOpen(!mobileShopOpen)
    // Close about if it's open
    if (mobileAboutOpen) setMobileAboutOpen(false)
  }

  // Mobile About Menu
  const toggleMobileAbout = () => {
    setMobileAboutOpen(!mobileAboutOpen)
    // Close shop if it's open
    if (mobileShopOpen) setMobileShopOpen(false)
  }

  return {
    handleClick,
    toggleMobileShop,
    toggleMobileAbout,
    isToggled,
    mobileShopOpen,
    mobileAboutOpen
  }
}