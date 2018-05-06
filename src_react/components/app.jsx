import React, {Component} from 'react'

export default class App extends Component {

    state = {
        num : 0,
        msgs : []
    }

    //+是因为获取的是string类型，要参数计算，所以变为number类型
    //直接添加
    add = () => {
        const selected = +this.refs.optionValue.value
        let num = this.state.num
        num += selected
        this.setState({
            num
        })
    }

    //直接删除
    minus = () => {
        const selected = +this.refs.optionValue.value
        let num = this.state.num
        num -= selected
        this.setState({
            num
        })
    }

    //奇数时添加
    oddAdd = () => {
        const selected = +this.refs.optionValue.value
        let num = this.state.num
        if(num%2 !== 0){
            num += selected
        }
        this.setState({
            num
        })
    }

    //异步时（1s）添加
    asyncAdd = () => {
        const selected = +this.refs.optionValue.value
        let num = this.state.num
        setTimeout(() => {
            num += selected
            this.setState({
                num
            })
        },1000)

    }


    //添加到列表中
    addToUl = () => {
        const msg = this.input.value
        //不能使用注释的部分，因为msgs没有定义
        // this.state.msgs.unshift(msg)
        // this.setState({msgs})
        const msgs = this.state.msgs
        msgs.unshift(msg)
        this.setState({msgs})
    }

    render() {
        return (
            <div>
                <p>click {this.state.num} times</p>
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
                    {this.state.msgs.map((msg,index) => (
                        <li key={index}>{msg}</li>
                    ))}
                </ul>

            </div>
        )
    }
}
