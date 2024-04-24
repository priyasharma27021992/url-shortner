/**
 * Function to copy text to user's clipboard
 * @param {string} text
 */

const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text);
};

function getBaseUrl(): string {
  if (process.env.NODE_ENV === 'development') {
    return `${process.env.NEXTAUTH_URL}`;
  }

  return (
    'https://' + process.env.NEXT_PUBLIC_SITE_URL ?? process.env.VERCEL_URL
  );
}

export { copyToClipboard, getBaseUrl };
