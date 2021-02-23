import React, { useRef } from 'react';

export const RenderCount = props => {
  const count = useRef(0)
  return (
    <span style={{ height: 30, width: 30, borderRadius: 15, border: '1px solid #ddd', backgroundColor: '#eee', textAlign: 'center'  }}>
      { ++count.current }
    </span>
  )
}