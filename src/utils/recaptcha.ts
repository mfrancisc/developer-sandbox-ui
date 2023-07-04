export const recaptchaApiKey =
  process.env.NODE_ENV === 'test' ? 'test-api-key' : '6LdL7aMlAAAAALvuuAZWjwlOLRKMCIrWjOpv-U3G';

export const loadRecaptchaScript = (): void => {
  if (recaptchaApiKey) {
    const url = `https://www.google.com/recaptcha/enterprise.js?render=${recaptchaApiKey}`;
    const recaptchaScriptNode = document.querySelector(`script[src="${url}"]`);
    if (!recaptchaScriptNode) {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = url;
      script.async = true;
      script.defer = true;

      document.head.appendChild(script);
    }
  }
};
