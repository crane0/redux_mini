import React, {Component} from 'react'
// import {connect} from 'react-redux'
import {connect} from '../libs/mini_react-redux'
import {add, minus, add_msg} from '../redux/actions'

class App extends Component {

    //+是因为获取的是string类型，要参数计算，所以变为number类型
    //直接添加
    add = () => {
        const selected = +this.refs.optionValue.value
        this.props.add(selected)
    }

    //减少
    minus = () => {
        const selected = +this.refs.optionValue.value
        this.props.minus(selected)
    }

    //奇数时添加
    oddAdd = () => {
        const selected = +this.refs.optionValue.value
        let num = this.props.num
        if(num%2 !== 0){
            this.props.add(selected)
        }
    }

    //异步时（1s）添加
    asyncAdd = () => {
        const selected = +this.refs.optionValue.value
        setTimeout(() => {
            this.props.add(selected)
        },1000)

    }


    //添加到列表中
    addToUl = () => {
        const msg = this.input.value
        this.props.add_msg(msg)
    }

    render() {

        const {num, msgs} = this.props

        return (
            <div>
                <p>click {num} times</p>
                <select ref="optionValue">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                </select>
                <input type="button" value="+" onClick={this.add}/>
                <input type="button" value="-" onClick={this.minus}/>
                <input type="button" value="奇数时添加" onClick={this.oddAdd}/>
                <input type="button" value="异步（1s）添加" onClick={this.asyncAdd}/>

                <hr/>
                <input type="text" ref={input => this.input = input}/>
                <input type="button" value="添加到列表中" onClick={this.addToUl}/>
                <ul>
                    {msgs.map((msg,index) => (
                        <li key={index}>{msg}</li>
                    ))}
                </ul>

            </div>
        )
    }
}

export default connect(
    state => ({num: state.num, msgs: state.msgs}),
    {add, minus, add_msg}
)(App)
