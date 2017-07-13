import React from 'react'
import { string } from 'prop-types'
import { Wrapper } from '../../../../shared/components/wrapper'
import { BootError } from '../../../../shared/components/errors'

const AppWithErrors = ({ errorMessage }) =>
  <Wrapper>
    <BootError errorMessage={errorMessage} />
  </Wrapper>

AppWithErrors.propTypes = {
  errorMessage: string.isRequired
}

export default AppWithErrors
