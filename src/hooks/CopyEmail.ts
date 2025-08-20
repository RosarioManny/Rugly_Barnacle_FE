export const copyEmailBtn = async () => {
  const email = "theruglybarnacle@gmail.com"

  try {
    await navigator.clipboard.writeText(email);
    alert(`Copied ${email} to clipboard.`)
  } catch (err) {
    console.error("Failed to copy:", err)
      const textArea = document.createElement("textarea");
        textArea.value = email;
          document.body.appendChild(textArea);
            textArea.select();
              document.execCommand("copy");
                document.body.removeChild(textArea);
    alert(`Copied (fallback): ${email}` )
  }
}