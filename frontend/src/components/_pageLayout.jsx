const PageLayout =({children, pageName}) => {
    return (
    <div className='container text-center'>
      <div className='my-1 display-1 text-danger font-english-towne'>{`☩ ${pageName} ☩`}</div>
      {children}
    </div>
    )
  }

export default PageLayout;