const PageLayout =({children, pageName}) => {
    return (
    <div className='container text-center'>
      <h1 className='p-3 text-danger font-english-towne'>{`☩ ${pageName} ☩`}</h1>
      {children}
    </div>
    )
  }

export default PageLayout;