import React from 'react'

const withContext = (Component, Consumer, name = 'consumer') => {
  return class extends React.Component {
    render () {
      return (
        <Consumer>
          {(_consumer) => {
            const dynamicProps = {...this.props}
            dynamicProps[name] = _consumer
            return (
              <Component {...dynamicProps}/>
            )
          }}
        </Consumer>
      )
    }
  }
}

const checkContextsArray = arr => {
  if (!Array.isArray(arr)) throw Error('Contexts 参数必须为一个数组')
  for (let i = 0; i < arr.length; i++) {
    if (!arr[i]['consumer'] || !arr[i]['name']) throw Error('ContextsArray的元素中缺少必要的参数')
  }
}

export const withContexts = (Component, arr) => {
  try {
    checkContextsArray(arr)
  } catch(err) {
    console.error(err.message)
    return Component
  }

  return arr.reduce((p, n) => {
    return withContext(p, n.consumer, n.name)
  }, Component)
}

export default withContext