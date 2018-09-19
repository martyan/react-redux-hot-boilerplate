const saveLanguageToLS = (ln) => {
	try {
    localStorage.setItem('ln', ln)
  } catch(error) {
    console.error(error)
  }	
}

export default saveLanguageToLS
