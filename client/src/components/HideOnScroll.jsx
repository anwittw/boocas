import React, { Component } from 'react'

export default class HideOnScroll extends Component {
  constructor(props) {
    super(props)
    this.state = {
      prevScrollpos: window.pageYOffset,
      visible: true,
    }
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }

  handleScroll = () => {
    const { prevScrollpos } = this.state
    const currentScrollPos = window.pageYOffset
    const visible = prevScrollpos > currentScrollPos
    this.setState({
      prevScrollpos: currentScrollPos,
      visible,
    })
  }

  render() {
    let classes = ['scroll--aware']
    if (!this.state.visible) classes.push('scroll--hidden')
    return <div className={classes.join(' ')}>{this.props.children}</div>
  }
}
