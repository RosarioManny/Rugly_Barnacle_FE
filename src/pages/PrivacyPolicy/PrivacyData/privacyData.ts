export interface PrivacySection {
  id: number
  title: string
  content: string[]
}


export const privacySections: PrivacySection[] = [
  {
    id: 1,
    title: "What Information We Collect",
    content: [
      "Newsletter sign-up: We collect your email address to send you updates about The Rugly Barnacle.",
      "Cart: We temporarily store your cart items to maintain your shopping session.",
      "Custom Orders: We collect your name, email, contact information (phone number, social media handle, or other preferred contact), and any reference images you provide for your custom order.",
    ]
  },
  {
    id: 2,
    title: "Why We Collect It",
    content: [
      "Email addresses are used solely to send newsletters or order-related communications.",
      "Cart data is stored temporarily to keep your session active while you browse.",
      "Custom order information is used to process and fulfill your order and to contact you throughout the process.",
      "Reference images submitted with custom orders are used only to complete your requested design.",
    ]
  },
  {
    id: 3,
    title: "How We Store Your Data",
    content: [
      "Your data is stored securely on our servers and is never sold or shared with third parties for marketing purposes.",
      "Session and security cookies (CSRF tokens) are used to keep the site functional and secure. These are essential cookies and do not track you.",
      "Newsletter emails are retained until you unsubscribe. You can unsubscribe at any time via the link in any newsletter email.",
      "Custom order data is retained for order fulfillment and basic record keeping.",
    ]
  },
  {
    id: 4,
    title: "Cookies",
    content: [
      "We use essential cookies only. These include session cookies and security (CSRF) cookies that are required for the site to function properly.",
      "We do not use advertising, tracking, or analytics cookies.",
      "Because our cookies are strictly essential, no cookie consent banner is required — but we believe in being transparent about their use.",
    ]
  },
  {
    id: 5,
    title: "Your Rights",
    content: [
      "You have the right to request access to the personal data we hold about you.",
      "You have the right to request deletion of your personal data at any time.",
      "You can unsubscribe from our newsletter at any time using the unsubscribe link in any email we send.",
      "To request data access or deletion, contact us directly through our custom order form or social media.",
    ]
  },
  {
    id: 6,
    title: "We Do Not Sell Your Data",
    content: [
      "We do not sell, trade, or rent your personal information to any third parties — ever.",
      "Your information is used only for the purposes described in this policy.",
    ]
  },
  {
    id: 7,
    title: "Contact",
    content: [
      "If you have any questions about this Privacy Policy or how your data is handled, please reach out to us through the custom order form, email or our social media channels.",
    ]
  },
]