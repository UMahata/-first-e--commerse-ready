import { render } from '@testing-library/react'
import React from 'react'
import { Blocks } from 'react-loader-spinner'

const Spinner = () => {
  return (
    render(<Blocks
        height="80"
        width="80"
        color="#4fa94d"
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClass="blocks-wrapper"
        visible={true}
        />)
  )
}

export default Spinner
