import React from 'react'
import ContentLoader from 'react-content-loader'

const Placeholder = () => (
    <ContentLoader 
    speed={2}
    width={400}
    height={160}
    viewBox="0 0 400 160"
    backgroundColor="#f0f0f0"
    foregroundColor="#e5e5e5"
  >
    <rect x="-1" y="2" rx="0" ry="0" width="400" height="114" /> 
    <rect x="145" y="47" rx="0" ry="0" width="1" height="0" /> 
    <rect x="-3" y="122" rx="0" ry="0" width="410" height="14" /> 
    <rect x="-4" y="142" rx="0" ry="0" width="226" height="16" />
  </ContentLoader>
)
export default Placeholder