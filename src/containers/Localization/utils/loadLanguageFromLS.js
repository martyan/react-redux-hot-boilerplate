const loadLanguageFromLS = () => {
	try {
    return localStorage.getItem('ln')
  } catch(error) {
    console.error(error)
  }	
}

export default loadLanguageFromLS
