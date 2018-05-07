import React, {Component} from 'react'
import PropTypes from 'prop-types'

/*
* react-redux核心模块
*
* 1，Provider
*      组件类
*      接收store属性
*      将store暴露给所有层次的容器子组件: 利用context技术
        在render中, 指定渲染<Provider>的所有子节点(<App />)

  2，connect
       高阶函数
       参数:
          参数1: mapStateToProps= state => ({})
          参数2: mapDispatchToProps={}
       返回值:
          一个函数, 接收一个UI组件, 返回一个容器组件
            (因为有2个括号，第一个括号调用的返回值)
       容器组件:
          容器组件包含是UI组件
          容器组件会向UI组件传递属性
* */

export class Provider extends Component {

    static propTypes = {
        store: PropTypes.object.isRequired
    }

    /*
    * 声明向后代组件提供的context
    *   必须要指定childContextTypes
    * */
    static childContextTypes = {
        store: PropTypes.object.isRequired
    }

    //向后代提供context，指定全局数据store
    getChildContext () {
        return {
            store: this.props.store
        }
    }

    render() {
        /*
        * 返回所有子节点
        *   如果没有子节点返回undefined,
        *   如果只有一个子节点它是对象, 如果有多个它是数组
        *
        * 而指定所有的子节点，才能保证所有的子节点都能被渲染。
        *   如下所示，可能不止有App一个子节点
        * <Provider store={store}>
        *    <App/>
        * </Provider>
        *
        * children属性，自定义的组件标签是没有的！
        * */
        return this.props.children
    }
}


/*这是mapStateToProps和mapDispatchToProps执行的过程*/

//const mapStateToProps = state => ({count: state})

// const mapDispatchToProps = dispatch => ({
//     increment : number => dispatch(increment(number)),
//     decrement : number => dispatch(decrement(number)),
//     incrementAsync : number => {
//         return dispatch => {
//             setTimeout(() => {
//                 dispatch(increment(number))
//             }, 1000)
//         }
//     }
// })

//mapStateToProps: state => ({count: state.count, msgs: state.msgs})
//mapDispatchToProps:  {increment, decrement, addMsg}

//function increment(number) {
//  return {type:'INCREMENT', data: number}
//}
//function increment (...args) {
//  store.dispatch(increment(...args))
//}

export function connect(mapStateToProps = state => ({}), mapDispatchToProps = {}) {

    // 返回一个函数, 接收一个UI组件, 返回一个容器组件
    return function (UIComponent) {

        return class ConnectComponent extends Component {

            // 声明读取context中的store
            static contextTypes = {
                store: PropTypes.object.isRequired
            }

            constructor(props, context) {
                super(props, context)

                /*为UI组件准备一般属性*/
                // stateProps包含所有需要传递的，一般属性的对象
                const stateProps = mapStateToProps(context.store.getState())

                //放在容器组件的state上，是因为方便更新
				//因为初始化状态只有一次，如果不绑定在state上，就不能实时更新了
                this.state = stateProps

                /*
                * 为UI组件准备函数属性
                *   最终通过自定义的bindActionCreators，返回的dispatchProps对象，
                *       包含的这些函数属性，传递给UI组件后，是可以直接调用执行，分发action的，
                * */
                this.dispatchProps = this.bindActionCreators(mapDispatchToProps)
            }


            //mapDispatchToProps本身是一个对象，对象中是一些方法
            bindActionCreators = (mapDispatchToProps) => {
                // 1. 准备一个对象
                const dispatchProps = {}

                // 2. 向对象中添加方法(根据mapDispatchToProps中的方法产生)
                Object.keys(mapDispatchToProps).forEach(key => {

                    //action其实是action的工厂函数
                    const action = mapDispatchToProps[key]

                    //dispatchProps对象中，保存对应的每个要分发的action函数
                    dispatchProps[key] = (...args) => {
                        this.context.store.dispatch(action(...args))
                    }
                })

                return dispatchProps
            }

            //也可以使用reduce方法
            // bindActionCreators2 = (mapDispatchToProps) => {
            //     return Object.keys(mapDispatchToProps).reduce((dispatchProps, key) => {
            //         dispatchProps[key] = (...args) => {
            //             this.context.store.dispatch(mapDispatchToProps[key](...args))
            //         }
            //         return dispatchProps
            //     },{})
            // }

            componentDidMount () {
                //订阅监听（store中的state）
                this.context.store.subscribe(() => {
                    //更新容器组件的state
                    this.setState(mapStateToProps(this.context.store.getState()))
                })
            }


            render () {

                /*
                * 容器组件包含的是UI组件
                *   {...this.state}使用这样的方式，在UI组件中，就可以直接this.props.xxx
                * */
                return <UIComponent {...this.state} {...this.dispatchProps}/>
            }
        }
    }
    
}

