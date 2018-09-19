const detectNavigatorLanguage = () => {
	try {

		const ln = navigator.languages && navigator.languages[0] || navigator.language || navigator.userLanguage
		if(ln && ln.length > 2) return ln.substr(0, 2)
		return ln 

  } catch(error) {
    console.error(error)
  }	
}

export default detectNavigatorLanguage
