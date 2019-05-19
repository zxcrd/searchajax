import React,{Component} from 'react'
import Search from '../search/search'
import Main from '../main/main'

export default  class App extends Component {
    state = {
        searchName:''
    }
    //这是修改state中的名字数据行为，传入的数据是子组件需要传的用户输入的名字
    setSearchName = (searchName)=>{
        this.setState({
            searchName
        })
    }
    render(){
        return(
            <div className="container">
                <Search setSearchName={this.setSearchName}></Search>
                <Main searchName={this.state.searchName}></Main>
            </div>
        )
    }
}
/**
 * 总结 props:
 * (1)父组件传递一般数据给子组件：子组件获取数据并使用
 * (2)父组件传递函数数据给子组件：子组件调用函数的时候，达到了子组件向父组件传递数据的目的！！！！
 * 还有一种情况：为了达到兄弟组件之间数据的传递，需要兄弟A向共同的父组件传数据，再通过父组件传给兄弟B
 */