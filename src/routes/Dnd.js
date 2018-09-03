import React, { PureComponent } from 'react'
// import Draggable from 'react-draggable'
import { Button, Icon } from 'antd'
// import l from './IndexPage.less'
import MainLayout from '../components/MainLayout/MainLayout'

import l from './Dnd.less';

import { Grid, Well } from 'react-bootstrap';
import { Transition, CSSTransition, TransitionGroup } from 'react-transition-group';


class Fade extends React.Component {
  constructor(props) {
    super(props);
  }
  done =() => {
    // console.log('结束了')
  }
  addaddEndListener = (node) => {
    node.addEventListener('transitionend', this.done, false);
  }


  onEnter = (node, isAppearing) => {
    console.log(isAppearing, 'onEnter')
  }
  onEntering = (node, isAppearing) => {
    console.log(isAppearing, 'onEntering')
  }
  onEntered = (node, isAppearing) => {
    console.log(isAppearing, 'onEntered')
  }


  onExit = (node) => {
    console.log('onExit')
  }
  onExiting = () => {
    console.log('onExiting')
  }
  onExited = () => {
    console.log('onExited')
    this.props.self()
  }
  render() {
    const { in: inProp, dur} = this.props;
    const defaultStyle = {
      transition: `transform ${300}ms ease-in-out, opacity ${300}ms ease-in-out`,
      transform: 'translateX(100px)',
      opacity: '0'
    }

    const transitionStyles = {
      entering: { transform: 'translateX(100px)', opacity: '0'},
      entered:  { transform: 'translateX(0px)', opacity: '1' },
      exiting: {transform: 'translateX(0px)', opacity: '1'},
      exited: {transform: 'translateX(0px)', opacity: '0'}
    };
    const duration = {
      enter: 300,
      exit: 300,
    }
    return (
      <Transition 
        onEnter={this.onEnter}
        onEntering={this.onEntering}
        onEntered={this.onEntered}

        onExit={this.onExit}
        onExiting={this.onExiting}
        onExited={this.onExited}

        addEndListener={this.addaddEndListener} 
        in={inProp} 
        unmountOnExit={false} 
        appear={true} 
        timeout={duration}
      >
        {
          state => {
            console.log(state, '###')
            return(
              <div style={{
                ...defaultStyle,
                ...transitionStyles[state]
              }}>
                {this.props.children}
              </div>
            )
          }
        }
      </Transition>
    );
  }
}

let num = 1;
class Dnd extends React.Component {
  state = {
    ins: true,
    star: false,
    current: 1,
    test: true,
    currentDom: <div className={l.test}>
              888888 {1}
            </div>,
    dom: <div className={l.test}>
            ceshi weizhi {num}
          </div>,
  }
  componentDidMount() {
    // this.setState({
    //   ins: true
    // })
  }
  handle = (bool) => {
    this.setState({
      test: !bool
    })
  }
  end = () => {
    const that = this;
    console.log('end----', this.state.test)
    num = num + 1;
    setTimeout(function () {
      that.setState({
        test: true,
        dom: <div className={l.test}>
              888888 {num}
            </div>
      }) 
    }, 500)
    
  }
  handleNav = (index, ins) => {
    this.setState({
      current: index + 1,
      ins: !ins
    })
  }


  turn = (current) => {
    console.log(current, '8888')
    const that = this;
    setTimeout(function () {
      that.setState({
        ins: true,
        currentDom: <div className={l.test}>
              888888 {current}
            </div>
      }) 
    }, 500)
  }


  handleStar = (star) => {
    this.setState({
      star: !star
    })
  }
  onExited = () => {
    console.log('123123123')
    this.setState({
      star: true
    })
  }
  render () {
    const { location } = this.props
    const { ins, test, current, currentDom, star, items } = this.state;
    // console.log(star, 'star', ins)
    return (
      <MainLayout location={location}>
        <div>
          <Button onClick={this.handleStar.bind(null, star)}>start</Button>
        </div>
        <div className={l.starBox}>
          <CSSTransition
            in={star}
            timeout={300}
            classNames="star"
            onExited={this.onExited}
            // unmountOnExit
          >
            <div className="star">⭐</div>
          </CSSTransition>
          <div className={l.star}>⭐</div>
        </div>
        
        <div className="box">
          <Icon type="link" /> 
          <i>123<Icon type="up-circle-o" /></i>
          <Icon type="up-circle-o" />
        </div>
          <Button onClick={this.handle.bind(null, this.state.test)}>点击transition</Button>
          <Fade in={this.state.test} self={this.end}>
            {this.state.dom}
          </Fade>
        <div>
          {
            ['item', 'nacs', 'chen'].map( (item,index) => {
              return <Button type={current === (index + 1) ? 'primary' : ''} onClick={this.handleNav.bind(null, index, ins)} key={index} style={{margin: '0 10px'}}>{item}</Button>
            })
          }
        </div>
        <Fade in={ins} self={this.turn.bind(null, current)}>
          {currentDom}
        </Fade>


        

        <List />



        

        <FileComponent />
      </MainLayout>
    )
  }
}

class FileComponent extends React.Component {
 constructor(props) {
    super(props);
    this.state = {
      src: null
    }
  }
  handleFileChange = (e) => {
    const that = this;
    let count=0;
    const file = e.target.files[0];
    console.log('onChange. 方法', file)
    const reader = new FileReader();
    // reader.readAsDataURL(file);//发起异步请求
    reader.readAsText(file,"utf-8");//发起异步请求
    reader.onload = function(){
      console.log("加载成功", file)
    }
    reader.onloadstart = function(){
      console.log("开始加载")
    }
    reader.onloadend= function(){
      console.log("加载结束")
    }
    reader.onprogress = function(){
      count++;
      console.log("加载中"+count)
    }
  }
  render() {
    const { src } = this.state;
    return (
      <div>
        <img src={src} alt=""/>
        <form>
          <input type='file'  onChange={this.handleFileChange.bind(this)}/>
          <input type='reset' ref={(input) => this.reset=input} className="reset" />
        </form>
      </div>
    );
  }
}


class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [
        { id: 1, text: 'Buy eggs' },
        { id: 2, text: 'Pay bills' },
        { id: 3, text: 'Invite friends over' },
        { id: 4, text: 'Fix the TV' },
      ]
    }
  }

  render() {
    const { items } = this.state; 
    return (
      <div>
        <TransitionGroup 
        component="span"
        className="todo-list"
        >
          {items.map(({ id, text }) => (
            <CSSTransition
              key={id}
              timeout={500}
              classNames="fade"
            >
              <div>
                <Button
                  onClick={() => {
                    this.setState(state => ({
                      items: state.items.filter(
                        item => item.id !== id
                      ),
                    }));
                  }}
                >
                  &times;
                </Button>
                {text}
              </div>
            </CSSTransition>
          ))}
        </TransitionGroup>
        <Button
          type="button"
          onClick={() => {
            const text = prompt('Enter some text');
            if (text) {
              this.setState(state => ({
                items: [
                  ...state.items,
                  { id: 1123, text },
                ],
              }));
            }
          }}
        >
          Add Item
        </Button>
        <TransitionGroup children={<span>123333</span>} />
      </div>
    );
  }
}

export default Dnd
