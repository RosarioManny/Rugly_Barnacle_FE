import { useNavbarState } from "./useNavbarState"

export const useDropdownHandlers = () => {
  const { 
    shopDropdownOpen, setShopDropdownOpen, 
    aboutDropdownOpen, setAboutDropdownOpen 
  } = useNavbarState()

  // Close all Dropdowns
  const closeDropdown = () => {
    if (shopDropdownOpen) setShopDropdownOpen(false)
    if (aboutDropdownOpen) setAboutDropdownOpen(false)
  }

  // Shop Dropdown
  const handleShopDropdown = () => {
    setShopDropdownOpen(!shopDropdownOpen)
    // Close about if it's open
    if (aboutDropdownOpen) setAboutDropdownOpen(false)
  }

  // About Dropdown
  const handleAboutDropdown = () => {
    setAboutDropdownOpen(!aboutDropdownOpen)
    // Close shop if it's open
    if (shopDropdownOpen) setShopDropdownOpen(false)
  }

  return {
    closeDropdown,
    handleShopDropdown,
    handleAboutDropdown,
    shopDropdownOpen,
    aboutDropdownOpen
  }
}